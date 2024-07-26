	/* Player functions
	------------------------------------------------------------------------------------------ */
	let goodTube_pendingRetry = [];
	let goodTube_player_restoreTime = 0;
	let goodTube_player_assets = [
		goodTube_github+'/js/assets.min.js',
		goodTube_github+'/css/assets.min.css'
	];
	let goodTube_player_loadedAssets = 0;
	let goodTube_player_loadAssetAttempts = 0;
	let goodTube_player_loadVideoDataAttempts = 0;
	let goodTube_player_loadChaptersAttempts = 0;
	let goodTube_player_vttThumbnailsFunction = false;
	let goodTube_player_reloadVideoAttempts = 1;
	let goodTube_player_pip = false;
	let goodTube_player_miniplayer = false;
	let goodTube_player_miniplayer_video = false;
	let goodTube_player_highestQuality = false;
	let goodTube_player_selectedQuality = false;
	let goodTube_player_manuallySelectedQuality = false;
	let goodTube_player_storyboardLoaded = false;
	let goodTube_updateChapters = false;
	let goodTube_chapterTitleInterval = false;
	let goodTube_chaptersChangeInterval = false;
	let goodTube_updateManifestQualityTimeout = false;

	// Play / pause
	function goodTube_player_videojs_playPause() {
		let playPauseButton = document.querySelector('.vjs-play-control');

		if (playPauseButton.classList.contains('vjs-playing')) {
			goodTube_player_play(goodTube_player);
		}
		else {
			goodTube_player_pause(goodTube_player);
		}
	}

	// Update the video js player
	function goodTube_player_videojs_update() {
		// Make menus work
		let menuButtons = document.querySelectorAll('.vjs-control-bar button');
		menuButtons.forEach((button) => {
			button.onclick = function() {
				let openMenuButtons = document.querySelectorAll('.vjs-menuOpen');
				openMenuButtons.forEach((openMenuButton) => {
					if (openMenuButton != button.closest('div.vjs-menu-button')) {
						openMenuButton.classList.remove('vjs-menuOpen');
					}
				});

				let menu = button.closest('div.vjs-menu-button');

				if (menu) {
					if (menu.classList.contains('vjs-menuOpen')) {
						menu.classList.remove('vjs-menuOpen');
					}
					else {
						menu.classList.add('vjs-menuOpen');
					}
				}
			}

			button.ontouchstart = function() {
				let openMenuButtons = document.querySelectorAll('.vjs-menuOpen');
				openMenuButtons.forEach((openMenuButton) => {
					if (openMenuButton != button.closest('div.vjs-menu-button')) {
						openMenuButton.classList.remove('vjs-menuOpen');
					}
				});

				let menu = button.closest('div.vjs-menu-button');

				if (menu) {
					if (menu.classList.contains('vjs-menuOpen')) {
						menu.classList.remove('vjs-menuOpen');
					}
					else {
						menu.classList.add('vjs-menuOpen');
					}
				}
			}
		});

		const onClickOrTap = (element, handler) => {
			let touchMoveHappened = false;

			function touchstart() {
				touchMoveHappened = false;
			}

			function touchmove() {
				touchMoveHappened = true;
			}

			function touchend(e) {
				if (touchMoveHappened) {
					return;
				}

				handler(e);
			}

			function click(e) {
				handler(e);
			}

			element.addEventListener('touchstart', touchstart);
			element.addEventListener('touchmove', touchmove);
			element.addEventListener('touchend', touchend);
			element.addEventListener('click', click);
		};

		// Click menu item, close menu
		let menuItems = document.querySelectorAll('.vjs-menu-item');
		menuItems.forEach((item) => {
			onClickOrTap(item, (e) => {
				let delay = 0;

				if (goodTube_mobile) {
					delay = 400;
				}

				setTimeout(function() {
					let openMenuButtons = document.querySelectorAll('.vjs-menuOpen');
					openMenuButtons.forEach((openMenuButton) => {
						openMenuButton.classList.remove('vjs-menuOpen');
					});
				}, delay);
			});
		});

		// Add a hover bar to the DOM if we haven't already (desktop only)
		if (!goodTube_mobile) {
			if (!document.querySelector('.goodTube_hoverBar')) {
				let hoverBar = document.createElement('div');
				hoverBar.classList.add('goodTube_hoverBar');
				document.querySelector('.video-js .vjs-progress-control').appendChild(hoverBar);

				// Add actions to size the hover bar
				document.querySelector('.video-js .vjs-progress-control').addEventListener('mousemove', function(event) {
					window.requestAnimationFrame(function() {
						hoverBar.style.width = document.querySelector('.video-js .vjs-progress-control .vjs-mouse-display').style.left;
					});

				});
			}
		}
	}

	// Show or hide the next and previous button
	function goodTube_player_videojs_showHideNextPrevButtons() {
		goodTube_videojs_prevButton = false;
		goodTube_videojs_nextButton = true;

		// Don't show next / prev in the miniplayer / pip unless we're viewing a video
		if ((goodTube_player_miniplayer || goodTube_player_pip) && typeof goodTube_getParams['v'] === 'undefined') {
			goodTube_videojs_prevButton = false;
			goodTube_videojs_nextButton = false;
		}
		// For the regular player
		else {
			// If we're viewing a playlist
			if (typeof goodTube_getParams['i'] !== 'undefined' || typeof goodTube_getParams['index'] !== 'undefined' || typeof goodTube_getParams['list'] !== 'undefined') {
				let playlist = document.querySelectorAll('#goodTube_playlistContainer a');

				if (!playlist || !playlist.length) {
					return;
				}

				// If the first video is NOT selected
				if (!playlist[0].classList.contains('goodTube_selected')) {
					// Enable the previous button
					goodTube_videojs_prevButton = true;
				}
			}
			// Otherwise we're not in a playlist, so if a previous video exists
			else if (goodTube_videojs_previousVideo[goodTube_videojs_previousVideo.length - 2] && goodTube_videojs_previousVideo[goodTube_videojs_previousVideo.length - 2] !== window.location.href) {
				// Enable the previous button
				goodTube_videojs_prevButton = true;
			}
		}

		// Show or hide the previous button
		let prevButton = document.querySelector('.vjs-prev-button');
		if (prevButton) {
			if (!goodTube_videojs_prevButton) {
				goodTube_helper_hideElement(prevButton);
			}
			else {
				goodTube_helper_showElement(prevButton);
			}
		}

		// Show or hide the next button
		let nextButton = document.querySelector('.vjs-next-button');
		if (nextButton) {
			if (!goodTube_videojs_nextButton) {
				goodTube_helper_hideElement(nextButton);
			}
			else {
				goodTube_helper_showElement(nextButton);
			}
		}
	}

	// Position the timestamp (mobile only)
	function goodTube_player_videojs_positionTimestamp() {
		let currentTime = document.querySelector('.vjs-current-time');
		let divider = document.querySelector('.vjs-time-divider');
		let duration = document.querySelector('.vjs-duration');

		if (currentTime && divider && duration) {
			let leftOffset = 16;
			let padding = 4;

			currentTime.style.left = leftOffset+'px';
			divider.style.left = (leftOffset+currentTime.offsetWidth+padding)+'px';
			duration.style.left = (leftOffset+currentTime.offsetWidth+divider.offsetWidth+padding+padding)+'px';
		}
	}


	/* Video JS functions
	------------------------------------------------------------------------------------------ */
	let goodTube_videojs_player = false;
	let goodTube_videojs_player_loaded = false;
	let goodTube_videojs_previousVideo = [];
	let goodTube_videojs_prevButton = false;
	let goodTube_videojs_nextButton = true;
	let goodTube_videojs_tapTimer_backwards = false;
	let goodTube_videojs_tapTimer_forwards = false;
	let goodTube_videojs_fastForwardTimeout = false;
	let goodTube_videojs_fastForward = false;
	let goodTube_qualityApi = false;
	let goodTube_bufferingTimeout = false;
	let goodTube_bufferCountTimeout = false;
	let goodTube_loadingTimeout = false;
	let goodTube_seeking = false;
	let goodTube_bufferCount = 0;
	let goodTube_videojs_playbackRate = 1;




	/* GoodTube general functions
	------------------------------------------------------------------------------------------ */
	let goodTube_previousUrl = false;
	let goodTube_previousPlaylist = false;
	let goodTube_player = false;
	let goodTube_getParams = false;
	let goodTube_downloadTimeouts = [];
	let goodTube_pendingDownloads = [];
	let goodTube_mobile = false;
	let goodTube_clickedPlaylistOpen = false;

	// API subtitle / storyboard servers
	let goodTube_otherDataServersIndex_subtitles = 0;
	let goodTube_otherDataServersIndex_storyboard = 0;
	let goodTube_otherDataServers = [
		'https://yt.artemislena.eu',
		'https://invidious.perennialte.ch',
		'https://invidious.private.coffee',
		'https://invidious.drgns.space',
		'https://inv.nadeko.net',
		'https://invidious.projectsegfau.lt',
		'https://invidious.jing.rocks',
		'https://invidious.incogniweb.net',
		'https://invidious.privacyredirect.com',
		'https://invidious.fdn.fr',
		'https://iv.datura.network',
		'https://pipedapi-libre.kavin.rocks',
		'https://pipedapi.syncpundit.io',
		'https://invidious.protokolla.fi',
		'https://iv.melmac.space'
	];

	// Download servers

	// We first try these servers, recommended by "ihatespawn".
	// As I understand it these are ok to use, not trying to step on anyone's toes here.
	// Any issues with this implementation, please contact me. I am happy to work with you, so long as we let people download from somewhere.
	let goodTube_downloadServers = [
		'https://dl01.yt-dl.click',
		'https://dl02.yt-dl.click',
		'https://dl03.yt-dl.click',
		'https://apicloud9.filsfkwtlfjas.xyz',
		'https://apicloud3.filsfkwtlfjas.xyz',
		'https://apicloud8.filsfkwtlfjas.xyz',
		'https://apicloud4.filsfkwtlfjas.xyz',
		'https://apicloud5.filsfkwtlfjas.xyz',
	];

	// Only if they fail; we then fallback to using community instances.
	// This array is also shuffled to take the load off any single community instance.
	let goodTube_downloadServers_community = [
		'https://sea-downloadapi.stuff.solutions',
		'https://ca.haloz.at',
		'https://cobalt.wither.ing',
		'https://capi.tieren.men',
		'https://co.tskau.team',
		'https://apicb.tigaultraman.com',
		'https://api-cobalt.boykisser.systems',
		'https://cobalt.decrystalfan.app',
		'https://wukko.wolfdo.gg',
		'https://capi.oak.li',
		'https://cb.nyoom.fun',
		'https://dl.khyernet.xyz',
		'https://cobalt-api.alexagirl.studio',
		'https://nyc1.coapi.ggtyler.dev',
		'https://api.dl.ixhby.dev',
		'https://co.eepy.today',
		'https://downloadapi.stuff.solutions',
		'https://cobalt-api.ayo.tf',
		'https://api.sacreations.me',
		'https://apicloud2.filsfkwtlfjas.xyz',
		'https://dl01.yt-dl.click'
	];

	// Shuffle community instances
	let currentIndex = goodTube_downloadServers_community.length;
	while (currentIndex != 0) {
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[goodTube_downloadServers_community[currentIndex], goodTube_downloadServers_community[randomIndex]] = [goodTube_downloadServers_community[randomIndex], goodTube_downloadServers_community[currentIndex]];
	}

	// Combine the download servers
	goodTube_downloadServers = goodTube_downloadServers.concat(goodTube_downloadServers_community);

	// API Endpoints
	let goodTube_apis = [
		// AUTOMATIC OPTION
		// --------------------------------------------------------------------------------
		{
			'name': 'Automatic',
			'type': false,
			'proxy': true,
			'url': 'automatic'
		},

		// HD SERVERS
		// --------------------------------------------------------------------------------
		// FAST
		{
			'name': 'Acid (US)',
			'type': 2,
			'proxy': true,
			'url': 'https://invidious.incogniweb.net'
		},
		// FAST
		{
			'name': 'Anubis (DE)',
			'type': 3,
			'proxy': true,
			'url': 'https://pipedapi.r4fo.com'
		},
		// FAST
		{
			'name': 'Phoenix (US)',
			'type': 3,
			'proxy': true,
			'url': 'https://pipedapi.drgns.space'
		},
		// // FAST
		// {
		// 	'name': 'Ra (US)',
		// 	'type': 3,
		// 	'proxy': true,
		// 	'url': 'https://pipedapi.us.projectsegfau.lt'
		// },
		// // FAST
		// {
		// 	'name': 'Hades (DE)',
		// 	'type': 3,
		// 	'proxy': true,
		// 	'url': 'https://pipedapi.dedyn.io'
		// },
		// // FAST
		// {
		// 	'name': 'Rain (DE)',
		// 	'type': 3,
		// 	'proxy': true,
		// 	'url': 'https://pipedapi.andreafortuna.org'
		// },
		// FAST
		{
			'name': 'Nymph (AT)',
			'type': 2,
			'proxy': true,
			'url': 'https://invidious.private.coffee'
		},
		// FAST
		{
			'name': 'Serpent (US)',
			'type': 2,
			'proxy': true,
			'url': 'https://invidious.darkness.services'
		},
		// FAST
		{
			'name': 'Sphere (US)',
			'type': 3,
			'proxy': true,
			'url': 'https://pipedapi.darkness.services'
		},
		// // FAST
		// {
		// 	'name': 'Obsidian (AT)',
		// 	'type': 3,
		// 	'proxy': true,
		// 	'url': 'https://pipedapi.leptons.xyz'
		// },
		// // MEDIUM
		// {
		// 	'name': 'Hunter (NL)',
		// 	'type': 3,
		// 	'proxy': true,
		// 	'url': 'https://pipedapi.ducks.party'
		// },
		// MEDIUM
		{
			'name': 'Sapphire (IN)',
			'type': 3,
			'proxy': true,
			'url': 'https://pipedapi.in.projectsegfau.lt'
		},
		// FAST
		{
			'name': 'Sphynx (JP)',
			'type': 2,
			'proxy': true,
			'url': 'https://invidious.jing.rocks'
		},
		// // MEDIUM
		// {
		// 	'name': 'Space (DE)',
		// 	'type': 3,
		// 	'proxy': true,
		// 	'url': 'https://pipedapi.smnz.de'
		// },
		// MEDIUM
		{
			'name': 'Orchid (DE)',
			'type': 3,
			'proxy': true,
			'url': 'https://api.piped.yt'
		},
		// MEDIUM
		{
			'name': 'Emerald (DE)',
			'type': 3,
			'proxy': true,
			'url': 'https://pipedapi.phoenixthrush.com'
		},
		// MEDIUM
		{
			'name': '420 (FI)',
			'type': 2,
			'proxy': true,
			'url': 'https://invidious.privacyredirect.com'
		},
		// MEDIUM
		{
			'name': 'Onyx (FR)',
			'type': 2,
			'proxy': true,
			'url': 'https://invidious.fdn.fr'
		},
		// // MEDIUM
		// {
		// 	'name': 'Indigo (FI)',
		// 	'type': 2,
		// 	'proxy': true,
		// 	'url': 'https://iv.datura.network'
		// },
		// // MEDIUM
		// {
		// 	'name': 'Andromeda (FI)',
		// 	'type': 3,
		// 	'proxy': true,
		// 	'url': 'https://pipedapi-libre.kavin.rocks'
		// },
		// // MEDIUM
		// {
		// 	'name': 'Lilith (INT)',
		// 	'type': 3,
		// 	'proxy': true,
		// 	'url': 'https://pipedapi.syncpundit.io'
		// },
		// // MEDIUM
		// {
		// 	'name': 'Basilisk (DE)',
		// 	'type': 3,
		// 	'proxy': true,
		// 	'url': 'https://pipedapi.adminforge.de'
		// },
		// // MEDIUM
		// {
		// 	'name': 'Golem (AT)',
		// 	'type': 3,
		// 	'proxy': true,
		// 	'url': 'https://schaunapi.ehwurscht.at'
		// },

		// // SLOW
		// {
		// 	'name': 'Centaur (FR)',
		// 	'type': 3,
		// 	'proxy': true,
		// 	'url': 'https://api.piped.projectsegfau.lt'
		// },
		// // SLOW
		// {
		// 	'name': 'Cypher (FR)',
		// 	'type': 3,
		// 	'proxy': true,
		// 	'url': 'https://api.piped.privacydev.net'
		// },
		// // SLOW
		// {
		// 	'name': 'T800 (DE)',
		// 	'type': 2,
		// 	'proxy': true,
		// 	'url': 'https://invidious.protokolla.fi'
		// },
		// // SLOW
		// {
		// 	'name': 'Wasp (DE)',
		// 	'type': 2,
		// 	'proxy': true,
		// 	'url': 'https://iv.melmac.space'
		// },
		// // SLOW
		// {
		// 	'name': 'Platinum (TR)',
		// 	'type': 3,
		// 	'proxy': true,
		// 	'url': 'https://pipedapi.ngn.tf'
		// },
		// // SLOW
		// {
		// 	'name': 'Minotaur (NL)',
		// 	'type': 3,
		// 	'proxy': true,
		// 	'url': 'https://pipedapi.astartes.nl'
		// },

		// 360p SERVERS
		// --------------------------------------------------------------------------------
		{
			'name': '360p - Amethyst (DE)',
			'type': 1,
			'proxy': true,
			'url': 'https://yt.artemislena.eu'
		},
		{
			'name': '360p - Goblin (AU)',
			'type': 1,
			'proxy': false,
			'url': 'https://invidious.perennialte.ch'
		},
		// {
		// 	'name': '360p - Jade (SG)',
		// 	'type': 1,
		// 	'proxy': true,
		// 	'url': 'https://vid.lilay.dev'
		// },
		{
			'name': '360p - Raptor (US)',
			'type': 1,
			'proxy': true,
			'url': 'https://invidious.drgns.space'
		},
		// {
		// 	'name': '360p - Velvet (CL)',
		// 	'type': 1,
		// 	'proxy': true,
		// 	'url': 'https://inv.nadeko.net'
		// },
		// {
		// 	'name': '360p - Druid (DE)',
		// 	'type': 1,
		// 	'proxy': true,
		// 	'url': 'https://invidious.projectsegfau.lt'
		// }
	];

	// Set the starting server to automatic mode
	let goodTube_api_type = goodTube_apis[0]['type'];
	let goodTube_api_proxy = goodTube_apis[0]['proxy'];
	let goodTube_api_url = goodTube_apis[0]['url'];
	let goodTube_api_name = goodTube_apis[0]['name'];

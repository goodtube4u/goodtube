(function () {
	'use strict';


	/* Bypass CSP restrictions (introduced by the latest Chrome updates)
	------------------------------------------------------------------------------------------ */
	if (window.trustedTypes && window.trustedTypes.createPolicy && !window.trustedTypes.defaultPolicy) {
		window.trustedTypes.createPolicy('default', {
			createHTML: string => string,
			createScriptURL: string => string,
			createScript: string => string
		});
	}


	/* Helper functions
	------------------------------------------------------------------------------------------ */
	// Setup GET parameters
	function goodTube_helper_setupGetParams() {
		let getParams = {};

		document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
			function decode(s) {
				return decodeURIComponent(s.split("+").join(" "));
			}

			getParams[decode(arguments[1])] = decode(arguments[2]);
		});

		return getParams;
	}

	// Set a cookie
	function goodTube_helper_setCookie(name, value, days = 399) {
		document.cookie = name + "=" + encodeURIComponent(value) + ";max-age=" + (days * 24 * 60 * 60);
	}

	// Get a cookie
	function goodTube_helper_getCookie(name) {
		// Split the cookie string and get all individual name=value pairs in an array
		let cookies = document.cookie.split(";");

		// Loop through the array elements
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].split("=");

			// Removing whitespace at the beginning of the cookie name and compare it with the given string
			if (name == cookie[0].trim()) {
				// Decode the cookie value and return
				return decodeURIComponent(cookie[1]);
			}
		}

		// Return null if not found
		return null;
	}

	// Add CSS classes to show or hide elements / the Youtube player
	function goodTube_helper_showHide_init() {
		let style = document.createElement('style');
		style.textContent = `
			.goodTube_hidden {
				position: fixed !important;
				top: -9999px !important;
				left: -9999px !important;
				transform: scale(0) !important;
				pointer-events: none !important;
			}

			.goodTube_hiddenPlayer {
				position: relative;
				overflow: hidden;
				z-index: 1;
			}

			.goodTube_hiddenPlayer::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: #ffffff;
				z-index: 998;
			}

			html[dark] .goodTube_hiddenPlayer::before {
				background: #0f0f0f;
			}
		`;
		document.head.appendChild(style);
	}

	// Hide an element
	function goodTube_helper_hideElement(element) {
		if (element && !element.classList.contains('goodTube_hidden')) {
			element.classList.add('goodTube_hidden');
		}
	}

	// Show an element
	function goodTube_helper_showElement(element) {
		if (element && element.classList.contains('goodTube_hidden')) {
			element.classList.remove('goodTube_hidden');
		}
	}

	// Hide the Youtube player
	function goodTube_helper_hideYoutubePlayer(element) {
		// Add a wrapping div to help avoid detection
		if (!element.closest('.goodTube_hiddenPlayer')) {
			let parent = element.parentNode;
			let wrapper = document.createElement('div');
			wrapper.classList.add('goodTube_hiddenPlayer');
			parent.replaceChild(wrapper, element);
			wrapper.appendChild(element);
		}
	}

	// Show the Youtube player
	function goodTube_helper_showYoutubePlayer(element) {
		let wrappingElement = element.closest('.goodTube_hiddenPlayer');

		if (wrappingElement) {
			wrappingElement.classList.remove('goodTube_hiddenPlayer');
		}
	}


	/* Global variables
	------------------------------------------------------------------------------------------ */
	// A reference to our player's wrapper
	let goodTube_playerWrapper = false;

	// A reference to our player's iframe
	let goodTube_player = false;

	// The page api
	let goodTube_page_api = false;

	// The iframe api
	let goodTube_iframe_api = false;

	// Are we in picture in picture?
	let goodTube_pip = false;

	// Are we syncing the main Youtube player?
	let goodTube_syncingPlayer = false;

	// A reference to the previous URL (used to detect when the page changes)
	let goodTube_previousUrl = false;

	// Have we already turned off Youtube's default autoplay?
	let goodTube_turnedOffAutoplay = false;

	// Have we already redirected away from a short?
	let goodTube_redirectHappened = false;

	// Is this the first video we're loading?
	let goodTube_firstLoad = false;

	// Has the prox iframe loaded?
	let goodTube_proxyIframeLoaded = false;

	// Hold the playlist information
	let goodTube_playlist = false;
	let goodTube_playlistIndex = 0;

	// Is the "hide and mute ads" fallback active?
	let goodTube_fallback = false;

	// Are shorts enabled?
	let goodTube_shorts = 'false';
	if (window.top === window.self) {
		goodTube_shorts = goodTube_helper_getCookie('goodTube_shorts');

		if (!goodTube_shorts) {
			goodTube_helper_setCookie('goodTube_shorts', 'false');
		}
	}

	// Are info cards enabled?
	let goodTube_hideInfoCards = 'false';
	if (window.top === window.self) {
		goodTube_hideInfoCards = goodTube_helper_getCookie('goodTube_hideInfoCards');

		if (!goodTube_hideInfoCards) {
			goodTube_helper_setCookie('goodTube_hideInfoCards', 'true');
		}
	}

	// Is the end screen enabled (suggested videos)?
	let goodTube_hideEndScreen = 'false';
	if (window.top === window.self) {
		goodTube_hideEndScreen = goodTube_helper_getCookie('goodTube_hideEndScreen');

		if (!goodTube_hideEndScreen) {
			goodTube_helper_setCookie('goodTube_hideEndScreen', 'true');
		}
	}

	// Is autoplay turned on?
	let goodTube_autoplay = goodTube_helper_getCookie('goodTube_autoplay');
	if (window.top === window.self) {
		if (!goodTube_autoplay) {
			goodTube_helper_setCookie('goodTube_autoplay', 'true');
			goodTube_autoplay = 'true';
		}
	}

	// Get the playback speed to restore it
	let goodTube_playbackSpeed = goodTube_helper_getCookie('goodTube_playbackSpeed');
	if (!goodTube_playbackSpeed) {
		goodTube_playbackSpeed = '1';
	}

	// Fetch the GET params
	let goodTube_getParams = goodTube_helper_setupGetParams();


	/* Youtube functions
	------------------------------------------------------------------------------------------ */
	// Hide ads and shorts
	function goodTube_youtube_hideAdsShortsEtc() {
		// Hide ads
		let style = document.createElement('style');
		style.textContent = `
			.ytd-search ytd-shelf-renderer,
			ytd-reel-shelf-renderer,
			ytd-merch-shelf-renderer,
			ytd-action-companion-ad-renderer,
			ytd-display-ad-renderer,

			ytd-video-masthead-ad-advertiser-info-renderer,
			ytd-video-masthead-ad-primary-video-renderer,
			ytd-in-feed-ad-layout-renderer,
			ytd-ad-slot-renderer,
			ytd-statement-banner-renderer,
			ytd-banner-promo-renderer-background
			ytd-ad-slot-renderer,
			ytd-in-feed-ad-layout-renderer,
			ytd-engagement-panel-section-list-renderer:not(.ytd-popup-container):not([target-id='engagement-panel-clip-create']):not(.ytd-shorts),
			ytd-compact-video-renderer:has(.goodTube_hidden),
			ytd-rich-item-renderer:has(> #content > ytd-ad-slot-renderer)
			.ytd-video-masthead-ad-v3-renderer,
			div#root.style-scope.ytd-display-ad-renderer.yt-simple-endpoint,
			div#sparkles-container.style-scope.ytd-promoted-sparkles-web-renderer,
			div#main-container.style-scope.ytd-promoted-video-renderer,
			div#player-ads.style-scope.ytd-watch-flexy,
			#clarify-box,
			ytd-rich-item-renderer:has(> #content > ytd-ad-slot-renderer),

			ytm-rich-shelf-renderer,
			ytm-search ytm-shelf-renderer,
			ytm-button-renderer.icon-avatar_logged_out,
			ytm-companion-slot,
			ytm-reel-shelf-renderer,
			ytm-merch-shelf-renderer,
			ytm-action-companion-ad-renderer,
			ytm-display-ad-renderer,
			ytm-rich-section-renderer,
			ytm-video-masthead-ad-advertiser-info-renderer,
			ytm-video-masthead-ad-primary-video-renderer,
			ytm-in-feed-ad-layout-renderer,
			ytm-ad-slot-renderer,
			ytm-statement-banner-renderer,
			ytm-banner-promo-renderer-background
			ytm-ad-slot-renderer,
			ytm-in-feed-ad-layout-renderer,
			ytm-compact-video-renderer:has(.goodTube_hidden),
			ytm-rich-item-renderer:has(> #content > ytm-ad-slot-renderer)
			.ytm-video-masthead-ad-v3-renderer,
			div#root.style-scope.ytm-display-ad-renderer.yt-simple-endpoint,
			div#sparkles-container.style-scope.ytm-promoted-sparkles-web-renderer,
			div#main-container.style-scope.ytm-promoted-video-renderer,
			div#player-ads.style-scope.ytm-watch-flexy,
			ytd-compact-movie-renderer,

			yt-about-this-ad-renderer,
			masthead-ad,
			ad-slot-renderer,
			yt-mealbar-promo-renderer,
			statement-banner-style-type-compact,
			ytm-promoted-sparkles-web-renderer,
			tp-yt-iron-overlay-backdrop,
			#masthead-ad
			 {
				display: none !important;
			}

			.style-scope[page-subtype='channels'] ytd-shelf-renderer,
			.style-scope[page-subtype='channels'] ytm-shelf-renderer {
				display: block !important;
			}
		`;
		document.head.appendChild(style);

		// Debug message
		console.log('[GoodTube] Ads removed');


		// Hide shorts if they're not enabled
		if (goodTube_shorts === 'false') {
			let shortsStyle = document.createElement('style');
			shortsStyle.textContent = `
				ytm-pivot-bar-item-renderer:has(> .pivot-shorts),
				ytd-rich-section-renderer,
				grid-shelf-view-model {
					display: none !important;
				}
			`;
			document.head.appendChild(shortsStyle);

			// Debug message
			console.log('[GoodTube] Shorts removed');
		}
	}

	// Hide shorts (real time)
	let goodTube_youtube_hideShortsRealtime_timeout = setTimeout(() => {}, 0);
	function goodTube_youtube_hideShortsRealtime() {
		// If shorts are enabled
		if (goodTube_shorts === 'true') {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_youtube_hideShortsRealtime_timeout);

			// Loop this function
			goodTube_youtube_hideShortsRealtime_timeout = setTimeout(goodTube_youtube_hideShortsRealtime, 100);

			// Don't hide shorts
			return;
		}

		// Redirect from any short to the homepage
		if (window.location.href.indexOf('/shorts') !== -1 && !goodTube_redirectHappened) {
			window.location.href = 'https://youtube.com';
			goodTube_redirectHappened = true;
		}

		// Hide shorts links (we can't mark these as "checked" to save on resources, as the URLs seem to change over time)
		let shortsLinks = document.querySelectorAll('a:not(.goodTube_hidden)');
		shortsLinks.forEach((element) => {
			if (element.href.indexOf('shorts/') !== -1) {
				goodTube_helper_hideElement(element);
				goodTube_helper_hideElement(element.closest('ytd-video-renderer'));
				goodTube_helper_hideElement(element.closest('ytd-compact-video-renderer'));
				goodTube_helper_hideElement(element.closest('ytd-rich-grid-media'));
			}
		});

		// Hide shorts buttons
		let shortsButtons = document.querySelectorAll('yt-chip-cloud-chip-renderer:not(.goodTube_hidden):not(.goodTube_checked), yt-tab-shape:not(.goodTube_hidden):not(.goodTube_checked)');
		shortsButtons.forEach((element) => {
			if (element.innerHTML.toLowerCase().indexOf('shorts') !== -1) {
				goodTube_helper_hideElement(element);
			}

			// Mark this element as checked to save on resources
			element.classList.add('goodTube_checked');
		});

		// Clear timeout first to solve memory leak issues
		clearTimeout(goodTube_youtube_hideShortsRealtime_timeout);

		// Loop this function
		goodTube_youtube_hideShortsRealtime_timeout = setTimeout(goodTube_youtube_hideShortsRealtime, 100);
	}

	// Support timestamp links in comments
	function goodTube_youtube_timestampLinks() {
		// Links in video description and comments
		let timestampLinks = document.querySelectorAll('#description a, ytd-comments .yt-core-attributed-string a, ytm-expandable-video-description-body-renderer a, .comment-content a');

		// For each link
		timestampLinks.forEach((element) => {
			// Make sure we've not touched it yet, this stops doubling up on event listeners
			if (!element.classList.contains('goodTube_timestampLink') && element.getAttribute('href') && element.getAttribute('href').indexOf(goodTube_getParams['v']) !== -1 && element.getAttribute('href').indexOf('t=') !== -1) {
				element.classList.add('goodTube_timestampLink');

				// Add the event listener to send our player to the correct time
				element.addEventListener('click', function () {
					let bits = element.getAttribute('href').split('t=');
					if (typeof bits[1] !== 'undefined') {
						let time = bits[1].replace('s', '');
						goodTube_player_skipTo(time);
					}
				});
			}
		});
	}

	// Hide all Youtube players
	let goodTube_youtube_hidePlayers_timeout = setTimeout(() => {}, 0);
	function goodTube_youtube_hidePlayers() {
		// Don't do this if shorts are enabled and we're viewing a short
		if (goodTube_shorts === 'true' && window.location.href.indexOf('/shorts') !== -1) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_youtube_hidePlayers_timeout);

			// Loop this function
			goodTube_youtube_hidePlayers_timeout = setTimeout(goodTube_youtube_hidePlayers, 100);

			// Don't hide the players
			return;
		}

		// If the "hide and mute ads" fallback is active
		if (goodTube_fallback) {
			// Show the normal Youtube player
			let regularPlayers = document.querySelectorAll('#player:not(.ytd-channel-video-player-renderer)');
			regularPlayers.forEach((element) => {
				goodTube_helper_showYoutubePlayer(element);
			});

			// Show the full screen and theater Youtube player
			let fullscreenPlayers = document.querySelectorAll('#full-bleed-container');
			fullscreenPlayers.forEach((element) => {
				goodTube_helper_showYoutubePlayer(element);
			});
		}
		// Otherwise we're using the regular method
		else {
			// Hide the normal Youtube player
			let regularPlayers = document.querySelectorAll('#player:not(.ytd-channel-video-player-renderer):not(.goodTube_hidden)');
			regularPlayers.forEach((element) => {
				goodTube_helper_hideYoutubePlayer(element);
			});

			// Remove the full screen and theater Youtube player
			let fullscreenPlayers = document.querySelectorAll('#full-bleed-container:not(.goodTube_hidden)');
			fullscreenPlayers.forEach((element) => {
				goodTube_helper_hideYoutubePlayer(element);
			});
		}

		// Hide the Youtube miniplayer
		let miniPlayers = document.querySelectorAll('ytd-miniplayer:not(.goodTube_hidden)');
		miniPlayers.forEach((element) => {
			goodTube_helper_hideElement(element);
		});

		// Clear timeout first to solve memory leak issues
		clearTimeout(goodTube_youtube_hidePlayers_timeout);

		// Loop this function
		goodTube_youtube_hidePlayers_timeout = setTimeout(goodTube_youtube_hidePlayers, 1);
	}

	// Mute and pause all Youtube videos
	let goodTube_youtube_pauseMuteVideos_timeout = setTimeout(() => {}, 0);
	function goodTube_youtube_pauseMuteVideos() {
		// IF if shorts are enabled and we're viewing a short
		// OR we're not viewing a video
		if (
			(goodTube_shorts === 'true' && window.location.href.indexOf('/shorts') !== -1)
			||
			window.location.href.indexOf('/watch?') === -1
		) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_youtube_pauseMuteVideos_timeout);

			// Loop this function
			goodTube_youtube_pauseMuteVideos_timeout = setTimeout(goodTube_youtube_pauseMuteVideos, 1);

			// Don't pause or mute videos
			return;
		}

		// Pause and mute all HTML videos on the page
		let youtubeVideos = document.querySelectorAll('video');
		youtubeVideos.forEach((video) => {
			// If the "hide the mute" ads fallback is active
			if (goodTube_fallback) {
				// If the video is playing and it's NOT the main player
				if (!video.paused && !video.closest('#movie_player')) {
					// Pause and mute the video
					video.muted = true;
					video.volume = 0;
					video.pause();
				}
			}
			// Otherwise, the "hide and mute" ads fallback is inactive
			else {
				// IF (the video is playing)
				// AND (we're not syncing the main player OR it's not the main player)
				if (!video.paused && (!goodTube_syncingPlayer || !video.closest('#movie_player'))) {
					// Pause and mute the video
					video.muted = true;
					video.volume = 0;
					video.pause();
				}
			}
		});

		// Clear timeout first to solve memory leak issues
		clearTimeout(goodTube_youtube_pauseMuteVideos_timeout);

		// Loop this function
		goodTube_youtube_pauseMuteVideos_timeout = setTimeout(goodTube_youtube_pauseMuteVideos, 1);
	}


	/* Player functions
	------------------------------------------------------------------------------------------ */
	// Init player
	let goodTube_player_init_timeout = setTimeout(() => {}, 0);
	function goodTube_player_init() {
		// Get the page API
		goodTube_page_api = document.getElementById('movie_player');

		// Get the video data to check loading state
		let videoData = false;
		if (goodTube_page_api && typeof goodTube_page_api.getVideoData === 'function') {
			videoData = goodTube_page_api.getVideoData();
		}

		// Keep trying to get the frame API until it exists
		if (!videoData) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_player_init_timeout);

			// Create a new timeout
			goodTube_player_init_timeout = setTimeout(goodTube_player_init, 100);

			return;
		}

		// Add CSS styles for the player
		let style = document.createElement('style');
		style.textContent = `
			/* Player wrapper */
			#goodTube_playerWrapper {
				border-radius: 12px;
				background: transparent;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 999;
				overflow: hidden;
			}

			/* Theater mode */
			#goodTube_playerWrapper.goodTube_theater {
				background: #000000;
				border-radius: 0;
			}
		`;
		document.head.appendChild(style);

		// Setup player layout
		let playerWrapper = document.createElement('div');
		playerWrapper.id = 'goodTube_playerWrapper';

		// Add player to the page
		document.body.appendChild(playerWrapper);

		// Add video iframe embed (via proxy iframe)
		playerWrapper.innerHTML = `
			<iframe
				src="\x68\x74\x74\x70\x73\x3a\x2f\x2f\x65\x6e\x2e\x77\x69\x6b\x69\x70\x65\x64\x69\x61\x2e\x6f\x72\x67\x2f\x77\x69\x6b\x69\x2f\x46\x75\x63\x6b\x3f\x67\x6f\x6f\x64\x54\x75\x62\x65\x50\x72\x6f\x78\x79\x3d\x31"
				width="100%"
				height="100%"
				src=""
				frameborder="0"
				scrolling="yes"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
				style="display: none;"
			></iframe>
		`;

		// Expose the player and wrapper globally
		goodTube_playerWrapper = document.querySelector('#goodTube_playerWrapper');
		goodTube_player = goodTube_playerWrapper.querySelector('iframe');

		// Setup player dynamic positioning and sizing
		goodTube_player_positionAndSize();

		// Swap the miniplayer for the PiP button
		goodTube_player_swapMiniplayerForPip();

		// Run the actions
		goodTube_actions();
	}

	// Position and size the player
	let goodTube_player_positionAndSize_timeout = setTimeout(() => {}, 0);
	let goodTube_clearedPlayer = false;
	function goodTube_player_positionAndSize() {
		// If we're viewing a video
		if (window.location.href.indexOf('/watch?') !== -1) {
			// If the "hide and mute ads" fallback is inactive
			if (goodTube_fallback) {
				if (!goodTube_clearedPlayer) {
					// Hide and clear the embedded player
					goodTube_player_clear(true);
					goodTube_clearedPlayer = true;
				}
			}
			// Otherwise, the "hide and mute ads" fallback is inactive
			else {
				goodTube_clearedPlayer = false;

				// Show the GoodTube player
				goodTube_helper_showElement(goodTube_playerWrapper);

				// This is used to position and size the player
				let positionElement = false;

				// Theater mode
				if (document.querySelector('ytd-watch-flexy[theater]')) {
					positionElement = document.getElementById('player-full-bleed-container');

					if (!goodTube_playerWrapper.classList.contains('goodTube_theater')) {
						goodTube_playerWrapper.classList.add('goodTube_theater');
					}
				}
				// Regular mode
				else {
					positionElement = document.getElementById('player');

					if (goodTube_playerWrapper.classList.contains('goodTube_theater')) {
						goodTube_playerWrapper.classList.remove('goodTube_theater');
					}
				}

				// Use an alternative fallback position element if we can't find it
				if (!positionElement || positionElement.offsetHeight <= 0) {
					positionElement = document.getElementById('ytd-player');
				}

				// Position the player
				if (positionElement && positionElement.offsetHeight > 0) {
					// Our wrapper has "position: absolute" so take into account the window scroll
					let rect = positionElement.getBoundingClientRect();
					goodTube_playerWrapper.style.top = (rect.top + window.scrollY) + 'px';
					goodTube_playerWrapper.style.left = (rect.left + window.scrollX) + 'px';

					// Match the size of the position element
					goodTube_playerWrapper.style.width = positionElement.offsetWidth + 'px';
					goodTube_playerWrapper.style.height = positionElement.offsetHeight + 'px';
				}
			}
		}

		// Clear timeout first to solve memory leak issues
		clearTimeout(goodTube_player_positionAndSize_timeout);

		// Create a new timeout (this must be done with setTimeout - it fixes a known major issue many users have where the function won't fire with window.requestAnimationFrame)
		goodTube_player_positionAndSize_timeout = setTimeout(goodTube_player_positionAndSize, 0);
	}

	// Populate the playlist info
	let goodTube_player_populatePlaylistInfo_timeout = setTimeout(() => {}, 0);
	function goodTube_player_populatePlaylistInfo() {
		// Re fetch the page API
		goodTube_page_api = document.getElementById('movie_player');

		// Make sure we have access to the frame API
		if (typeof goodTube_page_api.getPlaylist === 'function' && typeof goodTube_page_api.getPlaylistIndex === 'function') {
			goodTube_playlist = goodTube_page_api.getPlaylist();
			goodTube_playlistIndex = goodTube_page_api.getPlaylistIndex();

			// If the playlist info isn't ready yet
			if (!goodTube_playlist) {
				// Clear timeout first to solve memory leak issues
				clearTimeout(goodTube_player_populatePlaylistInfo_timeout);

				// Try again
				goodTube_player_populatePlaylistInfo_timeout = setTimeout(goodTube_player_populatePlaylistInfo, 100);
			}
		}
	}

	// Load a video
	let goodTube_player_load_timeout = setTimeout(() => {}, 0);
	function goodTube_player_load() {
		// Reset the "hide and mute ads" state (this ensures the fallback will refresh for each new video)
		goodTube_hideAndMuteAds_state = '';

		// Pause the video first (this helps to prevent audio flashes)
		goodTube_player_pause();

		// Make sure the proxy iframe has loaded
		if (!goodTube_proxyIframeLoaded) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_player_load_timeout);

			// Create a new timeout
			goodTube_player_load_timeout = setTimeout(goodTube_player_load, 100);
			return;
		}

		// Re fetch the page API
		goodTube_page_api = document.getElementById('movie_player');

		// If we're viewing a playlist
		let playlist = 'false';
		if (typeof goodTube_getParams['i'] !== 'undefined' || typeof goodTube_getParams['index'] !== 'undefined' || typeof goodTube_getParams['list'] !== 'undefined') {
			// Populate the GET params below to let the iframe know we're viewing a playlist
			playlist = 'true';

			// Populate the playlist info
			goodTube_player_populatePlaylistInfo();
		}
		// Otherwise, remove playlist info
		else {
			goodTube_playlist = false;
			goodTube_playlistIndex = 0;
		}

		// If we're loading for the first time
		if (!goodTube_firstLoad) {
			// If we're not viewing a video
			if (window.location.href.indexOf('/watch?') === -1) {
				// Clear and hide the player
				goodTube_player_clear();
			}

			// Include the skip to time if it exists in query params
			let skipToGetVar = '';
			if (typeof goodTube_getParams['t'] !== 'undefined') {
				skipToGetVar = '&start=' + goodTube_getParams['t'].replace('s', '');
			}
			// Otherwise, also check if the regular Youtube player has skipped to a start time
			else if (goodTube_page_api && typeof goodTube_page_api.getCurrentTime === 'function') {
				let savedTime = Math.floor(goodTube_page_api.getCurrentTime());

				// Make sure it's over 10seconds just for sanity's sake (we don't wanna skip because of delayed loading time on our end)
				if (savedTime > 10) {
					skipToGetVar = '&start=' + savedTime;
				}
			}

			// Set the video source
			goodTube_player.contentWindow.postMessage('goodTube_src_https://www.youtube.com/embed/' + goodTube_getParams['v'] + '?goodTubeEmbed=1&autoplay=1&goodTube_playlist=' + playlist + '&goodTube_autoplay=' + goodTube_autoplay + '&goodTube_playbackSpeed=' + goodTube_playbackSpeed + '&goodTube_hideInfoCards=' + goodTube_hideInfoCards + '&goodTube_hideEndScreen=' + goodTube_hideEndScreen + skipToGetVar, '*');

			// Indicate we've completed the first load
			goodTube_firstLoad = true;
		}
		// Otherwise, for all other loads
		else {
			// Setup the start time
			let startTime = 0;

			// Use the skip to time if it exists in query params
			if (typeof goodTube_getParams['t'] !== 'undefined') {
				startTime = goodTube_getParams['t'].replace('s', '');
			}
			// Otherwise, use the regular Youtube player's start time
			else if (goodTube_page_api && typeof goodTube_page_api.getCurrentTime === 'function') {
				let savedTime = Math.floor(goodTube_page_api.getCurrentTime());

				// Make sure it's over 10s for sanity's sake (we don't wanna skip because of delayed loading time on our end)
				if (savedTime > 10) {
					startTime = savedTime;
				}
			}

			// Load the video via the iframe api
			goodTube_player.contentWindow.postMessage('goodTube_load_' + goodTube_getParams['v'] + '|||' + startTime + '|||' + playlist, '*');
		}


		// Show the player
		goodTube_helper_showElement(goodTube_playerWrapper);
	}

	// Clear and hide the player
	function goodTube_player_clear(clearPip = false) {
		// Stop the video via the iframe api (but not if we're in picture in picture)
		if (!goodTube_pip || clearPip) {
			goodTube_player.contentWindow.postMessage('goodTube_stopVideo', '*');
		}

		// Hide the player
		goodTube_helper_hideElement(goodTube_playerWrapper);
	}

	// Skip to time
	function goodTube_player_skipTo(time) {
		goodTube_player.contentWindow.postMessage('goodTube_skipTo_' + time, '*');
	}

	// Pause
	function goodTube_player_pause() {
		goodTube_player.contentWindow.postMessage('goodTube_pause', '*');
	}

	// Play
	function goodTube_player_play() {
		goodTube_player.contentWindow.postMessage('goodTube_play', '*');
	}

	// Swap the miniplayer for the PiP button
	let goodTube_player_swapMiniplayerForPip_timeout = setTimeout(() => {}, 0);
	function goodTube_player_swapMiniplayerForPip() {
		// Target the miniplayer and pip buttons
		let miniplayerButton = document.querySelector('.ytp-miniplayer-button');
		let pipButton = document.querySelector('.ytp-pip-button');

		// If we found them
		if (miniplayerButton && pipButton) {
			// Remove the miniplayer button
			miniplayerButton.remove();

			// Fix the a keyboard shortcut
			document.addEventListener('keydown', function (event) {
				// Make sure we're watching a video
				if (window.location.href.indexOf('/watch?') === -1) {
					return;
				}

				// Get the key pressed in lower case
				let keyPressed = event.key.toLowerCase();

				// If we're not focused on a HTML form element
				let focusedElement = event.srcElement;
				let focusedElement_tag = false;
				let focusedElement_id = false;
				if (focusedElement) {
					if (typeof focusedElement.nodeName !== 'undefined') {
						focusedElement_tag = focusedElement.nodeName.toLowerCase();
					}

					if (typeof focusedElement.getAttribute !== 'undefined') {
						focusedElement_id = focusedElement.getAttribute('id');
					}
				}

				if (
					!focusedElement ||
					(
						focusedElement_tag.indexOf('input') === -1 &&
						focusedElement_tag.indexOf('label') === -1 &&
						focusedElement_tag.indexOf('select') === -1 &&
						focusedElement_tag.indexOf('textarea') === -1 &&
						focusedElement_tag.indexOf('fieldset') === -1 &&
						focusedElement_tag.indexOf('legend') === -1 &&
						focusedElement_tag.indexOf('datalist') === -1 &&
						focusedElement_tag.indexOf('output') === -1 &&
						focusedElement_tag.indexOf('option') === -1 &&
						focusedElement_tag.indexOf('optgroup') === -1 &&
						focusedElement_id !== 'contenteditable-root'
					)
				) {
					if (keyPressed === 'i') {
						// Stop the default stuff
						event.preventDefault();
						event.stopImmediatePropagation();

						// Click the pip button
						pipButton.click();
					}
				}
			}, true);
		}
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_player_swapMiniplayerForPip_timeout);

			// Create a new timeout
			goodTube_player_swapMiniplayerForPip_timeout = setTimeout(goodTube_player_swapMiniplayerForPip, 100);
		}
	}


	/* Keyboard shortcuts
	------------------------------------------------------------------------------------------ */
	// Add keyboard shortcuts
	function goodTube_shortcuts_init() {
		document.addEventListener('keydown', function (event) {
			// Don't do anything if we're holding control OR the command key on mac OR the "hide and mute ads" fallback is active
			if (event.ctrlKey || event.metaKey || goodTube_fallback) {
				return;
			}

			// Make sure we're watching a video
			if (window.location.href.indexOf('/watch?') === -1) {
				return;
			}

			// Get the key pressed in lower case
			let keyPressed = event.key.toLowerCase();

			// If we're not focused on a HTML form element
			let focusedElement = event.srcElement;
			let focusedElement_tag = false;
			let focusedElement_id = false;
			if (focusedElement) {
				if (typeof focusedElement.nodeName !== 'undefined') {
					focusedElement_tag = focusedElement.nodeName.toLowerCase();
				}

				if (typeof focusedElement.getAttribute !== 'undefined') {
					focusedElement_id = focusedElement.getAttribute('id');
				}
			}

			if (
				!focusedElement ||
				(
					focusedElement_tag.indexOf('input') === -1 &&
					focusedElement_tag.indexOf('label') === -1 &&
					focusedElement_tag.indexOf('select') === -1 &&
					focusedElement_tag.indexOf('textarea') === -1 &&
					focusedElement_tag.indexOf('fieldset') === -1 &&
					focusedElement_tag.indexOf('legend') === -1 &&
					focusedElement_tag.indexOf('datalist') === -1 &&
					focusedElement_tag.indexOf('output') === -1 &&
					focusedElement_tag.indexOf('option') === -1 &&
					focusedElement_tag.indexOf('optgroup') === -1 &&
					focusedElement_id !== 'contenteditable-root'
				)
			) {
				if (
					// Speed up playback
					keyPressed === '>' ||
					// Slow down playback
					keyPressed === '<'
				) {
					event.preventDefault();
					event.stopImmediatePropagation();

					// Pass the keyboard shortcut to the iframe
					goodTube_player.contentWindow.postMessage('goodTube_shortcut_' + keyPressed, '*');
				}

				// If we're not holding down the shift key
				if (!event.shiftKey) {
					// If we're focused on the video element
					if (focusedElement && typeof focusedElement.closest !== 'undefined' && focusedElement.closest('#goodTube_player')) {
						// Theater mode (focus the body, this makes the default youtube shortcut work)
						if (keyPressed === 't') {
							document.querySelector('body').focus();
						}
					}

					if (
						// Prev frame (24fps calculation)
						keyPressed === ',' ||
						// Next frame (24fps calculation)
						keyPressed === '.' ||
						// Prev 5 seconds
						keyPressed === 'arrowleft' ||
						// Next 5 seconds
						keyPressed === 'arrowright' ||
						// Toggle play/pause
						keyPressed === ' ' || keyPressed === 'k' ||
						// Toggle mute
						keyPressed === 'm' ||
						// Toggle fullscreen
						keyPressed === 'f' ||
						// Toggle captions
						keyPressed === 'c' ||
						// Prev 10 seconds
						keyPressed === 'j' ||
						// Next 10 seconds
						keyPressed === 'l' ||
						// Start of video
						keyPressed === 'home' ||
						// End of video
						keyPressed === 'end' ||
						// Skip to percentage
						keyPressed === '0' ||
						keyPressed === '1' ||
						keyPressed === '2' ||
						keyPressed === '3' ||
						keyPressed === '4' ||
						keyPressed === '5' ||
						keyPressed === '6' ||
						keyPressed === '7' ||
						keyPressed === '8' ||
						keyPressed === '9'
					) {
						event.preventDefault();
						event.stopImmediatePropagation();

						// Pass the keyboard shortcut to the iframe
						goodTube_player.contentWindow.postMessage('goodTube_shortcut_' + keyPressed, '*');

						// Force mouse move to make sure fullscreen hides
						var event = new Event('mousemove');
						document.dispatchEvent(event);
					}

					// Toggle picture in picture
					if (keyPressed === 'i') {
						event.preventDefault();
						event.stopImmediatePropagation();

						// Tell the iframe to toggle pip
						goodTube_player.contentWindow.postMessage('goodTube_pip', '*');
					}

					// Toggle theater
					if (keyPressed === 't') {
						event.preventDefault();
						event.stopImmediatePropagation();

						// Disable when in fullscreen
						if (!document.fullscreenElement) {
							document.querySelector('.ytp-size-button')?.click();
						}
					}
				}
			}
		}, true);
	}

	// Trigger a keyboard shortcut (currently unused)
	// function goodTube_shortcuts_trigger(shortcut) {
	// 	// Focus the body first
	// 	document.querySelector('body').focus();

	// 	// Setup the keyboard shortcut
	// 	let theKey = false;
	// 	let keyCode = false;
	// 	let shiftKey = false;

	// 	if (shortcut === 'theater') {
	// 		theKey = 't';
	// 		keyCode = 84;
	// 		shiftKey = false;
	// 	}
	// 	else {
	// 		return;
	// 	}

	// 	// Trigger the keyboard shortcut
	// 	let e = false;
	// 	e = new window.KeyboardEvent('focus', {
	// 		bubbles: true,
	// 		key: theKey,
	// 		keyCode: keyCode,
	// 		shiftKey: shiftKey,
	// 		charCode: 0,
	// 	});
	// 	document.dispatchEvent(e);

	// 	e = new window.KeyboardEvent('keydown', {
	// 		bubbles: true,
	// 		key: theKey,
	// 		keyCode: keyCode,
	// 		shiftKey: shiftKey,
	// 		charCode: 0,
	// 	});
	// 	document.dispatchEvent(e);

	// 	e = new window.KeyboardEvent('beforeinput', {
	// 		bubbles: true,
	// 		key: theKey,
	// 		keyCode: keyCode,
	// 		shiftKey: shiftKey,
	// 		charCode: 0,
	// 	});
	// 	document.dispatchEvent(e);

	// 	e = new window.KeyboardEvent('keypress', {
	// 		bubbles: true,
	// 		key: theKey,
	// 		keyCode: keyCode,
	// 		shiftKey: shiftKey,
	// 		charCode: 0,
	// 	});
	// 	document.dispatchEvent(e);

	// 	e = new window.KeyboardEvent('input', {
	// 		bubbles: true,
	// 		key: theKey,
	// 		keyCode: keyCode,
	// 		shiftKey: shiftKey,
	// 		charCode: 0,
	// 	});
	// 	document.dispatchEvent(e);

	// 	e = new window.KeyboardEvent('change', {
	// 		bubbles: true,
	// 		key: theKey,
	// 		keyCode: keyCode,
	// 		shiftKey: shiftKey,
	// 		charCode: 0,
	// 	});
	// 	document.dispatchEvent(e);

	// 	e = new window.KeyboardEvent('keyup', {
	// 		bubbles: true,
	// 		key: theKey,
	// 		keyCode: keyCode,
	// 		shiftKey: shiftKey,
	// 		charCode: 0,
	// 	});
	// 	document.dispatchEvent(e);
	// }


	/* Navigation
	------------------------------------------------------------------------------------------ */
	// Play the next video
	function goodTube_nav_next(shuffleLoopMethod = false) {
		// Re fetch the page API
		goodTube_page_api = document.getElementById('movie_player');

		// Make sure it exists
		if (goodTube_page_api && typeof goodTube_page_api.nextVideo === 'function') {
			// Play the previous video
			goodTube_page_api.nextVideo();
		}

		// Debug message
		console.log('[GoodTube] Playing next video...');
	}

	// Play the previous video
	function goodTube_nav_prev() {
		// Re fetch the page API
		goodTube_page_api = document.getElementById('movie_player');

		// Make sure it exists
		if (goodTube_page_api && typeof goodTube_page_api.previousVideo === 'function') {
			// Play the previous video
			goodTube_page_api.previousVideo();
		}

		// Debug message
		console.log('[GoodTube] Playing previous video...');
	}

	// Video has ended
	function goodTube_nav_videoEnded() {
		// Populate the playlist info
		goodTube_player_populatePlaylistInfo();

		// If (autoplay is enabled) OR (we're viewing a playlist AND we're not on the last video)
		if (
			goodTube_autoplay === 'true'
			||
			(goodTube_playlist && (goodTube_playlistIndex < (goodTube_playlist.length - 1)))
		) {
			// Play the next video
			goodTube_nav_next();
		}
	}

	// Show or hide the end screen (based on autoplay, not the setting)
	function goodTube_nav_showHideEndScreen() {
		// Re fetch the page API
		goodTube_page_api = document.getElementById('movie_player');

		// Show the end screen
		let hideEndScreen = false;

		// If autoplay is on, hide the end screen
		if (goodTube_autoplay === 'true') {
			hideEndScreen = true;
		}

		// Otherwise, if we're viewing a playlist
		else if (goodTube_playlist) {
			// Hide the end screen
			hideEndScreen = true;

			// If we're on the last video
			if (goodTube_playlistIndex === (goodTube_playlist.length - 1)) {
				// Show the end screen
				hideEndScreen = false;
			}
		}

		// Hide the end screen
		if (hideEndScreen) {
			goodTube_player.contentWindow.postMessage('goodTube_endScreen_hide', '*');
		}
		// Otherwise show the end screen
		else {
			goodTube_player.contentWindow.postMessage('goodTube_endScreen_show', '*');
		}
	}


	/* Usage stats
	------------------------------------------------------------------------------------------
	Don't worry everyone - these are just simple counters that let me know the following;
	 - Daily unique users
	 - Total unique users
	 - Daily videos played
	 - Total videos played
	
	This is only in here so I can have some fun and see how many people use this thing I made **no private info is tracked**
	*/

	// Count unique users
	function goodTube_stats_user() {
		/* Get today's date as yyyy-mm-dd (UTC time)
		-------------------------------------------------- */
		let date_local = new Date();
		let date_utc = Date.UTC(date_local.getUTCFullYear(), date_local.getUTCMonth(), date_local.getUTCDate(), date_local.getUTCHours(), date_local.getUTCMinutes(), date_local.getUTCSeconds());
		let date_utc_formatted = new Date(date_utc);
		let date_string = date_utc_formatted.toISOString().split('T')[0];


		/* Daily unique users
		-------------------------------------------------- */
		// If there's no cookie
		if (!goodTube_helper_getCookie('goodTube_uniqueUserStat_' + date_string)) {
			// Count
			fetch(
				'\x68\x74\x74\x70\x73\x3a\x2f\x2f\x6a\x61\x6d\x65\x6e\x6c\x79\x6e\x64\x6f\x6e\x2e\x63\x6f\x6d\x2f\x5f\x6f\x74\x68\x65\x72\x2f\x73\x74\x61\x74\x73\x2f\x75\x73\x65\x72\x73\x5f\x64\x61\x69\x6c\x79\x2e\x70\x68\x70?' + new URLSearchParams({ date: date_string }),
				{
					referrerPolicy: 'no-referrer'
				}
			);

			// Set a cookie
			goodTube_helper_setCookie('goodTube_uniqueUserStat_' + date_string, 'true', 2);
		}


		/* Total unique users
		-------------------------------------------------- */
		// If there's no cookie
		if (!goodTube_helper_getCookie('goodTube_uniqueUserStat')) {
			// Count
			fetch(
				'\x68\x74\x74\x70\x73\x3a\x2f\x2f\x6a\x61\x6d\x65\x6e\x6c\x79\x6e\x64\x6f\x6e\x2e\x63\x6f\x6d\x2f\x5f\x6f\x74\x68\x65\x72\x2f\x73\x74\x61\x74\x73\x2f\x75\x73\x65\x72\x73\x5f\x74\x6f\x74\x61\x6c\x2e\x70\x68\x70',
				{
					referrerPolicy: 'no-referrer'
				}
			);

			// Set a cookie
			goodTube_helper_setCookie('goodTube_uniqueUserStat', 'true');
		}
	}

	// Count videos played
	function goodTube_stats_video() {
		/* Videos played (combined total and daily)
		-------------------------------------------------- */
		// Count
		fetch(
			'\x68\x74\x74\x70\x73\x3a\x2f\x2f\x6a\x61\x6d\x65\x6e\x6c\x79\x6e\x64\x6f\x6e\x2e\x63\x6f\x6d\x2f\x5f\x6f\x74\x68\x65\x72\x2f\x73\x74\x61\x74\x73\x2f\x76\x69\x64\x65\x6f\x73\x2e\x70\x68\x70',
			{
				referrerPolicy: 'no-referrer'
			}
		);
	}


	/* Core functions
	------------------------------------------------------------------------------------------ */
	// Init
	function goodTube_init() {
		/* Disable Youtube
		-------------------------------------------------- */
		// Mute and pause all Youtube videos
		goodTube_youtube_pauseMuteVideos();

		// Add CSS classes to hide elements (without Youtube knowing)
		goodTube_helper_showHide_init();

		// Hide the youtube players
		goodTube_youtube_hidePlayers();

		// Add CSS to hide ads, shorts, etc
		goodTube_youtube_hideAdsShortsEtc();

		// Hide shorts (real time)
		goodTube_youtube_hideShortsRealtime();

		// Support the "hide and mute ads" fallback
		goodTube_hideAndMuteAdsFallback_init();


		/* Load GoodTube
		-------------------------------------------------- */
		// Init our player (after DOM is loaded)
		document.addEventListener('DOMContentLoaded', goodTube_player_init);

		// Also check if the DOM is already loaded, as if it is, the above event listener will not trigger
		if (document.readyState === 'interactive' || document.readyState === 'complete') {
			goodTube_player_init();
		}

		// Usage stats
		goodTube_stats_user();

		// Keyboard shortcuts
		goodTube_shortcuts_init();

		// Listen for messages from the iframe
		window.addEventListener('message', goodTube_receiveMessage);

		// Init the menu
		document.addEventListener('DOMContentLoaded', goodTube_menu);

		// Also check if the DOM is already loaded, as if it is, the above event listener will not trigger
		if (document.readyState === 'interactive' || document.readyState === 'complete') {
			goodTube_menu();
		}
	}

	// Listen for messages from the iframe
	let goodTube_receiveMessage_timeout = setTimeout(() => {}, 0);
	function goodTube_receiveMessage(event) {
		// Make sure some data exists
		if (typeof event.data !== 'string') {
			return;
		}

		// Proxy iframe has loaded
		else if (event.data === 'goodTube_proxyIframe_loaded') {
			goodTube_proxyIframeLoaded = true;
		}

		// Player iframe has loaded
		else if (event.data === 'goodTube_playerIframe_loaded') {
			goodTube_player.style.display = 'block';
		}

		// Picture in picture
		if (event.data.indexOf('goodTube_pip_') !== -1) {
			let pipEnabled = event.data.replace('goodTube_pip_', '');

			if (pipEnabled === 'true') {
				goodTube_pip = true;
			}
			else {
				goodTube_pip = false;

				// If we're not viewing a video
				if (typeof goodTube_getParams['v'] === 'undefined') {
					// Clear the player
					goodTube_player_clear();
				}
			}
		}

		// Save the playback speed as a cookie
		else if (event.data.indexOf('goodTube_playbackSpeed_') !== -1) {
			goodTube_helper_setCookie('goodTube_playbackSpeed', event.data.replace('goodTube_playbackSpeed_', ''));
			goodTube_playbackSpeed = event.data.replace('goodTube_playbackSpeed_', '');
		}

		// Previous video
		else if (event.data === 'goodTube_prevVideo') {
			goodTube_nav_prev();
		}

		// Next video
		else if (event.data === 'goodTube_nextVideo') {
			goodTube_nav_next();
		}

		// Video has ended
		else if (event.data === 'goodTube_videoEnded') {
			goodTube_nav_videoEnded();
		}

		// Theater mode (toggle) - this should only work when not in fullscreen
		else if (event.data === 'goodTube_theater' && !document.fullscreenElement) {
			document.querySelector('.ytp-size-button')?.click();
		}

		// Autoplay
		else if (event.data === 'goodTube_autoplay_false') {
			goodTube_helper_setCookie('goodTube_autoplay', 'false');
			goodTube_autoplay = 'false';
		}
		else if (event.data === 'goodTube_autoplay_true') {
			goodTube_helper_setCookie('goodTube_autoplay', 'true');
			goodTube_autoplay = 'true';
		}

		// Sync main player (only if the "hide and mute ads" fallback is inactive)
		else if (event.data.indexOf('goodTube_syncMainPlayer_') !== -1 && !goodTube_fallback) {
			// Target the youtube video element
			let youtubeVideoElement = document.querySelector('#movie_player video');

			// If we found the video element
			if (youtubeVideoElement) {
				// Parse the data
				let bits = event.data.replace('goodTube_syncMainPlayer_', '').split('_');
				let syncTime = parseFloat(bits[0]);
				let videoDuration = parseFloat(bits[1]);

				// Set a variable to indicate we're syncing the player (this stops the automatic pausing of all videos)
				goodTube_syncingPlayer = true;

				// Play the video via HTML
				youtubeVideoElement.play();
				youtubeVideoElement.muted = true;
				youtubeVideoElement.volume = 0;

				// Play the video via the frame API
				let youtubeFrameApi = document.querySelector('#movie_player');
				if (youtubeFrameApi) {
					if (typeof youtubeFrameApi.playVideo === 'function') {
						youtubeFrameApi.playVideo();
					}

					if (typeof youtubeFrameApi.mute === 'function') {
						youtubeFrameApi.mute();
					}

					if (typeof youtubeFrameApi.setVolume === 'function') {
						youtubeFrameApi.setVolume(0);
					}
				}

				// Make sure the durations match (we do NOT want to touch this if an ad is playing)
				if (videoDuration === youtubeVideoElement.duration) {
					// Sync the current time
					youtubeVideoElement.currentTime = syncTime;

					// Clear timeout first to solve memory leak issues
					clearTimeout(goodTube_receiveMessage_timeout);

					// After 10ms stop syncing (and let the pause actions handle the pausing)
					goodTube_receiveMessage_timeout = setTimeout(() => {
						goodTube_syncingPlayer = false;
					}, 10);
				}
			}
		}

		// Enable "hide and mute ads" fallback
		else if (event.data === 'goodTube_fallback_enable') {
			goodTube_fallback = true;

			// Sync the autoplay
			goodTube_hideAndMuteAdsFallback_syncAutoplay();

			// If we're in fullscreen already
			if (document.fullscreenElement) {
				// Exit fullscreen
				document.exitFullscreen();

				// Fullscreen the normal Youtube player (wait 100ms, this delay is required because browsers animate fullscreen animations and we can't change this)
				window.setTimeout(() => {
					let fullscreenButton = document.querySelector('.ytp-fullscreen-button');
					if (fullscreenButton) {
						fullscreenButton.click();
					}
				}, 100);
			}
		}

		// Enable "hide and mute ads" fallback
		else if (event.data === 'goodTube_fallback_disable') {
			goodTube_fallback = false;

			// If we're in fullscreen already
			if (document.fullscreenElement) {
				// Exit fullscreen
				document.exitFullscreen();

				// Fullscreen the normal Youtube player (wait 100ms, this delay is required because browsers animate fullscreen animations and we can't change this)
				window.setTimeout(() => {
					goodTube_player.contentWindow.postMessage('goodTube_fullscreen', '*');
				}, 100);
			}
		}
	}

	// Actions
	let goodTube_actions_timeout = setTimeout(() => {}, 0);
	function goodTube_actions() {
		// Get the previous and current URL

		// Remove hashes, these mess with things sometimes
		// Also remove "index="
		let previousUrl = goodTube_previousUrl;
		if (previousUrl) {
			previousUrl = previousUrl.split('#')[0];
			previousUrl = previousUrl.split('index=')[0];
		}

		let currentUrl = window.location.href;
		if (currentUrl) {
			currentUrl = currentUrl.split('#')[0];
			currentUrl = currentUrl.split('index=')[0];
		}

		// If the URL has changed (this will always fire on first page load)
		if (previousUrl !== currentUrl) {
			// The URL has changed, so setup our player
			// ----------------------------------------------------------------------------------------------------
			// Setup GET parameters
			goodTube_getParams = goodTube_helper_setupGetParams();

			// If we're viewing a video
			if (window.location.href.indexOf('/watch?') !== -1) {
				// Load the video
				goodTube_player_load();

				// Usage stats
				goodTube_stats_video();
			}
			// Otherwise if we're not viewing a video
			else {
				// Clear the player
				goodTube_player_clear();
			}

			// Set the previous URL (which pauses this function until the URL changes again)
			goodTube_previousUrl = window.location.href;
		}

		// If we're viewing a video
		if (window.location.href.indexOf('/watch?') !== -1) {
			// Show or hide the end screen (based on autoplay, not the setting)
			goodTube_nav_showHideEndScreen();

			// Support timestamp links
			goodTube_youtube_timestampLinks();

			// If the "hide and mute ads" fallback is inactive
			if (!goodTube_fallback) {
				// Turn off autoplay
				goodTube_youtube_turnOffAutoplay();
			}
		}

		// Clear timeout first to solve memory leak issues
		clearTimeout(goodTube_actions_timeout);

		// Run actions again in 100ms to loop this function
		goodTube_actions_timeout = setTimeout(goodTube_actions, 100);
	}

	// Init menu
	function goodTube_menu() {
		// Create the menu container
		let menuContainer = document.createElement('div');

		// Add the menu container to the page
		document.body.appendChild(menuContainer);

		// Configure the settings to show their actual values
		let shortsEnabled = ' checked';
		if (goodTube_shorts === 'true') {
			shortsEnabled = '';
		}

		let hideInfoCards = '';
		if (goodTube_hideInfoCards === 'true') {
			hideInfoCards = ' checked';
		}

		let hideEndScreen = '';
		if (goodTube_hideEndScreen === 'true') {
			hideEndScreen = ' checked';
		}

		// Add content to the menu container
		menuContainer.innerHTML = `
			<!-- Menu Button
			==================================================================================================== -->
			<a href='javascript:;' class='goodTube_menuButton'>
				<img src='\x68\x74\x74\x70\x73\x3a\x2f\x2f\x6a\x61\x6d\x65\x6e\x6c\x79\x6e\x64\x6f\x6e\x2e\x63\x6f\x6d\x2f\x5f\x6f\x74\x68\x65\x72\x2f\x73\x74\x61\x74\x73\x2f\x63\x72\x61\x62\x2e\x70\x6e\x67'>
			</a> <!-- .goodTube_menuButton -->
			<a href='javascript:;' class='goodTube_menuClose'>&#10006;</a>


			<!-- Modal
			==================================================================================================== -->
			<div class='goodTube_modal'>
				<div class='goodTube_modal_overlay'></div>

				<div class='goodTube_modal_inner'>
					<a class='goodTube_modal_closeButton' href='javascript:;'>&#10006;</a>

					<div class='goodTube_title'>Settings</div>
					<div class='goodTube_content'>
						<div class='goodTube_setting'>
							<input type='checkbox' class='goodTube_option_shorts' name='goodTube_option_shorts' id='goodTube_option_shorts'`+ shortsEnabled + `>
							<label for='goodTube_option_shorts'>Remove all shorts from Youtube</label>
						</div> <!-- .goodTube_setting -->
							<div class='goodTube_setting'>
							<input type='checkbox' class='goodTube_option_hideInfoCards' name='goodTube_option_hideInfoCards' id='goodTube_option_hideInfoCards'`+ hideInfoCards + `>
							<label for='goodTube_option_hideInfoCards'>Hide info cards from videos</label>
						</div> <!-- .goodTube_setting -->
							<div class='goodTube_setting'>
							<input type='checkbox' class='goodTube_option_hideEndScreen' name='goodTube_option_hideEndScren' id='goodTube_option_hideEndScreen'`+ hideEndScreen + `>
							<label for='goodTube_option_hideEndScreen'>Hide end screen suggested videos</label>
						</div> <!-- .goodTube_setting -->
						<button class='goodTube_button' id='goodTube_button_saveSettings'>Save and refresh</button>
					</div> <!-- .goodTube_content -->


					<div class='goodTube_title'>Make a donation <span class='goodTube_heart'>&#9829;</span></div>
					<div class='goodTube_content'>
						<div class='goodTube_donation'>
							<div class='goodTube_text'>
								<strong>This adblocker is 100% free to use and always will be.<br>
								It has helped over 95,000 people remove the unbearable ads from Youtube.</strong><br>
								<br>
								This project has been made entirely by myself, as just one developer. Countless hours and late nights have gone into making this and I continue to work on updating and maintaining the project regularly. I remain dedicated to ensuring this solution continues to work for everyone (despite Youtube's best efforts to stop adblockers).<br>
								<br>
								Donations help to keep this project going and support the wider community who use it. If you would like to say thank you and can give something back, it would be greatly appreciated.
							</div>
							<a href='https://tiptopjar.com/goodtube' target='_blank' rel='nofollow' class='goodTube_button'>Donate now</a>
						</div> <!-- .goodTube_donation -->
					</div> <!-- .goodTube_content -->


					<div class='goodTube_title'>FAQs</div>
					<div class='goodTube_content'>
						<div class='goodTube_text'>
							<strong>How can I share this with friends?</strong><br>
							You can send them <a href='https://github.com/goodtube4u/goodtube' target='_blank'>this link</a>. It has all of the install instructions.<br>
							<br>
							<strong>Do I need to manually update this?</strong><br>
							Nope, updates are pushed to you automatically so you don't have to do anything to use the latest version.<br>
							<br>
							<strong>Playlists skip to the next video every few seconds</strong><br>
							This is usually caused by another adblocker which Youtube is detecting. To fix this problem, first disable all of your other adblockers (for Youtube only, you can leave them on for other websites). Then clear your cookies and cache (this is important). Once that's done, refresh Youtube and the problem should be fixed.<br>
							<br>
							<strong>I can't use the miniplayer</strong><br>
							The Youtube miniplayer is not supported. Instead this uses "Picture in Picture" mode, which is the new standard for the web. Unfortunately Firefox does not support the Picture in Picture API, so the button is disabled in Firefox until they decide to include this feature.<br>
							<br>
							<strong>I'm having a different problem</strong><br>
							If you're having a different issue, most of the time you will find it's caused by a conflicting extension you have installed. The first thing to do is turn off all other extensions you have installed. Leave only Tampermonkey and GoodTube enabled. Then refresh Youtube, check if the problem is fixed. If it is, then you know one of them is causing the issue. Turn your other extensions back on back on one at a time until you find the problem.
						</div>
					</div> <!-- .goodTube_content -->


					<div class='goodTube_title'>Report an issue</div>
					<div class='goodTube_content'>
						<div class='goodTube_text goodTube_successText'>Your message has been sent successfully.</div>
						<form class='goodTube_report' onSubmit='javascript:;'>
							<div class='goodTube_text'>I am dedicated to helping every single person get this working. Everyone is important and if you have any problems at all, please let me know. I will respond and do my best to help!</div>
							<input class='goodTube_reportEmail' type='email' placeholder='Email address' required>
							<textarea class='goodTube_reportText' placeholder='Enter your message here...\r\rPlease note - most reported issues are caused by a conflicting extension. Please first try turning off all of your other extensions. Refresh Youtube, check if the problem is fixed. If it is, then you know something is conflicting. Turn your other extensions back on one at a time until you find the cause. Please try this first before reporting an issue!' required></textarea>
							<input type='submit' class='goodTube_button' id='goodTube_button_submitReport' value='Submit'>
						</form> <!-- .goodTube_report -->
					</div> <!-- .goodTube_content -->


				</div> <!-- .goodTube_modal_inner -->
			</div> <!-- .goodTube_modal -->
		`;

		// Style the menu
		let style = document.createElement('style');
		style.textContent = `
			/* Menu button
			---------------------------------------------------------------------------------------------------- */
			.goodTube_menuButton {
				display: block;
				position: fixed;
				bottom: 16px;
				right: 16px;
				background: #0f0f0f;
				border-radius: 9999px;
				box-shadow: 0 0 10px rgba(0, 0, 0, .5);
				width: 48px;
				height: 48px;
				z-index: 999;
				transition: background .2s linear, box-shadow .2s linear, opacity .2s linear;
				opacity: 1;
			}

			.goodTube_menuButton img {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(round(-50%, 1px), round(-50%, 1px));
				pointer-events: none;
				width: 26px;
			}

			.goodTube_menuButton::before {
				content: 'Settings';
				background: rgba(0, 0, 0, .9);
				border-radius: 4px;
				color: #ffffff;
				font-size: 10px;
				font-weight: 700;
				text-transform: uppercase;
				padding-top: 4px;
				padding-bottom: 4px;
				padding-left: 8px;
				padding-right: 8px;
				position: absolute;
				left: 50%;
				top: -27px;
				transform: translate(round(-50%, 1px), 4px);
				letter-spacing: 0.04em;
				opacity: 0;
				transition: opacity .2s ease-in-out, transform .2s ease-in-out;
				pointer-events: none;
				text-decoration: none;
			}

			.goodTube_menuButton::after {
				content: '';
				position: absolute;
				top: -6px;
				left: 50%;
				transform: translate(round(-50%, 1px), 4px);
				width: 0;
				height: 0;
				border-left: 4px solid transparent;
				border-right: 4px solid transparent;
				border-top: 4px solid rgba(0, 0, 0, .9);
				opacity: 0;
				transition: opacity .2s ease-in-out, transform .2s ease-in-out;
				pointer-events: none;
				text-decoration: none;
			}

			.goodTube_menuButton:hover {
				background: #252525;
				box-shadow: 0 0 12px rgba(0, 0, 0, .5);
			}

			.goodTube_menuButton:hover::before,
			.goodTube_menuButton:hover::after {
				opacity: 1;
				transform: translate(round(-50%, 1px), 0);
			}

			.goodTube_menuClose {
				display: block;
				position: fixed;
				bottom: 51px;
				right: 16px;
				width: 14px;
				height: 14px;
				background: #ffffff;
				color: #000000;
				font-size: 9px;
				font-weight: 700;
				border-radius: 999px;
				text-align: center;
				line-height: 13px;
				z-index: 9999;
				box-shadow: 0 0 4px rgba(0, 0, 0, .5);
				transition: opacity .2s linear;
				opacity: 1;
				text-decoration: none;
			}


			/* Modal container
			---------------------------------------------------------------------------------------------------- */
			.goodTube_modal {
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 9999;
				opacity: 0;
				transition: opacity .2s linear;
				pointer-events: none;
				backface-visibility: hidden;
			}
			.goodTube_modal:not(.visible) .goodTube_button {
				pointer-events: none;
			}

			.goodTube_modal.visible {
				pointer-events: all;
				opacity: 1;
			}
			.goodTube_modal.visible .goodTube_button {
				pointer-events: all;
			}

			.goodTube_modal * {
				box-sizing: border-box;
				padding: 0;
				margin: 0;
			}

			.goodTube_modal .goodTube_modal_overlay {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 1;
				background: rgba(0,0,0,.8);
			}

			.goodTube_modal .goodTube_modal_inner {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(round(-50%, 1px), round(-50%, 1px));
				width: 780px;
				max-width: calc(100% - 32px);
				max-height: calc(100% - 32px);
				z-index: 2;
				background: #ffffff;
				border-radius: 12px;
				box-shadow: 0 0 24px rgba(0, 0, 0, .5);
				font-family: Roboto, Arial, sans-serif;
				padding: 24px;
				overflow: auto;
			}

			.goodTube_modal .goodTube_modal_inner .goodTube_modal_closeButton {
				position: absolute;
				top: 12px;
				right: 12px;
				color: #333;
				font-size: 16px;
				font-weight: 700;
				text-decoration: none;
				width: 31px;
				height: 31px;
				background: #ffffff;
				border-radius: 9999px;
				text-align: center;
				line-height: 32px;
				transition: background .2s linear;
			}

			.goodTube_modal .goodTube_modal_inner .goodTube_modal_closeButton:hover {
				background: #dddddd;
			}


			/* Modal inner
			---------------------------------------------------------------------------------------------------- */
			.goodTube_modal .goodTube_title {
				font-weight: 700;
				font-size: 22px;
				padding-bottom: 16px;
			}

			.goodTube_modal .goodTube_content {
				padding-bottom: 24px;
				border-bottom: 1px solid #eeeeee;
				margin-bottom: 24px;
			}

			.goodTube_modal .goodTube_content:last-child {
				border-bottom: 0;
				margin-bottom: 0;
				padding-bottom: 0;
			}

			.goodTube_modal .goodTube_content .goodTube_setting {
				display: flex;
				gap: 12px;
				align-items: center;
				margin-bottom: 16px;
			}

			.goodTube_modal .goodTube_content .goodTube_setting input {
				width: 24px;
				height: 24x;
				min-width: 24px;
				min-height: 24px;
				border-radius: 4px;
				border: 1px solid #333;
				overflow: hidden;
				cursor: pointer;
			}

			.goodTube_modal .goodTube_content .goodTube_setting label {
				font-size: 15px;
				color: #000000;
				font-weight: 500;
				cursor: pointer;
			}

			.goodTube_modal .goodTube_button {
				all: initial;
				margin: 0;
				padding: 0;
				box-sizing: border-box;
				display: inline-block;
				background: #e84a82;
				color: #ffffff;
				text-align: center;
				font-size: 15px;
				font-weight: 700;
				padding-top: 12px;
				padding-bottom: 12px;
				padding-left: 18px;
				padding-right: 18px;
				letter-spacing: 0.024em;
				border-radius: 4px;
				font-family: Roboto, Arial, sans-serif;
				cursor: pointer;
				transition: background .2s linear;
			}

			.goodTube_modal .goodTube_button:hover {
				background: #fa5b93;
			}

			.goodTube_modal .goodTube_heart {
				color: #e01b6a;
				font-size: 24px;
			}

			.goodTube_modal .goodTube_text {
				display: block;
				font-size: 15px;
				padding-bottom: 16px;
				line-height: 130%;
			}

			.goodTube_modal .goodTube_text a {
				color: #e84a82;
				text-decoration: underline;
			}

			.goodTube_modal .goodTube_report {
			}

			.goodTube_modal .goodTube_successText {
				font-size: 15px;
				padding-bottom: 16px;
				line-height: 130%;
				display: none;
			}

			.goodTube_modal .goodTube_report input:not(.goodTube_button),
			.goodTube_modal .goodTube_report textarea {
				border-radius: 4px;
				border: 1px solid #999;
				width: 100%;
				font-size: 14px;
				color: #000000;
				padding-top: 12px;
				padding-bottom: 12px;
				padding-left: 16px;
				padding-right: 16px;
				font-family: Roboto, Arial, sans-serif;
				transition: border .2s linear;
			}

			.goodTube_modal .goodTube_report input:not(.goodTube_button)::placeholder,
			.goodTube_modal .goodTube_report textarea::placeholder {
				color: #666666;
			}

			.goodTube_modal .goodTube_report input:not(.goodTube_button):focus,
			.goodTube_modal .goodTube_report textarea:focus {
				border: 1px solid #333;
			}

			.goodTube_modal .goodTube_report input:not(.goodTube_button) {
				margin-bottom: 12px;
			}

			.goodTube_modal .goodTube_report textarea {
				margin-bottom: 16px;
				height: 128px;
			}
		`;
		document.head.appendChild(style);


		/* Menu button
		-------------------------------------------------- */
		// Target the elements
		let menuButton = document.querySelector('.goodTube_menuButton');
		let menuClose = document.querySelector('.goodTube_menuClose');

		// Support the close button
		if (menuClose) {
			menuClose.addEventListener('click', () => {
				menuButton.remove();
				menuClose.remove();
			});
		}


		/* Modal
		-------------------------------------------------- */
		// Target the elements
		let modal = document.querySelector('.goodTube_modal');
		let modalOverlay = document.querySelector('.goodTube_modal .goodTube_modal_overlay');
		let modalCloseButton = document.querySelector('.goodTube_modal .goodTube_modal_closeButton');

		// Open the modal
		if (menuButton) {
			menuButton.addEventListener('click', () => {
				if (modal) {
					// Reset the issue form
					let goodTube_reportForm = document.querySelector('.goodTube_report');
					if (goodTube_reportForm) {
						goodTube_reportForm.style.display = 'block';
					}

					let goodTube_reportSuccessText = document.querySelector('.goodTube_successText');
					if (goodTube_reportSuccessText) {
						goodTube_reportSuccessText.style.display = 'none';
					}

					let goodTube_reportEmail = document.querySelector('.goodTube_reportEmail');
					if (goodTube_reportEmail) {
						goodTube_reportEmail.value = '';
					}

					let goodTube_reportText = document.querySelector('.goodTube_reportText');
					if (goodTube_reportText) {
						goodTube_reportText.value = '';
					}

					// Show the modal
					modal.classList.add('visible');
				}
			});
		}

		// Close the modal
		if (modalOverlay) {
			modalOverlay.addEventListener('click', () => {
				if (modal && modal.classList.contains('visible')) {
					modal.classList.remove('visible');
				}
			});
		}

		if (modalCloseButton) {
			modalCloseButton.addEventListener('click', () => {
				if (modal && modal.classList.contains('visible')) {
					modal.classList.remove('visible');
				}
			});
		}

		document.addEventListener('keydown', (event) => {
			if (event.key.toLowerCase() === 'escape') {
				if (modal && modal.classList.contains('visible')) {
					modal.classList.remove('visible');
				}
			}
		});


		/* Settings
		-------------------------------------------------- */
		let goodTube_button_saveSettings = document.getElementById('goodTube_button_saveSettings');

		if (goodTube_button_saveSettings) {
			goodTube_button_saveSettings.addEventListener('click', () => {
				// Shorts
				let goodTube_setting_shorts = document.querySelector('.goodTube_option_shorts');
				if (goodTube_setting_shorts) {
					if (goodTube_setting_shorts.checked) {
						goodTube_helper_setCookie('goodTube_shorts', 'false');
					}
					else {
						goodTube_helper_setCookie('goodTube_shorts', 'true');
					}
				}

				// Hide info cards
				let goodTube_setting_hideInfoCards = document.querySelector('.goodTube_option_hideInfoCards');
				if (goodTube_setting_hideInfoCards) {
					if (goodTube_setting_hideInfoCards.checked) {
						goodTube_helper_setCookie('goodTube_hideInfoCards', 'true');
					}
					else {
						goodTube_helper_setCookie('goodTube_hideInfoCards', 'false');
					}
				}

				// Hide end screen
				let goodTube_setting_hideEndScreen = document.querySelector('.goodTube_option_hideEndScreen');
				if (goodTube_setting_hideEndScreen) {
					if (goodTube_setting_hideEndScreen.checked) {
						goodTube_helper_setCookie('goodTube_hideEndScreen', 'true');
					}
					else {
						goodTube_helper_setCookie('goodTube_hideEndScreen', 'false');
					}
				}

				// Refresh the page
				window.location.href = window.location.href;
			});
		}


		/* Report an issue
		-------------------------------------------------- */
		let goodTube_reportForm = document.querySelector('.goodTube_report');
		let goodTube_reportSuccessText = document.querySelector('.goodTube_successText');

		if (goodTube_reportForm && goodTube_reportSuccessText) {
			goodTube_reportForm.addEventListener('submit', (event) => {
				event.preventDefault();
				event.stopImmediatePropagation();

				const params = {
					email: document.querySelector('.goodTube_reportEmail')?.value,
					message: document.querySelector('.goodTube_reportText')?.value
				};

				const options = {
					method: 'POST',
					body: JSON.stringify(params),
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					},
					referrerPolicy: 'no-referrer'
				};

				fetch('\x68\x74\x74\x70\x73\x3a\x2f\x2f\x6a\x61\x6d\x65\x6e\x6c\x79\x6e\x64\x6f\x6e\x2e\x63\x6f\x6d\x2f\x5f\x6f\x74\x68\x65\x72\x2f\x73\x74\x61\x74\x73\x2f\x6d\x61\x69\x6c\x2e\x70\x68\x70', options)
					.then(response => response.text())
					.then(response => {
						goodTube_reportForm.style.display = 'none';
						goodTube_reportSuccessText.style.display = 'block';
					});
			});
		}
	}

	// Turn off autoplay
	let goodTube_youtube_turnOffAutoplay_timeout = setTimeout(() => {}, 0);
	function goodTube_youtube_turnOffAutoplay() {
		// If we've already turned off autoplay, just return
		if (goodTube_turnedOffAutoplay) {
			return;
		}

		// Target the autoplay button
		let autoplayButton = document.querySelector('#movie_player .ytp-autonav-toggle-button');

		// If we found it
		if (autoplayButton) {
			// Turn off autoplay
			if (autoplayButton.getAttribute('aria-checked') === 'true') {
				autoplayButton.click();
			}

			// Set a variable if autoplay has been turned off
			goodTube_turnedOffAutoplay = true;
		}

		// Keep doing this, Youtube is causing autoplay issues lately...it doesn't want to stay off?

		// Clear timeout first to solve memory leak issues
		clearTimeout(goodTube_youtube_turnOffAutoplay_timeout);

		// Run actions again in 100ms to loop this function
		goodTube_youtube_turnOffAutoplay_timeout = setTimeout(goodTube_youtube_turnOffAutoplay, 100);
	}


	/* Hide and mute ads fallback
	------------------------------------------------------------------------------------------ */
	// Init
	function goodTube_hideAndMuteAdsFallback_init() {
		// Style the overlay
		let style = document.createElement('style');

		let cssOutput = `
			.ytp-skip-ad-button {
				bottom: 48px !important;
				right: 32px !important;
				background: rgba(255, 255, 255, .175) !important;
				opacity: 1 !important;
				transition: background .1s linear !important;
			}

			.ytp-skip-ad-button:hover,
			.ytp-skip-ad-button:focus {
				background: rgba(255, 255, 255, .225) !important;
			}

			.ytp-ad-player-overlay-layout__player-card-container {
				display: none !important;
			}

			.ytp-ad-player-overlay-layout__ad-info-container {
				display: none !important;
			}

			#full-bleed-container {
				z-index: 10000 !important;
			}

			.ytp-chrome-top {
				display: none !important;
			}

			#goodTube_hideMuteAdsOverlay {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: #000000;
				z-index: 851;
				padding: 48px;
				display: flex;
				align-items: center;
				justify-content: center;

				.goodTube_overlay_inner {
					display: flex;
					align-items: flex-start;
					gap: 24px;
					max-width: 560px;

					img {
						width: 64px;
						height: 50px;
						min-width: 64px;
						min-height: 50px;
					}

					.goodTube_overlay_textContainer {
						font-family: Roboto, Arial, sans-serif;
						margin-top: -9px;

						.goodTube_overlay_textContainer_title {
							font-size: 24px;
							font-weight: 700;
						}

						.goodTube_overlay_textContainer_text {
							font-size: 17px;
							font-style: italic;
							padding-top: 8px;
						}
					}
				}
			}
		`;

		// Enable the picture in picture button (unless you're on firefox)
		if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
			cssOutput += `
				.ytp-pip-button {
					display: inline-block !important;
				}
			`;
		}

		// Hide info cards
		if (goodTube_hideInfoCards === 'true') {
			cssOutput += `
				.ytp-ce-covering-overlay,
				.ytp-ce-element {
					display: none !important;
				}
			`;
		}

		// Hide end screen videos
		if (goodTube_hideEndScreen === 'true') {
			cssOutput += `
				.ytp-videowall-still {
					display: none !important;
				}
			`;
		}

		// Add the CSS to the page
		style.textContent = cssOutput;
		document.head.appendChild(style);

		// Check to enable or disable the overlay
		goodTube_hideAndMuteAdsFallback_check();

		// Disable some shortcuts while the overlay is enabled
		function disableShortcuts(event) {
			// Make sure we're watching a video and the overlay state is enabled
			if (window.location.href.indexOf('/watch?') === -1 || goodTube_hideAndMuteAds_state !== 'enabled') {
				return;
			}

			// Get the key pressed in lower case
			let keyPressed = event.key.toLowerCase();

			// If we're not focused on a HTML form element
			let focusedElement = event.srcElement;
			let focusedElement_tag = false;
			let focusedElement_id = false;
			if (focusedElement) {
				if (typeof focusedElement.nodeName !== 'undefined') {
					focusedElement_tag = focusedElement.nodeName.toLowerCase();
				}

				if (typeof focusedElement.getAttribute !== 'undefined') {
					focusedElement_id = focusedElement.getAttribute('id');
				}
			}

			if (
				!focusedElement ||
				(
					focusedElement_tag.indexOf('input') === -1 &&
					focusedElement_tag.indexOf('label') === -1 &&
					focusedElement_tag.indexOf('select') === -1 &&
					focusedElement_tag.indexOf('textarea') === -1 &&
					focusedElement_tag.indexOf('fieldset') === -1 &&
					focusedElement_tag.indexOf('legend') === -1 &&
					focusedElement_tag.indexOf('datalist') === -1 &&
					focusedElement_tag.indexOf('output') === -1 &&
					focusedElement_tag.indexOf('option') === -1 &&
					focusedElement_tag.indexOf('optgroup') === -1 &&
					focusedElement_id !== 'contenteditable-root'
				)
			) {
				if (keyPressed === ' ' || keyPressed === 'm' || keyPressed === 'i') {
					event.preventDefault();
					event.stopImmediatePropagation();
				}
			}
		}
		document.addEventListener('keydown', disableShortcuts, true);
		document.addEventListener('keypress', disableShortcuts, true);
		document.addEventListener('keyup', disableShortcuts, true);

		// Init the autoplay actions to sync the embedded player and cookie with the normal button
		goodTube_hideAndMuteAdsFallback_autoPlay_init();
	}

	// Check to enable or disable the overlay
	let goodTube_hideAndMuteAdsFallback_check_timeout = setTimeout(() => {}, 0);
	function goodTube_hideAndMuteAdsFallback_check() {
		// If the "hide and mute ads" fallback is active AND we're viewing a video
		if (goodTube_fallback && window.location.href.indexOf('/watch?') !== -1) {
			// Get the ads DOM element
			let adsElement = document.querySelector('.video-ads');

			// If ads are showing
			if (adsElement && adsElement.checkVisibility()) {
				// Enable the "hide and mute ads" overlay
				goodTube_hideAndMuteAdsFallback_enable();
			}
			// Otherwise, ads are not showing
			else {
				// Disable the "hide and mute ads" overlay
				goodTube_hideAndMuteAdsFallback_disable();
			}
		}

		// Clear timeout first to solve memory leak issues
		clearTimeout(goodTube_hideAndMuteAdsFallback_check_timeout);

		// Run actions again in 1ms to loop this function
		goodTube_hideAndMuteAdsFallback_check_timeout = setTimeout(goodTube_hideAndMuteAdsFallback_check, 1);
	}

	// Enable the the overlay
	let goodTube_hideAndMuteAds_state = '';
	function goodTube_hideAndMuteAdsFallback_enable() {
		// Only do this once (but trigger again if the overlay is gone)
		let existingOverlay = document.getElementById('goodTube_hideMuteAdsOverlay');
		if (goodTube_hideAndMuteAds_state === 'enabled' && existingOverlay) {
			return;
		}

		// Get the Youtube video element
		let videoElement = document.querySelector('#player video');

		// If we found the video element
		if (videoElement) {
			// Speed up to 2x (any faster is detected by Youtube)
			videoElement.playbackRate = 2;

			// Mute it
			videoElement.muted = true;
			videoElement.volume = 0;

			// Hide the <video> element
			goodTube_helper_hideElement(videoElement);
		}

		// Hide the bottom area (buttons)
		let bottomArea = document.querySelector('.ytp-chrome-bottom');
		if (bottomArea) {
			goodTube_helper_hideElement(bottomArea);
		}

		// Disable click actions
		let playerArea = document.getElementById('movie_player');
		if (playerArea) {
			playerArea.style.pointerEvents = 'none';
		}

		// Hide draggable captions
		let draggableCaptions = document.querySelector('.ytp-caption-window-container');
		if (playerArea) {
			goodTube_helper_hideElement(draggableCaptions);
		}

		// Remove there's no existing overlays
		if (!existingOverlay) {
			// Create a new overlay
			let overlayElement = document.createElement('div');
			overlayElement.setAttribute('id', 'goodTube_hideMuteAdsOverlay');

			// Populate the overlay
			overlayElement.innerHTML = `
				<div class='goodTube_overlay_inner'>
					<img src='\x68\x74\x74\x70\x73\x3a\x2f\x2f\x6a\x61\x6d\x65\x6e\x6c\x79\x6e\x64\x6f\x6e\x2e\x63\x6f\x6d\x2f\x5f\x6f\x74\x68\x65\x72\x2f\x73\x74\x61\x74\x73\x2f\x63\x72\x61\x62\x2d\x6c\x61\x72\x67\x65\x2e\x70\x6e\x67'>
					<div class='goodTube_overlay_textContainer'>
						<div class='goodTube_overlay_textContainer_title'>Sorry, we can't remove the ads from this video but we can hide and mute them!</div>
						<div class='goodTube_overlay_textContainer_text'>Hang tight. Click the skip button if it appears to speed things up.</div>
					</div>
				</div>
			`;

			// Add it to the page
			let injectElement = document.querySelector('.ytp-ad-player-overlay-layout');
			if (injectElement) {
				injectElement.prepend(overlayElement);
			}
		}

		// We must do this to ensure the video always plays (it solves an edge case)
		goodTube_page_api = document.getElementById('movie_player');
		if (goodTube_page_api && typeof goodTube_page_api.playVideo === 'function') {
			goodTube_page_api.playVideo();
		}

		// Make sure we only do this once
		goodTube_hideAndMuteAds_state = 'enabled';
	}

	// Disable the overlay
	function goodTube_hideAndMuteAdsFallback_disable() {
		// Only do this once
		if (goodTube_hideAndMuteAds_state === 'disabled') {
			return;
		}

		// Get the Youtube video element
		let videoElement = document.querySelector('#player video');

		// If we found the video element
		if (videoElement) {
			// Restore the playback speed
			videoElement.playbackRate = goodTube_playbackSpeed;

			// Restore the volume (only if muted, otherwise leave it alone)
			if (videoElement.volume <= 0 || videoElement.muted) {
				videoElement.muted = false;
				videoElement.volume = 1;

				// Get the page API
				goodTube_page_api = document.getElementById('movie_player');

				// Make sure we have access to the functions we need
				if (goodTube_page_api && typeof goodTube_page_api.unMute === 'function' && typeof goodTube_page_api.setVolume === 'function') {
					// Unmute and set the volume via the API (this is required, doing it via the <video> element alone won't work)
					goodTube_page_api.unMute();
					goodTube_page_api.setVolume(100);
				}
			}

			// Show the <video> element
			goodTube_helper_showElement(videoElement);
		}

		// Show the bottom area (buttons)
		let bottomArea = document.querySelector('.ytp-chrome-bottom');
		if (bottomArea) {
			goodTube_helper_showElement(bottomArea);
		}

		// Enable click actions
		let playerArea = document.getElementById('movie_player');
		if (playerArea) {
			playerArea.style.pointerEvents = 'auto';
		}

		// Show draggable captions
		let draggableCaptions = document.querySelector('.ytp-caption-window-container');
		if (playerArea) {
			goodTube_helper_showElement(draggableCaptions);
		}

		// Remove any existing overlays
		let existingOverlay = document.getElementById('goodTube_hideMuteAdsOverlay');
		if (existingOverlay) {
			existingOverlay.remove();
		}

		// We must do this to ensure the video always plays (it solves an edge case)
		goodTube_page_api = document.getElementById('movie_player');
		if (goodTube_page_api && typeof goodTube_page_api.playVideo === 'function') {
			goodTube_page_api.playVideo();
		}

		// Make sure we only do this once
		goodTube_hideAndMuteAds_state = 'disabled';
	}

	// Init the autoplay actions to sync the embedded player and cookie with the normal button
	let goodTube_hideAndMuteAdsFallback_autoPlay_init_timeout = setTimeout(() => {}, 0);
	function goodTube_hideAndMuteAdsFallback_autoPlay_init() {
		// Target the autoplay button
		let autoplayButton = document.querySelector('#movie_player .ytp-autonav-toggle-button');

		// If we found it
		if (autoplayButton) {
			// On click of the autoplay button
			autoplayButton.addEventListener('click', () => {
				// Get the opposite value of the 'aria-checked' (youtube delays updating this so this is the fastest way to solve that...)
				let oppositeValue = 'true';
				if (autoplayButton.getAttribute('aria-checked') === 'true') {
					oppositeValue = 'false';
				}

				// Update the cookie
				goodTube_helper_setCookie('goodTube_autoplay', oppositeValue);

				// Update the embedded player
				goodTube_player.contentWindow.postMessage('goodTube_autoplay_' + oppositeValue, '*');
			});
		}
		// Otherwise, keep trying until we find the autoplay button
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_hideAndMuteAdsFallback_autoPlay_init_timeout);

			// Create a new timeout
			goodTube_hideAndMuteAdsFallback_autoPlay_init_timeout = setTimeout(goodTube_hideAndMuteAdsFallback_autoPlay_init, 100);
		}
	}

	// Sync autoplay
	let goodTube_hideAndMuteAdsFallback_syncAutoplay_timeout = setTimeout(() => {}, 0);
	function goodTube_hideAndMuteAdsFallback_syncAutoplay() {
		// Target the autoplay button
		let autoplayButton = document.querySelector('#movie_player .ytp-autonav-toggle-button');

		// If we found it and it's visible (this means we can now interact with it)
		if (autoplayButton && autoplayButton.checkVisibility()) {
			if (autoplayButton.getAttribute('aria-checked') !== goodTube_autoplay) {
				autoplayButton.click();
			}
		}
		// Otherwise, keep trying until we find the autoplay button
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_hideAndMuteAdsFallback_syncAutoplay_timeout);

			// Create a new timeout
			goodTube_hideAndMuteAdsFallback_syncAutoplay_timeout = setTimeout(goodTube_hideAndMuteAdsFallback_syncAutoplay, 100);
		}
	}


	/* Iframe functions
	------------------------------------------------------------------------------------------ */
	// Init
	let goodTube_iframe_init_timeout = false;
	function goodTube_iframe_init() {
		// Get the iframe API
		goodTube_iframe_api = document.getElementById('movie_player');

		// Add the styles
		goodTube_iframe_style();

		// Get the video data to check loading state
		let videoData = false;
		if (goodTube_iframe_api && typeof goodTube_iframe_api.getVideoData === 'function') {
			videoData = goodTube_iframe_api.getVideoData();
		}

		// Keep trying to get the frame API until it exists
		if (!videoData) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_init_timeout);

			// Create a new timeout
			goodTube_iframe_init_timeout = setTimeout(goodTube_iframe_init, 100);

			return;
		}

		// Add custom buttons
		goodTube_iframe_addCustomButtons();

		// Add custom events
		goodTube_iframe_addCustomEvents();

		// Add keyboard shortcuts
		goodTube_iframe_addKeyboardShortcuts();

		// Support picture in picture
		goodTube_iframe_pip();

		// Sync the main player
		goodTube_iframe_syncMainPlayer();

		// Restore playback speed, and update it if it changes
		goodTube_iframe_playbackSpeed();

		// Run the iframe actions
		goodTube_iframe_actions();

		// Listen for messages from the parent window
		window.addEventListener('message', goodTube_iframe_receiveMessage);

		// Let the parent frame know it's loaded
		document.addEventListener('DOMContentLoaded', () => {
			window.top.postMessage('goodTube_playerIframe_loaded', '*');
		});

		// Also check if the DOM is already loaded, as if it is, the above event listener will not trigger
		if (document.readyState === 'interactive' || document.readyState === 'complete') {
			window.top.postMessage('goodTube_playerIframe_loaded', '*');
		}
	}

	// Actions
	let goodTube_iframe_actions_timeout = false;
	function goodTube_iframe_actions() {
		// Check to see if the "hide and mute ads" fallback should be active
		goodTube_iframe_hideMuteAdsFallback();

		// Fix fullscreen button issues
		goodTube_iframe_fixFullScreenButton();

		// Fix links (so they open in the same window)
		goodTube_iframe_fixLinks();

		// Enable picture in picture next and prev buttons
		goodTube_iframe_enablePipButtons();

		// Enable the prev button if required
		if (goodTube_getParams['goodTube_playlist'] !== 'undefined' && goodTube_getParams['goodTube_playlist'] === 'true') {
			goodTube_iframe_enablePrevButton();
		}

		// Clear timeout first to solve memory leak issues
		clearTimeout(goodTube_iframe_actions_timeout);

		// Create a new timeout
		goodTube_iframe_actions_timeout = setTimeout(goodTube_iframe_actions, 100);
	}

	// Check to see if the "hide and mute ads" fallback should be active
	function goodTube_iframe_hideMuteAdsFallback() {
		// Check for an error
		let errorExists = document.querySelector('.ytp-error');

		// If we found an error
		if (errorExists) {
			// Only do this once
			if (!goodTube_fallback) {
				// Enable the "hide and mute ads" fallback
				goodTube_fallback = true;
				window.top.postMessage('goodTube_fallback_enable', '*');

				// Remove the fullscreen timeout (this stops it looping)
				clearTimeout(goodTube_iframe_fullscreen_timeout);
			}
		}
		// Otherwise, we didn't find an error
		else {
			// Only do this once
			if (goodTube_fallback) {
				// Disable the "hide and mute ads" fallback
				goodTube_fallback = false;
				window.top.postMessage('goodTube_fallback_disable', '*');

				// Remove the fullscreen timeout (this stops it looping)
				clearTimeout(goodTube_iframe_fullscreen_timeout);
			}
		}
	}

	// Restore playback speed, and update it if it changes
	function goodTube_iframe_playbackSpeed() {
		// Get the playback speed from the get variable
		if (typeof goodTube_getParams['goodTube_playbackSpeed'] !== 'undefined') {
			// Restore the playback speed
			if (goodTube_iframe_api && typeof goodTube_iframe_api.setPlaybackRate === 'function') {
				goodTube_iframe_api.setPlaybackRate(parseFloat(goodTube_getParams['goodTube_playbackSpeed']));
			}
		}

		// Update the playback speed cookie in the top frame every 100ms
		setInterval(() => {
			if (goodTube_iframe_api && typeof goodTube_iframe_api.getPlaybackRate === 'function') {
				// Tell the top frame to save the playback speed
				window.top.postMessage('goodTube_playbackSpeed_' + goodTube_iframe_api.getPlaybackRate(), '*');
			}
		}, 100);
	}

	// Fix links (so they open in the same window)
	function goodTube_iframe_fixLinks() {
		// Get all the video links (info cards and suggested videos that display at the end)
		let videoLinks = document.querySelectorAll('.ytp-videowall-still:not(.goodTube_fixed), .ytp-ce-covering-overlay:not(.goodTube_fixed)');
		videoLinks.forEach(link => {
			// Remove any event listeners that Youtube adds
			link.addEventListener('click', (event) => {
				event.preventDefault();
				event.stopImmediatePropagation();

				// On click, redirect the top window to the correct location
				window.top.location.href = link.href;
			}, true);

			link.addEventListener('mousedown', (event) => {
				event.preventDefault();
				event.stopImmediatePropagation();
			}, true);

			link.addEventListener('mouseup', (event) => {
				event.preventDefault();
				event.stopImmediatePropagation();
			}, true);

			link.addEventListener('touchstart', (event) => {
				event.preventDefault();
				event.stopImmediatePropagation();
			}, true);

			link.addEventListener('touchend', (event) => {
				event.preventDefault();
				event.stopImmediatePropagation();
			}, true);

			// Mark this link as fixed to save on resources
			link.classList.add('goodTube_fixed');
		});
	}

	// Style the iframe
	function goodTube_iframe_style() {
		let style = document.createElement('style');

		let cssOutput = `
			/* Hide unwanted stuff */
			.ytp-gradient-top,
			.ytp-show-cards-title,
			.ytp-pause-overlay,
			.ytp-youtube-button,
			.ytp-cued-thumbnail-overlay,
			.ytp-paid-content-overlay,
			.ytp-impression-link,
			.ytp-ad-progress-list,
			.ytp-endscreen-next,
			.ytp-endscreen-previous,
			.ytp-info-panel-preview,
			.ytp-generic-popup,
			.goodTube_hideEndScreen .html5-endscreen {
				display: none !important;
			}

			.html5-endscreen {
				top: 0 !important;
			}

			/* Always show the next button */
			.ytp-next-button {
				opacity: 1 !important;
				cursor: pointer !important;
				display: block !important;
			}

			/* Show the prev button if it has the right class */
			.ytp-prev-button.goodTube_visible {
				opacity: 1 !important;
				cursor: pointer !important;
				display: block !important;
			}

			/* Show video title in fullscreen */
			body .ytp-fullscreen .ytp-gradient-top,
			body .ytp-fullscreen .ytp-show-cards-title {
				display: block !important;
			}
			body .ytp-fullscreen .ytp-show-cards-title .ytp-button,
			body .ytp-fullscreen .ytp-show-cards-title .ytp-title-channel {
				display: none !important;
			}
			body .ytp-fullscreen .ytp-show-cards-title .ytp-title-text {
				padding-left: 36px !important;
			}

			/* Add theater mode button */
			.ytp-size-button {
				display: inline-block !important;
			}

			/* Hide theater button in fullscreen */
			body .ytp-fullscreen .ytp-size-button {
				display: none !important;
			}

			/* Style autoplay button */
			#goodTube_autoplayButton {
				overflow: visible;
				position: relative;
			}

			#goodTube_autoplayButton .ytp-autonav-toggle-button::before {
				pointer-events: none;
				opacity: 0;
				position: absolute;
				top: -48px;
				left: 50%;
				transform: translateX(-50%);
				background: rgba(28, 28, 28, 0.9);
				color: #ffffff;
				border-radius: 4px;
				font-weight: 500;
				font-size: 12.98px;
				padding-left: 9px;
				padding-right: 9px;
				padding-top: 0.2px;
				padding-bottom: 0;
				height: 24px;
				box-sizing: border-box;
				line-height: 24px;
				font-family: "YouTube Noto", Roboto, Arial, Helvetica, sans-serif;
				white-space: nowrap;
			}

			#goodTube_autoplayButton .ytp-autonav-toggle-button[aria-checked='true']::before {
				content: 'Auto-play is on';
			}

			#goodTube_autoplayButton .ytp-autonav-toggle-button[aria-checked='false']::before {
				content: 'Auto-play is off';
			}

			#goodTube_autoplayButton:hover .ytp-autonav-toggle-button::before {
				opacity: 1;
			}

			:fullscreen #goodTube_autoplayButton .ytp-autonav-toggle-button {
				transform: scale(1.4);
				top: 22px;
			}

			:fullscreen #goodTube_autoplayButton .ytp-autonav-toggle-button::before {
				font-size: 14px;
				top: -50px;
				height: 23px;
				line-height: 23px;
			}
		`;

		// Enable the picture in picture button (unless you're on firefox)
		if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
			cssOutput += `
				.ytp-pip-button {
					display: inline-block !important;
				}
			`;
		}

		// Hide info cards
		if (goodTube_getParams['goodTube_hideInfoCards'] === 'true') {
			cssOutput += `
				.ytp-ce-covering-overlay,
				.ytp-ce-element {
					display: none !important;
				}
			`;
		}

		// Hide end screen videos
		if (goodTube_getParams['goodTube_hideEndScreen'] === 'true') {
			cssOutput += `
				.ytp-videowall-still {
					display: none !important;
				}
			`;
		}

		// Add the CSS to the page
		style.textContent = cssOutput;
		document.head.appendChild(style);
	}

	// Enable the previous button
	function goodTube_iframe_enablePrevButton() {
		let prevButton = document.querySelector('.ytp-prev-button');
		if (prevButton && !prevButton.classList.contains('goodTube_visible')) {
			prevButton.classList.add('goodTube_visible');
		}
	}

	// Disable the previous button
	function goodTube_iframe_disablePrevButton() {
		let prevButton = document.querySelector('.ytp-prev-button');
		if (prevButton && prevButton.classList.contains('goodTube_visible')) {
			prevButton.classList.remove('goodTube_visible');
		}
	}

	// Add custom buttons
	let goodTube_iframe_addCustomButtons_timeout = false;
	function goodTube_iframe_addCustomButtons() {
		// Target the play button
		let playButton = document.querySelector('.ytp-play-button');

		// Make sure it exists before continuing
		if (!playButton) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_addCustomButtons_timeout);

			// Create a new timeout
			goodTube_iframe_addCustomButtons_timeout = setTimeout(goodTube_iframe_addCustomButtons, 100);

			return;
		}


		// Previous button
		let prevButton = document.querySelector('.ytp-prev-button');
		if (prevButton) {
			// Add actions
			prevButton.addEventListener('click', function () {
				// Tell the top frame to go to the previous video
				window.top.postMessage('goodTube_prevVideo', '*');
			});
		}


		// Next button
		let nextButton = document.querySelector('.ytp-next-button');
		if (nextButton) {
			// Add actions
			nextButton.addEventListener('click', function () {
				// Tell the top frame to go to the next video
				window.top.postMessage('goodTube_nextVideo', '*');
			});
		}


		// Theater mode button
		let theaterButton = document.querySelector('.ytp-size-button');
		if (theaterButton) {
			// Style button
			theaterButton.setAttribute('data-tooltip-target-id', 'ytp-size-button');
			theaterButton.setAttribute('data-title-no-tooltip', 'Theater mode (t)');
			theaterButton.setAttribute('aria-label', 'Theater mode (t)');
			theaterButton.setAttribute('title', 'Theater mode (t)');
			theaterButton.setAttribute('data-tooltip-title', 'Theater mode (t)');
			theaterButton.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-30"></use><path d="m 28,11 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z" fill="#fff" fill-rule="evenodd" id="ytp-id-30"></path></svg>';

			// Add actions
			theaterButton.addEventListener('click', function () {
				// Tell the top window to toggle theater mode
				window.top.postMessage('goodTube_theater', '*');
			});
		}


		// Add autoplay button (before subtitles button)
		let subtitlesButton = document.querySelector('.ytp-subtitles-button');
		if (subtitlesButton) {
			// Add button
			subtitlesButton.insertAdjacentHTML('beforebegin', '<button class="ytp-button ytp-autonav-toggle" id="goodTube_autoplayButton"><div class="ytp-autonav-toggle-button-container"><div class="ytp-autonav-toggle-button" aria-checked="' + goodTube_getParams['goodTube_autoplay'] + '"></div></div></button>');

			// Add actions
			let autoplayButton = document.querySelector('#goodTube_autoplayButton');
			if (autoplayButton) {
				autoplayButton.addEventListener('click', function () {
					// Toggle the style of the autoplay button
					let innerButton = autoplayButton.querySelector('.ytp-autonav-toggle-button');
					let innerButtonState = innerButton.getAttribute('aria-checked');

					if (innerButtonState === 'true') {
						innerButton.setAttribute('aria-checked', 'false');
						window.top.postMessage('goodTube_autoplay_false', '*');
					}
					else {
						innerButton.setAttribute('aria-checked', 'true');
						window.top.postMessage('goodTube_autoplay_true', '*');
					}
				});
			}
		}
	}

	// Add custom events
	let goodTube_iframe_addCustomEvents_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_addCustomEvents() {
		// Target the video element
		let videoElement = document.querySelector('#player video');

		// Make sure it exists before continuing
		if (!videoElement) {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_addCustomEvents_timeout);

			// Create a new timeout
			goodTube_iframe_addCustomEvents_timeout = setTimeout(goodTube_iframe_addCustomEvents, 100);

			return;
		}

		// When the video ends
		videoElement.addEventListener('ended', function () {
			// Tell the top frame the video ended
			window.top.postMessage('goodTube_videoEnded', '*');
		});
	}

	// Add keyboard shortcuts
	function goodTube_iframe_addKeyboardShortcuts() {
		document.addEventListener('keydown', function (event) {
			// Don't do anything if we're holding control OR the command key on mac OR the "hide and mute ads" fallback is active
			if (event.ctrlKey || event.metaKey || goodTube_fallback) {
				return;
			}

			// Theater mode (t)
			if (event.key === 't') {
				// Tell the top window to toggle theater mode
				window.top.postMessage('goodTube_theater', '*');
			}

			// Picture in picture (i)
			if (event.key === 'i') {
				let pipButton = document.querySelector('.ytp-pip-button');
				if (pipButton) {
					pipButton.click();
				}
			}

			// Prev video (shift+p)
			else if (event.key.toLowerCase() === 'p' && event.shiftKey) {
				// Tell the top window to go to the previous video
				window.top.postMessage('goodTube_prevVideo', '*');
			}

			// Next video (shift+n)
			else if (event.key.toLowerCase() === 'n' && event.shiftKey) {
				// Tell the top window to go to the next video
				window.top.postMessage('goodTube_nextVideo', '*');
			}
		});
	}

	// Load a video
	function goodTube_iframe_loadVideo(videoId, startSeconds) {
		// Get the iframe API
		goodTube_iframe_api = document.getElementById('movie_player');

		// Make sure the API is ready
		if (goodTube_iframe_api && typeof goodTube_iframe_api.loadVideoById === 'function' && typeof goodTube_iframe_api.getVideoData === 'function') {
			// Load the video
			goodTube_iframe_api.loadVideoById(
				{
					'videoId': videoId,
					'startSeconds': startSeconds
				}
			);
		}
	}

	// Receive a message from the parent window
	function goodTube_iframe_receiveMessage(event) {
		// Make sure some data exists
		if (typeof event.data !== 'string') {
			return;
		}

		// Load video
		if (event.data.indexOf('goodTube_load_') !== -1) {
			let bits = event.data.replace('goodTube_load_', '').split('|||');
			let videoId = bits[0];
			let startSeconds = parseFloat(bits[1]);
			let viewingPlaylist = bits[2];

			// If we're on a playlist
			if (viewingPlaylist === 'true') {
				// Enable the previous button
				goodTube_iframe_enablePrevButton();
			}
			// Otherwise, we're not on a playlist
			else {
				// Disable the previous button
				goodTube_iframe_disablePrevButton();
			}

			// Then load the new video
			goodTube_iframe_loadVideo(videoId, startSeconds);
		}

		// Stop video
		else if (event.data === 'goodTube_stopVideo') {
			// Pause and mute the video
			goodTube_iframe_pause();
			goodTube_iframe_mute();
		}

		// Skip to time
		else if (event.data.indexOf('goodTube_skipTo_') !== -1) {
			let time = event.data.replace('goodTube_skipTo_', '');
			goodTube_iframe_skipTo(time);
		}

		// Pause
		else if (event.data === 'goodTube_pause') {
			goodTube_iframe_pause();
		}

		// Play
		else if (event.data === 'goodTube_play') {
			goodTube_iframe_play();
		}

		// Toggle picture in picture
		else if (event.data === 'goodTube_pip') {
			let pipButton = document.querySelector('.ytp-pip-button');
			if (pipButton) {
				pipButton.click();
			}
		}

		// Show or hide the end screen thumbnails
		else if (event.data === 'goodTube_endScreen_show') {
			if (document.body.classList.contains('goodTube_hideEndScreen')) {
				document.body.classList.remove('goodTube_hideEndScreen');
			}
		}
		else if (event.data === 'goodTube_endScreen_hide') {
			if (!document.body.classList.contains('goodTube_hideEndScreen')) {
				document.body.classList.add('goodTube_hideEndScreen');
			}
		}

		// Keyboard shortcut
		else if (event.data.indexOf('goodTube_shortcut_') !== -1) {
			// Get the key pressed
			let keyPressed = event.data.replace('goodTube_shortcut_', '');

			// Target the player
			let player = document.querySelector('video');
			if (!player) {
				return;
			}

			// Speed up playback
			else if (keyPressed === '>') {
				if (goodTube_iframe_api && typeof goodTube_iframe_api.getPlaybackRate === 'function' && typeof goodTube_iframe_api.setPlaybackRate === 'function') {
					let playbackRate = goodTube_iframe_api.getPlaybackRate();

					if (playbackRate == .25) {
						goodTube_iframe_api.setPlaybackRate(.5);
					}
					else if (playbackRate == .5) {
						goodTube_iframe_api.setPlaybackRate(.75);
					}
					else if (playbackRate == .75) {
						goodTube_iframe_api.setPlaybackRate(1);
					}
					else if (playbackRate == 1) {
						goodTube_iframe_api.setPlaybackRate(1.25);
					}
					else if (playbackRate == 1.25) {
						goodTube_iframe_api.setPlaybackRate(1.5);
					}
					else if (playbackRate == 1.5) {
						goodTube_iframe_api.setPlaybackRate(1.75);
					}
					else if (playbackRate == 1.75) {
						goodTube_iframe_api.setPlaybackRate(2);
					}
				}
			}

			// Slow down playback
			else if (keyPressed === '<') {
				if (goodTube_iframe_api && typeof goodTube_iframe_api.getPlaybackRate === 'function' && typeof goodTube_iframe_api.setPlaybackRate === 'function') {
					let playbackRate = goodTube_iframe_api.getPlaybackRate();

					if (playbackRate == .5) {
						goodTube_iframe_api.setPlaybackRate(.25);
					}
					else if (playbackRate == .75) {
						goodTube_iframe_api.setPlaybackRate(.5);
					}
					else if (playbackRate == 1) {
						goodTube_iframe_api.setPlaybackRate(.75);
					}
					else if (playbackRate == 1.25) {
						goodTube_iframe_api.setPlaybackRate(1);
					}
					else if (playbackRate == 1.5) {
						goodTube_iframe_api.setPlaybackRate(1.25);
					}
					else if (playbackRate == 1.75) {
						goodTube_iframe_api.setPlaybackRate(1.5);
					}
					else if (playbackRate == 2) {
						goodTube_iframe_api.setPlaybackRate(1.75);
					}
				}
			}

			// If we're not holding down the shift key
			if (!event.shiftKey) {
				// Prev frame (24fps calculation)
				if (keyPressed === ',') {
					if (player.paused || player.ended) {
						player.currentTime -= 0.04166666666666667;
					}
				}

				// Next frame (24fps calculation)
				if (keyPressed === '.') {
					if (player.paused || player.ended) {
						player.currentTime += 0.04166666666666667;
					}
				}

				// Prev 5 seconds
				if (keyPressed === 'arrowleft') {
					player.currentTime -= 5;
				}

				// Next 5 seconds
				if (keyPressed === 'arrowright') {
					player.currentTime += 5;
				}

				// Toggle play/pause
				if (keyPressed === ' ' || keyPressed === 'k') {
					if (player.paused || player.ended) {
						player.play();
					}
					else {
						player.pause();
					}
				}

				// Toggle mute
				if (keyPressed === 'm') {
					document.querySelector('.ytp-mute-button').click();
				}

				// Toggle fullscreen
				if (keyPressed === 'f') {
					let fullScreenButton = document.querySelector('.ytp-fullscreen-button');

					if (fullScreenButton) {
						fullScreenButton.click();
					}

					// Force mouse move to make sure fullscreen hides
					var event = new Event('mousemove');
					document.dispatchEvent(event);
				}

				// Toggle captions
				if (keyPressed === 'c') {
					let captionsButton = document.querySelector('.ytp-subtitles-button');

					if (captionsButton) {
						captionsButton.click();
					}
				}

				// Prev 10 seconds
				else if (keyPressed === 'j') {
					player.currentTime -= 10;
				}

				// Next 10 seconds
				else if (keyPressed === 'l') {
					player.currentTime += 10;
				}

				// Start of video
				else if (keyPressed === 'home') {
					player.currentTime = 0;
				}

				// End of video
				else if (keyPressed === 'end') {
					player.currentTime += player.duration;
				}

				// Skip to percentage
				if (keyPressed === '0') {
					player.currentTime = 0;
				}
				else if (keyPressed === '1') {
					player.currentTime = ((player.duration / 100) * 10);
				}
				else if (keyPressed === '2') {
					player.currentTime = ((player.duration / 100) * 20);
				}
				else if (keyPressed === '3') {
					player.currentTime = ((player.duration / 100) * 30);
				}
				else if (keyPressed === '4') {
					player.currentTime = ((player.duration / 100) * 40);
				}
				else if (keyPressed === '5') {
					player.currentTime = ((player.duration / 100) * 50);
				}
				else if (keyPressed === '6') {
					player.currentTime = ((player.duration / 100) * 60);
				}
				else if (keyPressed === '7') {
					player.currentTime = ((player.duration / 100) * 70);
				}
				else if (keyPressed === '8') {
					player.currentTime = ((player.duration / 100) * 80);
				}
				else if (keyPressed === '9') {
					player.currentTime = ((player.duration / 100) * 90);
				}
			}
		}

		// Go fullscreen
		else if (event.data === 'goodTube_fullscreen') {
			goodTube_iframe_fullscreen();
		}

		// Enable autoplay
		else if (event.data === 'goodTube_autoplay_true') {
			goodTube_helper_setCookie('goodTube_autoplay', 'true');
			goodTube_autoplay = 'true';
			goodTube_iframe_setAutoplay('true');
		}

		// Disable autoplay
		else if (event.data === 'goodTube_autoplay_false') {
			goodTube_helper_setCookie('goodTube_autoplay', 'false');
			goodTube_autoplay = 'false';
			goodTube_iframe_setAutoplay('false');
		}
	}

	// Go fullscreen
	let goodTube_iframe_fullscreen_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_fullscreen() {
		// Target the fullscreen button
		let fullscreenButton = document.querySelector('.ytp-fullscreen-button');

		// If we found it
		if (fullscreenButton) {
			// Click it
			fullscreenButton.click();
		}
		// Otherwise, we didn't find it
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_fullscreen_timeout);

			// Create a new timeout to try again
			goodTube_iframe_fullscreen_timeout = setTimeout(goodTube_iframe_fullscreen, 100);
		}
	}

	// Set autoplay
	let goodTube_iframe_setAutoplay_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_setAutoplay(enabled) {
		// Target the autoplay button
		let autoplayButton = document.querySelector('#goodTube_autoplayButton');

		// If we found it
		if (autoplayButton) {
			let innerButton = autoplayButton.querySelector('.ytp-autonav-toggle-button');

			// If the button is in the wrong state
			if (innerButton.getAttribute('aria-checked') !== enabled) {
				// Click it
				autoplayButton.click();
			}
		}
		// Otherwise, we didn't find it
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_setAutoplay_timeout);

			// Create a new timeout to try again
			goodTube_iframe_setAutoplay_timeout = setTimeout(() => { goodTube_iframe_setAutoplay(enabled); }, 100);
		}
	}

	// Skip to time
	let goodTube_iframe_skipTo_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_skipTo(time) {
		// Target the video
		let videoElement = document.querySelector('video');

		// If the video exists, restore the time
		if (videoElement) {
			videoElement.currentTime = parseFloat(time);
		}
		// Otherwise retry until the video exists
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_skipTo_timeout);

			// Create a new timeout
			goodTube_iframe_skipTo_timeout = setTimeout(() => {
				goodTube_iframe_skipTo(time);
			}, 100);
		}
	}

	// Pause
	let goodTube_iframe_pause_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_pause() {
		// Target the video
		let videoElement = document.querySelector('video');

		// If the video exists, pause it
		if (videoElement) {
			videoElement.pause();
		}
		// Otherwise retry until the video exists
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_pause_timeout);

			// Create a new timeout
			goodTube_iframe_pause_timeout = setTimeout(goodTube_iframe_pause, 100);
		}
	}

	// Mute
	let goodTube_iframe_mute_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_mute() {
		// Target the video
		let videoElement = document.querySelector('video');

		// If the video exists, mute it
		if (videoElement) {
			videoElement.muted = true;
		}
		// Otherwise retry until the video exists
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_mute_timeout);

			// Create a new timeout
			goodTube_iframe_mute_timeout = setTimeout(goodTube_iframe_mute, 100);
		}
	}

	// Unmute
	let goodTube_iframe_unmute_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_unmute() {
		// Target the video
		let videoElement = document.querySelector('video');

		// If the video exists, unmute it
		if (videoElement) {
			videoElement.muted = false;
		}
		// Otherwise retry until the video exists
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_unmute_timeout);

			// Create a new timeout
			goodTube_iframe_unmute_timeout = setTimeout(goodTube_iframe_unmute, 100);
		}
	}

	// Play
	let goodTube_iframe_play_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_play() {
		// Target the video
		let videoElement = document.querySelector('video');

		// If the video exists, restore the time
		if (videoElement) {
			videoElement.play();
		}
		// Otherwise retry until the video exists
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_iframe_play_timeout);

			// Create a new timeout
			goodTube_iframe_play_timeout = setTimeout(goodTube_iframe_play, 100);
		}
	}

	// Fix fullscreen button issues
	function goodTube_iframe_fixFullScreenButton() {
		let fullScreenButton = document.querySelector('.ytp-fullscreen-button');
		if (fullScreenButton) {
			fullScreenButton.setAttribute('aria-disabled', 'false');

			if (document.querySelector('.ytp-fullscreen')) {
				fullScreenButton.setAttribute('title', 'Exit full screen (f)');
			}
			else {
				fullScreenButton.setAttribute('title', 'Full screen (f)');
			}
		}
	}

	// Sync the main player
	let goodTube_iframe_syncMainPlayer_timeout = setTimeout(() => {}, 0);
	function goodTube_iframe_syncMainPlayer() {
		// If we're viewing a video page
		if (window.top.location.href.indexOf('/watch?') !== -1) {
			let videoElement = document.querySelector('video');

			if (videoElement) {
				// Tell the parent frame to sync the video (pass in the time we want to sync to and the total video duration - we use the duration to detect if an ad is playing)
				window.top.postMessage('goodTube_syncMainPlayer_' + videoElement.currentTime + '_' + videoElement.duration, '*');
			}
		}

		// Clear timeout first to solve memory leak issues
		clearTimeout(goodTube_iframe_syncMainPlayer_timeout);

		// Create a new timeout
		goodTube_iframe_syncMainPlayer_timeout = setTimeout(goodTube_iframe_syncMainPlayer, 5000);
	}

	// Support picture in picture
	function goodTube_iframe_pip() {
		// If we leave the picture in picture
		addEventListener('leavepictureinpicture', (event) => {
			goodTube_pip = false;

			// Set the picture in picture state in the top window
			window.top.postMessage('goodTube_pip_false', '*');
		});

		// If we enter the picture in picture
		addEventListener('enterpictureinpicture', (event) => {
			goodTube_pip = true;

			// Set the picture in picture state in the top window
			window.top.postMessage('goodTube_pip_true', '*');
		});
	}

	// Enable picture in picture next and prev buttons
	function goodTube_iframe_enablePipButtons() {
		if ("mediaSession" in navigator) {
			// Next video
			navigator.mediaSession.setActionHandler("nexttrack", () => {
				// Tell the top frame to go to the next video
				window.top.postMessage('goodTube_nextVideo', '*');
			});

			// Previous video
			navigator.mediaSession.setActionHandler("previoustrack", () => {
				// Tell the top frame to go to the previous video
				window.top.postMessage('goodTube_prevVideo', '*');
			});
		}
	}


	/* Proxy iframe functions
	------------------------------------------------------------------------------------------ */
	// Init
	function goodTube_proxyIframe_init() {
		// Wait for the DOM to load
		document.addEventListener("DOMContentLoaded", goodTube_proxyIframe_initLoaded);

		// Also check if the DOM is already loaded, as if it is, the above event listener will not trigger
		if (document.readyState === "interactive" || document.readyState === "complete") {
			goodTube_proxyIframe_initLoaded();
		}
	}

	function goodTube_proxyIframe_initLoaded() {
		// Hide the DOM elements from the proxy page
		let elements = document.querySelectorAll('body > *');
		elements.forEach(element => {
			element.style.display = 'none';
			element.style.opacity = '0';
			element.style.visibility = 'hidden';
		});

		// Remove scrolling
		document.body.style.overflow = 'hidden';

		// Change the background colour
		document.body.style.background = '#000000';

		// Create a youtube iframe
		let youtubeIframe = document.createElement('div');

		// Add the youtube iframe to the page
		document.body.appendChild(youtubeIframe);

		// Update the content of the youtube iframe
		youtubeIframe.innerHTML = `
			<iframe
				width="100%"
				height="100%"
				src=""
				frameborder="0"
				scrolling="yes"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
				id="goodTube_youtube_iframe"
			></iframe>
		`;

		// Style the youtube iframe
		youtubeIframe.style.position = 'fixed';
		youtubeIframe.style.top = '0';
		youtubeIframe.style.bottom = '0';
		youtubeIframe.style.right = '0';
		youtubeIframe.style.left = '0';
		youtubeIframe.style.zIndex = '99999';

		// Listen for messages from the parent window
		window.addEventListener('message', goodTube_proxyIframe_receiveMessage);

		// Let the parent frame know it's loaded
		window.top.postMessage('goodTube_proxyIframe_loaded', '*');
	}

	// Receive a message from the parent window
	function goodTube_proxyIframe_receiveMessage(event) {
		// Make sure some data exists
		if (typeof event.data !== 'string') {
			return;
		}

		// Target the youtube iframe
		let youtubeIframe = document.getElementById('goodTube_youtube_iframe');

		// Make sure we found the youtube iframe
		if (youtubeIframe) {
			// Change the source of the youtube iframe
			if (event.data.indexOf('goodTube_src_') !== -1) {
				// First time just change the src
				if (youtubeIframe.src === '' || youtubeIframe.src.indexOf('?goodTubeProxy=1') !== -1) {
					youtubeIframe.src = event.data.replace('goodTube_src_', '');
				}
				// All other times, we need to use this weird method so it doesn't mess with our browser history
				else {
					youtubeIframe.contentWindow.location.replace(event.data.replace('goodTube_src_', ''));
				}
			}
			// Pass all other messages down to the youtube iframe
			else {
				youtubeIframe.contentWindow.postMessage(event.data, '*');
			}
		}
	}


	/* Start GoodTube
	------------------------------------------------------------------------------------------ */
	let goodTube_init_route_timeout = setTimeout(() => {}, 0);
	function goodTube_init_route() {
		// Make sure the document head exists
		if (document.head) {
			// Youtube page
			if (window.top === window.self && window.location.href.indexOf('youtube') !== -1) {
				goodTube_init();
			}
			// Proxy iframe embed
			else if (window.location.href.indexOf('?goodTubeProxy=1') !== -1) {
				goodTube_proxyIframe_init();
			}
			// Iframe embed
			else if (window.location.href.indexOf('?goodTubeEmbed=1') !== -1) {
				goodTube_iframe_init();
			}
		}
		// Otherwise, retry
		else {
			// Clear timeout first to solve memory leak issues
			clearTimeout(goodTube_init_route_timeout);

			// Loop this function
			goodTube_init_route_timeout = setTimeout(goodTube_init_route, 1);
		}
	}

	// Let's go!
	goodTube_init_route();
})();

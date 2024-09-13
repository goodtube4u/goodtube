// ==UserScript==
// @name         GoodTube Embed (Beta)
// @namespace    http://tampermonkey.net/
// @version      1.000
// @description  Removes 100% of Youtube ads. Also removes shorts and other annoying things.
// @author       GoodTube - Embed
// @match        *://m.youtube.com/*
// @match        *://www.youtube.com/*
// @match        *://youtube.com/*
// @icon         https://cdn-icons-png.flaticon.com/256/1384/1384060.png
// @run-at       document-start
// ==/UserScript==

(function() {
	'use strict';


	// Bypass CSP restrictions, introduced by the latest Chrome updates
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

		document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function() {
			function decode(s) {
				return decodeURIComponent(s.split("+").join(" "));
			}

			getParams[decode(arguments[1])] = decode(arguments[2]);
		});

		// If we're on a playlist, but we don't have a video id in the URL - then get it from the frame API
		if (typeof getParams['list'] !== 'undefined' && typeof getParams['v'] === 'undefined') {
			if (goodTube_page_api && typeof goodTube_page_api.getVideoData === 'function') {
				let videoData = youtubeFrameAPI.getVideoData();

				if (typeof videoData['video_id'] !== 'undefined' && videoData['video_id']) {
					getParams['v'] = videoData['video_id'];
				}
			}
		}

		return getParams;
	}

	// Set a cookie
	function goodTube_helper_setCookie(name, value) {
		// 399 days
		document.cookie = name+"="+encodeURIComponent(value)+";max-age="+(399*24*60*60);
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


	/* Global variables
	------------------------------------------------------------------------------------------ */
	// Stores the GET params
	let goodTube_getParams = goodTube_helper_setupGetParams();

	// Are we on mobile?
	let goodTube_mobile = false;
	if (window.location.href.indexOf('m.youtube') !== -1 || (typeof goodTube_getParams['mobile'] !== 'undefined' && goodTube_getParams['mobile'] === 'true')) {
		goodTube_mobile = true;
	}

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

	// Is autoplay turned on? (on by default if no cookie exists or you're on mobile)
	let goodTube_autoplay = goodTube_helper_getCookie('goodTube_autoplay');
	if (!goodTube_autoplay || goodTube_mobile) {
		goodTube_helper_setCookie('goodTube_autoplay', 'true');
		goodTube_autoplay = 'true';
	}


	/* Youtube functions
	------------------------------------------------------------------------------------------ */
	// Hide ads, shorts, etc using CSS
	function goodTube_youtube_hideAdsShortsEtc() {
		let style = document.createElement('style');
		style.textContent = `
			.ytd-search ytd-shelf-renderer,
			ytd-reel-shelf-renderer,
			ytd-merch-shelf-renderer,
			ytd-action-companion-ad-renderer,
			ytd-display-ad-renderer,
			ytd-rich-section-renderer,
			ytd-video-masthead-ad-advertiser-info-renderer,
			ytd-video-masthead-ad-primary-video-renderer,
			ytd-in-feed-ad-layout-renderer,
			ytd-ad-slot-renderer,
			ytd-statement-banner-renderer,
			ytd-banner-promo-renderer-background
			ytd-ad-slot-renderer,
			ytd-in-feed-ad-layout-renderer,
			ytd-engagement-panel-section-list-renderer:not(.ytd-popup-container):not([target-id='engagement-panel-clip-create']),
			ytd-compact-video-renderer:has(.goodTube_hidden),
			ytd-rich-item-renderer:has(> #content > ytd-ad-slot-renderer)
			.ytd-video-masthead-ad-v3-renderer,
			div#root.style-scope.ytd-display-ad-renderer.yt-simple-endpoint,
			div#sparkles-container.style-scope.ytd-promoted-sparkles-web-renderer,
			div#main-container.style-scope.ytd-promoted-video-renderer,
			div#player-ads.style-scope.ytd-watch-flexy,
			#clarify-box,

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
			ytm-pivot-bar-item-renderer:has(> .pivot-shorts),
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
		console.log('[GoodTube] Shorts removed');
	}

	// Hide shorts (realtime)
	function goodTube_youtube_hideShorts() {
		// If we're on a channel page, don't hide shorts
		if (window.location.href.indexOf('@') !== -1) {
			return;
		}

		// Hide shorts links
		let shortsLinks = document.querySelectorAll('a:not(.goodTube_hidden)');
		shortsLinks.forEach((element) => {
			if (element.href.indexOf('shorts/') !== -1) {
				goodTube_helper_hideElement(element);
				goodTube_helper_hideElement(element.closest('ytd-video-renderer'));
				goodTube_helper_hideElement(element.closest('ytd-compact-video-renderer'));
				goodTube_helper_hideElement(element.closest('ytd-rich-grid-media'));
			}
		});
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
				element.addEventListener('click', function() {
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
	function goodTube_youtube_hidePlayers() {
		// Hide the normal Youtube player
		let regularPlayers = document.querySelectorAll('#player');
		regularPlayers.forEach((element) => {
			goodTube_helper_hideYoutubePlayer(element);
		});

		// Remove the full screen and theater Youtube player
		let fullscreenPlayers = document.querySelectorAll('#full-bleed-container');
		fullscreenPlayers.forEach((element) => {
			goodTube_helper_hideYoutubePlayer(element);
		});

		// Hide the mobile controls
		let mobileControls = document.querySelectorAll('#player-control-container');
		mobileControls.forEach((element) => {
			goodTube_helper_hideElement(element);
		});

		// Hide the Youtube miniplayer
		let miniPlayers = document.querySelectorAll('ytd-miniplayer');
		miniPlayers.forEach((element) => {
			goodTube_helper_hideElement(element);
		});
	}

	// Turn off autoplay
	let goodTube_youtube_turnedOffAutoplay = false;
	function goodTube_youtube_turnOffAutoplay() {
		// If we've already turned off autoplay, just return
		if (goodTube_youtube_turnedOffAutoplay) {
			return;
		}

		let autoplayButton = false;

		// Desktop
		if (!goodTube_mobile) {
			// Target the autoplay button
			autoplayButton = document.querySelector('.ytp-autonav-toggle-button');

			// If we found it
			if (autoplayButton) {
				// Set a variable if autoplay has been turned off
				if (autoplayButton.getAttribute('aria-checked') === 'false') {
					goodTube_youtube_turnedOffAutoplay = true;
					return;
				}
				// Otherwise click the button
				else {
					autoplayButton.click();
				}
			}
		}
		// Mobile
		else {
			// Autoplay is always on for mobile now, we can't control it sadly...

			// // Target the autoplay button
			// autoplayButton = document.querySelector('.ytm-autonav-toggle-button-container');

			// // If we found it
			// if (autoplayButton) {
			// 	// Set a variable if autoplay has been turned off
			// 	if (autoplayButton.getAttribute('aria-pressed') === 'false') {
			// 		goodTube_youtube_turnedOffAutoplay = true;
			// 		return;
			// 	}
			// 	// Otherwise click the button
			// 	else {
			// 		autoplayButton.click();
			// 	}
			// }
			// // If we didn't find it - click the player a bit, this helps to actually make the autoplay button show (after ads)
			// else {
			// 	document.querySelector('#player .html5-video-player')?.click();
			// 	document.querySelector('#player').click();
			// 	document.querySelector('.ytp-unmute')?.click();
			// }
		}
	}

	// Mute, pause and skip ads on all Youtube videos
	function goodTube_youtube_mutePauseSkipAds() {
		// Pause and mute all HTML videos on the page
		let youtubeVideos = document.querySelectorAll('video');
		youtubeVideos.forEach((element) => {
			// Don't touch the thumbnail hover player
			if (!element.closest('#inline-player')) {
				element.muted = true;
				element.volume = 0;
				element.pause();
			}
		});
	}


	/* Player functions
	------------------------------------------------------------------------------------------ */
	// Init player
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
			setTimeout(goodTube_player_init, 100);
			return;
		}

		// Add CSS styles for the player
		let style = document.createElement('style');
		style.textContent = `
			/* Desktop */
			#goodTube_playerWrapper {
				border-radius: 12px;
				background: #ffffff;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 999;
				overflow: hidden;
			}

			html[dark] #goodTube_playerWrapper {
				background: #0f0f0f;
			}

			/* Mobile */
			#goodTube_playerWrapper.goodTube_mobile {
				position: fixed;
				background: #000000;
				border-radius: 0;
				z-index: 3;
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

		// Add a mobile class
		if (goodTube_mobile) {
			playerWrapper.classList.add('goodTube_mobile');
		}

		// Add player to the page
		document.body.appendChild(playerWrapper);

		// Add video iframe embed
		playerWrapper.innerHTML = `
			<iframe
				width="100%"
				height="100%"
				src=""
				frameborder="0"
				scrolling="yes"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		`;

		// Expose the player and wrapper globally
		goodTube_playerWrapper = document.querySelector('#goodTube_playerWrapper');
		goodTube_player = goodTube_playerWrapper.querySelector('iframe');

		// Setup player dynamic positioning and sizing
		goodTube_player_positionAndSize();

		// Run the actions
		goodTube_actions();
	}

	// Position and size the player
	function goodTube_player_positionAndSize() {
		// If we're viewing a video
		if (window.location.href.indexOf('.com/watch') !== -1) {
			// Show the GoodTube player
			goodTube_helper_showElement(goodTube_playerWrapper);

			// This is used to position and size the player
			let positionElement = false;

			// Desktop
			if (!goodTube_mobile) {
				// Theater mode
				if (document.querySelector('ytd-watch-flexy[theater]')) {
					positionElement = document.getElementById('full-bleed-container');

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

				// Position the player
				if (positionElement && positionElement.offsetHeight > 0) {
					// Our wrapper has "position: absolute" so take into account the window scroll
					let rect = positionElement.getBoundingClientRect();
					goodTube_playerWrapper.style.top = (rect.top + window.scrollY)+'px';
					goodTube_playerWrapper.style.left = (rect.left + window.scrollX)+'px';

					// Match the size of the position element
					goodTube_playerWrapper.style.width = positionElement.offsetWidth+'px';
					goodTube_playerWrapper.style.height = positionElement.offsetHeight+'px';
				}
			}

			// Mobile
			else {
				positionElement = document.getElementById('player');

				// Position the player
				if (positionElement && positionElement.offsetHeight > 0) {
					// Our wrapper has "position: absolute" so don't take into account the window scroll
					let rect = positionElement.getBoundingClientRect();
					goodTube_playerWrapper.style.top = rect.top+'px';
					goodTube_playerWrapper.style.left = rect.left+'px';

					// Match the size of the position element
					goodTube_playerWrapper.style.width = positionElement.offsetWidth+'px';
					goodTube_playerWrapper.style.height = positionElement.offsetHeight+'px';
				}
			}
		}

		// Call this function again on next draw frame
		window.requestAnimationFrame(function() {
			goodTube_player_positionAndSize();
		});
	}

	// Load a video
	// let goodTube_firstLoad = true;
	function goodTube_player_load() {

		// Pause the video first (this helps to prevent audio flashes)
		goodTube_player_pause();

		// On first load
		// if (goodTube_firstLoad) {
			// On iframe load
			goodTube_player.addEventListener('load', function() {
				// If a restore time exists, skip to it
				if (typeof goodTube_getParams['t'] !== 'undefined') {
					goodTube_player_skipTo(goodTube_getParams['t'].replace('s', ''));
				}

				// Set autoplay initial state
				goodTube_player.contentWindow.postMessage('goodTube_autoplay_'+goodTube_autoplay, '*');
			});

			// Set the video source (we need to use this weird method so it doesn't mess with browser history)
			// This also tells the embed if it's mobile or not
			let mobileText = 'false';
			if (goodTube_mobile) {
				mobileText = 'true';
			}
			goodTube_player.contentWindow.location.replace('https://www.youtube.com/embed/'+goodTube_getParams['v']+'?autoplay=1&mobile='+mobileText);

			// Turn first load off
			// goodTube_firstLoad = false;
		// }
		// // On other loads
		// else {
		// 	// Load the video via the iframe api
		// 	goodTube_player.contentWindow.postMessage('goodTube_load_'+goodTube_getParams['v'], '*');
		// }

		// Show the player
		goodTube_helper_showElement(goodTube_playerWrapper);
	}

	// Clear and hide the player
	function goodTube_player_clear() {
		// Stop the video via the iframe api (but not if we're in picture in picture)
		if (!goodTube_pip) {
			goodTube_player.contentWindow.postMessage('goodTube_stopVideo', '*');
		}

		// Hide the player
		goodTube_helper_hideElement(goodTube_playerWrapper);
	}

	// Skip to time
	function goodTube_player_skipTo(time) {
		goodTube_player.contentWindow.postMessage('goodTube_skipTo_'+time, '*');
	}

	// Pause
	function goodTube_player_pause() {
		goodTube_player.contentWindow.postMessage('goodTube_pause', '*');
	}

	// Play
	function goodTube_player_play() {
		goodTube_player.contentWindow.postMessage('goodTube_play', '*');
	}


	/* Keyboard shortcuts
	------------------------------------------------------------------------------------------ */
	// Add keyboard shortcuts
	function goodTube_shortcuts_init() {
		document.addEventListener('keydown', function(event) {
			// Don't do anything if we're holding control
			if (event.ctrlKey) {
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
				let player = goodTube_player.contentWindow.document.querySelector('video');

				if (!player) {
					return;
				}

				// Fullscreen
				if (keyPressed === 'f') {
					let fullScreenButton = goodTube_player.contentWindow.document.querySelector('.ytp-fullscreen-button').click();
					if (fullScreenButton) {
						fullScreenButton.click();
					}
				}

				// Speed up playback
				else if (keyPressed === '>') {
					if (parseFloat(player.playbackRate) == .25) {
						player.playbackRate = .5;
					}
					else if (parseFloat(player.playbackRate) == .5) {
						player.playbackRate = .75;
					}
					else if (parseFloat(player.playbackRate) == .75) {
						player.playbackRate = 1;
					}
					else if (parseFloat(player.playbackRate) == 1) {
						player.playbackRate = 1.25;
					}
					else if (parseFloat(player.playbackRate) == 1.25) {
						player.playbackRate = 1.5;
					}
					else if (parseFloat(player.playbackRate) == 1.5) {
						player.playbackRate = 1.75;
					}
					else if (parseFloat(player.playbackRate) == 1.75) {
						player.playbackRate = 2;
					}
				}

				// Slow down playback
				else if (keyPressed === '<') {
					if (parseFloat(player.playbackRate) == .5) {
						player.playbackRate = .25;
					}
					else if (parseFloat(player.playbackRate) == .75) {
						player.playbackRate = .5;
					}
					else if (parseFloat(player.playbackRate) == 1) {
						player.playbackRate = .75;
					}
					else if (parseFloat(player.playbackRate) == 1.25) {
						player.playbackRate = 1;
					}
					else if (parseFloat(player.playbackRate) == 1.5) {
						player.playbackRate = 1.25;
					}
					else if (parseFloat(player.playbackRate) == 1.75) {
						player.playbackRate = 1.5;
					}
					else if (parseFloat(player.playbackRate) == 2) {
						player.playbackRate = 1.75;
					}
				}

				// If we're not holding down the shift key
				if (!event.shiftKey) {
					// If we're focused on the video element
					if (focusedElement && typeof focusedElement.closest !== 'undefined' && focusedElement.closest('#goodTube_player')) {
						// Volume down
						if (keyPressed === 'arrowdown') {
							if (player.volume >= .05) {
								player.volume -= .05;
							}
							else {
								player.volume = 0;
							}

							// No scroll
							event.preventDefault();
						}

						// Volume up
						if (keyPressed === 'arrowup') {
							if (player.volume <= .95) {
								player.volume += .05;
							}
							else {
								player.volume = 1;
							}

							// No scroll
							event.preventDefault();
						}

						// Theater mode (focus the body, this makes the default youtube shortcut work)
						if (keyPressed === 't') {
							document.querySelector('body').focus();
						}
					}

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
						// Also check the volume, because player.muted isn't reliable
						if (player.muted || player.volume <= 0) {
							player.muted = false;

							// Small fix to make unmute work if you've manually turned it all the way down
							if (player.volume <= 0) {
								player.volume = 1;
							}
						}
						else {
							player.muted = true;
						}
					}

					// Toggle picture in picture
					if (keyPressed === 'i') {
						event.stopImmediatePropagation();

						// Tell the iframe to toggle pip
						goodTube_player.contentWindow.postMessage('goodTube_pip', '*');
					}

					// Toggle fullscreen
					if (keyPressed === 'f') {
						document.querySelector('.vjs-fullscreen-control')?.click();
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
		}, true);
	}

	// Trigger a keyboard shortcut
	function goodTube_shortcuts_trigger(shortcut) {
		// Focus the body first
		document.querySelector('body').focus();

		// Setup the keyboard shortcut
		let theKey = false;
		let keyCode = false;
		let shiftKey = false;

		if (shortcut === 'theater') {
			theKey = 't';
			keyCode = 84;
			shiftKey = false;
		}
		else {
			return;
		}

		// Trigger the keyboard shortcut
		let e = false;
		e = new window.KeyboardEvent('focus', {
			bubbles: true,
			key: theKey,
			keyCode: keyCode,
			shiftKey: shiftKey,
			charCode: 0,
		});
		document.dispatchEvent(e);

		e = new window.KeyboardEvent('keydown', {
			bubbles: true,
			key: theKey,
			keyCode: keyCode,
			shiftKey: shiftKey,
			charCode: 0,
		});
		document.dispatchEvent(e);

		e = new window.KeyboardEvent('beforeinput', {
			bubbles: true,
			key: theKey,
			keyCode: keyCode,
			shiftKey: shiftKey,
			charCode: 0,
		});
		document.dispatchEvent(e);

		e = new window.KeyboardEvent('keypress', {
			bubbles: true,
			key: theKey,
			keyCode: keyCode,
			shiftKey: shiftKey,
			charCode: 0,
		});
		document.dispatchEvent(e);

		e = new window.KeyboardEvent('input', {
			bubbles: true,
			key: theKey,
			keyCode: keyCode,
			shiftKey: shiftKey,
			charCode: 0,
		});
		document.dispatchEvent(e);

		e = new window.KeyboardEvent('change', {
			bubbles: true,
			key: theKey,
			keyCode: keyCode,
			shiftKey: shiftKey,
			charCode: 0,
		});
		document.dispatchEvent(e);

		e = new window.KeyboardEvent('keyup', {
			bubbles: true,
			key: theKey,
			keyCode: keyCode,
			shiftKey: shiftKey,
			charCode: 0,
		});
		document.dispatchEvent(e);
	}


	/* Navigation (playlists and autoplay)
	------------------------------------------------------------------------------------------ */
	let goodTube_nav_clickedPlaylistOpen = false;
	let goodTube_nav_prevVideo = [];

	// Generate playlist links (these are internally used to help us navigate through playlists and use autoplay)
	function goodTube_nav_generatePlaylistLinks() {
		// If we're not viewing a playlist, just return.
		if (typeof goodTube_getParams['i'] === 'undefined' && typeof goodTube_getParams['index'] === 'undefined' && typeof goodTube_getParams['list'] === 'undefined') {
			return;
		}

		// Get the playlist items
		let playlistLinks = false;
		let playlistTitles = false;

		// Desktop
		if (!goodTube_mobile) {
			playlistLinks = document.querySelectorAll('#playlist-items > a');
			playlistTitles = document.querySelectorAll('#playlist-items #video-title');
		}
		// Mobile
		else {
			playlistLinks = document.querySelectorAll('ytm-playlist-panel-renderer a.compact-media-item-image');
			playlistTitles = document.querySelectorAll('ytm-playlist-panel-renderer .compact-media-item-headline span');
		}

		// If the playlist links exist
		if (playlistLinks.length > 0) {
			// Target the playlist container
			let playlistContainer = document.getElementById('goodTube_playlistContainer');

			// Add the playlist container if we don't have it
			if (!playlistContainer) {
				playlistContainer = document.createElement('div');
				playlistContainer.setAttribute('id', 'goodTube_playlistContainer');
				playlistContainer.style.display = 'none';
				document.body.appendChild(playlistContainer);
			}

			// Empty the playlist container
			playlistContainer.innerHTML = '';

			// For each playlist item
			let i = 0;
			playlistLinks.forEach((playlistItem) => {
				// Create a link element
				let playlistItemElement = document.createElement('a');

				// Set the href
				playlistItemElement.href = playlistItem.href;

				// Set the title
				playlistItemElement.innerHTML = playlistTitles[i].innerHTML.trim();

				// If we're currently on this item, set the selected class
				if (playlistItem.href.indexOf('v='+goodTube_getParams['v']) !== -1) {
					playlistItemElement.classList.add('goodTube_selected');
				}

				// Add the item to the playlist container
				playlistContainer.appendChild(playlistItemElement);

				i++;
			});
		}
	}

	// Play the previous video
	function goodTube_nav_prev() {
		// Check if we clicked a playlist item
		let clickedPlaylistItem = false;

		// If we are viewing a playlist
		if (typeof goodTube_getParams['i'] !== 'undefined' || typeof goodTube_getParams['index'] !== 'undefined' || typeof goodTube_getParams['list'] !== 'undefined') {
			// Get the playlist items
			let playlistItems = document.querySelectorAll('#goodTube_playlistContainer a');

			// For each playlist item
			let clickNext = false;

			// Loop in reverse
			for (let i = (playlistItems.length - 1); i >= 0; i--) {
				let playlistItem = playlistItems[i];

				if (clickNext) {
					// Find the matching playlist item on the page and click it
					let bits = playlistItem.href.split('/watch');
					let findUrl = '/watch'+bits[1];

					// Desktop
					if (!goodTube_mobile) {
						clickedPlaylistItem = true;
						document.querySelector('#playlist-items > a[href="'+findUrl+'"]')?.click();
					}
					// Mobile
					else {
						clickedPlaylistItem = true;
						document.querySelector('ytm-playlist-panel-renderer a.compact-media-item-image[href="'+findUrl+'"]')?.click();
					}

					if (clickedPlaylistItem) {
						clickedPlaylistItem = true;

						// Double check that the playlist is open, if not - open it.
						let playlistContainer = document.querySelector('ytm-playlist-panel-renderer');
						if (!playlistContainer) {
							let openButton = document.querySelector('ytm-playlist-panel-entry-point');

							if (openButton && !goodTube_nav_clickedPlaylistOpen) {
								goodTube_nav_clickedPlaylistOpen = true;
								openButton.click();
								setTimeout(goodTube_nav_prev, 500);
							}

							return;
						}

						goodTube_nav_clickedPlaylistOpen = false;

						// Click the matching playlist item
						document.querySelector('ytm-playlist-panel-renderer a.compact-media-item-image[href="'+findUrl+'"]')?.click();
					}
				}

				if (playlistItem.classList.contains('goodTube_selected')) {
					clickNext = true;
				}
				else {
					clickNext = false;
				}
			}
		}

		// If we didn't click a playlist item, play previous video (if it exists in our history)
		if (!clickedPlaylistItem && goodTube_nav_prevVideo[goodTube_nav_prevVideo.length - 2] && goodTube_nav_prevVideo[goodTube_nav_prevVideo.length - 2] !== window.location.href) {
			// Debug message
			console.log('[GoodTube] Playing previous video...');

			// Go back to the previous video
			goodTube_helper_setCookie('goodTube_previous', 'true');
			window.history.go(-1);
		}
	}

	// Play the next video
	function goodTube_nav_next(pressedButton = false) {
		// Check if we clicked a playlist item
		let clickedPlaylistItem = false;

		// If we are viewing a playlist
		if (typeof goodTube_getParams['i'] !== 'undefined' || typeof goodTube_getParams['index'] !== 'undefined' || typeof goodTube_getParams['list'] !== 'undefined') {
			// Get the playlist items
			let playlistItems = document.querySelectorAll('#goodTube_playlistContainer a');

			// For each playlist item
			let clickNext = false;

			playlistItems.forEach((playlistItem) => {
				if (clickNext) {
					// Find the matching playlist item on the page and click it
					let bits = playlistItem.href.split('/watch');
					let findUrl = '/watch'+bits[1];

					// Desktop
					if (!goodTube_mobile) {
						clickedPlaylistItem = true;
						document.querySelector('#playlist-items > a[href="'+findUrl+'"]')?.click();
					}
					// Mobile
					else {
						clickedPlaylistItem = true;

						// Double check that the playlist is open, if not - open it.
						let playlistContainer = document.querySelector('ytm-playlist-panel-renderer');
						if (!playlistContainer) {
							let openButton = document.querySelector('ytm-playlist-panel-entry-point');

							if (openButton && !goodTube_nav_clickedPlaylistOpen) {
								goodTube_nav_clickedPlaylistOpen = true;
								openButton.click();
								setTimeout(goodTube_nav_next, 500);
							}

							return;
						}

						goodTube_nav_clickedPlaylistOpen = false;

						// Click the matching playlist item
						document.querySelector('ytm-playlist-panel-renderer a.compact-media-item-image[href="'+findUrl+'"]')?.click();
					}

					if (clickedPlaylistItem) {
						// Debug message
						console.log('[GoodTube] Playing next video in playlist...');
					}
				}

				if (playlistItem.classList.contains('goodTube_selected')) {
					clickNext = true;
				}
				else {
					clickNext = false;
				}
			});
		}

		// If we didn't click a playlist item, autoplay next video (only if they pressed the next button or autoplay is on)
		if (!clickedPlaylistItem && (goodTube_autoplay === 'true' || pressedButton)) {
			let youtubeFrameAPI = document.getElementById('movie_player');
			youtubeFrameAPI.nextVideo();

			// Debug message
			console.log('[GoodTube] Autoplaying next video...');
		}
	}

	// Setup the previous button history
	function goodTube_nav_setupPrevHistory() {
		// If we've hit the previous button
		if (goodTube_helper_getCookie('goodTube_previous') === 'true') {
			// Remove the last item from the previous video array
			goodTube_nav_prevVideo.pop();

			goodTube_helper_setCookie('goodTube_previous', 'false');
		}
		// Otherwise it's a normal video load
		else {
			// Add this page to the previous video array
			goodTube_nav_prevVideo.push(window.location.href);
		}
	}

	// Show or hide the next and previous button
	function goodTube_nav_showHideNextPrevButtons() {
		let prevButton = false;
		let nextButton = true;

		// Don't show next / prev unless we're viewing a video
		if (typeof goodTube_getParams['v'] === 'undefined') {
			prevButton = false;
			nextButton = false;
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
					prevButton = true;
				}
			}
			// Otherwise we're not in a playlist, so if a previous video exists
			else if (goodTube_nav_prevVideo[goodTube_nav_prevVideo.length - 2] && goodTube_nav_prevVideo[goodTube_nav_prevVideo.length - 2] !== window.location.href) {
				// Enable the previous button
				prevButton = true;
			}
		}

		// Tell the iframe to show or hide the previous button
		if (prevButton) {
			goodTube_player.contentWindow.postMessage('goodTube_prevButton_show', '*');
		}
		else {
			goodTube_player.contentWindow.postMessage('goodTube_prevButton_hide', '*');
		}

		// Tell the iframe to show or hide the next button
		if (nextButton) {
			goodTube_player.contentWindow.postMessage('goodTube_nextButton_show', '*');
		}
		else {
			goodTube_player.contentWindow.postMessage('goodTube_nextButton_hide', '*');
		}
	}


	/* Usage stats
	------------------------------------------------------------------------------------------ */
	// Don't worry everyone - this is just a counter that totals unique users / how many videos were played with GoodTube.
	// It's only in here so I can have some fun and see how many people use this thing I made - no private info is tracked.

	// Count unique users
	function goodTube_stats_user() {
		if (!goodTube_helper_getCookie('goodTube_embedUserUnique')) {
			fetch('https://api.counterapi.dev/v1/goodtube/users/up/');

			// Set a cookie to only count users once
			goodTube_helper_setCookie('goodTube_embedUserUnique', 'true');
		}
	}

	// Count videos
	function goodTube_stats_video() {
		fetch('https://api.counterapi.dev/v1/goodtube/videos/up/');
	}


	/* Core functions
	------------------------------------------------------------------------------------------ */
	// Init
	function goodTube_init() {
		/* Disable Youtube
		-------------------------------------------------- */
		// Mute, pause and skip ads
		goodTube_youtube_mutePauseSkipAds();
		setInterval(goodTube_youtube_mutePauseSkipAds, 1);

		// Add CSS classes to hide elements (without Youtube knowing)
		goodTube_helper_showHide_init();

		// Hide the youtube players
		goodTube_youtube_hidePlayers();
		setInterval(goodTube_youtube_hidePlayers, 100);

		// Add CSS to hide ads, shorts, etc
		goodTube_youtube_hideAdsShortsEtc();

		// Turn off autoplay
		setInterval(goodTube_youtube_turnOffAutoplay, 1000);

		// Hide shorts that popup as you use the site (like video results)
		setInterval(goodTube_youtube_hideShorts, 100);


		/* Load GoodTube
		-------------------------------------------------- */
		// Init our player (after DOM is loaded)
		document.addEventListener("DOMContentLoaded", goodTube_player_init);

		// Also check if the DOM is already loaded, as if it is, the above event listener will not trigger.
		if (document.readyState === "interactive" || document.readyState === "complete") {
			goodTube_player_init();
		}

		// Usage stats
		goodTube_stats_user();

		// Keyboard shortcuts (desktop only)
		if (!goodTube_mobile) {
			goodTube_shortcuts_init();
		}

		// Listen for messages from the iframe
		window.addEventListener('message', goodTube_receiveMessage);
	}

	// Listen for messages from the iframe
	function goodTube_receiveMessage(event) {
		// Make sure some data exists
		if (typeof event.data !== 'string') {
			return;
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

		// Previous video
		else if (event.data === 'goodTube_prevVideo') {
			goodTube_nav_prev();
		}

		// Next video
		else if (event.data === 'goodTube_nextVideo') {
			goodTube_nav_next();
		}

		// Theater mode (toggle)
		else if (event.data === 'goodTube_theater') {
			goodTube_shortcuts_trigger('theater');
		}

		// Autoplay (toggle)
		else if (event.data === 'goodTube_autoplayToggle') {
			if (goodTube_autoplay === 'true') {
				goodTube_helper_setCookie('goodTube_autoplay', 'false');
				goodTube_autoplay = 'false';
			}
			else {
				goodTube_helper_setCookie('goodTube_autoplay', 'true');
				goodTube_autoplay = 'true';
			}
		}
	}

	// Actions
	let goodTube_previousUrl = false;
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
			if (window.location.href.indexOf('.com/watch') !== -1) {
				// Setup the previous button history
				goodTube_nav_setupPrevHistory();

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

		// Generate the playlist links (used to navigate playlists correctly)
		goodTube_nav_generatePlaylistLinks();

		// Show or hide the next / prev buttons
		goodTube_nav_showHideNextPrevButtons();

		// Support timestamp links
		goodTube_youtube_timestampLinks();

		// Run actions again in 100ms to loop this function
		setTimeout(goodTube_actions, 100);
	}


	/* Iframe functions
	------------------------------------------------------------------------------------------ */
	// Are the next and previous buttons enabled?
	let goodTube_iframe_nextButton = true;
	let goodTube_iframe_prevButton = false;

	// Init
	function goodTube_iframe_init() {
		// Add the styles
		goodTube_iframe_style();

		// Get the iframe API
		goodTube_iframe_api = document.getElementById('movie_player');

		// Get the video data to check loading state
		let videoData = false;
		if (goodTube_iframe_api && typeof goodTube_iframe_api.getVideoData === 'function') {
			videoData = goodTube_iframe_api.getVideoData();
		}

		// Keep trying to get the frame API until it exists
		if (!videoData) {
			setTimeout(goodTube_iframe_init, 100);
			return;
		}

		// Add custom buttons
		goodTube_iframe_addCustomButtons();

		// Add custom events
		goodTube_iframe_addCustomEvents();

		// Add keyboard shortcuts
		goodTube_iframe_addKeyboardShortcuts();

		// Support picture in picture
		goodTube_pip_init();

		// Play the video
		goodTube_iframe_playVideo();

		// Run the iframe actions
		goodTube_iframe_actions();

		// Listen for messages from the parent window
		window.addEventListener('message', goodTube_iframe_receiveMessage);
	}

	// Actions
	function goodTube_iframe_actions() {
		// Update picture in picture
		goodTube_pip_update();

		// Run actions again in 100ms to loop this function
		setTimeout(goodTube_iframe_actions, 100);
	}

	// Style the iframe video
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
			.ytp-endscreen-content,
			.ytp-ad-progress-list,
			.ytp-endscreen-next,
			.ytp-endscreen-previous {
				display: none !important;
			}

			/* Make next and prev buttons not disabled */
			.ytp-prev-button,
			.ytp-next-button {
				opacity: 1 !important;
				cursor: pointer !important;
			}
		`;

		// // Add theater mode button (desktop only)
		if (!goodTube_mobile) {
			cssOutput += `
				.ytp-size-button {
					display: inline-block !important;
				}
			`;
		}

		// Enable the picture in picture button (unless you're on firefox)
		if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
			cssOutput += `
				.ytp-pip-button {
					display: inline-block !important;
				}
			`;
		}

		style.textContent = cssOutput;
		document.head.appendChild(style);
	}

	// Add custom buttons
	function goodTube_iframe_addCustomButtons() {
		// Target the play button
		let playButton = document.querySelector('.ytp-play-button');

		// Make sure it exists before continuing
		if (!playButton) {
			setTimeout(goodTube_iframe_addCustomButtons, 100);
			return;
		}


		// Previous button
		let prevButton = document.querySelector('.ytp-prev-button');
		if (prevButton) {
			// Add actions
			prevButton.addEventListener('click', function() {
				// Tell the parent frame to go to the previous video
				window.parent.postMessage('goodTube_prevVideo', '*');
			});
		}


		// Next button
		let nextButton = document.querySelector('.ytp-next-button');
		if (nextButton) {
			// Add actions
			nextButton.addEventListener('click', function() {
				// Tell the parent frame to go to the next video
				window.parent.postMessage('goodTube_nextVideo', '*');
			});
		}


		// Theater mode button
		let theaterButton = document.querySelector('.ytp-size-button');
		if (theaterButton) {
			// Style button
			theaterButton.setAttribute('data-tooltip-target-id', 'ytp-size-button');
			theaterButton.setAttribute('data-title-no-tooltip', 'Theater mode (m)');
			theaterButton.setAttribute('aria-label', 'Theater mode (m)');
			theaterButton.setAttribute('title', 'Theater mode (m)');
			theaterButton.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-30"></use><path d="m 28,11 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z" fill="#fff" fill-rule="evenodd" id="ytp-id-30"></path></svg>';

			// Add actions
			theaterButton.addEventListener('click', function() {
				// Tell the parent window to toggle theater mode
				window.parent.postMessage('goodTube_theater', '*');
			});
		}


		// Add autoplay button (before subtitles button, desktop only)
		if (!goodTube_mobile) {
			let subtitlesButton = document.querySelector('.ytp-subtitles-button');
			if (subtitlesButton) {
				// Add button
				subtitlesButton.insertAdjacentHTML('beforebegin', '<button class="ytp-button" id="goodTube_autoplayButton" data-priority="2" data-tooltip-target-id="ytp-autonav-toggle-button"><div class="ytp-autonav-toggle-button-container"><div class="ytp-autonav-toggle-button" aria-checked="true"></div></div></button>');

				// Add actions
				let autoplayButton = document.querySelector('#goodTube_autoplayButton');
				if (autoplayButton) {
					autoplayButton.addEventListener('click', function() {
						// Toggle the style of the autoplay button
						let innerButton = autoplayButton.querySelector('.ytp-autonav-toggle-button');
						let innerButtonState = innerButton.getAttribute('aria-checked');

						if (innerButtonState === 'true') {
							innerButton.setAttribute('aria-checked', 'false');
						}
						else {
							innerButton.setAttribute('aria-checked', 'true');
						}

						// Tell the parent window to toggle autoplay
						window.parent.postMessage('goodTube_autoplayToggle', '*');
					});
				}
			}
		}
	}

	// Add custom events
	function goodTube_iframe_addCustomEvents() {
		// Target the video element
		let videoElement = document.querySelector('#player video');

		// Make sure it exists before continuing
		if (!videoElement) {
			setTimeout(goodTube_iframe_addCustomEvents, 100);
			return;
		}

		// When the video ends
		videoElement.addEventListener('ended', function() {
			// Tell the parent frame to go to the next video
			window.parent.postMessage('goodTube_nextVideo', '*');
		});
	}

	// Add keyboard shortcuts
	function goodTube_iframe_addKeyboardShortcuts() {
		document.addEventListener('keydown', function(event) {
			// Don't do anything if we're holding control
			if (event.ctrlKey) {
				return;
			}

			// Theater mode (t)
			if (event.key === 't') {
				// Tell the parent window to toggle theater mode
				window.parent.postMessage('goodTube_theater', '*');
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
				// Tell the parent window to go to the previous video
				window.parent.postMessage('goodTube_prevVideo', '*');
			}

			// Next video (shift+n)
			else if (event.key.toLowerCase() === 'n' && event.shiftKey) {
				// Tell the parent window to go to the next video
				window.parent.postMessage('goodTube_nextVideo', '*');
			}
		});
	}

	// Receive a message from the parent window
	function goodTube_iframe_receiveMessage(event) {
		// Make sure some data exists
		if (typeof event.data !== 'string') {
			return;
		}

		// Load video
		if (event.data.indexOf('goodTube_load_') !== -1) {
			let videoId = event.data.replace('goodTube_load_', '');

			goodTube_iframe_api.loadVideoById(videoId);
		}

		// Stop video
		else if (event.data === 'goodTube_stopVideo') {
			goodTube_iframe_api.stopVideo();
		}

		// Set autoplay state
		else if (event.data.indexOf('goodTube_autoplay_') !== -1) {
			// Get the data and expose it globally
			goodTube_autoplay = event.data.replace('goodTube_autoplay_', '');

			// Toggle the style of the autoplay button
			let autoplayToggleButton = document.querySelector('#goodTube_autoplayButton .ytp-autonav-toggle-button');
			if (autoplayToggleButton) {
				autoplayToggleButton.setAttribute('aria-checked', goodTube_autoplay);
			}
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

		// Show the previous button
		else if (event.data === 'goodTube_prevButton_hide') {
			goodTube_iframe_prevButton = false;
			let prevButton = document.querySelector('.ytp-prev-button');
			if (prevButton) {
				prevButton.style.display = 'none';
			}
		}
		// Hide the previous button
		else if (event.data === 'goodTube_prevButton_show') {
			goodTube_iframe_prevButton = true;
			let prevButton = document.querySelector('.ytp-prev-button');
			if (prevButton) {
				prevButton.style.display = 'block';
			}
		}

		// Show the next button
		else if (event.data === 'goodTube_nextButton_hide') {
			goodTube_iframe_nextButton = false;
			let nextButton = document.querySelector('.ytp-next-button');
			if (nextButton) {
				nextButton.style.display = 'none';
			}
		}
		// Hide the next button
		else if (event.data === 'goodTube_nextButton_show') {
			goodTube_iframe_nextButton = true;
			let nextButton = document.querySelector('.ytp-next-button');
			if (nextButton) {
				nextButton.style.display = 'block';
			}
		}
	}

	// Play the iframe video
	function goodTube_iframe_playVideo() {
		// // Target the play button
		// let bigPlayButton = document.querySelector('.ytp-large-play-button');
		// let smallPlayButton = document.querySelector('.ytp-play-button');

		// // Make sure it exists
		// if (!bigPlayButton && !smallPlayButton) {
		// 	setTimeout(goodTube_iframe_playVideo, 100);
		// 	return;
		// }

		// // Click it
		// if (smallPlayButton) {
		// 	console.log('here');
		// 	document.querySelector('video').play();
		// 	console.log(document.querySelector('video'));
		// 	smallPlayButton.click();
		// }
		// else if (bigPlayButton) {
		// 	bigPlayButton.click();
		// }
	}

	// Skip to time
	function goodTube_iframe_skipTo(time) {
		// Target the video
		let videoElement = document.querySelector('video');

		// If the video exists, restore the time
		if (videoElement) {
			videoElement.currentTime = parseFloat(time);
		}
		// Otherwise retry until the video exists
		else {
			setTimeout(goodTube_iframe_skipTo, 100);
		}
	}

	// Pause
	function goodTube_iframe_pause() {
		// Target the video
		let videoElement = document.querySelector('video');

		// If the video exists, restore the time
		if (videoElement) {
			videoElement.pause();
		}
		// Otherwise retry until the video exists
		else {
			setTimeout(goodTube_iframe_pause, 100);
		}
	}

	// Play
	function goodTube_iframe_play() {
		// Target the video
		let videoElement = document.querySelector('video');

		// If the video exists, restore the time
		if (videoElement) {
			videoElement.play();
		}
		// Otherwise retry until the video exists
		else {
			setTimeout(goodTube_iframe_pause, 100);
		}
	}


	/* Picture in picture
	------------------------------------------------------------------------------------------ */
	// Init
	function goodTube_pip_init() {
		// If we leave the picture in picture
		addEventListener('leavepictureinpicture', (event) => {
			goodTube_pip = false;

			// Set the picture in picture state in the parent window
			window.parent.postMessage('goodTube_pip_false', '*');
		});

		// If we enter the picture in picture
		addEventListener('enterpictureinpicture', (event) => {
			goodTube_pip = true;

			// Set the picture in picture state in the parent window
			window.parent.postMessage('goodTube_pip_true', '*');
		});
	}

	// Update
	function goodTube_pip_update() {
		if (!goodTube_pip) {
			return;
		}

		// Support play and pause (but only attach these events once!)
		if ("mediaSession" in navigator) {
			// Next track
			if (goodTube_iframe_nextButton) {
				navigator.mediaSession.setActionHandler("nexttrack", () => {
					// Tell the parent frame to go to the next video
					window.parent.postMessage('goodTube_nextVideo', '*');
				});
			}
			else {
				navigator.mediaSession.setActionHandler('nexttrack', null);
			}

			// Prev track
			if (goodTube_iframe_prevButton) {
				navigator.mediaSession.setActionHandler("previoustrack", () => {
					// Tell the parent frame to go to the previous video
					window.parent.postMessage('goodTube_prevVideo', '*');
				});
			}
			else {
				navigator.mediaSession.setActionHandler('previoustrack', null);
			}
		}
	}


	/* Start GoodTube
	------------------------------------------------------------------------------------------ */
	// Youtube page
	if (window.top === window.self) {
		goodTube_init();
	}
	// Iframe embed
	else {
		goodTube_iframe_init();
	}


})();

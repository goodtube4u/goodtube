// ==UserScript==
// @name         GoodTube
// @namespace    http://tampermonkey.net/
// @version      2.099
// @description  Loads Youtube videos from different sources. Also removes ads, shorts, etc.
// @author       GoodTube
// @match        https://*.youtube.com/*
// @icon         https://cdn-icons-png.flaticon.com/256/1384/1384060.png
// @run-at       document-start
// @grant        none
// @updateURL    https://github.com/goodtube4u/goodtube/raw/main/goodtube.user.js
// @downloadURL  https://github.com/goodtube4u/goodtube/raw/main/goodtube.user.js
// @noframes
// ==/UserScript==

(function() {
	'use strict';

	/* Config
	------------------------------------------------------------------------------------------ */
	// Set your github location for loading assets, etc
	let goodTube_github = 'https://raw.githubusercontent.com/goodtube4u/GoodTube/main';

	// Select how long to wait before trying to load something again (in milliseconds)
	let goodTube_retryDelay = 500;

	// Select how many times to try and load something again
	let goodTube_retryAttempts = 5;

	// Enable debug console messages
	let goodTube_debug = true;


	/* Helper functions
	------------------------------------------------------------------------------------------ */
	// Convert seconds to HH:MM:SS
	function goodTube_helper_formatTime(secs) {
		var sec_num = parseInt(secs, 10);
		var hours = Math.floor(sec_num / 3600);
		var minutes = Math.floor(sec_num / 60) % 60;
		var seconds = sec_num % 60;

		return [hours,minutes,seconds]
		.map(v => v < 10 ? "0" + v : v)
		.filter((v,i) => v !== "00" || i > 0)
		.join(":");
	}

	// Find all HTML tags that match a regular expression
	function goodTube_helper_tagMatches(regEx) {
		return Array.prototype.slice.call(document.querySelectorAll('*')).filter(function(element) {
			return element.tagName.match(regEx);
		});
	}

	// Parse GET parameters
	function goodTube_helper_parseGetParams() {
		let getParams = {};

		document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function() {
			function decode(s) {
				return decodeURIComponent(s.split("+").join(" "));
			}

			getParams[decode(arguments[1])] = decode(arguments[2]);
		});

		return getParams;
	}

	// Set a cookie
	function goodTube_helper_setCookie(name, value) {
		// 399 days
		document.cookie = name + "=" + encodeURIComponent(value) + "; max-age=" + (399*24*60*60);
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

	// Hide an element (without Youtube knowing)
	function goodTube_helper_hideElement_init() {
		let style = document.createElement('style');
		style.textContent = `
			.goodTube_hidden {
				position: fixed !important;
				pointer-events: none !important;
				top: -999px !important;
				left: -999px !important;
				opacity: 0 !important;
			}
		`;

		document.head.appendChild(style);
	}

	function goodTube_helper_hideElement(element) {
		if (element && !element.classList.contains('goodTube_hidden')) {
			element.classList.add('goodTube_hidden');
		}
	}

	function goodTube_helper_showElement(element) {
		if (element && element.classList.contains('goodTube_hidden')) {
			element.classList.remove('goodTube_hidden');
		}
	}


	/* Youtube functions
	------------------------------------------------------------------------------------------ */
	let goodTube_syncing = true;
	let goodTube_previousSyncTime = 0;

	// Hide ads, shorts, etc - init
	function goodTube_youtube_hideAdsShortsEtc_init() {
		let style = document.createElement('style');
		style.textContent = `
			ytd-shelf-renderer,
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
			ytd-engagement-panel-section-list-renderer,
			ytd-compact-video-renderer:has(.goodTube_hidden),
			ytd-rich-item-renderer:has(> #content > ytd-ad-slot-renderer)
			.ytd-video-masthead-ad-v3-renderer,
			div#root.style-scope.ytd-display-ad-renderer.yt-simple-endpoint,
			div#sparkles-container.style-scope.ytd-promoted-sparkles-web-renderer,
			div#main-container.style-scope.ytd-promoted-video-renderer,
			div#player-ads.style-scope.ytd-watch-flexy,

			ytm-rich-shelf-renderer,
			ytm-shelf-renderer,
			ytm-button-renderer.icon-avatar_logged_out,
			ytm-companion-slot,
			ytm-shelf-renderer,
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
		if (goodTube_debug) {
			console.log('[GoodTube] Ads removed');
		}
	}

	// Hide ads, shorts, etc - real time
	function goodTube_youtube_hideAdsShortsEtc_realTime() {
		// If we're on a channel page, don't hide shorts
		if (window.location.href.indexOf('@') !== -1) {
			return;
		}

		// Hide shorts links
		let shortsLinks = document.querySelectorAll('a');
		shortsLinks.forEach((element) => {
			if (element.href.indexOf('shorts/') !== -1) {
				goodTube_helper_hideElement(element);
				goodTube_helper_hideElement(element.closest('ytd-video-renderer'));
			}
		});
	}

	// Remove that annoying "Are you still watching" prompt
	function goodTube_youtube_areYouStillWatching() {
		let textElements = document.querySelectorAll('yt-confirm-dialog-renderer yt-formatted-string:not(.goodTube_clicked)');
		textElements.forEach((element) => {
			element.classList.add('goodTube_clicked');
			if (element.innerHTML.toLowerCase().indexOf('continue watching') !== -1) {
				document.querySelector('yt-confirm-dialog-renderer button').click();
			}
		});
	}

	// Support timestamp links in comments
	function goodTube_youtube_timestampLinks() {
		// Links in video description and comments
		let timestampLinks = document.querySelectorAll('#description a, ytd-comments .yt-core-attributed-string a');

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
						goodTube_player_skipTo(goodTube_player, time);
					}
				});
			}
		});
	}

	// Hide all Youtube players
	function goodTube_youtube_hidePlayers() {
		// Hide the normal Youtube player
		let regularPlayers = document.querySelectorAll('#player:not(.ytd-channel-video-player-renderer):not(.goodTube_hidden)');
		regularPlayers.forEach((element) => {
			goodTube_helper_hideElement(element);
		});

		// Hide the mobile buttons
		let mobileButtons = document.querySelectorAll('#player-control-container:not(.goodTube_hidden)');
		mobileButtons.forEach((element) => {
			goodTube_helper_hideElement(element);
		});

		// Remove the full screen Youtube player
		let fullscreenPlayers = document.querySelectorAll('#full-bleed-container:not(.goodTube_hidden)');
		fullscreenPlayers.forEach((element) => {
			goodTube_helper_hideElement(element);
		});

		// Hide the Youtube miniplayer
		let miniPlayers = document.querySelectorAll('ytd-miniplayer:not(.goodTube_hidden)');
		miniPlayers.forEach((element) => {
			goodTube_helper_hideElement(element);
		});

		// Turn off autoplay
		let autoplayButton = false;

		// Desktop
		if (window.location.href.indexOf('m.youtube') === -1) {
			autoplayButton = document.querySelector('.ytp-autonav-toggle-button');

			// Turn off the youtube autoplay button
			if (autoplayButton && autoplayButton.getAttribute('aria-checked') === 'true') {
				autoplayButton.click();
			}
		}
		// Mobile
		else {
			autoplayButton = document.querySelector('.ytm-autonav-toggle-button-container[aria-label="Autoplay is on"]');

			// Turn off the youtube autoplay button
			if (autoplayButton) {
				autoplayButton.click();
			}
		}
	}

	// Mute, pause and skip ads on all Youtube videos
	function goodTube_youtube_mutePauseSkipAds() {
		let youtubeVideos = document.querySelectorAll('video:not(#goodTube_player):not(#goodTube_player_html5_api)');
		youtubeVideos.forEach((element) => {
			// Allow the inline / thumbnail hover player
			if (!element.closest('#inline-player')) {
				element.muted = true;

				// If we're not syncing the videos, or our player hasn't loaded yet - pause the youtube player
				if (!goodTube_syncing || !goodTube_player) {
					element.pause();
				}

				// Always skip the ads by clicking the skip button
				let skipButton = document.querySelector('.ytp-skip-ad-button');
				if (skipButton) {
					skipButton.click();
				}
			}
		});
	}

	// Sync players
	function goodTube_youtube_syncPlayers() {
		let youtube_player = document.querySelector('#player video');

		// If the youtube player exists, our player is loaded and we're viewing a video
		if (youtube_player && goodTube_videojs_player_loaded && typeof goodTube_getParams['v'] !== 'undefined') {
			// Don't keep syncing the same time over and over unless it's 0
			let sync_time = goodTube_player.currentTime;
			if (sync_time === goodTube_previousSyncTime && parseFloat(sync_time) > 0) {
				return;
			}

			goodTube_previousSyncTime = sync_time;

			// Set the current time of the Youtube player to match ours (this makes history and watched time work correctly)
			youtube_player.currentTime = sync_time;

			// We're syncing
			goodTube_syncing = true;

			// Play for 10ms to make history work
			youtube_player.play();

			setTimeout(function() {
				youtube_player.pause();

				// We've finished syncing
				goodTube_syncing = false;
			}, 10);
		}
	}


	/* Player functions
	------------------------------------------------------------------------------------------ */
	let goodTube_pendingRetry = [];
	let goodTube_player_restoreTime = 0;
	let goodTube_player_assets = [
		goodTube_github+'/js/videojs-core.js',
		goodTube_github+'/js/videojs-vtt-thumbnails.js',
		goodTube_github+'/js/videojs-quality-selector.js',
		goodTube_github+'/css/videojs-core.css',
		goodTube_github+'/css/videojs-vtt-thumbnails.css'
	];
	let goodTube_player_loadedAssets = 0;
	let goodTube_player_loadAssetAttempts = 0;
	let goodTube_player_loadVideoDataAttempts = 0;
	let goodTube_player_vttThumbnailsFunction = false;
	let goodTube_player_reloadVideoAttempts = 1;
	let goodTube_player_ended = false;
	let goodTube_player_pip = false;
	let goodTube_player_miniplayer = false;
	let goodTube_player_miniplayer_video = false;

	// Init
	function goodTube_player_init() {
		// If the target Youtube page element does not exist OR the assets are not loaded, call this function again next drawframe
		let youtubePageElement = false;
		// Desktop
		if (window.location.href.indexOf('m.youtube') === -1) {
			youtubePageElement = document.getElementById('below');
		}
		// Mobile
		else {
			youtubePageElement = document.querySelector('body');
		}

		if (!youtubePageElement || goodTube_player_loadedAssets < goodTube_player_assets.length) {
			setTimeout(function() {
				goodTube_player_init();
			}, 0);

			return;
		}

		// Add CSS styles for the player
		let style = document.createElement('style');
		style.textContent = `
			/* Mobile video time */
			#goodTube_videoTime {
				position: absolute;
				left: 20px;
				bottom: 72px;
				font-size: 12px;
				font-weight: 700;
				z-index: 999;
				color: #ffffff;
				pointer-events: none;
				opacity: 0;
				transition: opacity .2s linear;
			}

			.vjs-user-active #goodTube_videoTime {
				opacity: 1;
			}

			#goodTube_videoTime #goodTube_currentTime {
			}

			#goodTube_videoTime #goodTube_endTime {
				opacity: .7;
			}


			/* Double tap or tap and hold elements for seeking on mobile */
			#goodTube_seekBackwards {
				position: absolute;
				top: 0;
				left: 0;
				bottom: 48px;
				content: '';
				width: 25%;
			}

			#goodTube_seekForwards {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 48px;
				content: '';
				width: 25%;
			}

			/* Theater mode */
			ytd-watch-flexy[theater] #goodTube_player_wrapper1:not(.goodTube_mobile) {
				width: 100%;
				position: absolute;
				top: 56px;
				left: 0;
				right: 0;
				background: #000000;
				border-radius: 0;
			}
			ytd-watch-flexy[theater] #below {
				margin-top: var(--ytd-watch-flexy-max-player-height) !important;
				padding-top: 8px !important;
			}
			ytd-watch-flexy[theater] #secondary {
				margin-top: var(--ytd-watch-flexy-max-player-height) !important;
				padding-top: 16px !important;
			}

			/* Desktop */
			#goodTube_player_wrapper1:not(.goodTube_mobile) {
				position: relative;
			}

			#goodTube_player_wrapper1:not(.goodTube_mobile) #goodTube_player_wrapper2 {
				max-width: var(--ytd-watch-flexy-max-player-width);
				min-width: var(--ytd-watch-flexy-min-player-width);
				margin: 0 auto;
			}

			#goodTube_player_wrapper1:not(.goodTube_mobile) #goodTube_player_wrapper3 {
				box-sizing: border-box;
				height: var(--ytd-watch-flexy-max-player-height);
				min-height: var(--ytd-watch-flexy-min-player-height);
			}

			#goodTube_player_wrapper1:not(.goodTube_mobile):not(.goodTube_miniplayer) #goodTube_player {
				border-radius: 12px;
			}

			#goodTube_player_wrapper1.goodTube_miniplayer.goodTube_mobile {
				position: absolute !important;
			}

			#goodTube_player_wrapper3 {
				background: #000000;
				overflow: hidden;
			}

			#goodTube_player_wrapper1:not(.goodTube_mobile) #goodTube_player_wrapper3 {
				border-radius: 12px;
			}

			/* Miniplayer */
			#goodTube_player_wrapper1.goodTube_miniplayer {
				z-index: 999 !important;
			}

			#goodTube_player_wrapper1.goodTube_miniplayer #goodTube_player_wrapper3 .video-js {
				position: fixed;
				bottom: 12px;
				right: 12px;
				width: 400px;
				max-width: calc(100% - 24px);
				min-height: 0;
				padding-top: 0;
				z-index: 999;
				height: auto;
				left: auto;
				aspect-ratio: 16 / 9;
				top: auto;
				border-radius: 12px;
				overflow: hidden;
			}

			#goodTube_player_wrapper1.goodTube_miniplayer.goodTube_mobile  #goodTube_player_wrapper3 .video-js {
				bottom: 60px;
			}

			ytd-watch-flexy.goodTube_miniplayer {
				display: block !important;
				top: 0;
				left: 0;
				position: fixed;
				z-index: 999;
				top: -9999px;
				left: -9999px;
			}

			#goodTube_player_wrapper1.goodTube_miniplayer #goodTube_player_wrapper3 .video-js .vjs-source-button,
			#goodTube_player_wrapper1.goodTube_miniplayer #goodTube_player_wrapper3 .video-js .vjs-autoplay-button,
			#goodTube_player_wrapper1.goodTube_miniplayer #goodTube_player_wrapper3 .video-js .vjs-miniplayer-button,
			#goodTube_player_wrapper1.goodTube_miniplayer #goodTube_player_wrapper3 .video-js .vjs-theater-button {
				display: none !important;
			}

			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js #goodTube_miniplayer_closeButton,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js #goodTube_miniplayer_expandButton {
				font-family: VideoJS;
				font-weight: 400;
				font-style: normal;
				cursor: pointer;
				position: absolute;
				top: 0;
				width: 48px;
				height: 48px;
				line-height: 48px;
				text-align: center;
				z-index: 999;
				color: #ffffff;
				opacity: 0;
				transition: opacity .2s linear;
			}


			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js #goodTube_miniplayer_closeButton::after {
				content: 'Close';
				right: 12px;
			}
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js #goodTube_miniplayer_expandButton::after {
				content: 'Expand';
				left: 12px;
			}
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js #goodTube_miniplayer_closeButton::after,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js #goodTube_miniplayer_expandButton::after {
				position: absolute;
				bottom: -24px;
				background: rgba(0, 0, 0, .75);
				border-radius: 4px;
				font-size: 12px;
				font-weight: 700;
				padding: 8px;
				white-space: nowrap;
				opacity: 0;
				transition: opacity .1s;
				pointer-events: none;
				text-shadow: none !important;
				z-index: 1;
				font-family: 'MS Shell Dlg 2', sans-serif;
				line-height: initial;
			}
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js #goodTube_miniplayer_closeButton:hover::after,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js #goodTube_miniplayer_expandButton:hover::after {
				opacity: 1;
			}


			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js #goodTube_miniplayer_closeButton {
				right: 0;
				font-size: 24px;
			}
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js #goodTube_miniplayer_closeButton::before {
				content: "\\f119";
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}

			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js #goodTube_miniplayer_expandButton {
				left: 0;
				font-size: 18px;
			}
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js #goodTube_miniplayer_expandButton::before {
				content: "\\f128";
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}


			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js.vjs-paused:not(.vjs-user-inactive) #goodTube_miniplayer_expandButton,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js.vjs-user-active #goodTube_miniplayer_expandButton,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js.vjs-paused:not(.vjs-user-inactive) #goodTube_miniplayer_closeButton,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js.vjs-user-active #goodTube_miniplayer_closeButton {
				opacity: 1;
			}

			/* Mobile */
			html body #goodTube_player_wrapper1.goodTube_mobile {
				position: fixed;
				top: 48px;
				left: 0;
				right: 0;
				width: 100%;
				z-index: 1;
			}

			html body #goodTube_player_wrapper1.goodTube_mobile #goodTube_player_wrapper2 {
				width: 100%;
				height: 100%;
			}

			html body #goodTube_player_wrapper1.goodTube_mobile #goodTube_player_wrapper3 {
				width: 100%;
				height: 100%;
			}

			html body #goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-control.vjs-play-control,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js .vjs-control.vjs-play-control {
				position: absolute;
				top: calc(50% - 48px);
				left: calc(50% - 32px);
				width: 64px;
				height: 64px;
				background: rgba(0, 0, 0, .3);
				border-radius: 50%;
				max-width: 999px !important;
			}
			html body #goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-play-control .vjs-icon-placeholder::before,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js .vjs-play-control .vjs-icon-placeholder::before {
				font-size: 44px !important;
			}

			html body #goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-prev-button,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js .vjs-prev-button {
				position: absolute;
				top: calc(50% - 40px);
				left: calc(50% - 104px);
				width: 48px;
				height: 48px;
				background: rgba(0, 0, 0, .3);
				border-radius: 50%;
				max-width: 999px !important;
			}
			html body #goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-prev-button .vjs-icon-placeholder::before,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js .vjs-prev-button .vjs-icon-placeholder::before {
				font-size: 32px !important;
			}

			html body #goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-next-button,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js .vjs-next-button {
				position: absolute;
				top: calc(50% - 40px);
				left: calc(50% + 56px);
				width: 48px;
				height: 48px;
				background: rgba(0, 0, 0, .3);
				border-radius: 50%;
				max-width: 999px !important;
			}
			html body #goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-next-button .vjs-icon-placeholder::before,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js .vjs-next-button .vjs-icon-placeholder::before {
				font-size: 32px !important;
			}

			html body #goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-progress-control,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js .vjs-progress-control {
				top: auto !important;
				bottom: 26px !important;
				height: 48px !important;
			}

			html body #goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-control-bar,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js .vjs-control-bar {
				z-index: 1;
				position: static;
				margin-top: auto;
				justify-content: space-around;
			}

			html body #goodTube_player_wrapper1.goodTube_mobile .video-js,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js {
				display: flex;
			}

			html body #goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-source-button,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js .vjs-source-button {
				margin-left: 0 !important;
			}

			@media (max-width: 480px) {
				html body #goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-source-button .vjs-menu,
				html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js .vjs-source-button .vjs-menu {
					left: 60px !important;
				}
			}

			html body #goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-loading-spinner,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js .vjs-loading-spinner {
				top: calc(50% - 16px);
			}

			html body #goodTube_player_wrapper1.goodTube_mobile .video-js::before,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js::before {
				content: '';
				background: transparent;
				transition: background .2s ease-in-out;
				pointer-events: none;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 1;
			}

			html body #goodTube_player_wrapper1.goodTube_mobile .video-js.vjs-paused:not(.vjs-user-inactive)::before,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js.vjs-paused:not(.vjs-user-inactive)::before,
			html body #goodTube_player_wrapper1.goodTube_mobile .video-js.vjs-user-active::before,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js.vjs-user-active::before {
				background: rgba(0,0,0,.6);
			}

			html body #goodTube_player_wrapper1.goodTube_mobile .video-js.vjs-user-inactive .vjs-control-bar,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js.vjs-user-inactive .vjs-control-bar {
				visibility: visible;
				opacity: 0;
				pointer-events: none;
			}

			#goodTube_player_wrapper1.goodTube_mobile #goodTube_player_wrapper3 .video-js .vjs-theater-button,
			#goodTube_player_wrapper1.goodTube_mobile #goodTube_player_wrapper3 .video-js .vjs-miniplayer-button {
				display: none !important;
			}

			/* Video */
			#goodTube_player {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				width: 100%;
				height: 100%;
				background: #000000;
				z-index: 1;
			}

			#goodTube_player:focus {
				outline: 0;
			}

			/* Error */
			#goodTube_error {
				position: absolute;
				top: 50%;
				left: 40px;
				right: 40px;
				transform: translateY(-50%);
				text-align: center;
				color: #ffffff;
				font-size: 20px;
			}

			#goodTube_error small {
				padding-top: 8px;
				display: block;
			}
		`;
		document.head.appendChild(style);

		// Setup player layout
		let player_wrapper1 = document.createElement('div');
		player_wrapper1.id = 'goodTube_player_wrapper1';

		let player_wrapper2 = document.createElement('div');
		player_wrapper2.id = 'goodTube_player_wrapper2';

		let player_wrapper3 = document.createElement('div');
		player_wrapper3.id = 'goodTube_player_wrapper3';

		// Add player to the page

		// Desktop
		if (window.location.href.indexOf('m.youtube') === -1) {
			youtubePageElement.before(player_wrapper1);
		}
		// Mobile
		else {
			player_wrapper1.classList.add('goodTube_mobile');
			youtubePageElement.appendChild(player_wrapper1);

			setInterval(function() {
				if (typeof goodTube_getParams['v'] !== 'undefined') {
					let youtubeSize_element = document.querySelector('#player');
					if (youtubeSize_element) {
						player_wrapper1.style.height = youtubeSize_element.offsetHeight+'px';
						player_wrapper1.style.width = youtubeSize_element.offsetWidth+'px';
					}
				}
				else {
					player_wrapper1.style.height = '0';
					player_wrapper1.style.width = '0';
				}
			}, 1);
		}

		player_wrapper1.appendChild(player_wrapper2);
		player_wrapper2.appendChild(player_wrapper3);

		// Add video
		let player = document.createElement('video');
		player.id = 'goodTube_player';
		player.classList.add('video-js');
		player.controls = true;
		player.setAttribute('tab-index', '1');
		player_wrapper3.appendChild(player);

		// Expose the player globally
		goodTube_player = player;

		// Init picture in picture
		goodTube_player_pipInit();

		// Init videojs
		goodTube_player_videojs();

		// Sync players every 10s
		setInterval(goodTube_youtube_syncPlayers, 10000);

		// Listen for keyboard shortcuts
		document.addEventListener('keydown', function(event) {
			// Don't do anything if we're holding shift (this is often used when doing text selection)
			if (event.shiftKey) {
				return;
			}

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
				let keyPressed = event.key.toLowerCase();

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

					// Theater mode (youtube shortcut doesn't work if we're in here)
					if (keyPressed === 't') {
						goodTube_shortcut('theater');
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
				if (keyPressed === ' ') {
					if (player.paused || player.ended) {
						player.play();
					}
					else {
						player.pause();
					}
				}

				// Toggle mute
				if (keyPressed === 'm') {
					if (player.muted) {
						player.muted = false;
					}
					else {
						player.muted = true;
					}
				}

				// Toggle miniplayer
				if (keyPressed === 'i') {
					event.stopImmediatePropagation();
					goodTube_player_miniplayerShowHide();
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
		}, true);

		// If we're on mobile, set the volume to 100%
		if (window.location.href.indexOf('m.youtube') !== -1) {
			goodTube_player_volume(goodTube_player, 1);
		}
	}

	// Load assets
	function goodTube_player_loadAssets() {
		// Debug message
		if (goodTube_debug) {
			console.log('[GoodTube] Loading player assets...');
		}

		// Load the first asset, this will then load the others sequentially
		goodTube_player_loadAssetAttempts = 0;
		goodTube_player_loadAsset(goodTube_player_assets[goodTube_player_loadedAssets]);
	}

	function goodTube_player_loadAsset(asset) {
		// Only re-attempt to load the video data max configured retry attempts
		goodTube_player_loadAssetAttempts++;
		if (goodTube_player_loadAssetAttempts > goodTube_retryAttempts) {

			// Debug message
			if (goodTube_debug) {
				console.log('[GoodTube] Player assets could not be loaded');
			}

			return;
		}

		fetch(asset)
		.then(response => response.text())
		.then(data => {
			let asset_element = false;

			if (asset.indexOf('/js/') !== -1) {
				asset_element = document.createElement('script');
			}
			else if (asset.indexOf('/css/') !== -1) {
				asset_element = document.createElement('style');
			}

			asset_element.innerHTML = data;
			document.head.appendChild(asset_element);

			goodTube_player_loadedAssets++;

			// If we've loaded all the assets
			if (goodTube_player_loadedAssets >= goodTube_player_assets.length) {
				// Debug message
				if (goodTube_debug) {
					console.log('[GoodTube] Player assets loaded');
				}
			}
			// Otherwise load the next asset
			else {
				goodTube_player_loadAsset(goodTube_player_assets[goodTube_player_loadedAssets]);
			}
		})
		.catch((error) => {
			if (typeof goodTube_pendingRetry['loadAsset'] !== 'undefined') {
				clearTimeout(goodTube_pendingRetry['loadAsset']);
			}

			goodTube_pendingRetry['loadAsset'] = setTimeout(function() {
				goodTube_player_loadAsset(asset);
			}, goodTube_retryDelay);
		});
	}

	// Select API
	function goodTube_player_selectApi(url) {
		goodTube_apis.forEach((api) => {
			if (url == api['url']) {
				goodTube_api_type = api['type'];
				goodTube_api_proxy = api['proxy'];
				goodTube_api_url = api['url'];
				goodTube_api_name = api['name'];

				goodTube_helper_setCookie('goodTube_api', url);
			}
		});
	}

	// Pause
	function goodTube_player_pause(player) {
		player.pause();
	}

	// Play
	function goodTube_player_play(player) {
		player.play();
	}

	// Volume
	function goodTube_player_volume(player, volume) {
		player.volume = volume;
	}

	// Skip to
	function goodTube_player_skipTo(player, time) {
		player.currentTime = time;
	}

	// Load video
	function goodTube_player_loadVideo(player) {
		// If we're not viewing a video
		if (typeof goodTube_getParams['v'] === 'undefined') {
			// Empty the previous video history
			goodTube_videojs_previousVideo = [];

			// Then return, we don't do anything else.
			return;
		}

		// Clear any pending reloadVideo attempts
		goodTube_player_reloadVideoAttempts = 1;
		if (typeof goodTube_pendingRetry['reloadVideo'] !== 'undefined') {
			clearTimeout(goodTube_pendingRetry['reloadVideo']);
		}

		// Clear any pending loadVideoData attempts
		if (typeof goodTube_pendingRetry['loadVideoData'] !== 'undefined') {
			clearTimeout(goodTube_pendingRetry['loadVideoData']);
		}

		// Clear the player
		goodTube_player_clear(player);

		// Only re-attempt to load the video data max configured retry attempts
		goodTube_player_loadVideoDataAttempts++;
		if (goodTube_player_loadVideoDataAttempts > goodTube_retryAttempts) {
			// Show an error message
			goodTube_player_videojs_showError();

			// Debug message
			if (goodTube_debug) {
				console.log('[GoodTube] Video data could not be loaded - please select another video source');
			}

			return;
		}

		// Remove any existing video sources
		let videoSources_existing = player.querySelectorAll('source');
		videoSources_existing.forEach((videoSource) => {
			videoSource.remove();
		});

		// Setup API endpoint to get video data from
		let apiEndpoint = false;

		if (goodTube_api_type === 1) {
			apiEndpoint = goodTube_api_url+"/api/v1/videos/"+goodTube_getParams['v'];
		}

		// Set the current video ID (for use in goodTube_download() )
		goodTube_currentVideoId = goodTube_getParams['v'];

		// Get the video data
		fetch(apiEndpoint)
		.then(response => response.text())
		.then(data => {
			// Turn video data into JSON
			let videoData = JSON.parse(data);

			// Setup variables to hold the source data and subtitle data
			let sourceData = false;
			let subtitleData = false;

			// Below populates the source data, also - if there's any issues with the source data, try again (after configured delay time)
			let retry = false;

			if (goodTube_api_type === 1) {
				if (typeof videoData['formatStreams'] === 'undefined') {
					retry = true;
				}
				else {
					sourceData = videoData['formatStreams'];
					subtitleData = videoData['captions'];
				}
			}

			// Try again if data wasn't all good
			if (retry) {
				if (typeof goodTube_pendingRetry['loadVideoData'] !== 'undefined') {
					clearTimeout(goodTube_pendingRetry['loadVideoData']);
				}

				goodTube_pendingRetry['loadVideoData'] = setTimeout(function() {
					goodTube_player_loadVideo(player);
				}, goodTube_retryDelay);

				return;
			}
			// Otherwise the data was all good so load the sources
			else {
				// Debug message
				if (goodTube_debug) {
					console.log('[GoodTube] Video data loaded');
				}

				// For each source
				let i = 0;
				let highestQuality_video = false;
				sourceData.forEach((source) => {
					// Format the data correctly
					let source_src = false;
					let source_type = false;
					let source_label = false;
					let source_videoQuality = false;

					if (goodTube_api_type === 1) {
						source_src = goodTube_api_url+'/latest_version?id='+goodTube_getParams['v']+'&itag='+source['itag'];
						if (goodTube_api_proxy) {
							source_src = source_src+'&local=true';
						}

						source_type = source['type'];
						source_label = source['qualityLabel'];
						source_videoQuality = source['width'];
					}

					// Only add the source to the player if the data is populated
					if (source_src && source_type && source_label) {

						// Add video
						if (source_type.toLowerCase().indexOf('video') !== -1) {
							let video_element = document.createElement('source');
							video_element.setAttribute('src', source_src);
							video_element.setAttribute('type', source_type);
							video_element.setAttribute('label', source_label);
							video_element.setAttribute('video', true);
							player.appendChild(video_element);

							// Keep track of the highest quality item
							if (!highestQuality_video || source_videoQuality > highestQuality_video) {
								player.querySelector('source[selected=true]')?.setAttribute('selected', false);
								video_element.setAttribute('selected', true);
								highestQuality_video = source_videoQuality;
							}
						}
					}

					// Increment the loop
					i++;
				});

				// Enable the videojs quality selector
				let qualities = [];
				player.querySelectorAll('source[video=true]').forEach((quality) => {
					qualities.push({
						src: quality.getAttribute('src'),
						type: quality.getAttribute('type'),
						label: quality.getAttribute('label'),
						selected: quality.getAttribute('selected')
					});
				});
				goodTube_videojs_player.src(qualities);

				// Play the video
				setTimeout(function() {
					goodTube_player_play(player);
				}, 1);

				// Load the subtitles into the player
				if (subtitleData) {
					goodTube_player_loadSubtitles(player, subtitleData);
				}

				// Load VTT storyboard thumbnails into the player (desktop only)
				if (window.location.href.indexOf('m.youtube') === -1) {
					// Store the core function so we can call it again, because this plugin overwrites it's actual function once loaded!
					if (typeof goodTube_videojs_player.vttThumbnails === 'function') {
						goodTube_player_vttThumbnailsFunction = goodTube_videojs_player.vttThumbnails;
					}

					// Restore the core function
					goodTube_videojs_player.vttThumbnails = goodTube_player_vttThumbnailsFunction;

					// Remove the old thumbnails
					document.querySelector('.vjs-vtt-thumbnail-display')?.remove();

					// Load the new thumbnails

					// Get 180px if we can!
					let thumbsUrl = goodTube_api_url+'/api/v1/storyboards/'+goodTube_getParams['v'];

					fetch(thumbsUrl+'?height=180')
					.then(response => response.text())
					.then(data => {
						// Check if data exists, because 404 errors and such don't always call the below error catch!
						if (data) {
							goodTube_videojs_player.vttThumbnails({
								src: thumbsUrl+'?height=180'
							});
						}
						// If the data doesn't exist, fallback on 90px
						else {
							goodTube_videojs_player.vttThumbnails({
								src: thumbsUrl+'?height=90'
							});
						}
					})
					.catch((error) => {
						goodTube_videojs_player.vttThumbnails({
							src: thumbsUrl+'?height=90'
						});
					});
				}
			}
		})
		// If there's any issues loading the video data, try again (after configured delay time)
		.catch((error) => {
			if (typeof goodTube_pendingRetry['loadVideoData'] !== 'undefined') {
				clearTimeout(goodTube_pendingRetry['loadVideoData']);
			}

			goodTube_pendingRetry['loadVideoData'] = setTimeout(function() {
				goodTube_player_loadVideo(player);
			}, goodTube_retryDelay);
		});
	}

	// Load subtitles
	function goodTube_player_loadSubtitles(player, subtitleData) {
		// Remove any existing subtitles from videojs
		let existingSubtitles = goodTube_videojs_player.remoteTextTracks();
		if (typeof existingSubtitles['tracks_'] !== 'undefined') {
			existingSubtitles['tracks_'].forEach((existingSubtitle) => {
				goodTube_videojs_player.removeRemoteTextTrack(existingSubtitle);
			});
		}

		if (subtitleData.length > 0) {
			// Debug message
			if (goodTube_debug) {
				console.log('[GoodTube] Loading subtitles...');
			}

			// For each subtitle
			let previous_subtitle = false;
			subtitleData.forEach((subtitle) => {
				// Format the data
				let subtitle_url = false;
				let subtitle_label = false;

				if (goodTube_api_type === 1) {
					subtitle_url = goodTube_api_url+subtitle['url'];
					subtitle_label = subtitle['label'];
				}

				// Ensure we have all the subtitle data AND don't load a subtitle with the same label twice (this helps Piped to load actual captions over auto-generated captions if both exist)
				if (subtitle_url && subtitle_label && subtitle_label !== previous_subtitle) {
					previous_subtitle = subtitle_label;

					// Capitalise the first letter of the label, this looks a bit better
					subtitle_label = subtitle_label[0].toUpperCase() + subtitle_label.slice(1);

					// Add the subtitle to videojs
					goodTube_videojs_player.addRemoteTextTrack({
						kind: 'captions',
						language: subtitle_label,
						src: subtitle_url
					}, false);
				}
			});

			// Debug message
			if (goodTube_debug) {
				console.log('[GoodTube] Subtitles loaded');
			}
		}
	}

	// Reload the video
	function goodTube_player_reloadVideo(player) {
		// If we're not viewing a video, just return
		if (typeof goodTube_getParams['v'] === 'undefined') {
			return;
		}

		// Clear any pending timeouts to prevent double ups
		if (typeof goodTube_pendingRetry['reloadVideo'] !== 'undefined') {
			clearTimeout(goodTube_pendingRetry['reloadVideo']);
		}

		// Only re-attempt to load these max configured retry attempts
		if (goodTube_player_reloadVideoAttempts > goodTube_retryAttempts) {
			// Show an error message
			goodTube_player_videojs_showError();

			// Debug message
			if (goodTube_debug) {
				console.log('[GoodTube] Video could not be loaded - please select another video source');
			}

			return;
		}

		// Store the current video src
		let currentSrc = player.src;

		// Clear the player
		goodTube_player_clear(player);

		// Now use the next javascript animation frame (via set timeout so it still works when you're not focused on the tab) to load the actual video
		setTimeout(function() {
			player.setAttribute('src', currentSrc);
		}, 0);
	}

	// Clear the player
	function goodTube_player_clear(player) {
		goodTube_player_ended = false;
		goodTube_player_videojs_hideError();
		player.classList.add('goodTube_hidden');
		player.currentTime = 0;
		player.pause();

		let openMenuButtons = document.querySelectorAll('.vjs-menuOpen');
		openMenuButtons.forEach((openMenuButton) => {
			openMenuButton.classList.remove('vjs-menuOpen');
		});

		// Hide current time (mobile only)
		if (window.location.href.indexOf('m.youtube') !== -1) {
			goodTube_helper_hideElement(document.getElementById('goodTube_videoTime'));
		}
	}

	// Hide the player
	function goodTube_player_hide(player) {
		goodTube_helper_hideElement(player.closest('#goodTube_player_wrapper1'));
	}

	// Show the player
	function goodTube_player_show(player) {
		goodTube_helper_showElement(player.closest('#goodTube_player_wrapper1'));
	}

	function goodTube_player_pipInit() {
		// If we leave the picture in picture
		addEventListener('leavepictureinpicture', (event) => {
			// If we're not viewing a video
			if (typeof goodTube_getParams['v'] === 'undefined') {
				// Pause the player
				goodTube_player_pause(goodTube_player);
			}

			goodTube_player_pip = false;
		});

		// If we enter the picture in picture
		addEventListener('enterpictureinpicture', (event) => {
			goodTube_player_pip = true;
		});
	}

	// Init picture in picture
	function goodTube_player_pipUpdate() {
		// Support play and pause (but only attach these events once!)
		if ("mediaSession" in navigator) {
			// Play
			navigator.mediaSession.setActionHandler("play", () => {
				goodTube_player_play(goodTube_player);
			});

			// Pause
			navigator.mediaSession.setActionHandler("pause", () => {
				goodTube_player_pause(goodTube_player);
			});

			// Next track
			if (goodTube_videojs_nextButton) {
				navigator.mediaSession.setActionHandler("nexttrack", () => {
					goodTube_nextVideo(true);
				});
			}
			else {
				navigator.mediaSession.setActionHandler('nexttrack', null);
			}

			// Prev track
			if (goodTube_videojs_prevButton) {
				navigator.mediaSession.setActionHandler("previoustrack", () => {
					goodTube_prevVideo(true);
				});
			}
			else {
				navigator.mediaSession.setActionHandler('previoustrack', null);
			}
		}
	}

	// Show or hide the picture in picture
	function goodTube_player_pipShowHide() {
		if (goodTube_player_pip) {
			document.exitPictureInPicture();
			goodTube_player_pip = false;
		}
		else {
			goodTube_player.requestPictureInPicture();
			goodTube_player_pip = true;

			// If the miniplayer is open, remove it
			if (goodTube_player_miniplayer) {
				goodTube_player_miniplayerShowHide();
			}
		}
	}

	// Update the miniplayer
	function goodTube_player_miniplayerUpdate() {
		// This is needed to show it differently when we're off a video page, desktop only
		if (window.location.href.indexOf('m.youtube') === -1) {
			let youtube_wrapper = document.querySelector('ytd-watch-flexy');

			if (youtube_wrapper) {
				if (typeof goodTube_getParams['v'] !== 'undefined') {
					youtube_wrapper.classList.remove('goodTube_miniplayer');
				}
				else {
					youtube_wrapper.classList.add('goodTube_miniplayer');
				}
			}
		}

		// Set the video id if we can, used for the expand button
		if (typeof goodTube_getParams['v'] !== 'undefined') {
			goodTube_player_miniplayer_video = goodTube_getParams['v'];
		}
	}

	// Show or hide the miniplayer
	function goodTube_player_miniplayerShowHide() {
		// If we have real picture in picture, use that instead!
		if (document.pictureInPictureEnabled) {
			goodTube_player_pipShowHide();
			return;
		}

		let goodTube_wrapper = document.querySelector('#goodTube_player_wrapper1');

		if (goodTube_player_miniplayer) {
			goodTube_wrapper.classList.remove('goodTube_miniplayer');
			goodTube_player_miniplayer = false;

			// If we're not viewing a video, clear the player
			if (typeof goodTube_getParams['v'] === 'undefined') {
				goodTube_player_clear(goodTube_player);
			}
		}
		else {
			goodTube_wrapper.classList.add('goodTube_miniplayer');
			goodTube_player_miniplayer = true;
			goodTube_player_miniplayer_video = goodTube_getParams['v'];
		}
	}


	/* Video JS functions
	------------------------------------------------------------------------------------------ */
	let goodTube_videojs_player = false;
	let goodTube_videojs_player_loaded = false;
	let goodTube_videojs_previousVideo = [];
	let goodTube_videojs_prevButton = false;
	let goodTube_videojs_nextButton = true;
	let goodTube_videojs_tapTimer = false;
	let goodTube_videojs_fastForward = false;

	// Init video js
	function goodTube_player_videojs() {
		// Debug message
		if (goodTube_debug) {
			console.log('[GoodTube] Loading player...');
		}

		// Load the skin
		goodTube_player_videojs_loadSkin();

		// Setup GET params
		goodTube_getParams = goodTube_helper_parseGetParams();

		// Add custom MENU buttons
		const MenuItem = videojs.getComponent("MenuItem");
		const MenuButton = videojs.getComponent("MenuButton");

		class CustomMenuButton extends MenuButton {
			createItems() {
				const items = [];
				const { myItems } = this.options_;

				if (!Array.isArray(myItems)) items;

				myItems.forEach(({ clickHandler, ...item }) => {
					const menuItem = new MenuItem(this.player(), item);

					if (clickHandler) {
						menuItem.handleClick = clickHandler;
					}

					items.push(menuItem);
				});

				return items;
			}

			buildCSSClass() {
				return `${super.buildCSSClass()}`;
			}
		}

		videojs.registerComponent("DownloadButton", CustomMenuButton);
		videojs.registerComponent("SourceButton", CustomMenuButton);
		videojs.registerComponent("AutoplayButton", CustomMenuButton);

		// Add custom buttons
		const Button = videojs.getComponent("Button");

		class PrevButton extends Button {
			handleClick(event) {
				event.stopImmediatePropagation();
				goodTube_prevVideo(true);
			}
		}
		videojs.registerComponent('PrevButton', PrevButton);

		class NextButton extends Button {
			handleClick(event) {
				event.stopImmediatePropagation();
				goodTube_nextVideo(true);
			}
		}
		videojs.registerComponent('NextButton', NextButton);

		class MiniplayerButton extends Button {
			handleClick(event) {
				event.stopImmediatePropagation();
				goodTube_player_miniplayerShowHide();
			}
		}
		videojs.registerComponent('MiniplayerButton', MiniplayerButton);

		class TheaterButton extends Button {
			handleClick(event) {
				event.stopImmediatePropagation();
				goodTube_shortcut('theater');
			}
		}
		videojs.registerComponent('TheaterButton', TheaterButton);

		// Setup the API selection
		let apiList = [];
		goodTube_apis.forEach((api) => {
			apiList.push({
				label: api['name'],
				clickHandler(event) {
					// Get the menu
					let menu = event.target.closest('.vjs-menu');

					// Deselect the currently selected menu item
					menu.querySelector('.vjs-selected')?.classList.remove('vjs-selected');

					// Select the clicked menu item
					let menuItem = event.target.closest('.vjs-menu-item');
					menuItem.classList.add('vjs-selected');

					// Set the new API
					goodTube_player_selectApi(menuItem.getAttribute('api'));

					// Set the player time to be restored when the new server loads
					goodTube_player_restoreTime = goodTube_player.currentTime;

					// Reload the video data

					// Debug message
					if (goodTube_debug) {
						console.log('[GoodTube] Loading video data from '+goodTube_api_name+'...');
					}

					let delay = 0;
					if (window.location.href.indexOf('m.youtube') !== -1) {
						delay = 400;
					}

					setTimeout(function() {
						goodTube_player_loadVideoDataAttempts = 0;
						goodTube_player_loadVideo(goodTube_player);
					}, delay);
				}
			});
		});

		// Set inactivity timeout longer for mobile than desktop
		let inactivityTimeout = 2000;
		if (window.location.href.indexOf('m.youtube') !== -1) {
			inactivityTimeout = 5000;
		}

		// Init the player
		goodTube_videojs_player = videojs('goodTube_player', {
			inactivityTimeout: inactivityTimeout,
			controls: true,
			autoplay: false,
			preload: 'auto',
			width: '100%',
			height: '100%',
			playbackRates: [0.25, 0.5, 1, 1.25, 1.5, 1.75, 2],
			userActions: {
				doubleClick: false
			},
			controlBar: {
				children: [
					'playToggle',
					'volumePanel',
					'progressControl',
					'playbackRateMenuButton',
					'subsCapsButton',
					'qualitySelector',
					'fullscreenToggle'
				],

				// Add next button
				NextButton: {
					className: "vjs-next-button"
				},

				// Add prev button
				PrevButton: {
					className: "vjs-prev-button"
				},

				// Add autoplay button
				AutoplayButton: {
					controlText: "Autoplay",
					className: "vjs-autoplay-button",
					myItems: [
						{
							label: "Autoplay off",
							clickHandler() {
								// Get the menu
								let menu = event.target.closest('.vjs-menu');

								// Deselect the currently selected menu item
								menu.querySelector('.vjs-selected')?.classList.remove('vjs-selected');

								// Select the clicked menu item
								let menuItem = event.target.closest('.vjs-menu-item');
								menuItem.classList.add('vjs-selected');

								goodTube_helper_setCookie('goodTube_autoplay', 'off');
							},
						},
						{
							label: "Autoplay on",
							clickHandler() {
								// Get the menu
								let menu = event.target.closest('.vjs-menu');

								// Deselect the currently selected menu item
								menu.querySelector('.vjs-selected')?.classList.remove('vjs-selected');

								// Select the clicked menu item
								let menuItem = event.target.closest('.vjs-menu-item');
								menuItem.classList.add('vjs-selected');

								goodTube_helper_setCookie('goodTube_autoplay', 'on');
							},
						},
					],
				},

				// Add source button
				SourceButton: {
					controlText: "Video source",
					className: "vjs-source-button",
					myItems: apiList,
				},

				// Add download button
				DownloadButton: {
					controlText: "Download",
					className: "vjs-download-button",
					myItems: [
						{
							label: "Download video",
							clickHandler() {
								goodTube_download('video');
							},
						},
						{
							label: "Download audio",
							clickHandler() {
								goodTube_download('audio');
							},
						},
					],
				},

				// Add miniplayer button
				MiniplayerButton: {
					className: "vjs-miniplayer-button"
				},

				// Add theater button
				TheaterButton: {
					className: "vjs-theater-button"
				},
			}
		});

		// Disable console errors from video js
		videojs.log.level('off');

		// If for any reason the video failed to load, try reloading it again
		videojs.hook('error', function() {
			if (typeof goodTube_pendingRetry['reloadVideo'] !== 'undefined') {
				clearTimeout(goodTube_pendingRetry['reloadVideo']);
			}

			goodTube_pendingRetry['reloadVideo'] = setTimeout(function() {
				goodTube_player_reloadVideo(goodTube_player);
			}, goodTube_retryDelay);

			// Update the video js player
			goodTube_player_videojs_update();
		});

		// After video JS has loaded
		goodTube_videojs_player.on('ready', function() {
			goodTube_videojs_player_loaded = true;

			// Add expand and close miniplayer buttons
			let goodTube_target = document.querySelector('#goodTube_player');

			if (goodTube_target) {
				let miniplayer_closeButton = document.createElement('div');
				miniplayer_closeButton.id = 'goodTube_miniplayer_closeButton';
				miniplayer_closeButton.onclick = function() {
					goodTube_player_miniplayerShowHide();
				};
				goodTube_target.appendChild(miniplayer_closeButton);

				let miniplayer_expandButton = document.createElement('div');
				miniplayer_expandButton.id = 'goodTube_miniplayer_expandButton';
				miniplayer_expandButton.onclick = function() {
					if (goodTube_player_miniplayer_video !== goodTube_getParams['v']) {
						window.location.href = '/watch?v='+goodTube_player_miniplayer_video+'&t='+parseFloat(goodTube_player.currentTime).toFixed(0)+'s';
					}
					else {
						goodTube_player_miniplayerShowHide();
					}
				};
				goodTube_target.appendChild(miniplayer_expandButton);
			}

			// Debug message
			if (goodTube_debug) {
				console.log('[GoodTube] Player loaded');
			}

			// Expose the goodTube player
			goodTube_player = document.querySelector('#goodTube_player video');

			// Attach mobile seeking events
			if (window.location.href.indexOf('m.youtube') !== -1) {
				// Attach the backwards seek button
				let goodTube_seekBackwards = document.createElement('div');
				goodTube_seekBackwards.id = 'goodTube_seekBackwards';
				goodTube_target.append(goodTube_seekBackwards);

				// Double tap event to seek backwards
				goodTube_seekBackwards.onclick = function() {
					// Get the time
					var now = new Date().getTime();

					// Check how long since last tap
					var timesince = now - goodTube_videojs_tapTimer;

					// If it's less than 600ms
					if ((timesince < 600) && (timesince > 0)) {
						// Remove active state and hide overlays (so you can see the video properly)
						goodTube_target.classList.remove('vjs-user-active');
						goodTube_target.classList.add('vjs-user-inactive');

						// Seek backwards 10 seconds
						goodTube_player.currentTime -= 10;
					}
					// If it's just a normal tap
					else {
						// Swap to opposite state of active / inactive
						if (goodTube_target.classList.contains('vjs-user-active')) {
							goodTube_target.classList.remove('vjs-user-active');
							goodTube_target.classList.add('vjs-user-inactive');
						}
						else {
							goodTube_target.classList.add('vjs-user-active');
							goodTube_target.classList.remove('vjs-user-inactive');
						}
					}

					// Set the last tap time
					goodTube_videojs_tapTimer = new Date().getTime();
				}


				// Attach the forwards seek button
				let goodTube_seekForwards = document.createElement('div');
				goodTube_seekForwards.id = 'goodTube_seekForwards';
				goodTube_target.append(goodTube_seekForwards);

				goodTube_seekForwards.onclick = function() {
					// Get the time
					var now = new Date().getTime();

					// Check how long since last tap
					var timesince = now - goodTube_videojs_tapTimer;

					// If it's less than 600ms
					if ((timesince < 600) && (timesince > 0)) {
						// Remove active state and hide overlays (so you can see the video properly)
						goodTube_target.classList.remove('vjs-user-active');
						goodTube_target.classList.add('vjs-user-inactive');

						// Seek forwards 5 seconds
						goodTube_player.currentTime += 5;
					}
					// If it's just a normal tap
					else {
						// Swap to opposite state of active / inactive
						if (goodTube_target.classList.contains('vjs-user-active')) {
							goodTube_target.classList.remove('vjs-user-active');
							goodTube_target.classList.add('vjs-user-inactive');
						}
						else {
							goodTube_target.classList.add('vjs-user-active');
							goodTube_target.classList.remove('vjs-user-inactive');
						}
					}

					// Set the last tap time
					goodTube_videojs_tapTimer = new Date().getTime();
				}


				// Long press to fast forward

				// On touch start
				goodTube_target.addEventListener('touchstart', function(e) {
					// Start fast forward after 1 second
					goodTube_videojs_fastForward = setTimeout(function() {
						// Remove active state and hide overlays (so you can see the video properly)
						goodTube_target.classList.remove('vjs-user-active');
						goodTube_target.classList.add('vjs-user-inactive');

						// Set playback rate to 2x (fast forward)
						goodTube_player.playbackRate = 2;
					}, 1000);
				});

				// On touch end
				goodTube_target.addEventListener('touchend', function(e) {
					// Remove any pending timeouts to fast forward
					if (goodTube_videojs_fastForward) {
						clearTimeout(goodTube_videojs_fastForward);
					}
					goodTube_videojs_fastForward = false;

					// Set the playback rate to 1x (normal)
					goodTube_player.playbackRate = 1;
				});
			}


			// Attach mobile video time elements
			if (window.location.href.indexOf('m.youtube') !== -1) {
				// Attach the video time display
				let goodTube_videoTime = document.createElement('div');
				goodTube_videoTime.innerHTML = "<span id='goodTube_currentTime'></span> / <span id='goodTube_endTime'></span>"
				goodTube_videoTime.id = 'goodTube_videoTime';
				goodTube_target.append(goodTube_videoTime);

				let currentTime = document.getElementById('goodTube_currentTime');
				let endTime = document.getElementById('goodTube_endTime');

				// Ensure the time display is always up to date
				setInterval(function() {
					let newCurrentTime = goodTube_helper_formatTime(goodTube_player.currentTime);
					if (currentTime.innerHTML != newCurrentTime) {
						currentTime.innerHTML = newCurrentTime;
					}

					let newEndTime = goodTube_helper_formatTime(goodTube_player.duration);
					if (endTime.innerHTML != newEndTime) {
						endTime.innerHTML = newEndTime;
					}
				}, 1);
			}

			// Double click to fullscreen (desktop only)
			if (window.location.href.indexOf('m.youtube') === -1) {
				goodTube_target.addEventListener('dblclick', function(event) {
					document.querySelector('.vjs-fullscreen-control')?.click();
				});
			}

			// Remove all title attributes from buttons, we don't want hover text
			let buttons = document.querySelectorAll('#goodTube_player button');
			buttons.forEach((element) => {
				element.setAttribute('title', '');
			});


			// Set the default volume (if a cookie exists for it)
			let volume = goodTube_helper_getCookie('goodTube_volume');
			if (volume && volume == parseFloat(volume)) {
				goodTube_player_volume(goodTube_player, volume);
			}


			// Autoplay
			// If autoplay cookie doesn't exist, turn autoplay on
			if (!goodTube_helper_getCookie('goodTube_autoplay')) {
				goodTube_helper_setCookie('goodTube_autoplay', 'on');
			}

			// Select the correct autoplay button
			let autoplayButton = document.querySelector('.vjs-autoplay-button');

			if (autoplayButton) {
				// Deselect all our autoplay menu items
				autoplayButton.querySelector('.vjs-menu .vjs-selected')?.classList.remove('vjs-selected');

				// Select the correct autoplay menu item
				let autoplay_menuItems = autoplayButton.querySelectorAll('.vjs-menu .vjs-menu-item');

				if (goodTube_helper_getCookie('goodTube_autoplay') === 'on') {
					autoplay_menuItems[autoplay_menuItems.length- 1].classList.add('vjs-selected');
				}
				else {
					autoplay_menuItems[0].classList.add('vjs-selected');
				}
			}

			// Make mute button work
			let muteButton = document.querySelector('.vjs-mute-control');
			if (muteButton) {
				muteButton.onmousedown = function() {
					if (goodTube_player.muted) {
						goodTube_videojs_player.muted(false);
					}
					else {
						goodTube_videojs_player.muted(true);
					}
				}

				muteButton.ontouchstart = function() {
					if (goodTube_player.muted) {
						goodTube_videojs_player.muted(false);
					}
					else {
						goodTube_videojs_player.muted(true);
					}
				}
			}

			// Make clicking the play / pause button work
			let playPauseButton = document.querySelector('.vjs-play-control');
			if (playPauseButton) {
				playPauseButton.removeEventListener('click', goodTube_player_videojs_playPause, false);
				playPauseButton.addEventListener('click', goodTube_player_videojs_playPause, false);
			}

			// Click off close menu
			document.onclick = function() {
				if (!event.target.closest('.vjs-menu') && !event.target.closest('.vjs-menu-button')) {
					let openMenuButtons = document.querySelectorAll('.vjs-menuOpen');

					openMenuButtons.forEach((openMenuButton) => {
						openMenuButton.classList.remove('vjs-menuOpen');
					});
				}
			}

			document.ontouchstart = function() {
				if (!event.target.closest('.vjs-menu') && !event.target.closest('.vjs-menu-button')) {
					let openMenuButtons = document.querySelectorAll('.vjs-menuOpen');

					openMenuButtons.forEach((openMenuButton) => {
						openMenuButton.classList.remove('vjs-menuOpen');
					});
				}
			}

			// Make replay button work
			let playButton = document.querySelector('.vjs-control-bar .vjs-play-control');
			if (playButton) {
				playButton.onclick = function() {
					if (goodTube_player.currentTime === 0) {
						goodTube_player.click();
					}
				}

				playButton.ontouchstart = function() {
					if (goodTube_player.currentTime === 0) {
						goodTube_player.click();
					}
				}
			}

			// Update the video js player
			goodTube_player_videojs_update();
		});

		// Esc keypress close menus
		document.addEventListener('keydown', function(event) {
			if (event.keyCode == 27) {
				let openMenuButtons = document.querySelectorAll('.vjs-menuOpen');

				openMenuButtons.forEach((openMenuButton) => {
					openMenuButton.classList.remove('vjs-menuOpen');
				});
			}
		}, true);

		// Once the metadata has loaded
		goodTube_videojs_player.on('loadedmetadata', function() {
			// Skip to remembered time once loaded metadata (if there's a get param of 't')
			if (typeof goodTube_getParams['t'] !== 'undefined') {
				let time = goodTube_getParams['t'].replace('s', '');
				goodTube_player_skipTo(goodTube_player, time);
			}

			// Skip to remembered time if we're changing server
			if (goodTube_player_restoreTime > 0) {
				goodTube_player_skipTo(goodTube_player, goodTube_player_restoreTime);
			}

			// Focus the video player once loaded metadata
			goodTube_player.focus();
		});

		// Sync players when you seek
		goodTube_videojs_player.on('seeking', function() {
			goodTube_youtube_syncPlayers();
		});

		// Debug message to show the video is loading
		goodTube_videojs_player.on('loadstart', function() {
			// Enable the player
			goodTube_player.classList.remove('goodTube_hidden');

			let qualityLabel = '';

			// Get the quality label from the quality select menu in the player
			let qualityLabelMenuItem = document.querySelector('.vjs-quality-selector .vjs-menu .vjs-selected .vjs-menu-item-text');
			if (qualityLabelMenuItem) {
				qualityLabel = qualityLabelMenuItem.innerHTML;
			}
			// Otherwise that doesn't exist so get it from the selected source
			else {
				qualityLabel = goodTube_player.querySelector('source[selected=true]').getAttribute('label');
			}

			// Debug message
			if (goodTube_debug) {
				if (goodTube_player_reloadVideoAttempts <= 1) {
					console.log('[GoodTube] Loading video '+qualityLabel+'...');
				}
			}

			// This must go here because video js tries to load it twice, and this messes with things if we increment inside the reload function
			goodTube_player_reloadVideoAttempts++;
		});

		// Once loaded data
		goodTube_videojs_player.on('loadeddata', function() {
			// Autoplay the video
			// Only autoplay if the user hasn't paused the video prior to it loading
			if (!goodTube_player.paused) {
				goodTube_player_play(goodTube_player);
			}

			// The load worked so clear any pending reloads and allow more reload attempts for future loads
			goodTube_player_reloadVideoAttempts = 1;
			if (typeof goodTube_pendingRetry['reloadVideo'] !== 'undefined') {
				clearTimeout(goodTube_pendingRetry['reloadVideo']);
			}

			// Debug message
			if (goodTube_debug) {
				console.log('[GoodTube] Video loaded');
			}

			// Update the video js player
			goodTube_player_videojs_update();

			// Show current time (mobile only)
			if (window.location.href.indexOf('m.youtube') !== -1) {
				goodTube_helper_showElement(document.getElementById('goodTube_videoTime'));
			}
		});

		// Play next video this video has ended
		goodTube_videojs_player.on('ended', function() {
			goodTube_player_ended = true;
			goodTube_youtube_syncPlayers();
			goodTube_nextVideo();
		});

		// Save the volume you were last at in a cookie
		goodTube_videojs_player.on('volumechange', function() {
			let volume = goodTube_player.volume;
			if (goodTube_player.muted) {
				volume = 0;
			}

			goodTube_helper_setCookie('goodTube_volume', volume);
		});
	}

	// Load the skin
	function goodTube_player_videojs_loadSkin() {
		let style = document.createElement('style');
		style.textContent = `
			#goodTube_player_wrapper1:not(.goodTube_mobile) {
				border-radius: 12px;
			}

			.video-js {
				overflow: hidden;
			}

			.video-js *:focus {
				outline-color: transparent;
				outline-style: none;
			}

			.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
				transition: visibility .25s, opacity .25s !important;
			}

			.vjs-menu .vjs-menu-item-text {
				text-transform: none !important;
			}

			.vjs-menu .vjs-menu-item-text:first-letter {
				text-transform: uppercase !important;
			}

			.video-js .vjs-download-button .vjs-icon-placeholder,
			.video-js .vjs-source-button .vjs-icon-placeholder,
			.video-js .vjs-autoplay-button .vjs-icon-placeholder,
			.video-js .vjs-quality-selector .vjs-icon-placeholder,
			.video-js .vjs-prev-button .vjs-icon-placeholder,
			.video-js .vjs-next-button .vjs-icon-placeholder,
			.video-js .vjs-miniplayer-button .vjs-icon-placeholder,
			.video-js .vjs-theater-button .vjs-icon-placeholder {
				font-family: VideoJS;
				font-weight: 400;
				font-style: normal;
			}

			.video-js .vjs-control-bar > button {
				cursor: pointer;
			}

			.video-js .vjs-prev-button .vjs-icon-placeholder:before {
				content: "\\f124";
			}

			.video-js .vjs-next-button .vjs-icon-placeholder:before {
				content: "\\f123";
			}

			.video-js .vjs-download-button .vjs-icon-placeholder:before {
				content: "\\f110";
			}



			// Loading indicator for downloads
			.video-js .vjs-download-button {
				position: relative;
			}

			.video-js .vjs-download-button .goodTube_spinner {
				opacity: 0;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				transition: opacity .4s linear;
			}
			.video-js .vjs-download-button.goodTube_loading .goodTube_spinner {
				opacity: 1;
				transition: opacity .2s .2s linear;
			}

			.video-js .vjs-download-button .vjs-icon-placeholder:before {
				opacity: 1;
				transition: opacity .2s .2s linear;
			}
			.video-js .vjs-download-button.goodTube_loading .vjs-icon-placeholder:before {
				opacity: 0;
				transition: opacity .2s linear;
			}

			.goodTube_spinner {
				color: #ffffff;
				pointer-events: none;
			}
			.goodTube_spinner,
			.goodTube_spinner div {
				box-sizing: border-box;
			}
			.goodTube_spinner {
				display: inline-block;
				position: relative;
				width: 36px;
				height: 36px;
			}
			.goodTube_spinner div {
				position: absolute;
				border: 2px solid currentColor;
				opacity: 1;
				border-radius: 50%;
				animation: goodTube_spinner 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
			}
			.goodTube_spinner div:nth-child(2) {
				animation-delay: -0.5s;
			}
			@keyframes goodTube_spinner {
				0% {
					top: 16px;
					left: 16px;
					width: 4px;
					height: 4px;
					opacity: .5;
				}
				4.9% {
					top: 16px;
					left: 16px;
					width: 4px;
					height: 4px;
					opacity: .5;
				}
				5% {
					top: 16px;
					left: 16px;
					width: 4px;
					height: 4px;
					opacity: 1;
				}
				100% {
					top: 0;
					left: 0;
					width: 36px;
					height: 36px;
					opacity: 0;
				}
			}



			.video-js .vjs-source-button .vjs-icon-placeholder:before {
				content: "\\f10e";
			}

			.video-js .vjs-autoplay-button .vjs-icon-placeholder:before {
				content: "\\f102";
			}

			.vjs-quality-selector .vjs-icon-placeholder:before {
				content: "\\f114";
			}

			.video-js .vjs-source-button .vjs-icon-placeholder:before {
				content: "\\f10e";
			}

			.video-js .vjs-miniplayer-button .vjs-icon-placeholder:before {
				content: "\\f127";
			}

			.video-js .vjs-theater-button .vjs-icon-placeholder:before {
				content: "\\f115";
			}

			/* Youtube player style */
			.video-js.player-style-youtube .vjs-progress-control {
				height: 0;
			}

			.video-js.player-style-youtube .vjs-progress-control .vjs-progress-holder, .video-js.player-style-youtube .vjs-progress-control {
				position: absolute;
				right: 0;
				left: 0;
				width: 100%;
				margin: 0;
			}

			.video-js.player-style-youtube .vjs-control-bar {
				background: linear-gradient(rgba(0,0,0,0.1), rgba(0, 0, 0,0.5));
			}

			.video-js.player-style-youtube .vjs-slider {
				background-color: rgba(255,255,255,0.2);
			}

			.video-js.player-style-youtube .vjs-load-progress > div {
				background-color: rgba(255,255,255,0.5);
			}

			.vjs-play-progress {
				background-color: #ff0000 !important;
			}

			.vjs-play-progress::before {
				color: #ff0000 !important;
				display: none;
			}

			.vjs-progress-control:hover .vjs-play-progress::before {
				display: block;
			}

			.video-js.player-style-youtube .vjs-progress-control:hover .vjs-progress-holder {
				font-size: 15px !important;
			}

			.vjs-slider-horizontal .vjs-volume-level:before {
				font-size: 14px !important;
			}

			.vjs-volume-control {
				width: auto !important;
			}

			.video-js .vjs-volume-panel.vjs-volume-panel-horizontal {
				transition: width .25s !important;
			}

			.video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-horizontal {
				transition: opacity .25s, width 1s !important;
				min-width: 0 !important;
			}

			.vjs-volume-bar.vjs-slider-horizontal {
				min-width: 52px !important;
			}

			.video-js .vjs-slider {
				background: rgba(255, 255, 255, .2) !important;
			}

			.video-js .vjs-load-progress {
				background: none !important;
			}

			.video-js .vjs-load-progress > div {
				background: transparent !important;
			}

			.video-js .vjs-load-progress {
				background: rgba(255, 255, 255, .2) !important;
			}

			.video-js .vjs-progress-control {
				position: absolute !important;
				top: -26px !important;
				left: 0 !important;
				right: 0 !important;
				bottom: auto !important;
				width: 100% !important;
			}

			.video-js .vjs-progress-control .vjs-progress-holder {
				margin-left: 8px !important;
				margin-right: 8px !important;
			}

			.video-js.player-style-youtube .vjs-control-bar > .vjs-spacer {
				flex: 1;
				order: 2;
			}

			.video-js.player-style-youtube .vjs-play-progress .vjs-time-tooltip {
				display: none;
			}

			.video-js.player-style-youtube .vjs-play-progress::before {
				color: red;
				font-size: 0.85em;
				display: none;
			}

			.video-js.player-style-youtube .vjs-progress-holder:hover .vjs-play-progress::before {
				display: unset;
			}

			.video-js.player-style-youtube .vjs-control-bar {
				display: flex;
				flex-direction: row;
			}

			.video-js.player-style-youtube .vjs-big-play-button {
				top: 50%;
				left: 50%;
				margin-top: -0.81666em;
				margin-left: -1.5em;
			}

			.video-js.player-style-youtube .vjs-menu-button-popup .vjs-menu {
				margin-bottom: 2em;
			}

			.video-js.player-style-youtube .vjs-progress-control .vjs-progress-holder, .video-js.player-style-youtube .vjs-progress-control {height: 5px;
				margin-bottom: 10px;
			}

			.video-js ul.vjs-menu-content::-webkit-scrollbar {
				display: none;
			}

			.video-js .vjs-user-inactive {
				cursor: none;
			}

			.video-js .vjs-text-track-display > div > div > div {
				border-radius: 0 !important;
				padding: 4px 8px !important;
				line-height: calc(1.2em + 7px) !important;
				white-space: break-spaces !important;
			}

			.video-js .vjs-play-control {
				order: 0;
			}

			.video-js .vjs-prev-button {
				order: 1;
			}

			.video-js .vjs-next-button {
				order: 2;
			}

			.video-js .vjs-volume-panel {
				order: 3;
			}

			.video-js .vjs-source-button {
				margin-left: auto !important;
				order: 3;
			}

			.video-js .vjs-download-button {
				order: 4;
			}

			.video-js .vjs-autoplay-button {
				order: 5;
			}

			.video-js .vjs-playback-rate {
				order: 6;
			}

			.video-js .vjs-time-control {
				order: 7;
			}

			.video-js .vjs-subs-caps-button {
				order: 8;
			}

			.video-js .vjs-quality-selector {
				order: 9;
			}

			.video-js .vjs-miniplayer-button {
				order: 10;
			}

			.video-js .vjs-theater-button {
				order: 11;
			}

			.video-js .vjs-fullscreen-control {
				order: 12;
			}

			.video-js .vjs-control-bar {
				display: flex;
				flex-direction: row;
				scrollbar-width: none;
				height: 48px !important;
			}

			.video-js .vjs-menu .vjs-icon-placeholder {
				display: none !important;
			}

			.video-js .vjs-menu .vjs-menu-content > * {
				padding-top: 8px !important;
				padding-bottom: 8px !important;
				padding-left: 12px !important;
				padding-right: 12px !important;
			}

			.video-js .vjs-menu {
				height: auto !important;
				bottom: 48px !important;
				padding-bottom: 0 !important;
				margin-bottom: 0 !important;
				width: auto !important;
				transform: translateX(-50%) !important;
				left: 50% !important;
			}

			.video-js .vjs-menu .vjs-menu-content {
				position: static !important;
				border-radius: 4px !important;
			}

			.video-js .vjs-volume-control {
				height: 100% !important;
				display: flex !important;
				align-items: center !important;
			}

			.video-js .vjs-vtt-thumbnail-display {
				bottom: calc(100% + 31px) !important;
				border-radius: 12px !important;
				overflow: hidden !important;
				border: 2px solid #ffffff !important;
				background-color: #000000 !important;
			}

			.video-js .vjs-control-bar .vjs-icon-placeholder {
				height: 100%;
			}

			.video-js .vjs-control {
				min-width: 48px !important;
			}

			.video-js .vjs-control-bar > *:first-child {
				padding-left: 12px !important;
			}

			#goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-control:not(.vjs-progress-control) {
				min-width: 0 !important;
				flex-grow: 1 !important;
				max-width: 9999px !important;
				padding-left: 0 !important;
				padding-right: 0 !important;
			}

			#goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-control.vjs-volume-panel,
			#goodTube_player_wrapper1.goodTube_miniplayer #goodTube_player_wrapper3 .video-js .vjs-control.vjs-volume-panel {
				display: none;
			}

			.video-js .vjs-control-bar .vjs-icon-placeholder::before {
				height: auto;
				top: 50%;
				transform: translateY(-50%);
				font-size: 24px;
				line-height: 100%;
			}

			.video-js .vjs-control-bar * {
				text-shadow: none !important;
			}

			.video-js .vjs-vtt-thumbnail-time {
				display: none !important;
			}

			.video-js .vjs-playback-rate .vjs-playback-rate-value {
				line-height: 48px;
				font-size: 14px !important;
				font-weight: 700;
			}

			.video-js .vjs-play-progress .vjs-time-tooltip {
				display: none !important;
			}

			.video-js .vjs-mouse-display .vjs-time-tooltip {
				background: none !important;
				font-size: 12px !important;
				top: -44px !important;
			}

			.video-js .vjs-menu-content {
				max-height: calc(var(--ytd-watch-flexy-panel-max-height) - 72px) !important;
			}

			#goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-menu-content {
				max-height: 164px !important;
			}

			.video-js .vjs-control-bar::-webkit-scrollbar {
				display: none;
			}

			.video-js .vjs-icon-cog {
				font-size: 18px;
			}

			.video-js .vjs-control-bar,
			.video-js .vjs-menu-button-popup .vjs-menu .vjs-menu-content {
				background-color: rgba(35, 35, 35, 0.75);
			}

			.video-js .vjs-menu li.vjs-menu-item:not(.vjs-selected),
			.video-js .vjs-menu li.vjs-menu-item:not(.vjs-selected):focus,
			.video-js .vjs-menu li.vjs-menu-item:not(.vjs-selected):active {
				background-color: transparent !important;
				color: #ffffff !important;
			}

			.video-js .vjs-menu li.vjs-menu-item:not(..vjs-selected):hover {
				background-color: rgba(255, 255, 255, 0.75) !important;
				color: rgba(49, 49, 51, 0.75) !important;
				color: #ffffff !important;
			}

			.video-js .vjs-menu li.vjs-selected,
			.video-js .vjs-menu li.vjs-selected:hover {
				background-color: #ffffff !important;
				color: #000000 !important;
			}

			.video-js .vjs-menu li {
				white-space: nowrap !important;
				font-size: 12px !important;
				font-weight: 700 !important;
				max-width: 9999px !important;
			}

			.video-js .vjs-subs-caps-button .vjs-menu li {
				white-space: normal !important;
				min-width: 128px !important;
			}

			/* Progress Bar */
			.video-js .vjs-slider {
				background-color: rgba(15, 15, 15, 0.5);
			}

			.video-js .vjs-load-progress,
			.video-js .vjs-load-progress div {
				background: rgba(87, 87, 88, 1);
			}

			.video-js .vjs-slider:hover,
			.video-js button:hover {
				color: #ffffff;
			}

			/* Overlay */
			.video-js .vjs-overlay {
				background-color: rgba(35, 35, 35, 0.75) !important;
			}
			.video-js .vjs-overlay * {
				color: rgba(255, 255, 255, 1) !important;
				text-align: center;
			}

			/* ProgressBar marker */
			.video-js .vjs-marker {
				background-color: rgba(255, 255, 255, 1);
				z-index: 0;
			}

			/* Big "Play" Button */
			.video-js .vjs-big-play-button {
				background-color: rgba(35, 35, 35, 0.5);
			}

			.video-js:hover .vjs-big-play-button {
				background-color: rgba(35, 35, 35, 0.75);
			}

			.video-js .vjs-current-time,
			.video-js .vjs-time-divider,
			.video-js .vjs-duration {
				display: block;
			}

			.video-js .vjs-time-divider {
				min-width: 0px;
				padding-left: 0px;
				padding-right: 0px;
			}

			.video-js .vjs-poster {
				background-size: cover;
				object-fit: cover;
			}

			.video-js .player-dimensions.vjs-fluid {
				padding-top: 82vh;
			}

			video.video-js {
				position: absolute;
				height: 100%;
			}

			.video-js .mobile-operations-bar {
				display: flex;
				position: absolute;
				top: 0;
				right: 1px !important;
				left: initial !important;
				width: initial !important;
			}

			.video-js .mobile-operations-bar ul {
				position: absolute !important;
				bottom: unset !important;
				top: 1.5em;
			}

			.video-js .vjs-menu-button-popup .vjs-menu {
				border: 0 !important;
				padding-bottom: 12px !important;
			}

			.video-js .vjs-menu li.vjs-menu-item:not(.vjs-selected):hover {
				background-color: rgba(255, 255, 255, .2) !important;
				color: #ffffff !important;
			}

			.video-js .vjs-menu * {
				border: 0 !important;
			}

			/* Tooltips
			------------------------------------------------------------------------------------------ */
			.video-js .vjs-control-bar > .vjs-prev-button::before {
				content: 'Previous video';
			}

			.video-js .vjs-control-bar > .vjs-next-button::before {
				content: 'Next video';
			}

			.video-js .vjs-control-bar .vjs-mute-control:not(.vjs-vol-0)::before {
				content: 'Mute';
			}

			.video-js .vjs-control-bar .vjs-mute-control.vjs-vol-0::before {
				content: 'Unmute';
			}

			.video-js .vjs-control-bar > .vjs-playback-rate > .vjs-menu-button::before {
				content: 'Playback speed';
			}

			.video-js .vjs-control-bar > .vjs-subs-caps-button > .vjs-menu-button::before {
				content: 'Subtitles';
			}

			.video-js .vjs-control-bar > .vjs-quality-selector > .vjs-menu-button::before {
				content: 'Quality';
			}

			.video-js .vjs-control-bar > .vjs-download-button > .vjs-menu-button::before {
				content: 'Download';
			}

			.video-js .vjs-control-bar > .vjs-autoplay-button > .vjs-menu-button::before {
				content: 'Autoplay';
			}

			.video-js .vjs-control-bar > .vjs-source-button > .vjs-menu-button::before {
				content: 'Video source';
			}

			.video-js .vjs-control-bar > .vjs-miniplayer-button::before {
				content: 'Miniplayer';
			}

			.video-js .vjs-control-bar > .vjs-theater-button::before {
				content: 'Theater mode';
			}

			.video-js .vjs-control-bar > .vjs-fullscreen-control::before {
				content: 'Fullscreen';
				left: auto !important;
				right: 12px !important;
				transform: none !important;
			}

			.video-js .vjs-control-bar button.vjs-menu-button::before,
			.video-js .vjs-control-bar .vjs-button:not(.vjs-menu-button)::before {
				position: absolute;
				top: -40px;
				left: 50%;
				transform: translateX(-50%);
				background: rgba(0, 0, 0, .75);
				border-radius: 4px;
				font-size: 12px;
				font-weight: 700;
				padding: 8px;
				white-space: nowrap;
				opacity: 0;
				transition: opacity .1s;
				pointer-events: none;
				text-shadow: none !important;
				z-index: 1;
			}

			.video-js .vjs-control-bar div.vjs-menu-button:not(.vjs-menuOpen) button.vjs-menu-button:hover::before,
			.video-js .vjs-control-bar .vjs-button:not(.vjs-menu-button):hover::before {
				opacity: 1;
			}

			.video-js div.vjs-menu-button:not(.vjs-menuOpen) .vjs-menu {
				display: none !important;
			}

			.video-js div.vjs-menu-button.vjs-menuOpen .vjs-menu {
				display: block !important;
			}

			.video-js .vjs-menu {
				z-index: 999 !important;
			}

			.video-js .vjs-big-play-button {
				display: none !important;
			}

			.video-js .vjs-volume-panel,
			.video-js .vjs-button {
				z-index: 1;
			}

			.video-js .vjs-button.vjs-menuOpen {
				z-index: 999;
			}

			.video-js .vjs-error-display .vjs-modal-dialog-content {
				display: none;
			}

			.video-js:not(.vjs-has-started) .vjs-control-bar {
				display: flex !important;
			}

			.vjs-track-settings-controls button:hover {
				color: #000000 !important;
			}
		`;

		document.body.appendChild(style);
	}

	// Setup the previous button history
	function goodTube_player_videojs_setupPrevHistory() {
		// If we've hit the previous button
		if (goodTube_helper_getCookie('goodTube_previous') === 'true') {
			// Remove the last item from the previous video array
			goodTube_videojs_previousVideo.pop();

			goodTube_helper_setCookie('goodTube_previous', 'false');
		}
		// Otherwise it's a normal video load
		else {
			// Add this page to the previous video array
			goodTube_videojs_previousVideo.push(window.location.href);
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
		else {
			// Mobile
			if (window.location.href.indexOf('m.youtube') !== -1) {
				// If we're viewing a playlist
				if (typeof goodTube_getParams['i'] !== 'undefined' || typeof goodTube_getParams['index'] !== 'undefined' || typeof goodTube_getParams['list'] !== 'undefined') {
					let playlist = document.querySelectorAll('ytm-playlist-panel-renderer ytm-playlist-panel-video-renderer, ytm-playlist-video-list-renderer ytm-playlist-video-renderer');

					if (!playlist || playlist.length <= 0) {
						return;
					}

					// If the first video is NOT selected, enable previous
					let firstItemSelected = playlist[0].getAttribute('aria-selected');
					if (firstItemSelected === 'false') {
						goodTube_videojs_prevButton = true;
					}

					// If the last video is NOT selected, enable previous
					let lastItemSelected = playlist[playlist.length-1].getAttribute('aria-selected');
					if (lastItemSelected === 'true') {
						goodTube_videojs_nextButton = false;
					}
				}
				// Otherwise we're not in a playlist, so if a previous video exists
				else if (goodTube_videojs_previousVideo[goodTube_videojs_previousVideo.length - 2] && goodTube_videojs_previousVideo[goodTube_videojs_previousVideo.length - 2] !== window.location.href) {
					// Enable the previous button
					goodTube_videojs_prevButton = true;
				}
			}
			// Desktop
			else {
				goodTube_videojs_nextButton = true;

				// If we're viewing a playlist
				if (typeof goodTube_getParams['i'] !== 'undefined' || typeof goodTube_getParams['index'] !== 'undefined' || typeof goodTube_getParams['list'] !== 'undefined') {
					// If we're not viewing the first video in the playlist
					let playlist = document.querySelectorAll('.playlist-items ytd-playlist-panel-video-renderer');

					if (!playlist || playlist.length <= 0) {
						return;
					}

					if (playlist && !playlist[0].selected) {
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
		}

		// Show or hide the previous button
		let prevButton = document.querySelector('.vjs-prev-button');
		if (prevButton) {
			if (!goodTube_videojs_prevButton && !prevButton.classList.contains('goodTube_hidden')) {
				prevButton.classList.add('goodTube_hidden');
			}
			else if (goodTube_videojs_prevButton && prevButton.classList.contains('goodTube_hidden')) {
				prevButton.classList.remove('goodTube_hidden');
			}
		}

		// Show or hide the next button
		let nextButton = document.querySelector('.vjs-next-button');
		if (nextButton) {
			if (!goodTube_videojs_nextButton && !nextButton.classList.contains('goodTube_hidden')) {
				nextButton.classList.add('goodTube_hidden');
			}
			else if (goodTube_videojs_nextButton && nextButton.classList.contains('goodTube_hidden')) {
				nextButton.classList.remove('goodTube_hidden');
			}
		}
	}

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
		// Add URL param to default video source menu items
		let sourceMenuItems = document.querySelectorAll('.vjs-source-button .vjs-menu .vjs-menu-item');
		if (sourceMenuItems) {
			let i = 0;
			sourceMenuItems.forEach((sourceMenuItem) => {
				sourceMenuItem.setAttribute('api', goodTube_apis[i]['url']);

				if (goodTube_apis[i]['url'] === goodTube_api_url) {
					sourceMenuItem.classList.add('vjs-selected');
				}

				i++;
			});
		}

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

				if (window.location.href.indexOf('m.youtube') !== -1) {
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
	}

	// Show an error on screen
	function goodTube_player_videojs_showError() {
		let error = document.createElement('div');
		error.setAttribute('id', 'goodTube_error');
		error.innerHTML = "Video could not be loaded. Please select another video source.<br><small>There is a button for this at the bottom of the player.</small>";
		player.appendChild(error);

		document.querySelector('#goodTube_player').appendChild(error);
	}

	// Hide an error on screen
	function goodTube_player_videojs_hideError() {
		let error = document.querySelector('#goodTube_error');
		if (error) {
			error.remove();
		}
	}

	// Show downloading indicator
	function goodTube_player_videojs_showDownloading() {
		let loadingElement = document.querySelector('.vjs-download-button');

		// If there's no spinner, add one
		let spinnerElement = document.querySelector('.vjs-download-button .goodTube_spinner');
		if (!spinnerElement) {
			let spinnerIcon = document.createElement('div');
			spinnerIcon.classList.add('goodTube_spinner');
			spinnerIcon.innerHTML = "<div></div><div></div>";

			loadingElement.append(spinnerIcon);
		}


		if (loadingElement && !loadingElement.classList.contains('goodTube_loading')) {
			loadingElement.classList.add('goodTube_loading');
		}
	}

	// Hide downloading indicator
	function goodTube_player_videojs_hideDownloading() {
		let loadingElement = document.querySelector('.vjs-download-button');

		if (loadingElement && loadingElement.classList.contains('goodTube_loading')) {
			loadingElement.classList.remove('goodTube_loading');
		}
	}


	/* GoodTube general functions
	------------------------------------------------------------------------------------------ */
	let goodTube_stopUpdates = false;
	let goodTube_previousUrl = false;
	let goodTube_player = false;
	let goodTube_getParams = false;
	let goodTube_currentVideoId = false;
	let goodTube_downloading = false;

	// API Endpoints
	let goodTube_apis = [
		// FAST
		{
			'name': 'Amethyst (DE)',
			'type': 1,
			'proxy': true,
			'url': 'https://yt.artemislena.eu'
		},
		// FAST
		{
			'name': 'Sphynx (JP)',
			'type': 1,
			'proxy': true,
			'url': 'https://invidious.jing.rocks'
		},
		// FAST
		{
			'name': 'Goblin (AU)',
			'type': 1,
			'proxy': false,
			'url': '//invidious.perennialte.ch'
		},
		// FAST
		{
			'name': 'Jade (SG)',
			'type': 1,
			'proxy': true,
			'url': 'https://vid.lilay.dev'
		},
		// FAST
		{
			'name': '420 (FI)',
			'type': 1,
			'proxy': true,
			'url': 'https://invidious.privacyredirect.com'
		},
		// FAST
		{
			'name': 'Asrai (DE)',
			'type': 1,
			'proxy': true,
			'url': 'https://iv.nboeck.de'
		},
		// FAST
		{
			'name': 'Nymph (AT)',
			'type': 1,
			'proxy': true,
			'url': 'https://invidious.private.coffee'
		},
		// FAST
		{
			'name': 'Indigo (FI)',
			'type': 1,
			'proxy': true,
			'url': 'https://iv.datura.network'
		},
		// FAST
		{
			'name': 'Onyx (FR)',
			'type': 1,
			'proxy': true,
			'url': 'https://invidious.fdn.fr'
		},
		// MEDIUM
		{
			'name': 'Raptor (US)',
			'type': 1,
			'proxy': true,
			'url': 'https://invidious.drgns.space'
		},
		// MEDIUM
		{
			'name': 'Velvet (CL)',
			'type': 1,
			'proxy': true,
			'url': 'https://inv.nadeko.net'
		},
		// MEDIUM
		{
			'name': 'Obsidian (DE)',
			'type': 1,
			'proxy': true,
			'url': 'https://invidious.protokolla.fi'
		},
		// MEDIUM
		{
			'name': 'Sonar (DE)',
			'type': 1,
			'proxy': true,
			'url': 'https://yt.cdaut.de'
		},
		// MEDIUM
		{
			'name': 'Cauldron (UA)',
			'type': 1,
			'proxy': true,
			'url': 'https://invidious.nerdvpn.de'
		},
		// SLOW
		{
			'name': 'Druid (DE)',
			'type': 1,
			'proxy': true,
			'url': 'https://invidious.projectsegfau.lt'
		},
		// SLOW
		{
			'name': 'Riot (US)',
			'type': 1,
			'proxy': true,
			'url': 'https://iv.ggtyler.dev'
		},
	];

	// Set default API to a random server, this will help load on any one server
	let goodTube_api_randomServer = Math.floor(Math.random() * ((goodTube_apis.length - 1) - 0 + 1) + 0);
	let goodTube_api_type = goodTube_apis[goodTube_api_randomServer]['type'];
	let goodTube_api_proxy = goodTube_apis[goodTube_api_randomServer]['proxy'];
	let goodTube_api_url = goodTube_apis[goodTube_api_randomServer]['url'];
	let goodTube_api_name = goodTube_apis[goodTube_api_randomServer]['name'];

	// Press shortcut
	function goodTube_shortcut(shortcut) {
		let theKey = false;
		let keyCode = false;
		let shiftKey = false;

		if (shortcut === 'next') {
			theKey = 'n';
			keyCode = 78;
			shiftKey = true;
		}
		else if (shortcut === 'prev') {
			theKey = 'p';
			keyCode = 80;
			shiftKey = true;
		}
		else if (shortcut === 'theater') {
			theKey = 't';
			keyCode = 84;
			shiftKey = false;
		}
		else if (shortcut === 'fullscreen') {
			theKey = 'f';
			keyCode = 70;
			shiftKey = false;
		}
		else {
			return;
		}

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

	// Play the previous video
	function goodTube_prevVideo(pressedButton = false) {
		// Mobile
		if (window.location.href.indexOf('m.youtube') !== -1) {
			// If we're viewing a playlist
			if (typeof goodTube_getParams['i'] !== 'undefined' || typeof goodTube_getParams['index'] !== 'undefined' || typeof goodTube_getParams['list'] !== 'undefined') {
				let playlist = document.querySelectorAll('ytm-playlist-panel-renderer ytm-playlist-panel-video-renderer, ytm-playlist-video-list-renderer ytm-playlist-video-renderer');
				let selectedItem = document.querySelectorAll('ytm-playlist-panel-renderer ytm-playlist-panel-video-renderer[aria-selected="true"], ytm-playlist-video-list-renderer ytm-playlist-video-renderer[aria-selected="true"]');

				// Re-open the playlist if it's closed and try again
				if (!playlist || playlist.length <= 0 || !selectedItem || selectedItem.length <= 0) {
					document.querySelector('ytm-playlist-panel-entry-point')?.click();

					setTimeout(function() {
						goodTube_prevVideo(true);
					}, 100);

					return;
				}

				let prevEnabled = false;

				// If the last video is NOT selected, enable next
				let firstItemSelected = playlist[0].getAttribute('aria-selected');
				if (firstItemSelected === 'false') {
					prevEnabled = true;
				}

				if (prevEnabled) {
					// Debug message
					if (goodTube_debug) {
						console.log('[GoodTube] Playing previous video in playlist...');
					}

					let playNextInLoop = false;
					for (let i = playlist.length - 1; i >= 0; i--) {
						if (playNextInLoop) {
							playlist[i].querySelector('a.compact-media-item-image').click();
							return;
						}

						if (playlist[i].getAttribute('aria-selected') === 'true') {
							playNextInLoop = true;
						}
					}
				}
			}
			// Otherwise we're not viewing a playlist, so if autoplay is on or we've pressed the prev button, and a previous video exists
			else if ((goodTube_helper_getCookie('goodTube_autoplay') === 'on' || pressedButton) && goodTube_videojs_previousVideo[goodTube_videojs_previousVideo.length - 2] && goodTube_videojs_previousVideo[goodTube_videojs_previousVideo.length - 2] !== window.location.href) {
				// Debug message
				if (goodTube_debug) {
					console.log('[GoodTube] Autoplaying previous video...');
				}

				// Go back to the previous video
				setTimeout(function() {
					goodTube_helper_setCookie('goodTube_previous', 'true');
					window.history.go(-1);
				}, 0);
			}
		}
		// Desktop
		else {
			// If we're viewing a playlist
			if (typeof goodTube_getParams['i'] !== 'undefined' || typeof goodTube_getParams['index'] !== 'undefined' || typeof goodTube_getParams['list'] !== 'undefined') {
				let playlist = document.querySelectorAll('.playlist-items ytd-playlist-panel-video-renderer');

				// If we're not viewing the first video in the playlist
				if (playlist && !playlist[0].selected) {
					// Debug message
					if (goodTube_debug) {
						console.log('[GoodTube] Playing previous video in playlist...');
					}

					goodTube_shortcut('prev');
				}
				// Otherwise we're at the first video of the playlist, so if autoplay is on or we've pressed the prev button, and a previous video exists
				else if ((goodTube_helper_getCookie('goodTube_autoplay') === 'on' || pressedButton) && goodTube_videojs_previousVideo[goodTube_videojs_previousVideo.length - 2] && goodTube_videojs_previousVideo[goodTube_videojs_previousVideo.length - 2] !== window.location.href) {
					// Debug message
					if (goodTube_debug) {
						console.log('[GoodTube] Autoplaying previous video...');
					}

					// Go back to the previous video
					setTimeout(function() {
						goodTube_helper_setCookie('goodTube_previous', 'true');
						window.history.go(-1);
					}, 0);
				}
			}
			// Otherwise we're not viewing a playlist, so if autoplay is on or we've pressed the prev button, and a previous video exists
			else if ((goodTube_helper_getCookie('goodTube_autoplay') === 'on' || pressedButton) && goodTube_videojs_previousVideo[goodTube_videojs_previousVideo.length - 2] && goodTube_videojs_previousVideo[goodTube_videojs_previousVideo.length - 2] !== window.location.href) {
				// Debug message
				if (goodTube_debug) {
					console.log('[GoodTube] Autoplaying previous video...');
				}

				// Go back to the previous video
				setTimeout(function() {
					goodTube_helper_setCookie('goodTube_previous', 'true');
					window.history.go(-1);
				}, 0);
			}
		}
	}

	// Play the next video
	function goodTube_nextVideo(pressedButton = false) {
		// Mobile
		if (window.location.href.indexOf('m.youtube') !== -1) {
			// If we're viewing a playlist
			if (typeof goodTube_getParams['i'] !== 'undefined' || typeof goodTube_getParams['index'] !== 'undefined' || typeof goodTube_getParams['list'] !== 'undefined') {
				let playlist = document.querySelectorAll('ytm-playlist-panel-renderer ytm-playlist-panel-video-renderer, ytm-playlist-video-list-renderer ytm-playlist-video-renderer');
				let selectedItem = document.querySelectorAll('ytm-playlist-panel-renderer ytm-playlist-panel-video-renderer[aria-selected="true"], ytm-playlist-video-list-renderer ytm-playlist-video-renderer[aria-selected="true"]');

				// Re-open the playlist if it's closed and try again
				if (!playlist || playlist.length <= 0 || !selectedItem || selectedItem.length <= 0) {
					document.querySelector('ytm-playlist-panel-entry-point')?.click();

					setTimeout(function() {
						goodTube_nextVideo(true);
					}, 100);

					return;
				}

				let nextEnabled = false;

				// If the last video is NOT selected, enable next
				let lastItemSelected = playlist[playlist.length - 1].getAttribute('aria-selected');
				if (lastItemSelected === 'false') {
					nextEnabled = true;
				}

				if (nextEnabled) {
					// Debug message
					if (goodTube_debug) {
						console.log('[GoodTube] Playing next video in playlist...');
					}

					let playNextInLoop = false;
					for (let i = 0; i < playlist.length; i++) {
						if (playNextInLoop) {
							playlist[i].querySelector('a.compact-media-item-image').click();
							return;
						}

						if (playlist[i].getAttribute('aria-selected') === 'true') {
							playNextInLoop = true;
						}
					}
				}
			}
			// Otherwise we're not viewing a playlist, so if autoplay is on, play the next autoplay video
			else if (goodTube_helper_getCookie('goodTube_autoplay') === 'on' || pressedButton) {
				// Debug message
				if (goodTube_debug) {
					console.log('[GoodTube] Autoplaying next video...');
				}

				function goodTube_clickNextButtonMobile() {
					// Skip to the end of the video
					goodTube_player_skipTo(goodTube_player, goodTube_player.duration);

					// Sync the players, this helps the Youtube next button to populate
					goodTube_youtube_syncPlayers();

					// Click the next button
					let nextButton = document.querySelector('.icon-button[aria-label="Next video"');

					if (nextButton) {
						nextButton.click();
					}
					else {
						setTimeout(goodTube_clickNextButtonMobile, 0);
					}
				}

				// Play the next video
				setTimeout(goodTube_clickNextButtonMobile, 0);
			}
		}
		// Desktop
		else {
			// If we're viewing a playlist
			if (typeof goodTube_getParams['i'] !== 'undefined' || typeof goodTube_getParams['index'] !== 'undefined' || typeof goodTube_getParams['list'] !== 'undefined') {
				let playlist = document.querySelectorAll('.playlist-items ytd-playlist-panel-video-renderer');

				// If we're not viewing the last video in the playlist
				if (playlist && !playlist[playlist.length - 1].selected) {
					// Debug message
					if (goodTube_debug) {
						console.log('[GoodTube] Playing next video in playlist...');
					}

					goodTube_shortcut('next');
				}
				// Otherwise we're at the last video of the playlist,  so if autoplay is on or we've pressed the next button, play the next autoplay video
				else if (goodTube_helper_getCookie('goodTube_autoplay') === 'on' || pressedButton) {
					// Debug message
					if (goodTube_debug) {
						console.log('[GoodTube] Autoplaying next video...');
					}

					// Play the next video
					setTimeout(function() {
						goodTube_shortcut('next');
					}, 0);
				}
			}
			// Otherwise we're not viewing a playlist,  so if autoplay is on or we've pressed the next button, play the next autoplay video
			else if (goodTube_helper_getCookie('goodTube_autoplay') === 'on' || pressedButton) {
				// Debug message
				if (goodTube_debug) {
					console.log('[GoodTube] Autoplaying next video...');
				}

				// Play the next video
				setTimeout(function() {
					goodTube_shortcut('next');
				}, 0);
			}
		}
	}

	// Download
	function goodTube_download(type) {
		// Show the downloading indicator
		goodTube_player_videojs_showDownloading();

		// Mobile only supports h264, otherwise we use vp9
		let vCodec = 'vp9';
		if (window.location.href.indexOf('m.youtube') !== -1) {
			vCodec = 'h264';
		}

		// Audio only option
		let isAudioOnly = false;
		if (type === 'audio') {
			isAudioOnly = true;
		}

		// Setup options to call the API
		let jsonData = JSON.stringify({
			'url': 'https://www.youtube.com/watch?v='+goodTube_currentVideoId,
			'vCodec': vCodec,
			'vQuality': 'max',
			'filenamePattern': 'basic',
			'isAudioOnly': isAudioOnly
		});

		// Call the API
		fetch('https://co.wuk.sh/api/json/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: jsonData
		})
		.then(response => response.text())
		.then(data => {
			// Turn data into JSON
			data = JSON.parse(data);

			// If the data is all good
			if (typeof data['status'] !== 'undefined' && data['status'] !== 'error' && typeof data['url'] !== 'undefined' && data['url']) {
				// Download the file
				window.open(data['url'], '_self');

				// Hide the downloading indicator
				setTimeout(function() {
					goodTube_player_videojs_hideDownloading();
				}, 1000);
			}
			// Otherwise fallback
			else {
				if (type === 'audio') {
					window.open(goodTube_api_url+'/watch?v='+goodTube_getParams['v']+'&listen=true&raw=1', '_blank');
				}
				else {
					window.open(goodTube_api_url+'/latest_version?id='+goodTube_getParams['v'], '_blank');
				}

				// Hide the downloading indicator
				setTimeout(function() {
					goodTube_player_videojs_hideDownloading();
				}, 1000);
			}

		})
		.catch((error) => {
			// If anything went wrong, fallback
			if (type === 'audio') {
				window.open(goodTube_api_url+'/watch?v='+goodTube_getParams['v']+'&listen=true&raw=1', '_blank');
			}
			else {
				window.open(goodTube_api_url+'/latest_version?id='+goodTube_getParams['v'], '_blank');
			}

			// Hide the loading indicator
			goodTube_download_hideLoading();
		});
	}

	// Check for updates
	function goodTube_checkForUpdates() {
		if (goodTube_stopUpdates) {
			return;
		}

		const scriptUrl = goodTube_github+'/goodtube.user.js?i'+Date.now();

		// Debug message
		if (goodTube_debug) {
			console.log('[GoodTube] Checking for updates...');
		}

		fetch(scriptUrl)
		.then(response => response.text())
		.then(data => {
			// Extract version from the script on GitHub
			const match = data.match(/@version\s+(\d+\.\d+)/);

			// If we can't find the version, just return
			if (!match) {
				return;
			}

			const currentVersion = parseFloat(GM_info.script.version);
			const githubVersion = parseFloat(match[1]);

			// There's no updates, so just return
			if (githubVersion <= currentVersion) {
				// Debug message
				if (goodTube_debug) {
					console.log('[GoodTube] No updates found');
				}
				return;
			}

			// If a version is skipped, don't show the update message again until the next version
			if (parseFloat(localStorage.getItem('goodTube_stopUpdates')) === githubVersion) {
				return;
			}

			// Style SweetAlert2
			let style = document.createElement('style');
			style.textContent = `
				html body .swal2-container {
					z-index: 2400;
				}

				html body .swal2-title {
					font-size: 18px;
				}

				html body .swal2-html-container {
					font-size: 14px;
					margin-top: 8px;
					margin-bottom: 12px;
				}

				html body .swal2-actions {
					margin: 0 !important;
					display: flex;
					flex-wrap: wrap;
					gap: 8px;
				}

				html body .swal2-actions button {
					margin: 0 !important;
					font-size: 12px;
				}
			`;
			document.head.appendChild(style);

			// Include SweetAlert2 library
			fetch(goodTube_github+'/js/sweetalert2@11.js')
			.then(response => response.text())
			.then(data => {
				let asset_element = document.createElement('script');
				asset_element.innerHTML = data;
				document.head.appendChild(asset_element);

				Swal.fire({
					position: "top-end",
					backdrop: false,
					title: 'GoodTube: a new version is available.',
					text: 'Do you want to update?',
					showCancelButton: true,
					showDenyButton: true,
					confirmButtonText: 'Update',
					denyButtonText:'Skip',
					cancelButtonText: 'Close'
				}).then((result) => {
					if (result.isConfirmed) {
						window.location = scriptUrl;
					}
					else if (result.isDenied) {
						localStorage.setItem('goodTube_stopUpdates', githubVersion);
					}
				});
			});

			// Debug message
			if (goodTube_debug) {
				console.log('[GoodTube] New version found - '+githubVersion);
			}
		})
		.catch(error => {
			goodTube_stopUpdates = true;
		});

		goodTube_stopUpdates = true;
	}

	// Actions
	function goodTube_actions() {
		// Hide youtube players
		goodTube_youtube_hidePlayers();

		// Hide ads, shorts, etc - real time
		goodTube_youtube_hideAdsShortsEtc_realTime();

		// Remove that annoying "Are you still watching" prompt
		goodTube_youtube_areYouStillWatching();

		// Support timestamp links in comments
		goodTube_youtube_timestampLinks();

		// Check that the assets are loaded AND the player is loaded before continuing
		let player = goodTube_player;
		if (goodTube_player_loadedAssets >= goodTube_player_assets.length && goodTube_videojs_player_loaded) {
			// Remove hashes, these mess with things sometimes
			let prevURL = goodTube_previousUrl;
			if (prevURL) {
				prevURL = prevURL.split('#')[0];
			}

			let currentURL = window.location.href.split('#')[0];
			if (currentURL) {
				currentURL = currentURL.split('#')[0];
			}

			// If the URL has changed (or on first page load)
			if (prevURL !== currentURL) {
				// Setup GET params
				goodTube_getParams = goodTube_helper_parseGetParams();

				// If we're viewing a video
				if (typeof goodTube_getParams['v'] !== 'undefined') {
					// Show the player (mobile only)
					if (window.location.href.indexOf('m.youtube') !== -1) {
						goodTube_player_show(player);
					}

					// Debug message
					if (goodTube_debug) {
						console.log('\n-------------------------\n\n');
					}

					// Setup the previous button history
					goodTube_player_videojs_setupPrevHistory();

					// Load the video data

					// Debug message
					if (goodTube_debug) {
						console.log('[GoodTube] Loading video data from '+goodTube_api_name+'...');
					}

					goodTube_player_loadVideoDataAttempts = 0;
					goodTube_player_loadVideo(player);

					// Usage stats
					goodTube_stats_video();
				}
				// Otherwise we're not viewing a video, and we're not in the miniplayer or pip
				else if (!goodTube_player_miniplayer && !goodTube_player_pip) {
					// Clear the player
					goodTube_player_clear(goodTube_player);

					// Hide the player (mobile only)
					if (window.location.href.indexOf('m.youtube') !== -1) {
						goodTube_player_hide(player);
					}

					// Empty the previous video history
					goodTube_videojs_previousVideo = [];

					// Clear any pending retry attempts
					for (let key in goodTube_pendingRetry) {
						if (goodTube_pendingRetry.hasOwnProperty(key)) {
							clearTimeout(goodTube_pendingRetry[key]);
						}
					}
				}

				// Ok, we've done what we need to with our player so let's pause this part of the loop until the URL changes
				goodTube_previousUrl = window.location.href;
			}
		}
	}

	/*
		Basic usage stats
		Don't worry peeps! This is just a counter that totals unique users / how many videos were played with GoodTube.
		It's only in here so I can have some fun and see how many people use this thing I made - no private info is tracked!!
		Full details here: https://counterapi.dev/api/
	*/
	function goodTube_stats_unique() {
		if (!goodTube_helper_getCookie('goodTube_unique')) {
			fetch('https://api.counterapi.dev/v1/goodtube/users/up/');
			goodTube_helper_setCookie('goodTube_unique', 'true');
		}
	}

	function goodTube_stats_video() {
		fetch('https://api.counterapi.dev/v1/goodtube/videos/up/');
	}

	// Init
	function goodTube_init() {
		// Debug message
		if (goodTube_debug) {
			console.log('\n==================================================\n    ______                ________      __\n   / ____/___  ____  ____/ /_  __/_  __/ /_  ___\n  / / __/ __ \\/ __ \\/ __  / / / / / / / __ \\/ _ \\\n / /_/ / /_/ / /_/ / /_/ / / / / /_/ / /_/ /  __/\n \\____/\\____/\\____/\\____/ /_/  \\____/_____/\\___/\n\n==================================================');
			console.log('[GoodTube] Initiating...');
		}

		// If there's a cookie for our previously chosen API, select it
		let goodTube_api_cookie = goodTube_helper_getCookie('goodTube_api');
		if (goodTube_api_cookie) {
			goodTube_apis.forEach((api) => {
				if (api['url'] === goodTube_api_cookie) {
					goodTube_api_type = api['type'];
					goodTube_api_proxy = api['proxy'];
					goodTube_api_url = api['url'];
					goodTube_api_name = api['name'];
				}
			});
		}

		// Mute, pause and skip ads on all Youtube as much as possible
		setInterval(goodTube_youtube_mutePauseSkipAds, 1);

		// Run the GoodTube actions initally
		setInterval(goodTube_actions, 1);

		// Setup our next / prev buttons to show or hide every 100ms
		setInterval(goodTube_player_videojs_showHideNextPrevButtons, 100);

		// Sync pip properly
		setInterval(goodTube_player_pipUpdate, 100);

		// Sync miniplayer properly
		setInterval(goodTube_player_miniplayerUpdate, 100);

		// Hide ads, shorts, etc - init
		goodTube_youtube_hideAdsShortsEtc_init();

		// Support hiding elements without Youtube knowing
		goodTube_helper_hideElement_init();

		// Check for updates
		goodTube_checkForUpdates();

		// Mute, pause and skip ads on all Youtube initally
		goodTube_youtube_mutePauseSkipAds();

		// Load required assets
		goodTube_player_loadAssets();

		// Init our player
		goodTube_player_init();

		// Usage stats
		goodTube_stats_unique();
	}


	/* Start GoodTube
	------------------------------------------------------------------------------------------ */
	goodTube_init();


})();

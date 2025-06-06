// ==UserScript==
// @name         GoodTube Testing
// @namespace    http://tampermonkey.net/
// @version      1.001
// @description  A testing ground for GoodTube.
// @author       GoodTube - Embed
// @match        *://m.youtube.com/*
// @match        *://www.youtube.com/*
// @match        *://youtube.com/*
// @match        *://*.wikipedia.org/*
// @icon         https://cdn-icons-png.flaticon.com/256/1384/1384060.png
// @run-at       document-start
// ==/UserScript==

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


	function goodTube_init() {
		goodTube_youtube_mutePauseSkipAds();
		setInterval(goodTube_youtube_mutePauseSkipAds, 1);

		// Create a wiki iframe with forbidden content (profanity)
		let wikiIframe = document.createElement('div');

		// Add the wiki iframe to the page
		document.body.appendChild(wikiIframe);

		// Update the content of the wiki iframe
		wikiIframe.innerHTML = "<iframe src='https://en.wikipedia.org/wiki/Fuck?goodTube=1' width='100%' height='100%'></iframe>";

		// Style the wiki iframe
		wikiIframe.style.position = 'fixed';
		wikiIframe.style.top = '0';
		wikiIframe.style.bottom = '0';
		wikiIframe.style.right = '0';
		wikiIframe.style.left = '0';
		wikiIframe.style.zIndex = '99999';
	}


	function wikiIframe_init() {


		// Create a youtube iframe
		let youtubeIframe = document.createElement('div');

		// Add the youtube iframe to the page
		document.body.appendChild(youtubeIframe);

		// Update the content of the youtube iframe
		youtubeIframe.innerHTML = `
			<iframe
				width="100%"
				height="100%"
				src="https://www.youtube.com/embed/s-lfdPdW63Y?autoplay=1&mobile=false"
				frameborder="0"
				scrolling="yes"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		`;

		// Style the youtube iframe
		youtubeIframe.style.position = 'fixed';
		youtubeIframe.style.top = '0';
		youtubeIframe.style.bottom = '0';
		youtubeIframe.style.right = '0';
		youtubeIframe.style.left = '0';
		youtubeIframe.style.zIndex = '99999';
	}


	/* Start GoodTube
	------------------------------------------------------------------------------------------ */
	// Youtube page
	if (window.top === window.self && window.location.href.indexOf('wikipedia.org') === -1) {
		document.addEventListener("DOMContentLoaded", goodTube_init);
	}
	// Wiki iframe iframe
	else if (window.location.href.indexOf('?goodTube=1') !== -1) {
		// Hide the body content
		let elements = document.querySelectorAll('body > *');
		elements.forEach(element => {
			element.style.display = 'none';
			element.style.opacity = '0';
			element.style.visibility = 'hidden';
		});

		document.addEventListener("DOMContentLoaded", wikiIframe_init);
	}


})();

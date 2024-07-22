// ==UserScript==
// @name         GoodTube
// @namespace    http://tampermonkey.net/
// @version      5.005
// @description  Loads Youtube videos from different sources. Also removes ads, shorts, etc.
// @author       GoodTube
// @match        https://*.youtube.com/*
// @icon         https://cdn-icons-png.flaticon.com/256/1384/1384060.png
// @run-at       document-start
// @updateURL    https://github.com/goodtube4u/goodtube/raw/main/goodtube.min.user.js
// @downloadURL  https://github.com/goodtube4u/goodtube/raw/main/goodtube.min.user.js
// @noframes
// ==/UserScript==

// This now automatically loads the latest version. This means that you will never need to update manually again :)
// To view the full source code go here: https://github.com/goodtube4u/goodtube/blob/main/goodtube.js

(function() {
	'use strict';

	// Define load function
	function goodTube_load(loadAttempts) {
		// If it's the first load attempt
		if (loadAttempts === 0) {
			// Debug message
			console.log('\n==================================================\n    ______                ________      __\n   / ____/___  ____  ____/ /_  __/_  __/ /_  ___\n  / / __/ __ \\/ __ \\/ __  / / / / / / / __ \\/ _ \\\n / /_/ / /_/ / /_/ / /_/ / / / / /_/ / /_/ /  __/\n \\____/\\____/\\____/\\____/ /_/  \\____/_____/\\___/\n\n==================================================');
			console.log('[GoodTube] Initiating...');
		}

		// Only re-attempt to load the GoodTube 10 times
		if (loadAttempts >= 9) {
			// Debug message
			console.log('[GoodTube] GoodTube could not be loaded');

			// Show prompt
			alert('GoodTube could not be loaded! Please refresh the page to try again.');

			return;
		}

		// Increment the load attempts
		loadAttempts++;

		// Load GoodTube
		fetch('https://raw.githubusercontent.com/goodtube4u/GoodTube/main/goodtube.min.js')
		// Success
		.then(response => response.text())
		.then(data => {
			// Put GoodTube code into a <script> tag
			let element = document.createElement('script');
			element.innerHTML = data;
			document.head.appendChild(element);
		})
		// Error
		.catch((error) => {
			// Try again after 500ms
			setTimeout(function() {
				goodTube_load(loadAttempts);
			}, 500);
		});
	}

	// Load GoodTube
	goodTube_load(0);
})();

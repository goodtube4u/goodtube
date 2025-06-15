// ==UserScript==
// @name         GoodTube
// @namespace    http://tampermonkey.net/
// @version      3.001
// @description  Removes 100% of Youtube ads.
// @author       GoodTube
// @updateURL    https://github.com/goodtube4u/goodtube/raw/refs/heads/main/goodtube.user.js
// @downloadURL  https://github.com/goodtube4u/goodtube/raw/refs/heads/main/goodtube.user.js
// @match        *://m.youtube.com/*
// @match        *://www.youtube.com/*
// @match        *://youtube.com/*
// @match        *://*.wikipedia.org/*
// @icon         https://cdn-icons-png.flaticon.com/256/1384/1384060.png
// @run-at       document-start
// ==/UserScript==

// This now automatically loads the latest version. This means that you will never need to update manually again :)
// To view the full source code go here: https://github.com/goodtube4u/goodtube/blob/main/goodtube.js

(function () {
	'use strict';

	// Bypass CSP restrictions, introduced by the latest Chrome updates
	if (window.trustedTypes && window.trustedTypes.createPolicy && !window.trustedTypes.defaultPolicy) {
		window.trustedTypes.createPolicy('default', {
			createHTML: string => string,
			createScriptURL: string => string,
			createScript: string => string
		});
	}

	// Define load function
	function goodTube_load(loadAttempts) {
		// If it's the first load attempt
		if (loadAttempts === 0) {
			// Debug message
			if (window.top === window.self) {
				console.log('\n==================================================\n    ______                ________      __\n   / ____/___  ____  ____/ /_  __/_  __/ /_  ___\n  / / __/ __ \\/ __ \\/ __  / / / / / / / __ \\/ _ \\\n / /_/ / /_/ / /_/ / /_/ / / / / /_/ / /_/ /  __/\n \\____/\\____/\\____/\\____/ /_/  \\____/_____/\\___/\n\n==================================================');
				console.log('[GoodTube] Initiating...');
			}
		}

		// Only re-attempt to load the GoodTube 10 times
		if (loadAttempts >= 9) {
			if (window.top === window.self) {
				// Debug message
				console.log('[GoodTube] GoodTube could not be loaded');

				// Show prompt
				alert('GoodTube could not be loaded! Please refresh the page to try again.');
			}

			return;
		}

		// Increment the load attempts
		loadAttempts++;

		// Load GoodTube
		fetch('https://raw.githubusercontent.com/goodtube4u/goodtube/refs/heads/main/goodtube.js')
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
				setTimeout(function () {
					goodTube_load(loadAttempts);
				}, 500);
			});
	}

	// Load GoodTube
	goodTube_load(0);
})();

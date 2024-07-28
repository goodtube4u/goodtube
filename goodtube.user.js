// ==UserScript==
// @name         GoodTube
// @namespace    http://tampermonkey.net/
// @version      5.007
// @description  Loads Youtube videos from different sources. Also removes ads, shorts, etc.
// @author       GoodTube
// @match        https://*.youtube.com/*
// @icon         https://cdn-icons-png.flaticon.com/256/1384/1384060.png
// @run-at       document-start
// @updateURL    https://github.com/goodtube4u/goodtube/raw/main/goodtube.user.js
// @downloadURL  https://github.com/goodtube4u/goodtube/raw/main/goodtube.user.js
// @noframes
// ==/UserScript==

// This now automatically loads the latest version. This means that you will never need to update manually again :)
// To view the full source code go here: https://github.com/goodtube4u/goodtube/blob/main/goodtube.js

/*
	Pro tip - if you host a local video server, you can make this plugin really fast!
	------------------------------------------------------------------------------------------
	- This is for advanced users only.
	- This is not for phones. You can only do this on a desktop computer (mac, linux, windows - all work).
	- Doing this will significantly speed up GoodTube (pretty much to normal loading speed for videos).


	Here's how you do it:
	------------------------------------------------------------------------------------------
	1. Install Docker Desktop (https://www.docker.com/products/docker-desktop/)

	2. Install Git (https://git-scm.com/downloads)

	3. Open Terminal / Command Prompt and enter the following commands
		 cd c:/
		 git clone https://github.com/iv-org/invidious.git

	4. Edit the following file in a text editor like Notepad: c:/invidious/docker-compose.yml

	5. Delete all the code in there and replace it with:
			version: "3"
			services:

				invidious:
					image: quay.io/invidious/invidious:latest
					# image: quay.io/invidious/invidious:latest-arm64 # ARM64/AArch64 devices
					restart: unless-stopped
					ports:
						- "127.0.0.1:3000:3000"
					environment:
						# Please read the following file for a comprehensive list of all available
						# configuration options and their associated syntax:
						# https://github.com/iv-org/invidious/blob/master/config/config.example.yml
						INVIDIOUS_CONFIG: |
							db:
								dbname: invidious
								user: kemal
								password: kemal
								host: invidious-db
								port: 5432
							check_tables: true
							# external_port:
							# domain:
							# https_only: false
							# statistics_enabled: false
							hmac_key: "goodtube4u"
					healthcheck:
						test: wget -nv --tries=1 --spider http://127.0.0.1:3000/api/v1/trending || exit 1
						interval: 30s
						timeout: 5s
						retries: 2
					logging:
						options:
							max-size: "1G"
							max-file: "4"
					depends_on:
						- invidious-db

				invidious-db:
					image: docker.io/library/postgres:14
					restart: unless-stopped
					volumes:
						- postgresdata:/var/lib/postgresql/data
						- ./config/sql:/config/sql
						- ./docker/init-invidious-db.sh:/docker-entrypoint-initdb.d/init-invidious-db.sh
					environment:
						POSTGRES_DB: invidious
						POSTGRES_USER: kemal
						POSTGRES_PASSWORD: kemal
					healthcheck:
						test: ["CMD-SHELL", "pg_isready -U $$POSTGRES_USER -d $$POSTGRES_DB"]

			volumes:
				postgresdata:

	6. Open Terminal / Command Prompt and enter the following commands
		 cd c:/invidious
		 docker-compose up

	7. Let it run for a few minutes, you'll see a bunch of text appearing while it installs everything. Eventually it will stop outputting text and you can close Terminal / Command Prompt.

	8. Open Docker Desktop.

	9. On the "Containers" tab you will see a thing called "Invidious". Press the play arrow to start it.

	10. Check it's working by going to 127.0.0.1:3000 in your browser. If you see an instance of Invidious you're good to go!

	11. Now that's done, go to https://www.youtube.com/?goodtube_local=true in your browser to enable the local server. You only need to do this once, the setting will be remembered.

	12. Now you can visit Youtube like normal, but at the top of the "Video Source" list you will see a server called "LOCAL". This is your local server.

	13. So long as you've got your Invidious instance running in Docker Desktop, then this server will work - and should be SUPER FAST. Enjoy :)

	Note: If you want to turn this off, go to https://www.youtube.com/?goodtube_local=false in your browser. You only need to do this once, the setting will be remembered.
*/

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
		fetch('https://raw.githubusercontent.com/goodtube4u/GoodTube/main/goodtube.min.js?i='+Date.now())
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

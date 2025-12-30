// ================================================================================
//      ______                ________      __
//     / ____/___  ____  ____/ /_  __/_  __/ /_  ___
//    / / __/ __ \/ __ \/ __  / / / / / / / __ \/ _ \
//   / /_/ / /_/ / /_/ / /_/ / / / / /_/ / /_/ /  __/
//   \____/\____/\____/\____/ /_/  \____/_____/\___/
//
//
//	Hello friend, welcome to GoodTube.
//
//	The below code automatically loads the latest minified version.
//	This means you will never need to manually update :)
//
//	To view the full source code go here:
//	https://github.com/goodtube4u/goodtube/blob/main/goodtube.js
//
// ================================================================================

// ==UserScript==

// @name         GoodTube
// @description  A free Youtube adblocker. Removes 100% of Youtube ads and also provides an option to disable shorts.
// @version      3.004
// @author       GoodTube
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIyM0MxODVGQkQyQTExRjA4N0I2QTU0RDU1NEYxRDBGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIyM0MxODYwQkQyQTExRjA4N0I2QTU0RDU1NEYxRDBGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjIzQzE4NURCRDJBMTFGMDg3QjZBNTRENTU0RjFEMEYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjIzQzE4NUVCRDJBMTFGMDg3QjZBNTRENTU0RjFEMEYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4gnVxyAAAEKUlEQVR42uxZ3U4TQRQ+p7TGG4kJL4AxvUBJDLMtxnjrkxBoqQ8EtIWH0AfwSi+k3SEmKjFBQiCRWzQRMf05zu50dufM/qQIGtqwibG7MzvznXO+852zAxIRTNJVgAm7bgHfAnauYtZAd60+ykYcPSGotJt44wD7tUYItPKyAT9PT+HLq9fhc9Hc+mdgzZ7GMcPBIPxV3WnjdFFC1huExqbhEI7fvoP/odNeaxPN/sF2VRXd8F55nqzxCLAv1kJUD2sv4P6zBT3S76noEODIgu7auqZKO6aGec/MEX7rSrTRvomXGCgMhWJpvKS7zkt6NRamqxhWtD1Eh0fq5gcYdViYnwcI/gWbSqkSbxOzvUNXTrpyuQwnJ8cAFxc66VZWQof7QhvsyRYW41C4m1JgSe5GiHiJcBNwmbTX0f/Pzt6Dx4uLAB8/2aMaC/dw+ib7n/fh/PycJQbPlhkd4tZmLnJDAb+2nhoGEzk9juB5gjnOdsxkylrkAZX1R28OtV2VJWVrOQpHkDhuslCGWmhVpKSXKjNqzWQwDEex+khR5xt8P9Pv0tlZvg4Hixqu4RhJhRZwl8+FAkL8ClrQKZPDAHfVzQM4+KorHfoH4b6ejCseZmV3KEVPq0D9vtVgSAbMvOrVq0kEBIkEls3dFOMDzy/xRFb7ZMnfxHEY8/TTcEvzS3mhuweitpxUpyCr7XUQOcvtLeSenjuaE3idvCUWwbzCwgE328TDGt/6zY5S8iWFrZgMexBScoFiOmB/jz3w/T6goUB9mRts9q+v4fQ18No6XmXQtT7yKDqyMnqPEjKQrKDojvPIpgNubZO7sfR7jgARDxMju3Seo8MDF1D8CC3V8GWfzRZeSc81+GqrqpcIeaundDqqnSuYHrWBrswROR4mxxhTUh3+h7xF4JEZjdtmeU2+p1/bJNWWQ7VainJsMjnsq/CH7dw2txCa28Q4rEY7u73IUcvLvLmG3U78e26O08ly5e9fQ4dpaKmU+l1fRTvKgafDe6+oFKW2EVZLlwKRxBm9DIxSOgwVEVUrpj4IXPLs0HZ7GaVYvduR0ZpepcSpZMlZCBrzVMLwzHAtYjolmp+kgvAZYY+S6CEwHkOn1uf02YW0BLuJl8GYXemUB6TsWU12A4NPGfQHiQ4OqyJV7aJPL3vwfRdsXcPnd0BsmK9mzVUhSjyGFjUyKREkIvO8MgbxieKbLUPraCQPU1pQMqBoGO0tPuygXN+Kpw4KkaNEM5lk03a2hmnfiMxnad+SFJ1fYKoakPILFnjZj788AombyUn8XMAEQOORnz2T7UslrbAqmpYrzDtZGb8fdouIbyVh4CEx4vClzyFGyWV8FHHVSq7pPx9O5e/Q7ij//qTH/nKmS64zPmAVrgq0r+UoU4QlPL0ETx0l8PbvdLeAJxzwHwEGAEe89+zqt8ZVAAAAAElFTkSuQmCC

// @namespace    https://github.com/goodtube4u/goodtube/
// @updateURL    https://github.com/goodtube4u/goodtube/raw/refs/heads/main/goodtube.user.js
// @downloadURL  https://github.com/goodtube4u/goodtube/raw/refs/heads/main/goodtube.user.js

// @match        *://m.youtube.com/*
// @match        *://www.youtube.com/*
// @match        *://youtube.com/*
// @match        *://*.wikipedia.org/*
// @run-at       document-start

// ==/UserScript==


(function () {
	'use strict';


	/* Configure CSP
	---------------------------------------------------------------------------------------------------- */
	let goodTube_csp = false;
	if (window.trustedTypes && window.trustedTypes.createPolicy) {
		goodTube_csp = window.trustedTypes.createPolicy("GoodTubeLoadPolicy", {
			createScript: string => string
		});
	}


	/* Load GoodTube
	---------------------------------------------------------------------------------------------------- */
	function goodTube_load(loadAttempts = 0) {
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

		// Get the GoodTube minified code
		fetch('https://raw.githubusercontent.com/goodtube4u/goodtube/refs/heads/main/goodtube.min.js')
			// Success
			.then(response => response.text())
			.then(data => {
				// Load the GoodTube code into a <script> tag (and use CSP if supported)
				let script = document.createElement('script');

				if (goodTube_csp) {
					script.textContent = goodTube_csp.createScript(data);
				}
				else {
					script.textContent = data;
				}

				document.head.appendChild(script);
			})
			// Error
			.catch((error) => {
				// Try again after 500ms
				setTimeout(function () {
					goodTube_load(loadAttempts);
				}, 500);
			});
	}

	// Let's go!
	goodTube_load();
})();

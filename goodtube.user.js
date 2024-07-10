// ==UserScript==
// @name         GoodTube
// @namespace    http://tampermonkey.net/
// @version      4.525
// @description  Loads Youtube videos from different sources. Also removes ads, shorts, etc.
// @author       GoodTube
// @match        https://*.youtube.com/*
// @icon         https://cdn-icons-png.flaticon.com/256/1384/1384060.png
// @run-at       document-start
// @updateURL    https://github.com/goodtube4u/goodtube/raw/main/goodtube.user.js
// @downloadURL  https://github.com/goodtube4u/goodtube/raw/main/goodtube.user.js
// @noframes
// ==/UserScript==

// This script has been minified for performance reasons.
// To view the full source code, go here: https://github.com/goodtube4u/goodtube/blob/main/goodtube.user_unminified.js

!function(){"use strict";let e="https://raw.githubusercontent.com/goodtube4u/GoodTube/main";function o(){let e={};return document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g,function(){function o(e){return decodeURIComponent(e.split("+").join(" "))}e[o(arguments[1])]=o(arguments[2])}),e}function t(e,o){document.cookie=e+"="+encodeURIComponent(o)+"; max-age=34473600"}function r(e){let o=document.cookie.split(";");for(let t=0;t<o.length;t++){let r=o[t].split("=");if(e==r[0].trim())return decodeURIComponent(r[1])}return null}function i(e){e&&!e.classList.contains("goodTube_hidden")&&e.classList.add("goodTube_hidden")}function a(e){e&&e.classList.contains("goodTube_hidden")&&e.classList.remove("goodTube_hidden")}let n=!0,s=0;function l(){let e=document.querySelector("#movie_player video");e&&(e.muted=!0,e.volume=0);let o=document.querySelector("#movie_player");o&&o.mute();let t=document.querySelector(".ytp-skip-ad-button");t&&t.click();document.querySelectorAll("video:not(#goodTube_player):not(#goodTube_player_html5_api)").forEach(e=>{e.closest("#inline-player")||e.closest("#movie_player")||(e.muted=!0,e.volume=0,n||e.pause())})}function d(){let e=document.querySelector("#player video");if(e&&Q&&void 0!==ec.v){let o=eu.currentTime;if(o===s&&parseFloat(o)>0)return;s=o,e.currentTime=o,n=!0,e.play(),e.muted=!0,e.volume=0,setTimeout(function(){e.pause(),e.muted=!0,e.volume=0,n=!1},10)}}let p=[],u=0,c=[e+"/js/assets.min.js",e+"/css/assets.min.css"],b=0,v=0,m=0,y=!1,g=1,h=!1,f=!1,$=!1,j=!1,T=!1,_=!1,w=!1,x=!1,k=!1,S=!1,L=!1,A=0;function q(e,o){let r=document.querySelector(".vjs-source-button .vjs-menu");if(r.querySelectorAll(".vjs-selected").forEach(e=>{e.classList.remove("vjs-selected")}),"automatic"===e){if(void 0===e_[++A]){ea();return}ew=e_[A].type,ex=e_[A].proxy,ek=e_[A].url,e3=e_[A].name,t("goodTube_api_withauto",e);let i=document.querySelector("#goodTube_player_wrapper1");i.classList.contains("goodTube_automaticServer")||i.classList.add("goodTube_automaticServer");let a=r.querySelector("ul li:first-child");a.classList.contains("vjs-selected")||a.classList.add("vjs-selected")}else{e_.forEach(o=>{e==o.url&&(ew=o.type,ex=o.proxy,ek=o.url,e3=o.name,t("goodTube_api_withauto",e))});let n=document.querySelector("#goodTube_player_wrapper1");n.classList.contains("goodTube_automaticServer")&&n.classList.remove("goodTube_automaticServer"),A=0}let s;r.querySelectorAll("ul li").forEach(e=>{e.getAttribute("api")==ek&&e.classList.add("vjs-selected")}),o&&(console.log("\n-------------------------\n\n"),console.log("[GoodTube] Loading video data from "+e3+"..."),s=0,em&&(s=400),setTimeout(function(){m=0,G(eu)},s))}function E(e){e.pause()}function C(e){e.play()}function z(e,o){e.volume=o}function B(e,o){e.currentTime=o}function G(e){if(void 0===ec.v){J=[];return}if(g=1,void 0!==p.reloadVideo&&clearTimeout(p.reloadVideo),void 0!==p.loadVideoData&&clearTimeout(p.loadVideoData),H(e),M(),++m>3){ea();return}e.querySelectorAll("source").forEach(e=>{e.remove()});let o=!1;1===ew||2===ew?o=ek+"/api/v1/videos/"+ec.v:3===ew&&(o=ek+"/streams/"+ec.v),fetch(o,{signal:AbortSignal.timeout(5e3)}).then(e=>e.text()).then(o=>{var t,r;M();let i=JSON.parse(o),a=!1,n=!1,s=!1,l=!1,d=!1,u=!1,c=!1;if(1===ew?void 0===i.formatStreams?c=!0:(a=i.formatStreams,n=i.captions,s=i.storyboards,d=i.description,u=i.lengthSeconds,l=!1):2===ew?void 0===i.dashUrl&&void 0===i.hlsUrl?c=!0:(a=!1,n=i.captions,s=i.storyboards,d=i.description,u=i.lengthSeconds,l=!1):3===ew&&(void 0===i.hls&&void 0===i.dash?c=!0:(n=!1,s=!1,d=i.description.replace(/<br>/g,"\r\n").replace(/<[^>]*>?/gm,""),u=i.duration,void 0!==i.chapters&&i.chapters.length&&i.chapters.length>0&&(l=[],i.chapters.forEach(e=>{l.push({time:parseFloat(e.start),title:e.title})})))),c){void 0!==p.loadVideoData&&clearTimeout(p.loadVideoData),p.loadVideoData=setTimeout(function(){G(e)},100),M();return}if(console.log("[GoodTube] Video data loaded"),1===ew){w&&e.querySelector(".goodTube_source_"+w)?(e.querySelector(".goodTube_source_"+w).setAttribute("selected",!0),_=w):(e.querySelector(".goodTube_source_"+T)?.setAttribute("selected",!0),_=T);let b=document.createElement("source");b.setAttribute("src",ek+"/watch?v="+ec.v+"&raw=1&listen=1"),b.setAttribute("type","audio/mp3"),b.setAttribute("label","Audio"),b.setAttribute("video",!0),b.setAttribute("class","goodTube_source_audio"),e.appendChild(b);let v=0;T=!1,a.forEach(o=>{let t=!1,r=!1,i=!1,a=!1;if(t=ek+"/latest_version?id="+ec.v+"&itag="+o.itag,ex&&(t+="&local=true"),r=o.type,i=parseFloat(o.resolution.replace("p","").replace("hd",""))+"p",a=parseFloat(o.resolution.replace("p","").replace("hd","")),t&&r&&i&&-1!==r.toLowerCase().indexOf("video")){let n=document.createElement("source");n.setAttribute("src",t),n.setAttribute("type",r),n.setAttribute("label",i),n.setAttribute("video",!0),n.setAttribute("class","goodTube_source_"+a),e.appendChild(n),(!T||a>T)&&(T=a)}v++}),w&&e.querySelector(".goodTube_source_"+w)?(e.querySelector(".goodTube_source_"+w).setAttribute("selected",!0),_=w):(e.querySelector(".goodTube_source_"+T)?.setAttribute("selected",!0),_=T);let m=[];e.querySelectorAll("source[video=true]").forEach(e=>{m.push({src:e.getAttribute("src"),type:e.getAttribute("type"),label:e.getAttribute("label"),selected:e.getAttribute("selected")})}),K.src(m);let y=document.querySelectorAll(".vjs-quality-selector");2===y.length&&(y[1].style.display="none",y[0].style.display="block")}else if(2===ew){let g=!1,h=!1,f="false";ex&&(f="true"),void 0!==i.hlsUrl&&i.hlsUrl?(g=i.hlsUrl+"?local="+f+"&amp;unique_res=1",h="application/x-mpegURL"):void 0!==i.dashUrl&&i.dashUrl&&(g=i.dashUrl+"?local="+f+"&amp;unique_res=1",h="application/dash+xml"),K.src({src:g,type:h}),O()}else if(3===ew){let $=!1,j=!1,L="false";ex&&(L="true"),void 0!==i.hls&&i.hls?($=i.hls,j="application/x-mpegURL"):void 0!==i.dash&&i.dash&&($=i.dash,j="application/dash+xml"),K.src({src:$,type:j}),O()}setTimeout(function(){C(e)},1),t=e,(r=n).length>0&&(console.log("[GoodTube] Loading subtitles..."),eg=0,function e(o,t,r){if(eg>0){if(void 0===ef[eg-1]){console.log("[GoodTube] Subtitles could not be loaded");return}r=ef[eg-1]}eg++,fetch(r+t[0].url,{signal:AbortSignal.timeout(5e3)}).then(e=>e.text()).then(i=>{var a,n,s;let l;"WEBVTT"!==i.substr(0,6)?e(o,t,r):(a=o,n=t,s=r,l=!1,n.forEach(e=>{let o=!1,t=!1;o=s+e.url,t=e.label,o&&t&&t!==l&&(l=t,t=t[0].toUpperCase()+t.slice(1),K.addRemoteTextTrack({kind:"captions",language:t,src:o},!1))}),console.log("[GoodTube] Subtitles loaded"))}).catch(i=>{e(o,t,r)})}(t,r,ek)),console.log("[GoodTube] Loading chapters..."),function e(o,t,r,i){var a,n,s;U();let l=[];if(i)l=i;else{let d=t.split("\n"),p=/(\d{0,2}:?\d{1,2}:\d{2})/g;for(let u of d){let c=u.match(p);if(c){let b=c[0],v=u.split(" ").filter(e=>!e.includes(b)).join(" ");l.push({time:b,title:v})}}if((!l.length||l.length<=0||l[0].time.split(":").reduce((e,o)=>60*e+ +o)>0)&&(l=[]),(!l.length||l.length<=0)&&!em){let m=Array.from(document.querySelectorAll("#panels ytd-engagement-panel-section-list-renderer:nth-child(2) #content ytd-macro-markers-list-renderer #contents ytd-macro-markers-list-item-renderer #endpoint #details"));S&&clearInterval(S);let y=JSON.stringify(document.querySelectorAll("#panels ytd-engagement-panel-section-list-renderer:nth-child(2) #content ytd-macro-markers-list-renderer #contents ytd-macro-markers-list-item-renderer #endpoint #details"));S=setInterval(function(){let i=JSON.stringify(document.querySelectorAll("#panels ytd-engagement-panel-section-list-renderer:nth-child(2) #content ytd-macro-markers-list-renderer #contents ytd-macro-markers-list-item-renderer #endpoint #details"));i!==y&&(y=i,e(o,t,r))},1e3);let g=m.map(e=>({title:e.querySelector(".macro-markers")?.textContent,time:e.querySelector("#time")?.textContent})).filter(e=>void 0!==e.title&&null!==e.title&&void 0!==e.time&&null!==e.time);l=[...new Map(g.map(e=>[e.time,e])).values(),]}}let h=0,f,$,j;l.length&&l.length>0&&"number"!=typeof(h=l[0].time)&&(h=h.split(":").reduce((e,o)=>60*e+ +o)),(!l.length||l.length<=0||h>0)&&(l=[]),l.length>0?(a=o,n=l,s=r,f=document.createElement("div"),f.classList.add("goodTube_chapters"),$=document.createElement("div"),$.classList.add("goodTube_markers"),j=0,n.forEach(e=>{let o=document.createElement("div");o.classList.add("goodTube_chapter"),void 0!==n[j+1]&&("number"==typeof n[j+1].time?o.setAttribute("chapter-time",n[j+1].time):o.setAttribute("chapter-time",n[j+1].time.split(":").reduce((e,o)=>60*e+ +o)));let t=document.createElement("div");t.classList.add("goodTube_marker"),void 0!==n[j+1]&&("number"==typeof n[j+1].time?t.setAttribute("marker-time",n[j+1].time):t.setAttribute("marker-time",n[j+1].time.split(":").reduce((e,o)=>60*e+ +o))),em||o.addEventListener("mouseover",function(){document.querySelector("#goodTube_player_wrapper1 .vjs-progress-control .vjs-mouse-display .vjs-time-tooltip")?.setAttribute("chapter-title",e.title)});let r=0,i=(r="number"==typeof e.time?e.time:e.time.split(":").reduce((e,o)=>60*e+ +o))/s*100;o.style.left=i+"%";let a=s;void 0!==n[j+1]&&(a="number"==typeof n[j+1].time?n[j+1].time:n[j+1].time.split(":").reduce((e,o)=>60*e+ +o));let l=a/s*100;o.style.width=l-i+"%",t.style.left=l+"%",f.appendChild(o),$.appendChild(t),j++}),em&&(k=setInterval(function(){let e=parseFloat(a.currentTime),o=!1;n.forEach(t=>{let r=!1;r="number"==typeof t.time?t.time:t.time.split(":").reduce((e,o)=>60*e+ +o),parseFloat(e)>=parseFloat(r)&&(o=t.title)}),o&&document.querySelector("#goodTube_player_wrapper1 .vjs-time-control .vjs-duration-display")?.setAttribute("chapter-title","\xb7 "+o)},10)),document.querySelector("#goodTube_player_wrapper1 .vjs-progress-control")?.appendChild(f),document.querySelector("#goodTube_player_wrapper1 .vjs-progress-control .vjs-play-progress")?.appendChild($),document.querySelector("#goodTube_player_wrapper1").classList.contains("goodTube_hasChapters")||document.querySelector("#goodTube_player_wrapper1").classList.add("goodTube_hasChapters"),x=setInterval(function(){document.querySelectorAll(".goodTube_markers .goodTube_marker").forEach(e=>{e.getAttribute("marker-time")&&(parseFloat(a.currentTime)>=parseFloat(e.getAttribute("marker-time"))?e.classList.contains("goodTube_showMarker")||e.classList.add("goodTube_showMarker"):e.classList.contains("goodTube_showMarker")&&e.classList.remove("goodTube_showMarker"))});document.querySelectorAll(".goodTube_chapters .goodTube_chapter").forEach(e=>{e.getAttribute("chapter-time")&&(parseFloat(a.currentTime)>=parseFloat(e.getAttribute("chapter-time"))?e.classList.contains("goodTube_redChapter")||e.classList.add("goodTube_redChapter"):e.classList.contains("goodTube_redChapter")&&e.classList.remove("goodTube_redChapter"))})},10),console.log("[GoodTube] Chapters loaded")):console.log("[GoodTube] No chapters found")}(e,d,u,l),em||(console.log("[GoodTube] Loading storyboard..."),function e(o,t,r){if(void 0===ef[r]){console.log("[GoodTube] Storyboard could not be loaded");return}3===ew?fetch(ef[r]+"/api/v1/videos/"+ec.v,{signal:AbortSignal.timeout(5e3)}).then(e=>e.text()).then(i=>{let a=JSON.parse(i);void 0===a.storyboards?e(o,t,++r):I(o,t=a.storyboards,ef[r])}).catch(i=>{e(o,t,++r)}):(eh=0,I(o,t,ek))}(e,s,0))}).catch(o=>{void 0!==p.loadVideoData&&clearTimeout(p.loadVideoData),p.loadVideoData=setTimeout(function(){G(e)},100),M()})}function O(){L&&clearTimeout(L);let e=document.querySelectorAll(".vjs-quality-selector");if(e&&void 0!==e[1]){if(2===e.length){e[0].style.display="none",e[1].style.display="block";let o=e[1].querySelector("ul"),t=o.querySelector("li.vjs-menu-item:first-child .vjs-menu-item-text");if(!t){L&&clearTimeout(L),L=setTimeout(O,100);return}let i=t;if("Always use max"!==t.innerHTML){(i=document.createElement("li")).classList.add("vjs-menu-item"),i.classList.add("always-max"),i.innerHTML=`
						<span class="vjs-menu-item-text">Always use max</span>
						<span class="vjs-control-text" aria-live="polite"></span>
					`,i.addEventListener("click",P),o.prepend(i);o.querySelectorAll("li.vjs-menu-item:not(.always-max)").forEach(e=>{e.addEventListener("click",D),e.addEventListener("touchstart",D)})}let a=r("goodTube_alwaysUseMax");a&&"true"===a&&P()}}else{L&&clearTimeout(L),L=setTimeout(O,100);return}}let R=!1;function P(){t("goodTube_alwaysUseMax","true");let e=document.querySelectorAll(".vjs-quality-selector")[1],o=e.querySelectorAll("li.vjs-menu-item")[1];R=!0,o.click(),o.classList.add("vjs-auto-selected"),o.classList.remove("vjs-selected"),e.querySelector("li.always-max").classList.add("vjs-selected"),console.log("[GoodTube] Selecting highest quality - "+o.querySelector(".vjs-menu-item-text").innerHTML)}function D(){if(R){R=!1;return}t("goodTube_alwaysUseMax","false");let e=document.querySelectorAll(".vjs-quality-selector")[1],o=e.querySelector("li.always-max");o.classList.contains("vjs-selected")&&o.classList.remove("vjs-selected");let r=e.querySelector("li.vjs-auto-selected");r&&r.classList.remove("vjs-auto-selected")}function U(){x&&(clearInterval(x),x=!1),k&&(clearInterval(k),k=!1),S&&(clearInterval(S),S=!1),document.querySelector("#goodTube_player_wrapper1 .vjs-time-control .vjs-duration-display")?.setAttribute("chapter-title",""),document.querySelector(".goodTube_chapters")?.remove(),document.querySelector(".goodTube_markers")?.remove(),document.querySelector("#goodTube_player_wrapper1").classList.contains("goodTube_hasChapters")&&document.querySelector("#goodTube_player_wrapper1").classList.remove("goodTube_hasChapters")}function I(e,o,t){if(eh>0){if(void 0===ef[eh-1]){console.log("[GoodTube] Storyboard could not be loaded");return}t=ef[eh-1]}eh++,!o.length||o.length<=0?I(e,o,t):fetch(t+o[0].url,{signal:AbortSignal.timeout(5e3)}).then(e=>e.text()).then(r=>{if("WEBVTT"!==r.substr(0,6))I(e,o,t);else{let i=!1,a=!1,n=r.split("\n\n");if(n.length&&n.length>1){let s=n[1].split("\n");s.length&&s.length>1&&-1!==(a=s[1]).indexOf("https")&&(i=!0)}i?fetch(a,{signal:AbortSignal.timeout(5e3)}).then(e=>e.text()).then(r=>{var i,a,n;let s,l;-1===r.indexOf("<html")?(i=e,a=o,n=t,s=!1,l=0,a.forEach(e=>{e.width>l&&(s=e.url,l=parseFloat(e.width))}),s&&("function"==typeof K.vttThumbnails&&(y=K.vttThumbnails),K.vttThumbnails=y,K.vttThumbnails({src:n+s}),console.log("[GoodTube] Storyboard loaded"))):I(e,o,t)}).catch(r=>{I(e,o,t)}):I(e,o,t)}}).catch(r=>{I(e,o,t)})}function H(e){let o;h=!1,(o=document.querySelector("#goodTube_error"))&&o.remove(),e.classList.add("goodTube_hidden"),e.currentTime=0,e.pause(),U(),document.querySelector(".vjs-vtt-thumbnail-display")?.remove();let t=K.remoteTextTracks();void 0!==t.tracks_&&t.tracks_.forEach(e=>{K.removeRemoteTextTrack(e)});let r=document.querySelectorAll(".vjs-quality-selector");if(r&&void 0!==r[1]){let i=r[1].querySelector("ul");i&&(i.innerHTML="")}}function M(){let e=document.getElementById("goodTube_player");e.classList.contains("vjs-loading")||e.classList.add("vjs-loading"),e.classList.contains("vjs-waiting")||e.classList.add("vjs-waiting")}function V(){let e=document.getElementById("goodTube_player");e.classList.contains("vjs-loading")&&e.classList.remove("vjs-loading"),e.classList.contains("vjs-waiting")&&e.classList.remove("vjs-waiting")}function N(){if(document.pictureInPictureEnabled){f?(document.exitPictureInPicture(),f=!1):(eu.requestPictureInPicture(),f=!0,$&&N());return}let e=document.querySelector("#goodTube_player_wrapper1");$?(e.classList.remove("goodTube_miniplayer"),$=!1,void 0===ec.v&&H(eu)):(e.classList.add("goodTube_miniplayer"),$=!0,j=ec.v)}let K=!1,Q=!1,J=[],W=!1,Y=!0,F=!1,X=!1,Z=!1,ee=!1,eo=!1,et=!1;function er(){document.querySelector(".vjs-play-control").classList.contains("vjs-playing")?C(eu):E(eu)}function ei(){document.querySelectorAll(".vjs-control-bar button").forEach(e=>{e.onclick=function(){document.querySelectorAll(".vjs-menuOpen").forEach(o=>{o!=e.closest("div.vjs-menu-button")&&o.classList.remove("vjs-menuOpen")});let o=e.closest("div.vjs-menu-button");o&&(o.classList.contains("vjs-menuOpen")?o.classList.remove("vjs-menuOpen"):o.classList.add("vjs-menuOpen"))},e.ontouchstart=function(){document.querySelectorAll(".vjs-menuOpen").forEach(o=>{o!=e.closest("div.vjs-menu-button")&&o.classList.remove("vjs-menuOpen")});let o=e.closest("div.vjs-menu-button");o&&(o.classList.contains("vjs-menuOpen")?o.classList.remove("vjs-menuOpen"):o.classList.add("vjs-menuOpen"))}});let e=(e,o)=>{let t=!1;function r(e){o(e)}e.addEventListener("touchstart",function e(){t=!1}),e.addEventListener("touchmove",function e(){t=!0}),e.addEventListener("touchend",function e(r){!t&&o(r)}),e.addEventListener("click",r)};if(document.querySelectorAll(".vjs-menu-item").forEach(o=>{e(o,e=>{let o=0;em&&(o=400),setTimeout(function(){document.querySelectorAll(".vjs-menuOpen").forEach(e=>{e.classList.remove("vjs-menuOpen")})},o)})}),!em&&!document.querySelector(".goodTube_hoverBar")){let o=document.createElement("div");o.classList.add("goodTube_hoverBar"),document.querySelector(".video-js .vjs-progress-control").appendChild(o),document.querySelector(".video-js .vjs-progress-control").addEventListener("mousemove",function(e){window.requestAnimationFrame(function(){o.style.width=document.querySelector(".video-js .vjs-progress-control .vjs-mouse-display").style.left})})}}function ea(){eo&&clearTimeout(eo),et&&clearTimeout(et);let e=r("goodTube_api_withauto"),o=!1;if(void 0===e_[A]&&(o=!0),"automatic"===e&&o){let t=document.querySelector("#goodTube_player");V(),H(eu);let i=document.createElement("div");i.setAttribute("id","goodTube_error"),i.innerHTML="Video could not be loaded. The servers are not responding :(<br><small>Please refresh the page / try again soon!</small>",t.appendChild(i)}else"automatic"===e?(console.log("[GoodTube] Video could not be loaded - selecting next video source..."),eu.currentTime>0&&(u=eu.currentTime),q("automatic",!0)):(console.log("[GoodTube] Video could not be loaded - selecting next video source..."),eu.currentTime>0&&(u=eu.currentTime),A=0,q("automatic",!0))}function en(){let e=document.querySelector(".vjs-download-button");if(!document.querySelector(".vjs-download-button .goodTube_spinner")){let o=document.createElement("div");o.classList.add("goodTube_spinner"),o.innerHTML="<div></div><div></div>",e.append(o)}e&&!e.classList.contains("goodTube_loading")&&e.classList.add("goodTube_loading")}function es(e){if(Reflect.ownKeys(ev).length>1)return;let o=document.querySelector(".vjs-download-button");o&&o.classList.contains("goodTube_loading")&&o.classList.remove("goodTube_loading"),t("goodTube_lastDownloadTimeSeconds",new Date().getTime()/1e3),void 0===e&&console.log("[GoodTube] Downloads finished")}let el=!1,ed=!1,ep=!1,eu=!1,ec=!1,eb=[],ev=[],em=!1,ey=!1,eg=0,eh=0,ef=["https://invidious.perennialte.ch","https://yt.artemislena.eu","https://vid.lilay.dev","https://invidious.private.coffee","https://invidious.drgns.space","https://inv.nadeko.net","https://invidious.projectsegfau.lt"],e$=["https://dl01.yt-dl.click","https://dl02.yt-dl.click","https://dl03.yt-dl.click","https://apicloud9.filsfkwtlfjas.xyz","https://apicloud3.filsfkwtlfjas.xyz","https://apicloud8.filsfkwtlfjas.xyz","https://apicloud4.filsfkwtlfjas.xyz","https://apicloud5.filsfkwtlfjas.xyz",],e8=["https://sea-downloadapi.stuff.solutions","https://ca.haloz.at","https://cobalt.wither.ing","https://capi.tieren.men","https://co.tskau.team","https://apicb.tigaultraman.com","https://api-cobalt.boykisser.systems","https://cobalt.decrystalfan.app","https://wukko.wolfdo.gg","https://capi.oak.li","https://cb.nyoom.fun","https://dl.khyernet.xyz","https://cobalt-api.alexagirl.studio","https://nyc1.coapi.ggtyler.dev","https://api.dl.ixhby.dev","https://co.eepy.today","https://downloadapi.stuff.solutions","https://cobalt-api.ayo.tf","https://api.sacreations.me","https://apicloud2.filsfkwtlfjas.xyz","https://dl01.yt-dl.click"],ej=e8.length;for(;0!=ej;){let eT=Math.floor(Math.random()*ej);ej--,[e8[ej],e8[eT]]=[e8[eT],e8[ej]]}e$=e$.concat(e8);let e_=[{name:"Automatic",type:!1,proxy:!0,url:"automatic"},{name:"Anubis (DE)",type:3,proxy:!0,url:"https://pipedapi.r4fo.com"},{name:"Ra (US)",type:3,proxy:!0,url:"https://pipedapi.us.projectsegfau.lt"},{name:"Sphynx (JP)",type:2,proxy:!0,url:"https://invidious.jing.rocks"},{name:"Acid (US)",type:2,proxy:!0,url:"https://invidious.incogniweb.net"},{name:"Sphere (US)",type:3,proxy:!0,url:"https://pipedapi.darkness.services"},{name:"Phoenix (US)",type:3,proxy:!0,url:"https://pipedapi.drgns.space"},{name:"Sapphire (IN)",type:3,proxy:!0,url:"https://pipedapi.in.projectsegfau.lt"},{name:"Space (DE)",type:3,proxy:!0,url:"https://pipedapi.smnz.de"},{name:"Orchid (DE)",type:3,proxy:!0,url:"https://api.piped.yt"},{name:"Emerald (DE)",type:3,proxy:!0,url:"https://pipedapi.phoenixthrush.com"},{name:"420 (FI)",type:2,proxy:!0,url:"https://invidious.privacyredirect.com"},{name:"Onyx (FR)",type:2,proxy:!0,url:"https://invidious.fdn.fr"},{name:"Indigo (FI)",type:2,proxy:!0,url:"https://iv.datura.network"},{name:"Basilisk (DE)",type:3,proxy:!0,url:"https://pipedapi.adminforge.de"},{name:"Golem (AT)",type:3,proxy:!0,url:"https://schaunapi.ehwurscht.at"},{name:"360p - Amethyst (DE)",type:1,proxy:!0,url:"https://yt.artemislena.eu"},{name:"360p - Goblin (AU)",type:1,proxy:!1,url:"https://invidious.perennialte.ch"},{name:"360p - Nymph (AT)",type:1,proxy:!0,url:"https://invidious.private.coffee"},{name:"360p - Raptor (US)",type:1,proxy:!0,url:"https://invidious.drgns.space"}],ew=e_[0].type,ex=e_[0].proxy,ek=e_[0].url,e3=e_[0].name;function eS(){let e=!1;if(void 0!==ec.i||void 0!==ec.index||void 0!==ec.list){let o=document.querySelectorAll("#goodTube_playlistContainer a"),r=!1;for(let i=o.length-1;i>=0;i--){let a=o[i];if(r){let n="/watch"+a.href.split("/watch")[1];if(em?(e=!0,document.querySelector('ytm-playlist-panel-renderer a.compact-media-item-image[href="'+n+'"]')?.click()):(e=!0,document.querySelector('#playlist-items > a[href="'+n+'"]')?.click()),e){e=!0;if(!document.querySelector("ytm-playlist-panel-renderer")){let s=document.querySelector("ytm-playlist-panel-entry-point");s&&!ey&&(ey=!0,s.click(),setTimeout(eS,500));return}ey=!1,document.querySelector('ytm-playlist-panel-renderer a.compact-media-item-image[href="'+n+'"]')?.click()}}r=!!a.classList.contains("goodTube_selected")}}!e&&J[J.length-2]&&J[J.length-2]!==window.location.href&&(console.log("[GoodTube] Playing previous video..."),t("goodTube_previous","true"),window.history.go(-1))}function eL(e=!1){let o=r("goodTube_autoplay"),t=!1;if(void 0!==ec.i||void 0!==ec.index||void 0!==ec.list){let i=document.querySelectorAll("#goodTube_playlistContainer a"),a=!1;i.forEach(e=>{if(a){let o="/watch"+e.href.split("/watch")[1];if(em){t=!0;if(!document.querySelector("ytm-playlist-panel-renderer")){let r=document.querySelector("ytm-playlist-panel-entry-point");r&&!ey&&(ey=!0,r.click(),setTimeout(eL,500));return}ey=!1,document.querySelector('ytm-playlist-panel-renderer a.compact-media-item-image[href="'+o+'"]')?.click()}else t=!0,document.querySelector('#playlist-items > a[href="'+o+'"]')?.click();t&&console.log("[GoodTube] Playing next video in playlist...")}a=!!e.classList.contains("goodTube_selected")})}!t&&("off"!==o||e)&&(document.getElementById("movie_player").nextVideo(),console.log("[GoodTube] Autoplaying next video..."))}function eA(e,o,i,a,n){if(void 0===a&&(a=""),void 0===ev[i])return;if(void 0===e$[e]){void 0!==ev[i]&&delete ev[i],void 0!==a?(alert("[GoodTube] "+o.charAt(0).toUpperCase()+o.slice(1)+" - "+a+" could not be downloaded. Please try again soon."),console.log("[GoodTube] "+o.charAt(0).toUpperCase()+o.slice(1)+" - "+a+" could not be downloaded. Please try again soon.")):(alert("[GoodTube] "+o.charAt(0).toUpperCase()+o.slice(1)+" could not be downloaded. Please try again soon."),console.log("[GoodTube] "+o.charAt(0).toUpperCase()+o.slice(1)+" could not be downloaded. Please try again soon.")),es();return}en();let s=0,l=new Date().getTime()/1e3,d=parseFloat(r("goodTube_lastDownloadTimeSeconds"));d&&(s=3-(l-d))<0&&(s=0),t("goodTube_lastDownloadTimeSeconds",l+s),eb[i]=setTimeout(function(){""!==a?console.log("[GoodTube] Downloading "+o+" - "+a+"..."):console.log("[GoodTube] Downloading "+o+"...");let t="vp9";em&&(t="h264"),void 0!==n&&(t=n);let r=!1;"audio"===o&&(r=!0);let s=JSON.stringify({url:"https://www.youtube.com/watch?v="+i,vCodec:t,vQuality:"max",filenamePattern:"basic",isAudioOnly:r});fetch(e$[e]+"/api/json",{signal:AbortSignal.timeout(1e4),method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:s}).then(e=>e.text()).then(r=>{if(void 0!==ev[i]){if(void 0!==(r=JSON.parse(r)).status&&"rate-limit"===r.status){void 0!==p["download_"+i]&&clearTimeout(p["download_"+i]),p["download_"+i]=setTimeout(function(){eA(e,o,i,a)},100);return}if(void 0!==r.status&&"error"===r.status){let n=!1;if(void 0!==r.text&&-1!==r.text.toLowerCase().indexOf("settings")){if(em||("vp9"===t?n="av1":"av1"!==t||(n="h264")),em&&("h264"===t?n="av1":"av1"===t&&(n="vp9")),n){void 0!==p["download_"+i]&&clearTimeout(p["download_"+i]),p["download_"+i]=setTimeout(function(){eA(e,o,i,a,n)},100);return}console.log("[GoodTube] Could not download "+o+" - "+a),void 0!==ev[i]&&delete ev[i],setTimeout(function(){es()},1e3);return}void 0!==p["download_"+i]&&clearTimeout(p["download_"+i]),e++,p["download_"+i]=setTimeout(function(){eA(e,o,i,a)},100);return}void 0!==r.status&&void 0!==r.url&&function e(o,t,r,i,a){if(void 0===ev[i])return;en();let n=".mp4";"audio"===t&&(n=".mp3"),em||""===r?(window.open(o,"_self"),""!==r?console.log("[GoodTube] Downloaded "+t+" - "+r):console.log("[GoodTube] Downloaded "+t),void 0!==ev[i]&&delete ev[i],setTimeout(function(){es()},1e3)):fetch(o).then(e=>e.blob()).then(e=>{if(void 0===ev[i])return;let o=URL.createObjectURL(e),a=document.createElement("a");a.style.display="none",a.href=o,a.download=r+n,document.body.appendChild(a),a.click(),window.URL.revokeObjectURL(o),a.remove(),console.log("[GoodTube] Downloaded "+t+" - "+r),void 0!==ev[i]&&delete ev[i],es()}).catch(e=>{void 0!==p["download_"+i]&&clearTimeout(p["download_"+i]),a++,p["download_"+i]=setTimeout(function(){eA(a,t,i,r)},100)})}(r.url,o,a,i,e)}}).catch(t=>{void 0!==p["download_"+i]&&clearTimeout(p["download_"+i]),e++,p["download_"+i]=setTimeout(function(){eA(e,o,i,a)},100)})},1e3*s)}function e0(e,o){if(void 0===o&&!confirm("Are you sure you want to download this playlist ("+e+")?\r\rYou can keep playing and downloading other videos, just don't close the tab :)"))return;void 0===o&&console.log("[GoodTube] Downloading "+e+" playlist...");let t=document.querySelectorAll("#goodTube_playlistContainer a");if(t.length<=0){console.log("[GoodTube] Downloading failed, could not find playlist data.");return}let r=0;t.forEach(o=>{let t=function e(o,t){for(o=o.toString();o.length<2;)o="0"+o;return o}(r+1,2)+" - "+o.innerHTML.trim(),i=o.href;if(!t||!i){console.log("[GoodTube] Downloading failed, could not find playlist data.");return}let a=i.split("?")[1],n={};a.replace(/\??(?:([^=]+)=([^&]*)&?)/g,function(){function e(e){return decodeURIComponent(e.split("+").join(" "))}n[e(arguments[1])]=e(arguments[2])});let s=n.v;ev[s]=!0,eA(0,e,s,t),r++})}let eq,eE,eC;console.log("\n==================================================\n    ______                ________      __\n   / ____/___  ____  ____/ /_  __/_  __/ /_  ___\n  / / __/ __ \\/ __ \\/ __  / / / / / / / __ \\/ _ \\\n / /_/ / /_/ / /_/ / /_/ / / / / /_/ / /_/ /  __/\n \\____/\\____/\\____/\\____/ /_/  \\____/_____/\\___/\n\n=================================================="),console.log("[GoodTube] Initiating..."),-1!==window.location.href.indexOf("m.youtube")&&(em=!0),(eq=r("goodTube_api_withauto"))&&e_.forEach(e=>{e.url===eq&&(ew=e.type,ex=e.proxy,ek=e.url,e3=e.name)}),window.addEventListener("beforeunload",e=>{t("goodTube_lastDownloadTimeSeconds",new Date().getTime()/1e3)}),setInterval(l,1),setInterval(function e(){let n;document.querySelectorAll("#player:not(.ytd-channel-video-player-renderer):not(.goodTube_hidden)").forEach(e=>{i(e)}),document.querySelectorAll("#player-control-container:not(.goodTube_hidden)").forEach(e=>{i(e)}),document.querySelectorAll("#full-bleed-container:not(.goodTube_hidden)").forEach(e=>{i(e)}),document.querySelectorAll("ytd-miniplayer:not(.goodTube_hidden)").forEach(e=>{i(e)}),n=!1,em?(n=document.querySelector('.ytm-autonav-toggle-button-container[aria-pressed="true"]'))?n.click():(document.querySelector("#player .html5-video-player")?.click(),document.querySelector("#player")?.click(),document.querySelector(".ytp-unmute")?.click()):(n=document.querySelector('.ytp-autonav-toggle-button[aria-checked="true"]'))&&n.click(),function e(){let o=document.getElementById("movie_player");if(o&&"function"==typeof o.setPlaybackQualityRange&&"function"==typeof o.getAvailableQualityData&&"function"==typeof o.getPlaybackQuality){let t=o.getAvailableQualityData(),r=o.getPlaybackQuality();if(t.length&&r){let i=t[t.length-1].quality;r!=i&&o.setPlaybackQualityRange(i,i)}}}(),function e(){if(-1===window.location.href.indexOf("@"))document.querySelectorAll("a").forEach(e=>{-1!==e.href.indexOf("shorts/")&&(i(e),i(e.closest("ytd-video-renderer")))})}();document.querySelectorAll("tp-yt-paper-dialog #confirm-button:not(.goodTube_clicked)").forEach(e=>{e.classList.add("goodTube_clicked"),e.click(),setTimeout(function(){e.classList.remove("goodTube_clicked")},1e3)});document.querySelectorAll("#description a, ytd-comments .yt-core-attributed-string a, ytm-expandable-video-description-body-renderer a, .comment-content a").forEach(e=>{!e.classList.contains("goodTube_timestampLink")&&e.getAttribute("href")&&-1!==e.getAttribute("href").indexOf(ec.v)&&-1!==e.getAttribute("href").indexOf("t=")&&(e.classList.add("goodTube_timestampLink"),e.addEventListener("click",function(){let o=e.getAttribute("href").split("t=");void 0!==o[1]&&B(eu,o[1].replace("s",""))}))});let s=eu;if(b>=c.length&&Q){let l=ed;l&&(l=l.split("#")[0]);let d=window.location.href.split("#")[0];if(d&&(d=d.split("#")[0]),l!==d){var v,y;if(void 0!==(ec=o()).v){em&&a((v=s).closest("#goodTube_player_wrapper1")),console.log("\n-------------------------\n\n"),"true"===r("goodTube_previous")?(J.pop(),t("goodTube_previous","false")):J.push(window.location.href),m=0,u=0;let g=ep,h=!1;void 0!==ec.list&&(h=ec.list),"automatic"===r("goodTube_api_withauto")&&(h&&g===h?A>0&&A--:A=0,q("automatic",!1)),console.log("[GoodTube] Loading video data from "+e3+"..."),function e(){let o=document.getElementById("goodTube_playlistContainer");if(o||((o=document.createElement("div")).setAttribute("id","goodTube_playlistContainer"),o.style.display="none",document.body.appendChild(o)),o.innerHTML="",void 0===ec.i&&void 0===ec.index&&void 0===ec.list)return;document.getElementById("movie_player");let t=!1,r=!1;em?(t=document.querySelectorAll("ytm-playlist-panel-renderer a.compact-media-item-image"),r=document.querySelectorAll("ytm-playlist-panel-renderer .compact-media-item-headline span")):(t=document.querySelectorAll("#playlist-items > a"),r=document.querySelectorAll("#playlist-items #video-title")),t&&t.length||setTimeout(e,100);let i=0;t.forEach(e=>{let t=document.createElement("a");t.href=e.href,t.innerHTML=r[i].innerHTML.trim(),-1!==e.href.indexOf(ec.v)&&t.classList.add("goodTube_selected"),o.appendChild(t),i++})}(),G(s),fetch("https://api.counterapi.dev/v1/goodtube/videos/up/")}else if(!$&&!f)for(let j in H(eu),em&&i((y=s).closest("#goodTube_player_wrapper1")),J=[],p)p.hasOwnProperty(j)&&clearTimeout(p[j]);ep=void 0!==ec.list&&ec.list,ed=window.location.href}}},1),setInterval(function e(){if(W=!1,Y=!0,($||f)&&void 0===ec.v)W=!1,Y=!1;else if(void 0!==ec.i||void 0!==ec.index||void 0!==ec.list){let o=document.querySelectorAll("#goodTube_playlistContainer a");if(!o||!o.length)return;o[0].classList.contains("goodTube_selected")||(W=!0)}else J[J.length-2]&&J[J.length-2]!==window.location.href&&(W=!0);let t=document.querySelector(".vjs-prev-button");t&&(W?a(t):i(t));let r=document.querySelector(".vjs-next-button");r&&(Y?a(r):i(r))},100),setInterval(function e(){let o=document.querySelector(".goodTube_downloadPlaylist_cancel"),t=document.querySelector(".goodTube_downloadPlaylist_video"),r=document.querySelector(".goodTube_downloadPlaylist_audio");o&&t&&r&&(void 0!==ec.i||void 0!==ec.index||void 0!==ec.list?(a(t),a(r)):(i(t),i(r)),Reflect.ownKeys(ev).length>1?a(o):i(o))},100),setInterval(function e(){"mediaSession"in navigator&&(navigator.mediaSession.setActionHandler("play",()=>{C(eu)}),navigator.mediaSession.setActionHandler("pause",()=>{E(eu)}),Y?navigator.mediaSession.setActionHandler("nexttrack",()=>{eL(!0)}):navigator.mediaSession.setActionHandler("nexttrack",null),W?navigator.mediaSession.setActionHandler("previoustrack",()=>{eS()}):navigator.mediaSession.setActionHandler("previoustrack",null))},100),setInterval(function e(){if(!em){let o=document.querySelector("ytd-watch-flexy");o&&(void 0!==ec.v?o.classList.remove("goodTube_miniplayer"):o.classList.add("goodTube_miniplayer"))}void 0!==ec.v&&(j=ec.v)},100),(eE=document.createElement("style")).textContent=`
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
			ytd-engagement-panel-section-list-renderer:not(.ytd-popup-container),
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
		`,document.head.appendChild(eE),console.log("[GoodTube] Ads removed"),(eC=document.createElement("style")).textContent=`
			.goodTube_hidden {
				position: fixed !important;
				pointer-events: none !important;
				top: -999px !important;
				left: -999px !important;
				opacity: 0 !important;
			}
		`,document.head.appendChild(eC),l(),console.log("[GoodTube] Loading player assets..."),v=0,function o(t){if(++v>3){console.log("[GoodTube] Player assets could not be loaded");return}fetch(t).then(e=>e.text()).then(r=>{let i=!1;-1!==t.indexOf("/js/")?i=document.createElement("script"):-1!==t.indexOf("/css/")&&(i=document.createElement("style")),i.innerHTML=r,document.head.appendChild(i),++b>=c.length?(console.log("[GoodTube] Player assets loaded"),function o(){if(el)return;let t=e+"/goodtube.user.js?i"+Date.now();console.log("[GoodTube] Checking for updates..."),fetch(t).then(e=>e.text()).then(e=>{let o=e.match(/@version\s+(\d+\.\d+)/);if(!o)return;let r=parseFloat(GM_info.script.version),i=parseFloat(o[1]);if(i<=r){console.log("[GoodTube] No updates found");return}if(parseFloat(localStorage.getItem("goodTube_stopUpdates"))===i)return;let a=document.createElement("style");a.textContent=`
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
			`,document.head.appendChild(a),Swal.fire({position:"top-end",backdrop:!1,title:"GoodTube: a new version is available.",text:"Do you want to update?",showCancelButton:!0,showDenyButton:!0,confirmButtonText:"Update",denyButtonText:"Skip",cancelButtonText:"Close"}).then(e=>{e.isConfirmed?window.location=t:e.isDenied&&localStorage.setItem("goodTube_stopUpdates",i)}),console.log("[GoodTube] New version found - "+i)}).catch(e=>{el=!0}),el=!0}()):(v=0,o(c[b]))}).catch(e=>{void 0!==p.loadAsset&&clearTimeout(p.loadAsset),p.loadAsset=setTimeout(function(){o(t)},100)})}(c[b]),function e(){let i=!1;if(!(i=em?document.querySelector("body"):document.getElementById("below"))||b<c.length){setTimeout(function(){e()},0);return}let a=document.createElement("style");a.textContent=`
			/* Automatic server styling */
			#goodTube_player_wrapper1.goodTube_automaticServer #goodTube_player_wrapper2 .vjs-source-button ul li:first-child {
				background: #ffffff !important;
				color: #000000 !important;
			}

			#goodTube_player_wrapper1.goodTube_automaticServer .vjs-source-button ul li.vjs-selected {
				background-color: rgba(255, 255, 255, .2) !important;
				color: #ffffff !important;
			}


			/* Hide the volume tooltip */
			#goodTube_player_wrapper1 .vjs-volume-bar .vjs-mouse-display {
				display: none !important;
			}

			#contentContainer.tp-yt-app-drawer[swipe-open].tp-yt-app-drawer::after {
				display: none !important;
			}

			/* Live streams */
			#goodTube_player_wrapper1 .vjs-live .vjs-progress-control {
				display: block;
			}

			#goodTube_player_wrapper1 .vjs-live .vjs-duration-display,
			#goodTube_player_wrapper1 .vjs-live .vjs-time-divider {
				display: none !important;
			}

			/* Seek bar */
			#goodTube_player_wrapper1 .vjs-progress-control {
				position: absolute;
				bottom: 48px;
				left: 0;
				right: 0;
				width: 100%;
				height: calc(24px + 3px);
			}

			#goodTube_player_wrapper1 .vjs-progress-control .vjs-slider {
				margin: 0;
				background: transparent;
				position: absolute;
				bottom: 3px;
				left: 8px;
				right: 8px;
				top: auto;
				transition: height .1s linear, bottom .1s linear;
				z-index: 1;
			}

			#goodTube_player_wrapper1 .vjs-progress-control:hover .vjs-slider {
				pointer-events: none;
				height: 5px;
				bottom: 2px;
			}

			#goodTube_player_wrapper1 .vjs-progress-control .vjs-slider .vjs-load-progress {
				height: 100%;
				background: rgba(255, 255, 255, .2);
				transition: none;
				position: static;
				margin-bottom: -3px;
				transition: margin .1s linear;
			}

			#goodTube_player_wrapper1 .vjs-progress-control:hover .vjs-slider .vjs-load-progress {
				margin-bottom: -5px;
			}

			#goodTube_player_wrapper1 .vjs-progress-control .vjs-slider .vjs-load-progress .vjs-control-text {
				display: none;
			}

			#goodTube_player_wrapper1 .vjs-progress-control .vjs-slider .vjs-load-progress > div {
				background: transparent !important;
			}

			#goodTube_player_wrapper1 .vjs-progress-control .vjs-slider .vjs-play-progress {
				background: transparent;
				position: static;
				z-index: 1;
			}

			#goodTube_player_wrapper1 .vjs-progress-control .vjs-slider .vjs-play-progress::before {
				content: '';
				background: #ff0000;
				width: 100%;
				height: 100%;
				position: static;
				display: block;
			}

			#goodTube_player_wrapper1 .vjs-progress-control .vjs-slider .vjs-play-progress::after {
				content: '';
				display: block;
				float: right;
				background: #ff0000;
				border-radius: 50%;
				opacity: 0;
				width: 13px;
				height: 13px;
				right: -7px;
				top: -8px;
				transition: opacity .1s linear, top .1s linear;
				position: relative;
			}

			#goodTube_player_wrapper1 .vjs-progress-control:hover .vjs-slider .vjs-play-progress::after {
				opacity: 1;
				top: -9px;
			}


			/* Without chapters */
			#goodTube_player_wrapper1:not(.goodTube_hasChapters) .vjs-progress-control::before {
				content: '';
				position: absolute;
				bottom: 3px;
				left: 8px;
				right: 8px;
				height: 3px;
				background: rgba(255, 255, 255, .2);
				transition: height .1s linear, bottom .1s linear;
			}

			#goodTube_player_wrapper1:not(.goodTube_hasChapters) .vjs-progress-control:hover::before {
				height: 5px;
				bottom: 2px;
			}


			/* With chapters */
			#goodTube_player_wrapper1.goodTube_hasChapters .vjs-progress-control .goodTube_chapters {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 8px;
				right: 8px;
			}

			#goodTube_player_wrapper1.goodTube_hasChapters .vjs-progress-control .goodTube_chapters .goodTube_chapter {
				height: 100%;
				position: absolute;
			}

			#goodTube_player_wrapper1.goodTube_hasChapters .vjs-progress-control .goodTube_chapters .goodTube_chapter::before {
				content: '';
				background: rgba(255, 255, 255, .2);
				position: absolute;
				left: 0;
				right: 2px;
				bottom: 3px;
				height: 3px;
				transition: height .1s linear, bottom .1s linear, background .1s linear;
			}

			#goodTube_player_wrapper1.goodTube_hasChapters .vjs-progress-control .goodTube_chapters .goodTube_chapter.goodTube_redChapter::before {
				background: #ff0000 !important;
			}

			#goodTube_player_wrapper1.goodTube_hasChapters .vjs-progress-control .goodTube_chapters .goodTube_chapter:last-child::before {
				right: 0;
			}

			#goodTube_player_wrapper1.goodTube_hasChapters .vjs-progress-control:hover .goodTube_chapters .goodTube_chapter::before {
				height: 5px;
				bottom: 2px;
			}

			#goodTube_player_wrapper1.goodTube_hasChapters:not(.goodTube_mobile) .vjs-progress-control .goodTube_chapters .goodTube_chapter:hover::before {
				height: 9px;
				bottom: 0;
				background: rgba(255, 255, 255, .4);
			}

			#goodTube_player_wrapper1.goodTube_hasChapters .vjs-progress-control .goodTube_markers {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				pointer-events: none;
			}

			#goodTube_player_wrapper1.goodTube_hasChapters .vjs-progress-control .goodTube_marker {
				width: 2px;
				height: 100%;
				position: absolute;
				background: rgba(0, 0, 0, .2);
				margin-left: -2px;
			}

			#goodTube_player_wrapper1.goodTube_hasChapters .vjs-progress-control .goodTube_marker.goodTube_showMarker {
				background: rgba(0, 0, 0, .6);
			}

			#goodTube_player_wrapper1.goodTube_hasChapters .vjs-progress-control .goodTube_marker:last-child {
				display: none;
			}

			#goodTube_player_wrapper1 .vjs-progress-control .vjs-mouse-display {
				background: transparent;
			}

			#goodTube_player_wrapper1.goodTube_hasChapters .vjs-progress-control .vjs-mouse-display .vjs-time-tooltip::before {
				content: attr(chapter-title);
				display: block;
				white-space: nowrap;
				margin-bottom: 4px;
			}

			#goodTube_player_wrapper1 .vjs-progress-control .goodTube_hoverBar {
				background: rgba(255, 255, 255, .4);
				position: absolute;
				bottom: 3px;
				left: 8px;
				height: 3px;
				opacity: 0;
				transition: height .1s linear, bottom .1s linear, opacity .1s linear;
			}

			#goodTube_player_wrapper1 .vjs-progress-control:hover .goodTube_hoverBar {
				height: 5px;
				bottom: 2px;
				opacity: 1;
			}

			#goodTube_player_wrapper1.goodTube_mobile .vjs-time-control .vjs-duration-display {
				white-space: nowrap;
			}

			#goodTube_player_wrapper1.goodTube_mobile .vjs-time-control .vjs-duration-display::after {
				content: attr(chapter-title);
				display: inline-block;
				color: #ffffff;
				margin-left: 3px;
			}

			#goodTube_player_wrapper1.goodTube_mobile .vjs-progress-control .vjs-slider,
			#goodTube_player_wrapper1.goodTube_mobile:not(.goodTube_hasChapters) .vjs-progress-control::before,
			#goodTube_player_wrapper1.goodTube_mobile.goodTube_hasChapters .vjs-progress-control .goodTube_chapters,
			#goodTube_player_wrapper1.goodTube_mobile .vjs-progress-control .goodTube_hoverBar {
				left: 16px;
				right: 16px;
			}


			/* Audio only view */
			#goodTube_player_wrapper3.goodTube_audio {
				background: #000000;
				position: relative;
			}

			#goodTube_player_wrapper3.goodTube_audio .video-js::after {
				content: '\\f107';
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: #ffffff;
				font-family: VideoJS;
				font-weight: 400;
				font-style: normal;
				font-size: 148px;
				pointer-events: none;
			}

			@media (max-width: 768px) {
				#goodTube_player_wrapper3.goodTube_audio .video-js::after {
					font-size: 100px;
				}
			}

			#goodTube_player_wrapper1.goodTube_mobile #goodTube_player_wrapper3.goodTube_audio .video-js::after {
				font-size: 100px;
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

			ytd-watch-flexy:not(ytd-watch-flexy[theater]) #below,
			ytd-watch-flexy:not(ytd-watch-flexy[theater]) #secondary {
				margin-top: 0 !important;
			}

			ytd-watch-flexy[theater] #below {
				padding-top: 8px !important;
			}

			ytd-watch-flexy[theater] #secondary {
				padding-top: 16px !important;
			}

			ytd-watch-flexy[theater] #goodTube_player_wrapper1:not(.goodTube_mobile) {
				padding-top: min(var(--ytd-watch-flexy-max-player-height), (calc(var(--ytd-watch-flexy-height-ratio) / var(--ytd-watch-flexy-width-ratio) * 100%))) !important;
			}

			ytd-watch-flexy[theater] #goodTube_player_wrapper1:not(.goodTube_mobile) #goodTube_player_wrapper3,
			ytd-watch-flexy[theater] #goodTube_player_wrapper1:not(.goodTube_mobile) #goodTube_player_wrapper3 #goodTube_player {
				border-radius: 0;
			}

			/* Desktop */
			#goodTube_player_wrapper1:not(.goodTube_mobile) {
				position: relative;
				height: 0;
				padding-top: min(var(--ytd-watch-flexy-max-player-height), (calc(var(--ytd-watch-flexy-height-ratio) / var(--ytd-watch-flexy-width-ratio) * 100%))) !important;
				box-sizing: border-box;
				min-height: var(--ytd-watch-flexy-min-player-height);
			}

			#goodTube_player_wrapper1:not(.goodTube_mobile) #goodTube_player_wrapper2 {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: 0 auto;
				min-height: 240px;
			}

			#goodTube_player_wrapper1:not(.goodTube_mobile) #goodTube_player_wrapper3 {
				box-sizing: border-box;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				min-height: 240px;
			}

			#goodTube_player_wrapper1:not(.goodTube_mobile):not(.goodTube_miniplayer) #goodTube_player {
				border-radius: 12px;
			}

			#goodTube_player_wrapper1.goodTube_miniplayer.goodTube_mobile {
				position: absolute !important;
			}

			#goodTube_player_wrapper3 {
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

			html body #goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-control-bar,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js .vjs-control-bar {
				z-index: 1;
				position: static;
				margin-top: auto;
				justify-content: space-around;
			}

			ytd-watch-flexy:not([theater]) #primary {
				min-width: 721px !important;
			}

			@media (max-width: 1100px) {
				ytd-watch-flexy:not([theater]) #primary {
					min-width: 636px !important;
				}

				ytd-watch-flexy:not([theater]) #goodTube_player_wrapper1:not(.goodTube_mobile) .video-js .vjs-control-bar .vjs-button {
					zoom: .88;
				}
			}

			@media (max-width: 1016px) {
				ytd-watch-flexy:not([theater]) #primary {
					min-width: 0 !important;
				}

				ytd-watch-flexy:not([theater]) #goodTube_player_wrapper1:not(.goodTube_mobile) .video-js .vjs-control-bar .vjs-button {
					zoom: 1;
				}
			}

			@media (max-width: 786px) {
				ytd-watch-flexy:not([theater]) #goodTube_player_wrapper1:not(.goodTube_mobile) .video-js .vjs-control-bar .vjs-button {
					zoom: .9;
				}
			}

			@media (max-width: 715px) {
				ytd-watch-flexy:not([theater]) #goodTube_player_wrapper1:not(.goodTube_mobile) .video-js .vjs-control-bar .vjs-button {
					zoom: .85;
				}
			}

			@media (max-width: 680px) {
				ytd-watch-flexy:not([theater]) #goodTube_player_wrapper1:not(.goodTube_mobile) .video-js .vjs-control-bar .vjs-button {
					zoom: .8;
				}
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

			html body #goodTube_player_wrapper1 .video-js.vjs-loading {
				background: #000000;
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

			html body #goodTube_player_wrapper1.goodTube_mobile .video-js.vjs-paused::before,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js.vjs-paused::before,
			html body #goodTube_player_wrapper1.goodTube_mobile .video-js.vjs-user-active::before,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js.vjs-user-active::before {
				background: rgba(0,0,0,.6);
			}

			html body #goodTube_player_wrapper1.goodTube_mobile .video-js.vjs-user-inactive:not(.vjs-paused) .vjs-control-bar,
			html body #goodTube_player_wrapper1.goodTube_miniplayer .video-js.vjs-user-inactive:not(.vjs-paused) .vjs-control-bar {
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
				background: transparent;
				z-index: 1;
			}

			#goodTube_player_wrapper1.goodTube_mobile #goodTube_player,
			#goodTube_player.vjs-loading {
				background: #000000;
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
				padding: 16px;
				background: #000000;
				border-radius: 8px;
			}

			#goodTube_error small {
				padding-top: 8px;
				display: block;
			}
		`,document.head.appendChild(a);let n=document.createElement("div");n.id="goodTube_player_wrapper1";let s=document.createElement("div");s.id="goodTube_player_wrapper2";let l=document.createElement("div");l.id="goodTube_player_wrapper3",em?(n.classList.add("goodTube_mobile"),i.appendChild(n),setInterval(function(){window.requestAnimationFrame(function(){if(void 0!==ec.v){let e=document.querySelector(".player-size.player-placeholder");e&&(e.offsetHeight>0?(n.style.height=e.offsetHeight+"px",n.style.width=e.offsetWidth+"px"):(e=document.querySelector("#player")).offsetHeight>0&&(n.style.height=e.offsetHeight+"px",n.style.width=e.offsetWidth+"px"));document.querySelector(".player-container.sticky-player")?n.style.position="fixed":n.style.position="absolute"}else n.style.height="0",n.style.width="0"})},1)):(i.before(n),setInterval(function(){document.querySelectorAll("ytd-watch-flexy[theater] #below, ytd-watch-flexy[theater] #secondary").forEach(e=>{e.style.marginTop=n.offsetHeight+"px"})},1)),n.appendChild(s),s.appendChild(l);let v=document.createElement("video");v.id="goodTube_player",v.classList.add("video-js"),v.controls=!0,v.setAttribute("tab-index","1"),l.appendChild(v),eu=v,addEventListener("leavepictureinpicture",e=>{void 0===ec.v&&E(eu),f=!1}),addEventListener("enterpictureinpicture",e=>{f=!0}),function e(){let i;console.log("[GoodTube] Loading player..."),(i=document.createElement("style")).textContent=`
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

			.video-js .vjs-quality-selector .vjs-icon-placeholder:before {
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
			.vjs-slider-horizontal .vjs-volume-level:before {
				font-size: 14px !important;
			}

			.vjs-volume-control {
				width: auto !important;
				margin-right: 0 !important;
			}

			.video-js .vjs-volume-panel.vjs-volume-panel-horizontal {
				transition: width .25s !important;
				z-index: 999;
			}

			.video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-horizontal {
				transition: opacity .25s, width 1s !important;
				min-width: 0 !important;
				padding-right: 8px !important;
				pointer-events: none;
			}

			.video-js .vjs-volume-panel {
				margin-right: 6px !important;
			}

			.video-js .vjs-volume-panel.vjs-hover,
			.video-js .vjs-volume-panel.vjs-slider-active {
				margin-right: 16px !important;
			}

			.video-js .vjs-volume-panel.vjs-hover .vjs-volume-control.vjs-volume-horizontal {
				pointer-events: all;
			}

			.vjs-volume-bar.vjs-slider-horizontal {
				min-width: 52px !important;
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

			.video-js ul.vjs-menu-content::-webkit-scrollbar {
				display: none;
			}

			.video-js .vjs-user-inactive:not(.vjs-paused) {
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

			/* Time control */
			html body #goodTube_player_wrapper1 .video-js .vjs-time-control {
				font-family: "YouTube Noto", Roboto, Arial, Helvetica, sans-serif !important;
				order: 4;
				font-size: 13.0691px !important;
				padding-top: 4px !important;
				color: rgb(221, 221, 221) !important;
				text-shadow: 0 0 2px rgba(0, 0, 0, .5) !important;
				min-width: 0 !important;
				z-index: 1;
			}

			html body #goodTube_player_wrapper1 .video-js .vjs-time-control * {
				min-width: 0 !important;
			}

			.video-js .vjs-current-time {
				padding-right: 4px !important;
				padding-left: 0 !important;
				margin-left: 0 !important;
			}

			.video-js .vjs-duration {
				padding-left: 4px !important;
				padding-right: 5px !important;
				margin-right: 0 !important;
			}

			#goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-time-control {
				position: absolute;
				top: calc(100% - 98px);
				font-weight: 500;
				pointer-events: none;
			}

			#goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-current-time {
				color: #ffffff !important;
			}

			.video-js .vjs-source-button {
				margin-left: auto !important;
				order: 5;
			}

			.video-js .vjs-download-button {
				order: 6;
			}

			.video-js .vjs-autoplay-button {
				order: 7;
			}

			.video-js .vjs-playback-rate {
				order: 8;
			}

			.video-js .vjs-subs-caps-button {
				order: 9;
			}

			.video-js .vjs-quality-selector {
				order: 10;
			}

			.video-js .vjs-miniplayer-button {
				order: 11;
			}

			.video-js .vjs-theater-button {
				order: 12;
			}

			.video-js .vjs-fullscreen-control {
				order: 13;
			}

			.video-js .vjs-control-bar {
				display: flex;
				flex-direction: row;
				scrollbar-width: none;
				height: 48px !important;
				background: transparent !important;
			}

			.video-js .vjs-control-bar::before {
				content: '';
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAD1CAYAAACRFp+GAAAAAXNSR0IArs4c6QAAASpJREFUOE9lyOlHGAAcxvHuY63Wta3WsdWqdaz7vtfduoyZSBLJmCSSSCaSSBJJJIkk0h+Z7/Pm59Hz4sP3SUh4tUSeIIkMkkmR4qSSIs1JJ4MMUmQ6b0iR5bwlg2xS5DjvSJHr5JFBPikKnEIyeE+KD85HUhQ5xWTwiRQlTikpypxyMvhMii9OBSkqna9kUEWKaqeGDL6RotapI0W900AG30nR6DSRotlpIYNWUrQ57aTocDrJoIsU3U4PKXqdPjLoJ8WAM0gGQ6QYdn6QYsQZJYMxUow7E6SYdKbIYJoUP50ZUsw6c2QwTy7AL/gNf2ARlmAZVmAV1mAd/sI/2IBN2IJt2IFd2IN9+A8HcAhHcAwncApncA4XcAlXcA03cAt3cA8P8AhP8PwCakcyvVVFagcAAAAASUVORK5CYII=");
				background-size: cover;
				background-repeat: repeat-x;
				background-position: bottom;
				background-size: contain;
				height: calc(var(--ytd-watch-flexy-max-player-height) / 2.5);
				pointer-events: none;
			}
			#goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-control-bar::before {
				display: none;
				content: none;
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
				bottom: calc(100% + 35px) !important;
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

			#goodTube_player_wrapper1:not(goodTube_mobile) .video-js .vjs-control-bar > .vjs-play-control {
				padding-left: 8px;
				box-sizing: content-box;
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

			.video-js .vjs-control-bar *:not(.vjs-time-control) {
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
				top: -50px !important;
				text-shadow: 0 0 10px rgba(0, 0, 0, .5) !important;
				font-family: "YouTube Noto", Roboto, Arial, Helvetica, sans-serif !important;
				font-weight: 500 !important;
			}

			.video-js .vjs-menu-content {
				max-height: calc(var(--ytd-watch-flexy-panel-max-height) - 72px) !important;
			}

			#goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-menu-content {
				max-height: 156px !important;
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

			.video-js .vjs-menu li.vjs-menu-item:not(.vjs-selected) {
				background-color: transparent !important;
				color: #ffffff !important;
			}

			.video-js .vjs-menu li.vjs-menu-item:not(.vjs-selected):hover {
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

			.video-js .vjs-menu li.vjs-menu-item:not(.vjs-selected):hover,
			.video-js .vjs-menu li.vjs-menu-item.vjs-auto-selected {
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
				content: 'Mute (m)';
			}

			.video-js .vjs-control-bar .vjs-mute-control.vjs-vol-0::before {
				content: 'Unmute (m)';
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
				content: 'Miniplayer (i)';
			}

			.video-js .vjs-control-bar > .vjs-theater-button::before {
				content: 'Theater mode (t)';
			}

			.video-js .vjs-control-bar > .vjs-fullscreen-control::before {
				content: 'Fullscreen (f)';
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
				font-weight: 600;
				padding: 8px;
				white-space: nowrap;
				opacity: 0;
				transition: opacity .1s;
				pointer-events: none;
				text-shadow: none !important;
				z-index: 1;
			}

			#goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-control-bar button.vjs-menu-button::before,
			#goodTube_player_wrapper1.goodTube_mobile .video-js .vjs-control-bar .vjs-button:not(.vjs-menu-button)::before {
				display: none !important;
				content: none !important;
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
		`,document.body.appendChild(i),ec=o();let a=videojs.getComponent("MenuItem"),n=videojs.getComponent("MenuButton");class s extends n{createItems(){let e=[],{myItems:o}=this.options_;return Array.isArray(o),o.forEach(({clickHandler:o,...t})=>{let r=new a(this.player(),t);o&&(r.handleClick=o),e.push(r)}),e}buildCSSClass(){return`${super.buildCSSClass()}`}}videojs.registerComponent("DownloadButton",s),videojs.registerComponent("SourceButton",s),videojs.registerComponent("AutoplayButton",s);let l=videojs.getComponent("Button");videojs.registerComponent("PrevButton",class e extends l{handleClick(e){e.stopImmediatePropagation(),eS()}}),videojs.registerComponent("NextButton",class e extends l{handleClick(e){e.stopImmediatePropagation(),eL(!0)}}),videojs.registerComponent("MiniplayerButton",class e extends l{handleClick(e){e.stopImmediatePropagation(),N()}}),videojs.registerComponent("TheaterButton",class e extends l{handleClick(e){e.stopImmediatePropagation(),function e(o){let t=!1,r=!1,i=!1;if("next"===o)t="n",r=78,i=!0;else if("prev"===o)t="p",r=80,i=!0;else if("theater"===o){t="t",r=84,i=!1;let a=document.querySelector(".ytp-size-button");if(a){a.click();return}}else{if("fullscreen"!==o)return;t="f",r=70,i=!1}let n=!1;n=new window.KeyboardEvent("focus",{bubbles:!0,key:t,keyCode:r,shiftKey:i,charCode:0}),document.dispatchEvent(n),n=new window.KeyboardEvent("keydown",{bubbles:!0,key:t,keyCode:r,shiftKey:i,charCode:0}),document.dispatchEvent(n),n=new window.KeyboardEvent("beforeinput",{bubbles:!0,key:t,keyCode:r,shiftKey:i,charCode:0}),document.dispatchEvent(n),n=new window.KeyboardEvent("keypress",{bubbles:!0,key:t,keyCode:r,shiftKey:i,charCode:0}),document.dispatchEvent(n),n=new window.KeyboardEvent("input",{bubbles:!0,key:t,keyCode:r,shiftKey:i,charCode:0}),document.dispatchEvent(n),n=new window.KeyboardEvent("change",{bubbles:!0,key:t,keyCode:r,shiftKey:i,charCode:0}),document.dispatchEvent(n),n=new window.KeyboardEvent("keyup",{bubbles:!0,key:t,keyCode:r,shiftKey:i,charCode:0}),document.dispatchEvent(n)}("theater")}});let c=[];e_.forEach(e=>{c.push({label:e.name,clickHandler(e){e.target.closest(".vjs-menu").querySelectorAll(".vjs-selected").forEach(e=>{e.classList.remove("vjs-selected")});let o=e.target.closest(".vjs-menu-item");o.classList.add("vjs-selected"),"automatic"===o.getAttribute("api")&&(A=0),eu.currentTime>0&&(u=eu.currentTime),q(o.getAttribute("api"),!0)}})}),K=videojs("goodTube_player",{inactivityTimeout:3e3,controls:!0,autoplay:!1,preload:"auto",width:"100%",height:"100%",playbackRates:[.25,.5,1,1.25,1.5,1.75,2],userActions:{doubleClick:!1},controlBar:{children:["playToggle","volumePanel","currentTimeDisplay","timeDivider","durationDisplay","progressControl","playbackRateMenuButton","subsCapsButton","qualitySelector","fullscreenToggle"],NextButton:{className:"vjs-next-button"},PrevButton:{className:"vjs-prev-button"},AutoplayButton:{controlText:"Autoplay",className:"vjs-autoplay-button",myItems:[{label:"Autoplay off",clickHandler(){event.target.closest(".vjs-menu").querySelector(".vjs-selected")?.classList.remove("vjs-selected");event.target.closest(".vjs-menu-item").classList.add("vjs-selected"),t("goodTube_autoplay","off")}},{label:"Autoplay on",clickHandler(){event.target.closest(".vjs-menu").querySelector(".vjs-selected")?.classList.remove("vjs-selected");event.target.closest(".vjs-menu-item").classList.add("vjs-selected"),t("goodTube_autoplay","on")}},]},SourceButton:{controlText:"Video source",className:"vjs-source-button",myItems:c},DownloadButton:{controlText:"Download",className:"vjs-download-button",myItems:[{className:"goodTube_downloadPlaylist_cancel",label:"CANCEL ALL DOWNLOADS",clickHandler(){(function e(){if(confirm("Are you sure you want to cancel all downloads?")){for(let o in ev=[],eb)clearTimeout(eb[o]),delete eb[o];es(!0),console.log("[GoodTube] Downloads cancelled")}})()}},{label:"Download video",clickHandler(){ev[ec.v]=!0,eA(0,"video",ec.v)}},{label:"Download audio",clickHandler(){ev[ec.v]=!0,eA(0,"audio",ec.v)}},{className:"goodTube_downloadPlaylist_video",label:"Download playlist (video)",clickHandler(){e0("video")}},{className:"goodTube_downloadPlaylist_audio",label:"Download playlist (audio)",clickHandler(){e0("audio")}},]},MiniplayerButton:{className:"vjs-miniplayer-button"},TheaterButton:{className:"vjs-theater-button"}}}),videojs.log.level("off"),videojs.hook("error",function(){void 0!==p.reloadVideo&&clearTimeout(p.reloadVideo),p.reloadVideo=setTimeout(function(){!function e(o){if(void 0===ec.v)return;if(void 0!==p.reloadVideo&&clearTimeout(p.reloadVideo),g>3){ea();return}let t=o.src;H(o),setTimeout(function(){o.setAttribute("src",t)},0),g++}(eu)},100),M(),ei()}),K.on("ready",function(){Q=!0,ee=K.hlsQualitySelector();let e=document.querySelector("#goodTube_player");if(e){let o=document.createElement("div");o.id="goodTube_miniplayer_closeButton",o.onclick=function(){N()},e.appendChild(o);let i=document.createElement("div");i.id="goodTube_miniplayer_expandButton",i.onclick=function(){j!==ec.v?window.location.href="/watch?v="+j+"&t="+parseFloat(eu.currentTime).toFixed(0)+"s":N()},e.appendChild(i)}if(console.log("[GoodTube] Player loaded"),eu=document.querySelector("#goodTube_player video"),em){let a=document.createElement("div");a.id="goodTube_seekBackwards",e.append(a),a.onclick=function(){var o=new Date().getTime()-F;o<400&&o>0?(e.classList.remove("vjs-user-active"),e.classList.add("vjs-user-inactive"),eu.currentTime-=10):e.classList.contains("vjs-user-active")?(e.classList.remove("vjs-user-active"),e.classList.add("vjs-user-inactive")):(e.classList.add("vjs-user-active"),e.classList.remove("vjs-user-inactive")),F=new Date().getTime()};let n=document.createElement("div");n.id="goodTube_seekForwards",e.append(n),n.onclick=function(){var o=new Date().getTime()-X;o<400&&o>0?(e.classList.remove("vjs-user-active"),e.classList.add("vjs-user-inactive"),eu.currentTime+=5):e.classList.contains("vjs-user-active")?(e.classList.remove("vjs-user-active"),e.classList.add("vjs-user-inactive")):(e.classList.add("vjs-user-active"),e.classList.remove("vjs-user-inactive")),X=new Date().getTime()},e.addEventListener("touchstart",function(o){Z=setTimeout(function(){e.classList.remove("vjs-user-active"),e.classList.add("vjs-user-inactive"),eu.playbackRate=2},1e3)}),e.addEventListener("touchmove",function(e){Z&&clearTimeout(Z),Z=!1,eu.playbackRate=1}),e.addEventListener("touchend",function(e){Z&&clearTimeout(Z),Z=!1,eu.playbackRate=1})}em||e.addEventListener("dblclick",function(e){document.querySelector(".vjs-fullscreen-control")?.click()}),em&&setInterval(function(){let e=document.querySelector(".vjs-current-time"),o=document.querySelector(".vjs-time-divider"),t=document.querySelector(".vjs-duration");e&&o&&t&&(e.style.left="16px",o.style.left=16+e.offsetWidth+4+"px",t.style.left=16+e.offsetWidth+o.offsetWidth+4+4+"px")},100),em||(e.addEventListener("mouseout",function(o){e.classList.contains("vjs-user-active")&&!e.classList.contains("vjs-paused")&&(e.classList.remove("vjs-user-active"),e.classList.add("vjs-user-inactive"))}),e.addEventListener("mouseover",function(o){e.classList.contains("vjs-user-inactive")&&!e.classList.contains("vjs-paused")&&(e.classList.add("vjs-user-active"),e.classList.remove("vjs-user-inactive"))}),e.addEventListener("click",function(o){setTimeout(function(){e.classList.contains("vjs-user-inactive")&&!e.classList.contains("vjs-paused")&&(e.classList.add("vjs-user-active"),e.classList.remove("vjs-user-inactive"),window.goodTube_inactive_timeout=setTimeout(function(){e.classList.contains("vjs-user-active")&&!e.classList.contains("vjs-paused")&&(e.classList.remove("vjs-user-active"),e.classList.add("vjs-user-inactive"))},3e3))},1)}),e.addEventListener("mousemove",function(e){void 0!==window.goodTube_inactive_timeout&&clearTimeout(window.goodTube_inactive_timeout)}));document.querySelectorAll("#goodTube_player button").forEach(e=>{e.setAttribute("title","")});let s=r("goodTube_volume");s&&s==parseFloat(s)&&z(eu,s),r("goodTube_autoplay")||t("goodTube_autoplay","on");let l=document.querySelector(".vjs-autoplay-button");if(l){l.querySelector(".vjs-menu .vjs-selected")?.classList.remove("vjs-selected");let d=l.querySelectorAll(".vjs-menu .vjs-menu-item");"on"===r("goodTube_autoplay")?d[d.length-1].classList.add("vjs-selected"):d[0].classList.add("vjs-selected")}let p=document.querySelector(".vjs-mute-control");p&&(p.onmousedown=function(){eu.muted?K.muted(!1):K.muted(!0)},p.ontouchstart=function(){eu.muted?K.muted(!1):K.muted(!0)});let u=document.querySelector(".vjs-play-control");u&&(u.removeEventListener("click",er,!1),u.addEventListener("click",er,!1)),document.onmousedown=function(){!event.target.closest(".vjs-menu")&&!event.target.closest(".vjs-menu-button")&&document.querySelectorAll(".vjs-menuOpen").forEach(e=>{e.classList.remove("vjs-menuOpen")})},document.ontouchstart=function(){!event.target.closest(".vjs-menu")&&!event.target.closest(".vjs-menu-button")&&document.querySelectorAll(".vjs-menuOpen").forEach(e=>{e.classList.remove("vjs-menuOpen")})};let c=document.querySelector(".vjs-control-bar .vjs-play-control");c&&(c.onclick=function(){0===eu.currentTime&&eu.click()},c.ontouchstart=function(){0===eu.currentTime&&eu.click()});let b=document.querySelectorAll(".vjs-source-button .vjs-menu .vjs-menu-item");if(b){let v=0;b.forEach(e=>{e.setAttribute("api",e_[v].url),v++})}if(["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"ontouchend"in document){let m=document.querySelector(".vjs-download-button");m&&m.remove()}q(r("goodTube_api_withauto"),!1),ei()}),K.on("waiting",function(){if(eo&&clearTimeout(eo),(2===ew||3===ew)&&eu.currentTime>0){let e=eu.currentTime;eo=setTimeout(function(){eu.currentTime===e&&(console.log("[GoodTube] Video not loading fast enough - selecting next video source..."),u=eu.currentTime,q("automatic",!0))},15e3)}}),document.addEventListener("keydown",function(e){27==e.keyCode&&document.querySelectorAll(".vjs-menuOpen").forEach(e=>{e.classList.remove("vjs-menuOpen")})},!0),K.on("loadedmetadata",function(){et&&clearTimeout(et),void 0!==ec.t&&B(eu,ec.t.replace("s","")),u>0&&B(eu,u),eu.focus()}),K.on("seeking",function(){d()}),K.on("loadstart",function(){if(et&&clearTimeout(et),et=setTimeout(function(){console.log("[GoodTube] Video not loading fast enough - selecting next video source..."),q("automatic",!0)},15e3),eu.classList.remove("goodTube_hidden"),1===ew){let e="",o=document.querySelector(".vjs-quality-selector .vjs-menu .vjs-selected .vjs-menu-item-text"),t=(e=o?o.innerHTML:eu.querySelector("source[selected=true]").getAttribute("label")).replace("p","").replace("hd","").replace(" ","").toLowerCase();parseFloat(_)!==parseFloat(t)&&(w=t,_=t);let r=document.querySelector("#goodTube_player_wrapper3");"audio"===t?r.classList.contains("goodTube_audio")||r.classList.add("goodTube_audio"):r.classList.contains("goodTube_audio")&&r.classList.remove("goodTube_audio"),g<=1&&console.log("[GoodTube] Loading quality "+e+"...")}else if(2===ew||3===ew){let i=document.querySelector("#goodTube_player_wrapper3");i.classList.contains("goodTube_audio")&&i.classList.remove("goodTube_audio"),g<=1&&console.log("[GoodTube] Loading qualities...")}}),K.on("loadeddata",function(){eu.paused||C(eu),g=1,void 0!==p.reloadVideo&&clearTimeout(p.reloadVideo),1===ew?console.log("[GoodTube] Quality loaded"):(2===ew||3===ew)&&console.log("[GoodTube] Qualities loaded"),ei(),V()}),K.on("ended",function(){h=!0,d(),eL()}),K.on("volumechange",function(){let e=eu.volume;eu.muted&&(e=0),t("goodTube_volume",e)})}(),setInterval(d,1e4),document.addEventListener("keydown",function(e){if(e.ctrlKey||void 0===ec.v)return;let o=e.srcElement,t=!1,r=!1;if(o&&(void 0!==o.nodeName&&(t=o.nodeName.toLowerCase()),void 0!==o.getAttribute&&(r=o.getAttribute("id"))),!o||-1===t.indexOf("input")&&-1===t.indexOf("label")&&-1===t.indexOf("select")&&-1===t.indexOf("textarea")&&-1===t.indexOf("fieldset")&&-1===t.indexOf("legend")&&-1===t.indexOf("datalist")&&-1===t.indexOf("output")&&-1===t.indexOf("option")&&-1===t.indexOf("optgroup")&&"contenteditable-root"!==r){let i=e.key.toLowerCase();">"===i?.25==parseFloat(v.playbackRate)?v.playbackRate=.5:.5==parseFloat(v.playbackRate)?v.playbackRate=.75:.75==parseFloat(v.playbackRate)?v.playbackRate=1:1==parseFloat(v.playbackRate)?v.playbackRate=1.25:1.25==parseFloat(v.playbackRate)?v.playbackRate=1.5:1.5==parseFloat(v.playbackRate)?v.playbackRate=1.75:1.75==parseFloat(v.playbackRate)&&(v.playbackRate=2):"<"===i&&(.5==parseFloat(v.playbackRate)?v.playbackRate=.25:.75==parseFloat(v.playbackRate)?v.playbackRate=.5:1==parseFloat(v.playbackRate)?v.playbackRate=.75:1.25==parseFloat(v.playbackRate)?v.playbackRate=1:1.5==parseFloat(v.playbackRate)?v.playbackRate=1.25:1.75==parseFloat(v.playbackRate)?v.playbackRate=1.5:2==parseFloat(v.playbackRate)&&(v.playbackRate=1.75)),e.shiftKey||(o&&void 0!==o.closest&&o.closest("#goodTube_player")&&("arrowdown"===i&&(v.volume>=.05?v.volume-=.05:v.volume=0,e.preventDefault()),"arrowup"===i&&(v.volume<=.95?v.volume+=.05:v.volume=1,e.preventDefault()),"t"===i&&document.querySelector("body").focus()),"arrowleft"===i&&(v.currentTime-=5),"arrowright"===i&&(v.currentTime+=5)," "===i&&(v.paused||v.ended?v.play():v.pause()),"m"===i&&(v.muted||v.volume<=0?(v.muted=!1,v.volume<=0&&(v.volume=1)):v.muted=!0),"i"===i&&(e.stopImmediatePropagation(),N()),"f"===i?document.querySelector(".vjs-fullscreen-control")?.click():"j"===i?v.currentTime-=10:"l"===i?v.currentTime+=10:"home"===i?v.currentTime=0:"end"===i&&(v.currentTime+=v.duration),"0"===i?v.currentTime=0:"1"===i?v.currentTime=v.duration/100*10:"2"===i?v.currentTime=v.duration/100*20:"3"===i?v.currentTime=v.duration/100*30:"4"===i?v.currentTime=v.duration/100*40:"5"===i?v.currentTime=v.duration/100*50:"6"===i?v.currentTime=v.duration/100*60:"7"===i?v.currentTime=v.duration/100*70:"8"===i?v.currentTime=v.duration/100*80:"9"!==i||(v.currentTime=v.duration/100*90))}},!0),em&&z(eu,1)}(),r("goodTube_unique_new2")||(fetch("https://api.counterapi.dev/v1/goodtube/users/up/"),t("goodTube_unique_new2","true"))}();

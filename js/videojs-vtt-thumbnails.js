/**
 * pthumbnails
 * @version 1.2.0
 * @copyright 2020 Rigel Kent <sendmemail@rigelk.eu>
 * @license MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
	typeof define === 'function' && define.amd ? define(['video.js'], factory) :
	(global.videojsVttThumbnails = factory(global.videojs));
}(this, (function (videojs) { 'use strict';

videojs = videojs && videojs.hasOwnProperty('default') ? videojs['default'] : videojs;

var version = "1.2.0";

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

// import request from 'request';

// Default options for the plugin.
var defaults = {};

// Cache for image elements
var cache = {};

// Cross-compatibility for Video.js 5 and 6.
var registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
var onPlayerReady = function onPlayerReady(player, options) {
  player.addClass('vjs-vtt-thumbnails');
  player.vttThumbnails = new vttThumbnailsPlugin(player, options);
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function vttThumbnails
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
var vttThumbnails = function vttThumbnails(options) {
  var _this = this;

  this.ready(function () {
    onPlayerReady(_this, videojs.mergeOptions(defaults, options));
  });
};

/**
 * VTT Thumbnails class.
 *
 * This class performs all functions related to displaying the vtt
 * thumbnails.
 */

var vttThumbnailsPlugin = function () {

  /**
   * Plugin class constructor, called by videojs on
   * ready event.
   *
   * @function  constructor
   * @param    {Player} player
   *           A Video.js player object.
   *
   * @param    {Object} [options={}]
   *           A plain object containing options for the plugin.
   *           - src: path to the .vtt file
   *           - baseUrl (optional): host prepended to the image definitions
   *           - preloadStrategy (optional): preload images in the cache, for smooth scrubbing (default: none, available: 'all')
   */
  function vttThumbnailsPlugin(player, options) {
    classCallCheck(this, vttThumbnailsPlugin);

    this.player = player;
    this.options = options;
    this.listenForDurationChange();
    this.initializeThumbnails();
    this.registeredEvents = {};
    return this;
  }

  vttThumbnailsPlugin.prototype.src = function src(source) {
    this.resetPlugin();
    this.options.src = source;
    this.initializeThumbnails();
  };

  vttThumbnailsPlugin.prototype.detach = function detach() {
    this.resetPlugin();
  };

  vttThumbnailsPlugin.prototype.resetPlugin = function resetPlugin() {
    this.thumbnailHolder && this.thumbnailHolder.parentNode.removeChild(this.thumbnailHolder);
    this.progressBar && this.progressBar.removeEventListener('mouseenter', this.registeredEvents.progressBarMouseEnter);
    this.progressBar && this.progressBar.removeEventListener('mouseleave', this.registeredEvents.progressBarMouseLeave);
    this.progressBar && this.progressBar.removeEventListener('mousemove', this.registeredEvents.progressBarMouseMove);
    delete this.registeredEvents.progressBarMouseEnter;
    delete this.registeredEvents.progressBarMouseLeave;
    delete this.registeredEvents.progressBarMouseMove;
    delete this.progressBar;
    delete this.vttData;
    delete this.thumbnailHolder;
    delete this.timeHolder;
    delete this.lastStyle;
  };

  vttThumbnailsPlugin.prototype.listenForDurationChange = function listenForDurationChange() {
    this.player.on('durationchange', function () {});
  };

  /**
   * Bootstrap the plugin.
   */


  vttThumbnailsPlugin.prototype.initializeThumbnails = function initializeThumbnails() {
    var _this2 = this;

    if (!this.options.src) {
      return;
    }
    var baseUrl = this.getBaseUrl();
    var url = this.getFullyQualifiedUrl(this.options.src, baseUrl);
    this.getVttFile(url).then(function (data) {
      _this2.vttData = _this2.processVtt(data);
      _this2.setupThumbnailElement();

      if (_this2.options.hasOwnProperty('preloadStrategy')) {
        _this2.preload(_this2.vttData);
      }
    });
  };

  /**
   * Builds a base URL should we require one.
   *
   * @returns {string}
   */


  vttThumbnailsPlugin.prototype.getBaseUrl = function getBaseUrl() {
    return [window.location.protocol, '//', window.location.hostname, window.location.port ? ':' + window.location.port : '', window.location.pathname].join('').split(/([^\/]*)$/gi).shift();
  };

  /**
   * Grabs the contents of the VTT file.
   *
   * @param url
   * @returns {Promise}
   */


  vttThumbnailsPlugin.prototype.getVttFile = function getVttFile(url) {
    var _this3 = this;

    return new Promise(function (resolve, reject) {
      var req = new XMLHttpRequest();
      req.data = {
        resolve: resolve
      };
      req.addEventListener('load', _this3.vttFileLoaded);
      req.open('GET', url);
      req.send();
    });
  };

  /**
   * Callback for loaded VTT file.
   */


  vttThumbnailsPlugin.prototype.vttFileLoaded = function vttFileLoaded() {
    this.data.resolve(this.responseText);
  };

  /**
   * This will fill the cache and thus preload images
   */


  vttThumbnailsPlugin.prototype.preload = function preload(data) {
    var _this4 = this;

    data.forEach(function (item) {
      return _this4.setImageInCacheForItem(item);
    });
  };

  vttThumbnailsPlugin.prototype.setupThumbnailElement = function setupThumbnailElement(data) {
    var _this5 = this;

    var mouseDisplay = this.player.$('.vjs-mouse-display');
    this.progressBar = this.player.$('.vjs-progress-control');
    // thumbnail element
    var thumbHolder = document.createElement('div');
    thumbHolder.setAttribute('class', 'vjs-vtt-thumbnail-display');
    this.progressBar.appendChild(thumbHolder);
    this.thumbnailHolder = thumbHolder;
    // time element
    var timeHolder = document.createElement('time');
    timeHolder.setAttribute('class', 'vjs-vtt-thumbnail-time');
    this.thumbnailHolder.appendChild(timeHolder);
    this.timeHolder = timeHolder;
    if (mouseDisplay) {
      mouseDisplay.classList.add('vjs-hidden');
    }
    this.registeredEvents.progressBarMouseEnter = function () {
      return _this5.onBarMouseenter();
    };
    this.registeredEvents.progressBarMouseLeave = function () {
      return _this5.onBarMouseleave();
    };
    this.progressBar.addEventListener('mouseenter', this.registeredEvents.progressBarMouseEnter);
    this.progressBar.addEventListener('mouseleave', this.registeredEvents.progressBarMouseLeave);
  };

  vttThumbnailsPlugin.prototype.onBarMouseenter = function onBarMouseenter() {
    var _this6 = this;

    this.mouseMoveCallback = function (e) {
      _this6.onBarMousemove(e);
    };
    this.registeredEvents.progressBarMouseMove = this.mouseMoveCallback;
    this.progressBar.addEventListener('mousemove', this.registeredEvents.progressBarMouseMove);
    this.showThumbnailHolder();
  };

  vttThumbnailsPlugin.prototype.onBarMouseleave = function onBarMouseleave() {
    if (this.registeredEvents.progressBarMouseMove) {
      this.progressBar.removeEventListener('mousemove', this.registeredEvents.progressBarMouseMove);
    }
    this.hideThumbnailHolder();
  };

  vttThumbnailsPlugin.prototype.getXCoord = function getXCoord(bar, mouseX) {
    var rect = bar.getBoundingClientRect();
    var docEl = document.documentElement;
    return mouseX - (rect.left + (window.pageXOffset || docEl.scrollLeft || 0));
  };

  vttThumbnailsPlugin.prototype.onBarMousemove = function onBarMousemove(event) {
    this.updateThumbnailStyle(videojs.dom.getPointerPosition(this.progressBar, event).x, this.progressBar.offsetWidth);
  };

  vttThumbnailsPlugin.prototype.setImageInCacheForItem = function setImageInCacheForItem(item) {
    // Cache miss
    if (item.css.url && !cache[item.css.url]) {
      var image = new Image();
      image.src = item.css.url;
      cache[item.css.url] = image;
    }
  };

  vttThumbnailsPlugin.prototype.getStyleForTime = function getStyleForTime(time) {
    for (var i = 0; i < this.vttData.length; ++i) {
      var item = this.vttData[i];
      if (time >= item.start && time < item.end) {
        this.setImageInCacheForItem(item);

        return item.css;
      }
    }
  };

  vttThumbnailsPlugin.prototype.showThumbnailHolder = function showThumbnailHolder() {
    this.thumbnailHolder.style.opacity = '1';
  };

  vttThumbnailsPlugin.prototype.hideThumbnailHolder = function hideThumbnailHolder() {
    this.thumbnailHolder.style.opacity = '0';
  };

  vttThumbnailsPlugin.prototype.updateThumbnailStyle = function updateThumbnailStyle(percent, width) {
    var duration = this.player.duration();
    var time = percent * duration;
    var currentStyle = this.getStyleForTime(time);

    var timestamp = new Date(Math.round(time) * 1000).toISOString().substr(11, 8);
    timestamp = duration > 3599 ? timestamp : timestamp.substring(3);
    this.timeHolder.innerText = timestamp;

    if (!currentStyle) {
      return this.hideThumbnailHolder();
    }

    var xPos = percent * width;
    var thumbnailWidth = parseInt(this.thumbnailHolder.offsetWidth);
    var halfthumbnailWidth = thumbnailWidth / 2;
    var marginRight = width - (xPos + halfthumbnailWidth);
    var marginLeft = xPos - halfthumbnailWidth;

    if (marginLeft > 0 && marginRight > 0) {
      this.thumbnailHolder.style.transform = 'translateX(' + (xPos - halfthumbnailWidth) + 'px)';
    } else if (marginLeft <= 0) {
      this.thumbnailHolder.style.transform = 'translateX(' + 0 + 'px)';
    } else if (marginRight <= 0) {
      this.thumbnailHolder.style.transform = 'translateX(' + (xPos + marginRight - halfthumbnailWidth) + 'px)';
    }

    if (this.lastStyle && this.lastStyle === currentStyle) {
      return;
    }
    this.lastStyle = currentStyle;

    for (var style in currentStyle) {
      if (currentStyle.hasOwnProperty(style)) {
        this.thumbnailHolder.style[style] = currentStyle[style];
      }
    }
  };

  vttThumbnailsPlugin.prototype.processVtt = function processVtt(data) {
    var _this7 = this;

    var processedVtts = [];
    var vttDefinitions = data.split(/[\r\n][\r\n]/i);
    vttDefinitions.forEach(function (vttDef) {
      if (vttDef.match(/([0-9]{2}:)?([0-9]{2}:)?[0-9]{2}(.[0-9]{3})?( ?--> ?)([0-9]{2}:)?([0-9]{2}:)?[0-9]{2}(.[0-9]{3})?[\r\n]{1}.*/gi)) {
        var vttDefSplit = vttDef.split(/[\r\n]/i);
        var vttTiming = vttDefSplit[0];
        var vttTimingSplit = vttTiming.split(/ ?--> ?/i);
        var vttTimeStart = vttTimingSplit[0];
        var vttTimeEnd = vttTimingSplit[1];
        var vttImageDef = vttDefSplit[1];
        var vttCssDef = _this7.getVttCss(vttImageDef);

        processedVtts.push({
          start: _this7.getSecondsFromTimestamp(vttTimeStart),
          end: _this7.getSecondsFromTimestamp(vttTimeEnd),
          css: vttCssDef
        });
      }
    });

    return processedVtts;
  };

  vttThumbnailsPlugin.prototype.getFullyQualifiedUrl = function getFullyQualifiedUrl(path, base) {
    if (path.indexOf('//') >= 0) {
      // We have a fully qualified path.
      return path;
    }
    if (base.indexOf('//') === 0) {
      // We don't have a fully qualified path, but need to
      // be careful with trimming.
      return [base.replace(/\/$/gi, ''), this.trim(path, '/')].join('/');
    }
    if (base.indexOf('//') > 0) {
      // We don't have a fully qualified path, and should
      // trim both sides of base and path.
      return [this.trim(base, '/'), this.trim(path, '/')].join('/');
    }

    // If all else fails.
    return path;
  };

  vttThumbnailsPlugin.prototype.getPropsFromDef = function getPropsFromDef(def) {
    var imageDefSplit = def.split(/#xywh=/i);
    var imageUrl = imageDefSplit[0];
    var imageCoords = imageDefSplit[1];
    var splitCoords = imageCoords.match(/[0-9]+/gi);
    return {
      x: splitCoords[0],
      y: splitCoords[1],
      w: splitCoords[2],
      h: splitCoords[3],
      image: imageUrl
    };
  };

  vttThumbnailsPlugin.prototype.getVttCss = function getVttCss(vttImageDef) {

    var cssObj = {};

    // If there isn't a protocol, use the VTT source URL.
    var baseSplit = void 0;
    if (this.options.baseUrl) {
      baseSplit = this.options.baseUrl;
    } else if (this.options.src.indexOf('//') >= 0) {
      baseSplit = this.options.src.split(/([^\/]*)$/gi).shift();
    } else {
      baseSplit = this.getBaseUrl() + this.options.src.split(/([^\/]*)$/gi).shift();
    }

    vttImageDef = this.getFullyQualifiedUrl(vttImageDef, baseSplit);

    // deal with regular thumbnails
    if (!vttImageDef.match(/#xywh=/i)) {
      cssObj.background = 'url("' + vttImageDef + '")';
      cssObj.url = vttImageDef;
      return cssObj;
    }

    // deal with sprited thumbnails
    var imageProps = this.getPropsFromDef(vttImageDef);
    cssObj.background = 'url("' + imageProps.image + '") no-repeat -' + imageProps.x + 'px -' + imageProps.y + 'px';
    cssObj.width = imageProps.w + 'px';
    cssObj.height = imageProps.h + 'px';
    cssObj.url = imageProps.image;

    return cssObj;
  };

  vttThumbnailsPlugin.prototype.doconstructTimestamp = function doconstructTimestamp(timestamp) {
    var splitStampMilliseconds = timestamp.split('.');
    var timeParts = splitStampMilliseconds[0];
    var timePartsSplit = timeParts.split(':');
    return {
      milliseconds: parseInt(splitStampMilliseconds[1]) || 0,
      seconds: parseInt(timePartsSplit.pop()) || 0,
      minutes: parseInt(timePartsSplit.pop()) || 0,
      hours: parseInt(timePartsSplit.pop()) || 0
    };
  };

  vttThumbnailsPlugin.prototype.getSecondsFromTimestamp = function getSecondsFromTimestamp(timestamp) {
    var timestampParts = this.doconstructTimestamp(timestamp);
    return parseInt(timestampParts.hours * (60 * 60) + timestampParts.minutes * 60 + timestampParts.seconds + timestampParts.milliseconds / 1000);
  };

  vttThumbnailsPlugin.prototype.trim = function trim(str, charlist) {
    var whitespace = [' ', '\n', '\r', '\t', '\f', '\x0b', '\xa0', '\u2000', '\u2001', '\u2002', '\u2003', '\u2004', '\u2005', '\u2006', '\u2007', '\u2008', '\u2009', '\u200A', '\u200B', '\u2028', '\u2029', '\u3000'].join('');
    var l = 0;
    var i = 0;
    str += '';
    if (charlist) {
      whitespace = (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1');
    }
    l = str.length;
    for (i = 0; i < l; i++) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(i);
        break;
      }
    }
    l = str.length;
    for (i = l - 1; i >= 0; i--) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(0, i + 1);
        break;
      }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
  };

  return vttThumbnailsPlugin;
}();

// Register the plugin with video.js.


registerPlugin('vttThumbnails', vttThumbnails);

// Include the version number.
vttThumbnails.VERSION = version;

return vttThumbnails;

})));

/**
 * videojs-contrib-quality-levels
 * @version 2.0.4
 * @copyright 2018 Brightcove, Inc.
 * @license Apache-2.0
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsContribQualityLevels = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _qualityLevel = require('./quality-level.js');

var _qualityLevel2 = _interopRequireDefault(_qualityLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A list of QualityLevels.
 *
 * interface QualityLevelList : EventTarget {
 *   getter QualityLevel (unsigned long index);
 *   readonly attribute unsigned long length;
 *   readonly attribute long selectedIndex;
 *
 *   void addQualityLevel(QualityLevel qualityLevel)
 *   void removeQualityLevel(QualityLevel remove)
 *   QualityLevel? getQualityLevelById(DOMString id);
 *
 *   attribute EventHandler onchange;
 *   attribute EventHandler onaddqualitylevel;
 *   attribute EventHandler onremovequalitylevel;
 * };
 *
 * @extends videojs.EventTarget
 * @class QualityLevelList
 */
var QualityLevelList = function (_videojs$EventTarget) {
  _inherits(QualityLevelList, _videojs$EventTarget);

  function QualityLevelList() {
    var _ret;

    _classCallCheck(this, QualityLevelList);

    var _this = _possibleConstructorReturn(this, _videojs$EventTarget.call(this));

    var list = _this; // eslint-disable-line

    if (_video2['default'].browser.IS_IE8) {
      list = _document2['default'].createElement('custom');
      for (var prop in QualityLevelList.prototype) {
        if (prop !== 'constructor') {
          list[prop] = QualityLevelList.prototype[prop];
        }
      }
    }

    list.levels_ = [];
    list.selectedIndex_ = -1;

    /**
     * Get the index of the currently selected QualityLevel.
     *
     * @returns {number} The index of the selected QualityLevel. -1 if none selected.
     * @readonly
     */
    Object.defineProperty(list, 'selectedIndex', {
      get: function get() {
        return list.selectedIndex_;
      }
    });

    /**
     * Get the length of the list of QualityLevels.
     *
     * @returns {number} The length of the list.
     * @readonly
     */
    Object.defineProperty(list, 'length', {
      get: function get() {
        return list.levels_.length;
      }
    });

    return _ret = list, _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Adds a quality level to the list.
   *
   * @param {Representation|Object} representation The representation of the quality level
   * @param {string}   representation.id        Unique id of the QualityLevel
   * @param {number=}  representation.width     Resolution width of the QualityLevel
   * @param {number=}  representation.height    Resolution height of the QualityLevel
   * @param {number}   representation.bandwidth Bitrate of the QualityLevel
   * @param {Function} representation.enabled   Callback to enable/disable QualityLevel
   * @return {QualityLevel} the QualityLevel added to the list
   * @method addQualityLevel
   */


  QualityLevelList.prototype.addQualityLevel = function addQualityLevel(representation) {
    var qualityLevel = this.getQualityLevelById(representation.id);

    // Do not add duplicate quality levels
    if (qualityLevel) {
      return qualityLevel;
    }

    var index = this.levels_.length;

    qualityLevel = new _qualityLevel2['default'](representation);

    if (!('' + index in this)) {
      Object.defineProperty(this, index, {
        get: function get() {
          return this.levels_[index];
        }
      });
    }

    this.levels_.push(qualityLevel);

    this.trigger({
      qualityLevel: qualityLevel,
      type: 'addqualitylevel'
    });

    return qualityLevel;
  };

  /**
   * Removes a quality level from the list.
   *
   * @param {QualityLevel} remove QualityLevel to remove to the list.
   * @return {QualityLevel|null} the QualityLevel removed or null if nothing removed
   * @method removeQualityLevel
   */


  QualityLevelList.prototype.removeQualityLevel = function removeQualityLevel(qualityLevel) {
    var removed = null;

    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === qualityLevel) {
        removed = this.levels_.splice(i, 1)[0];

        if (this.selectedIndex_ === i) {
          this.selectedIndex_ = -1;
        } else if (this.selectedIndex_ > i) {
          this.selectedIndex_--;
        }
        break;
      }
    }

    if (removed) {
      this.trigger({
        qualityLevel: qualityLevel,
        type: 'removequalitylevel'
      });
    }

    return removed;
  };

  /**
   * Searches for a QualityLevel with the given id.
   *
   * @param {string} id The id of the QualityLevel to find.
   * @returns {QualityLevel|null} The QualityLevel with id, or null if not found.
   * @method getQualityLevelById
   */


  QualityLevelList.prototype.getQualityLevelById = function getQualityLevelById(id) {
    for (var i = 0, l = this.length; i < l; i++) {
      var level = this[i];

      if (level.id === id) {
        return level;
      }
    }
    return null;
  };

  /**
   * Resets the list of QualityLevels to empty
   *
   * @method dispose
   */


  QualityLevelList.prototype.dispose = function dispose() {
    this.selectedIndex_ = -1;
    this.levels_.length = 0;
  };

  return QualityLevelList;
}(_video2['default'].EventTarget);

/**
 * change - The selected QualityLevel has changed.
 * addqualitylevel - A QualityLevel has been added to the QualityLevelList.
 * removequalitylevel - A QualityLevel has been removed from the QualityLevelList.
 */


QualityLevelList.prototype.allowedEvents_ = {
  change: 'change',
  addqualitylevel: 'addqualitylevel',
  removequalitylevel: 'removequalitylevel'
};

// emulate attribute EventHandler support to allow for feature detection
for (var event in QualityLevelList.prototype.allowedEvents_) {
  QualityLevelList.prototype['on' + event] = null;
}

exports['default'] = QualityLevelList;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./quality-level.js":2,"global/document":4}],2:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A single QualityLevel.
 *
 * interface QualityLevel {
 *   readonly attribute DOMString id;
 *            attribute DOMString label;
 *   readonly attribute long width;
 *   readonly attribute long height;
 *   readonly attribute long bitrate;
 *            attribute boolean enabled;
 * };
 *
 * @class QualityLevel
 */
var QualityLevel =

/**
 * Creates a QualityLevel
 *
 * @param {Representation|Object} representation The representation of the quality level
 * @param {string}   representation.id        Unique id of the QualityLevel
 * @param {number=}  representation.width     Resolution width of the QualityLevel
 * @param {number=}  representation.height    Resolution height of the QualityLevel
 * @param {number}   representation.bandwidth Bitrate of the QualityLevel
 * @param {Function} representation.enabled   Callback to enable/disable QualityLevel
 */
function QualityLevel(representation) {
  _classCallCheck(this, QualityLevel);

  var level = this; // eslint-disable-line

  if (_video2['default'].browser.IS_IE8) {
    level = _document2['default'].createElement('custom');
    for (var prop in QualityLevel.prototype) {
      if (prop !== 'constructor') {
        level[prop] = QualityLevel.prototype[prop];
      }
    }
  }

  level.id = representation.id;
  level.label = level.id;
  level.width = representation.width;
  level.height = representation.height;
  level.bitrate = representation.bandwidth;
  level.enabled_ = representation.enabled;

  Object.defineProperty(level, 'enabled', {
    /**
     * Get whether the QualityLevel is enabled.
     *
     * @returns {boolean} True if the QualityLevel is enabled.
     */
    get: function get() {
      return level.enabled_();
    },


    /**
     * Enable or disable the QualityLevel.
     *
     * @param {boolean} enable true to enable QualityLevel, false to disable.
     */
    set: function set(enable) {
      level.enabled_(enable);
    }
  });

  return level;
};

exports['default'] = QualityLevel;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"global/document":4}],3:[function(require,module,exports){

},{}],4:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":3}],5:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _qualityLevelList = require('./quality-level-list.js');

var _qualityLevelList2 = _interopRequireDefault(_qualityLevelList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// vjs 5/6 support
var registerPlugin = _video2['default'].registerPlugin || _video2['default'].plugin;

/**
 * Initialization function for the qualityLevels plugin. Sets up the QualityLevelList and
 * event handlers.
 *
 * @param {Player} player Player object.
 * @param {Object} options Plugin options object.
 * @function initPlugin
 */
var initPlugin = function initPlugin(player, options) {
  var originalPluginFn = player.qualityLevels;

  var qualityLevelList = new _qualityLevelList2['default']();

  var disposeHandler = function disposeHandler() {
    qualityLevelList.dispose();
    player.qualityLevels = originalPluginFn;
    player.off('dispose', disposeHandler);
  };

  player.on('dispose', disposeHandler);

  player.qualityLevels = function () {
    return qualityLevelList;
  };
  player.qualityLevels.VERSION = '2.0.4';

  return qualityLevelList;
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @param {Object} options Plugin options object
 * @function qualityLevels
 */
var qualityLevels = function qualityLevels(options) {
  return initPlugin(this, _video2['default'].mergeOptions({}, options));
};

// Register the plugin with video.js.
registerPlugin('qualityLevels', qualityLevels);

// Include the version number.
qualityLevels.VERSION = '2.0.4';

exports['default'] = qualityLevels;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./quality-level-list.js":1}]},{},[5])(5)
});
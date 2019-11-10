/*!
 * videojs-wavesurfer
 * @version 3.0.0
 * @see https://github.com/collab-project/videojs-wavesurfer
 * @copyright 2014-2019 Collab
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("videojs"), require("WaveSurfer"));
	else if(typeof define === 'function' && define.amd)
		define("VideojsWavesurfer", ["videojs", "WaveSurfer"], factory);
	else if(typeof exports === 'object')
		exports["VideojsWavesurfer"] = factory(require("videojs"), require("WaveSurfer"));
	else
		root["VideojsWavesurfer"] = factory(root["videojs"], root["WaveSurfer"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_video_js__, __WEBPACK_EXTERNAL_MODULE_wavesurfer_js__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/global/window.js":
/*!***************************************!*\
  !*** ./node_modules/global/window.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {var win;\n\nif (typeof window !== \"undefined\") {\n    win = window;\n} else if (typeof global !== \"undefined\") {\n    win = global;\n} else if (typeof self !== \"undefined\"){\n    win = self;\n} else {\n    win = {};\n}\n\nmodule.exports = win;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://VideojsWavesurfer/./node_modules/global/window.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack://VideojsWavesurfer/(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/css/videojs.wavesurfer.scss":
/*!*****************************************!*\
  !*** ./src/css/videojs.wavesurfer.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack://VideojsWavesurfer/./src/css/videojs.wavesurfer.scss?");

/***/ }),

/***/ "./src/js/defaults.js":
/*!****************************!*\
  !*** ./src/js/defaults.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar pluginDefaultOptions = {\n  debug: false,\n  msDisplayMax: 3\n};\nvar _default = pluginDefaultOptions;\nexports.default = _default;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack://VideojsWavesurfer/./src/js/defaults.js?");

/***/ }),

/***/ "./src/js/event.js":
/*!*************************!*\
  !*** ./src/js/event.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Event = function Event() {\n  _classCallCheck(this, Event);\n};\n\nEvent.READY = 'ready';\nEvent.ERROR = 'error';\nEvent.VOLUMECHANGE = 'volumechange';\nEvent.FULLSCREENCHANGE = 'fullscreenchange';\nEvent.TIMEUPDATE = 'timeupdate';\nEvent.ENDED = 'ended';\nEvent.PAUSE = 'pause';\nEvent.FINISH = 'finish';\nEvent.SEEK = 'seek';\nEvent.REDRAW = 'redraw';\nEvent.AUDIOPROCESS = 'audioprocess';\nEvent.DEVICE_READY = 'deviceReady';\nEvent.DEVICE_ERROR = 'deviceError';\nEvent.AUDIO_OUTPUT_READY = 'audioOutputReady';\nEvent.WAVE_READY = 'waveReady';\nEvent.PLAYBACK_FINISH = 'playbackFinish';\nEvent.ABORT = 'abort';\nEvent.RESIZE = 'resize';\nObject.freeze(Event);\nvar _default = Event;\nexports.default = _default;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack://VideojsWavesurfer/./src/js/event.js?");

/***/ }),

/***/ "./src/js/middleware.js":
/*!******************************!*\
  !*** ./src/js/middleware.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar myMiddleware = {\n  setSource: function setSource(srcObj, next) {\n    var backend = this.player.wavesurfer().surfer.params.backend;\n    var src = srcObj.src;\n    var peaks = srcObj.peaks;\n\n    switch (backend) {\n      case 'WebAudio':\n        this.player.wavesurfer().load(src);\n        break;\n\n      default:\n        next(null, srcObj);\n        var element = this.player.tech_.el();\n\n        if (peaks === undefined) {\n          this.player.wavesurfer().load(element);\n        } else {\n          this.player.wavesurfer().load(element, peaks);\n        }\n\n        break;\n    }\n  }\n};\nvar _default = myMiddleware;\nexports.default = _default;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack://VideojsWavesurfer/./src/js/middleware.js?");

/***/ }),

/***/ "./src/js/utils/format-time.js":
/*!*************************************!*\
  !*** ./src/js/utils/format-time.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar formatTime = function formatTime(seconds, guide, msDisplayMax) {\n  seconds = seconds < 0 ? 0 : seconds;\n  guide = guide || seconds;\n  var s = Math.floor(seconds % 60),\n      m = Math.floor(seconds / 60 % 60),\n      h = Math.floor(seconds / 3600),\n      gm = Math.floor(guide / 60 % 60),\n      gh = Math.floor(guide / 3600),\n      ms = Math.floor((seconds - s) * 1000);\n\n  if (isNaN(seconds) || seconds === Infinity) {\n    h = m = s = ms = '-';\n  }\n\n  if (guide > 0 && guide < msDisplayMax) {\n    if (ms < 100) {\n      if (ms < 10) {\n        ms = '00' + ms;\n      } else {\n        ms = '0' + ms;\n      }\n    }\n\n    ms = ':' + ms;\n  } else {\n    ms = '';\n  }\n\n  h = h > 0 || gh > 0 ? h + ':' : '';\n  m = ((h || gm >= 10) && m < 10 ? '0' + m : m) + ':';\n  s = s < 10 ? '0' + s : s;\n  return h + m + s + ms;\n};\n\nvar _default = formatTime;\nexports.default = _default;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack://VideojsWavesurfer/./src/js/utils/format-time.js?");

/***/ }),

/***/ "./src/js/utils/log.js":
/*!*****************************!*\
  !*** ./src/js/utils/log.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _video = _interopRequireDefault(__webpack_require__(/*! video.js */ \"video.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar ERROR = 'error';\nvar WARN = 'warn';\n\nvar log = function log(args, logType, debug) {\n  if (debug === true) {\n    if (logType === ERROR) {\n      _video.default.log.error(args);\n    } else if (logType === WARN) {\n      _video.default.log.warn(args);\n    } else {\n      _video.default.log(args);\n    }\n  }\n};\n\nvar _default = log;\nexports.default = _default;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack://VideojsWavesurfer/./src/js/utils/log.js?");

/***/ }),

/***/ "./src/js/videojs.wavesurfer.js":
/*!**************************************!*\
  !*** ./src/js/videojs.wavesurfer.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Wavesurfer = void 0;\n\nvar _event = _interopRequireDefault(__webpack_require__(/*! ./event */ \"./src/js/event.js\"));\n\nvar _log2 = _interopRequireDefault(__webpack_require__(/*! ./utils/log */ \"./src/js/utils/log.js\"));\n\nvar _formatTime = _interopRequireDefault(__webpack_require__(/*! ./utils/format-time */ \"./src/js/utils/format-time.js\"));\n\nvar _defaults = _interopRequireDefault(__webpack_require__(/*! ./defaults */ \"./src/js/defaults.js\"));\n\nvar _middleware = _interopRequireDefault(__webpack_require__(/*! ./middleware */ \"./src/js/middleware.js\"));\n\nvar _window = _interopRequireDefault(__webpack_require__(/*! global/window */ \"./node_modules/global/window.js\"));\n\nvar _video = _interopRequireDefault(__webpack_require__(/*! video.js */ \"video.js\"));\n\nvar _wavesurfer = _interopRequireDefault(__webpack_require__(/*! wavesurfer.js */ \"wavesurfer.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nvar Plugin = _video.default.getPlugin('plugin');\n\nvar wavesurferClassName = 'vjs-wavedisplay';\n\nvar Wavesurfer = function (_Plugin) {\n  _inherits(Wavesurfer, _Plugin);\n\n  function Wavesurfer(player, options) {\n    var _this;\n\n    _classCallCheck(this, Wavesurfer);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Wavesurfer).call(this, player, options));\n    player.addClass('vjs-wavesurfer');\n    options = _video.default.mergeOptions(_defaults.default, options);\n    _this.waveReady = false;\n    _this.waveFinished = false;\n    _this.liveMode = false;\n    _this.backend = null;\n    _this.debug = options.debug.toString() === 'true';\n    _this.textTracksEnabled = _this.player.options_.tracks.length > 0;\n    _this.msDisplayMax = parseFloat(options.msDisplayMax);\n\n    _this.player.one(_event.default.READY, _this.initialize.bind(_assertThisInitialized(_this)));\n\n    return _this;\n  }\n\n  _createClass(Wavesurfer, [{\n    key: \"initialize\",\n    value: function initialize() {\n      var _this2 = this;\n\n      this.player.bigPlayButton.hide();\n      var mergedOptions = this.parseOptions(this.player.options_.plugins.wavesurfer);\n\n      _video.default.setFormatTime(function (seconds, guide) {\n        return (0, _formatTime.default)(seconds, guide, _this2.msDisplayMax);\n      });\n\n      if (this.player.options_.controls === true) {\n        this.player.controlBar.show();\n        this.player.controlBar.el_.style.display = 'flex';\n\n        if (this.backend === 'WebAudio' && this.player.controlBar.progressControl !== undefined) {\n          this.player.controlBar.progressControl.hide();\n        }\n\n        if (this.player.controlBar.pictureInPictureToggle !== undefined) {\n          this.player.controlBar.pictureInPictureToggle.hide();\n        }\n\n        var uiElements = ['currentTimeDisplay', 'timeDivider', 'durationDisplay'];\n        uiElements.forEach(function (element) {\n          element = _this2.player.controlBar[element];\n\n          if (element !== undefined) {\n            element.el_.style.display = 'block';\n            element.show();\n          }\n        });\n\n        if (this.player.controlBar.remainingTimeDisplay !== undefined) {\n          this.player.controlBar.remainingTimeDisplay.hide();\n        }\n\n        if (this.backend === 'WebAudio' && this.player.controlBar.playToggle !== undefined) {\n          this.player.controlBar.playToggle.on(['tap', 'click'], this.onPlayToggle.bind(this));\n\n          if (!this.liveMode) {\n            this.player.controlBar.playToggle.hide();\n          }\n        }\n      }\n\n      this.surfer = _wavesurfer.default.create(mergedOptions);\n      this.surfer.on(_event.default.ERROR, this.onWaveError.bind(this));\n      this.surfer.on(_event.default.FINISH, this.onWaveFinish.bind(this));\n      this.backend = this.surfer.params.backend;\n      this.log('Using wavesurfer.js ' + this.backend + ' backend.');\n\n      if ('microphone' in this.player.wavesurfer().surfer.getActivePlugins()) {\n        this.liveMode = true;\n        this.waveReady = true;\n        this.log('wavesurfer.js microphone plugin enabled.');\n        this.surfer.microphone.on(_event.default.DEVICE_ERROR, this.onWaveError.bind(this));\n      }\n\n      this.surferReady = this.onWaveReady.bind(this);\n\n      if (this.backend === 'WebAudio') {\n        this.surferProgress = this.onWaveProgress.bind(this);\n        this.surferSeek = this.onWaveSeek.bind(this);\n\n        if (this.player.muted()) {\n          this.setVolume(0);\n        }\n      }\n\n      if (!this.liveMode) {\n        this.setupPlaybackEvents(true);\n      }\n\n      this.player.on(_event.default.VOLUMECHANGE, this.onVolumeChange.bind(this));\n      this.player.on(_event.default.FULLSCREENCHANGE, this.onScreenChange.bind(this));\n\n      if (this.player.options_.fluid === true) {\n        this.surfer.drawer.wrapper.className = wavesurferClassName;\n        this.responsiveWave = _wavesurfer.default.util.debounce(this.onResizeChange.bind(this), 150);\n\n        _window.default.addEventListener(_event.default.RESIZE, this.responsiveWave);\n      }\n    }\n  }, {\n    key: \"parseOptions\",\n    value: function parseOptions() {\n      var surferOpts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n      var rect = this.player.el_.getBoundingClientRect();\n      this.originalWidth = this.player.options_.width || rect.width;\n      this.originalHeight = this.player.options_.height || rect.height;\n      var controlBarHeight = this.player.controlBar.height();\n\n      if (this.player.options_.controls === true && controlBarHeight === 0) {\n        controlBarHeight = 30;\n      }\n\n      if (surferOpts.container === undefined) {\n        surferOpts.container = this.player.el_;\n      }\n\n      if (surferOpts.waveformHeight === undefined) {\n        var playerHeight = rect.height;\n        surferOpts.height = playerHeight - controlBarHeight;\n      } else {\n        surferOpts.height = surferOpts.waveformHeight;\n      }\n\n      if (surferOpts.splitChannels && surferOpts.splitChannels === true) {\n        surferOpts.height /= 2;\n      }\n\n      if ('backend' in surferOpts) {\n        this.backend = surferOpts.backend;\n      } else {\n        surferOpts.backend = this.backend = 'MediaElement';\n      }\n\n      return surferOpts;\n    }\n  }, {\n    key: \"setupPlaybackEvents\",\n    value: function setupPlaybackEvents(enable) {\n      if (enable === false) {\n        this.surfer.un(_event.default.READY, this.surferReady);\n\n        if (this.backend === 'WebAudio') {\n          this.surfer.un(_event.default.AUDIOPROCESS, this.surferProgress);\n          this.surfer.un(_event.default.SEEK, this.surferSeek);\n        }\n      } else if (enable === true) {\n        this.surfer.on(_event.default.READY, this.surferReady);\n\n        if (this.backend === 'WebAudio') {\n          this.surfer.on(_event.default.AUDIOPROCESS, this.surferProgress);\n          this.surfer.on(_event.default.SEEK, this.surferSeek);\n        }\n      }\n    }\n  }, {\n    key: \"load\",\n    value: function load(url, peaks) {\n      if (url instanceof Blob || url instanceof File) {\n        this.log('Loading object: ' + JSON.stringify(url));\n        this.surfer.loadBlob(url);\n      } else {\n        if (peaks !== undefined) {\n          this.loadPeaks(url, peaks);\n        } else {\n          if (typeof url === 'string') {\n            this.log('Loading URL: ' + url);\n          } else {\n            this.log('Loading element: ' + url);\n          }\n\n          this.surfer.load(url);\n        }\n      }\n    }\n  }, {\n    key: \"loadPeaks\",\n    value: function loadPeaks(url, peaks) {\n      var _this3 = this;\n\n      if (Array.isArray(peaks)) {\n        this.log('Loading URL with array of peaks: ' + url);\n        this.surfer.load(url, peaks);\n      } else {\n        var requestOptions = {\n          url: peaks,\n          responseType: 'json'\n        };\n\n        if (this.player.options_.plugins.wavesurfer.xhr !== undefined) {\n          requestOptions.xhr = this.player.options_.plugins.wavesurfer.xhr;\n        }\n\n        var request = _wavesurfer.default.util.fetchFile(requestOptions);\n\n        request.once('success', function (data) {\n          _this3.log('Loaded Peak Data URL: ' + peaks);\n\n          if (data && data.data) {\n            _this3.surfer.load(url, data.data);\n          } else {\n            _this3.player.trigger(_event.default.ERROR, 'Could not load peaks data from ' + peaks);\n\n            _this3.log(err, 'error');\n          }\n        });\n        request.on('error', function (e) {\n          _this3.log('Unable to retrieve peak data from ' + peaks + '. Status code: ' + request.response.status, 'warn');\n\n          _this3.log('Loading URL: ' + url);\n\n          _this3.surfer.load(url);\n        });\n      }\n    }\n  }, {\n    key: \"play\",\n    value: function play() {\n      if (this.player.controlBar.playToggle !== undefined && this.player.controlBar.playToggle.contentEl()) {\n        this.player.controlBar.playToggle.handlePlay();\n      }\n\n      if (this.liveMode) {\n        if (!this.surfer.microphone.active) {\n          this.log('Start microphone');\n          this.surfer.microphone.start();\n        } else {\n          var paused = !this.surfer.microphone.paused;\n\n          if (paused) {\n            this.pause();\n          } else {\n            this.log('Resume microphone');\n            this.surfer.microphone.play();\n          }\n        }\n      } else {\n        this.log('Start playback');\n        this.player.play();\n        this.surfer.play();\n      }\n    }\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      if (this.player.controlBar.playToggle !== undefined && this.player.controlBar.playToggle.contentEl()) {\n        this.player.controlBar.playToggle.handlePause();\n      }\n\n      if (this.liveMode) {\n        this.log('Pause microphone');\n        this.surfer.microphone.pause();\n      } else {\n        this.log('Pause playback');\n\n        if (!this.waveFinished) {\n          this.surfer.pause();\n        } else {\n          this.waveFinished = false;\n        }\n\n        this.setCurrentTime();\n      }\n    }\n  }, {\n    key: \"dispose\",\n    value: function dispose() {\n      if (this.surfer) {\n        if (this.liveMode && this.surfer.microphone) {\n          this.surfer.microphone.destroy();\n          this.log('Destroyed microphone plugin');\n        }\n\n        this.surfer.destroy();\n      }\n\n      this.log('Destroyed plugin');\n    }\n  }, {\n    key: \"isDestroyed\",\n    value: function isDestroyed() {\n      return this.player && this.player.children() === null;\n    }\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      this.player.dispose();\n    }\n  }, {\n    key: \"setVolume\",\n    value: function setVolume(volume) {\n      if (volume !== undefined) {\n        this.log('Changing volume to: ' + volume);\n        this.player.volume(volume);\n      }\n    }\n  }, {\n    key: \"exportImage\",\n    value: function exportImage(format, quality) {\n      return this.surfer.exportImage(format, quality);\n    }\n  }, {\n    key: \"setAudioOutput\",\n    value: function setAudioOutput(deviceId) {\n      var _this4 = this;\n\n      if (deviceId) {\n        this.surfer.setSinkId(deviceId).then(function (result) {\n          _this4.player.trigger(_event.default.AUDIO_OUTPUT_READY);\n        }).catch(function (err) {\n          _this4.player.trigger(_event.default.ERROR, err);\n\n          _this4.log(err, 'error');\n        });\n      }\n    }\n  }, {\n    key: \"getCurrentTime\",\n    value: function getCurrentTime() {\n      var currentTime = this.surfer.getCurrentTime();\n      currentTime = isNaN(currentTime) ? 0 : currentTime;\n      return currentTime;\n    }\n  }, {\n    key: \"setCurrentTime\",\n    value: function setCurrentTime(currentTime, duration) {\n      if (currentTime === undefined) {\n        currentTime = this.surfer.getCurrentTime();\n      }\n\n      if (duration === undefined) {\n        duration = this.surfer.getDuration();\n      }\n\n      currentTime = isNaN(currentTime) ? 0 : currentTime;\n      duration = isNaN(duration) ? 0 : duration;\n\n      if (this.player.controlBar.currentTimeDisplay && this.player.controlBar.currentTimeDisplay.contentEl()) {\n        var time = Math.min(currentTime, duration);\n        this.player.controlBar.currentTimeDisplay.formattedTime_ = this.player.controlBar.currentTimeDisplay.contentEl().lastChild.textContent = (0, _formatTime.default)(time, duration, this.msDisplayMax);\n      }\n\n      if (this.textTracksEnabled && this.player.tech_ && this.player.tech_.el_) {\n        this.player.tech_.setCurrentTime(currentTime);\n      }\n    }\n  }, {\n    key: \"getDuration\",\n    value: function getDuration() {\n      var duration = this.surfer.getDuration();\n      duration = isNaN(duration) ? 0 : duration;\n      return duration;\n    }\n  }, {\n    key: \"setDuration\",\n    value: function setDuration(duration) {\n      if (duration === undefined) {\n        duration = this.surfer.getDuration();\n      }\n\n      duration = isNaN(duration) ? 0 : duration;\n\n      if (this.player.controlBar.durationDisplay && this.player.controlBar.durationDisplay.contentEl()) {\n        this.player.controlBar.durationDisplay.formattedTime_ = this.player.controlBar.durationDisplay.contentEl().lastChild.textContent = (0, _formatTime.default)(duration, duration, this.msDisplayMax);\n      }\n    }\n  }, {\n    key: \"onWaveReady\",\n    value: function onWaveReady() {\n      var _this5 = this;\n\n      this.waveReady = true;\n      this.waveFinished = false;\n      this.liveMode = false;\n      this.log('Waveform is ready');\n      this.player.trigger(_event.default.WAVE_READY);\n\n      if (this.backend === 'WebAudio') {\n        this.setCurrentTime();\n        this.setDuration();\n\n        if (this.player.controlBar.playToggle !== undefined && this.player.controlBar.playToggle.contentEl()) {\n          this.player.controlBar.playToggle.show();\n        }\n      }\n\n      if (this.player.loadingSpinner.contentEl()) {\n        this.player.loadingSpinner.hide();\n      }\n\n      if (this.player.options_.autoplay === true) {\n        this.setVolume(0);\n\n        if (this.backend === 'WebAudio') {\n          this.play();\n        } else {\n          this.player.play().catch(function (e) {\n            _this5.onWaveError(e);\n          });\n        }\n      }\n    }\n  }, {\n    key: \"onWaveFinish\",\n    value: function onWaveFinish() {\n      var _this6 = this;\n\n      this.log('Finished playback');\n      this.player.trigger(_event.default.PLAYBACK_FINISH);\n\n      if (this.player.options_.loop === true) {\n        if (this.backend === 'WebAudio') {\n          this.surfer.stop();\n          this.play();\n        }\n      } else {\n        this.waveFinished = true;\n\n        if (this.backend === 'WebAudio') {\n          this.pause();\n          this.player.trigger(_event.default.ENDED);\n          this.surfer.once(_event.default.SEEK, function () {\n            if (_this6.player.controlBar.playToggle !== undefined) {\n              _this6.player.controlBar.playToggle.removeClass('vjs-ended');\n            }\n\n            _this6.player.trigger(_event.default.PAUSE);\n          });\n        }\n      }\n    }\n  }, {\n    key: \"onWaveProgress\",\n    value: function onWaveProgress(time) {\n      this.setCurrentTime();\n    }\n  }, {\n    key: \"onWaveSeek\",\n    value: function onWaveSeek() {\n      this.setCurrentTime();\n    }\n  }, {\n    key: \"onWaveError\",\n    value: function onWaveError(error) {\n      if (error.name && error.name === 'AbortError' || error.name === 'DOMException' && error.message.startsWith('The operation was aborted')) {\n        this.player.trigger(_event.default.ABORT, error);\n      } else {\n        this.player.trigger(_event.default.ERROR, error);\n        this.log(error, 'error');\n      }\n    }\n  }, {\n    key: \"onPlayToggle\",\n    value: function onPlayToggle() {\n      if (this.player.controlBar.playToggle !== undefined && this.player.controlBar.playToggle.hasClass('vjs-ended')) {\n        this.player.controlBar.playToggle.removeClass('vjs-ended');\n      }\n\n      if (this.surfer.isPlaying()) {\n        this.pause();\n      } else {\n        this.play();\n      }\n    }\n  }, {\n    key: \"onVolumeChange\",\n    value: function onVolumeChange() {\n      var volume = this.player.volume();\n\n      if (this.player.muted()) {\n        volume = 0;\n      }\n\n      this.surfer.setVolume(volume);\n    }\n  }, {\n    key: \"onScreenChange\",\n    value: function onScreenChange() {\n      var _this7 = this;\n\n      var fullscreenDelay = this.player.setInterval(function () {\n        var isFullscreen = _this7.player.isFullscreen();\n\n        var newWidth, newHeight;\n\n        if (!isFullscreen) {\n          newWidth = _this7.originalWidth;\n          newHeight = _this7.originalHeight;\n        }\n\n        if (_this7.waveReady) {\n          if (_this7.liveMode && !_this7.surfer.microphone.active) {\n            return;\n          }\n\n          _this7.redrawWaveform(newWidth, newHeight);\n        }\n\n        _this7.player.clearInterval(fullscreenDelay);\n      }, 100);\n    }\n  }, {\n    key: \"onResizeChange\",\n    value: function onResizeChange() {\n      if (this.surfer !== undefined) {\n        this.redrawWaveform();\n      }\n    }\n  }, {\n    key: \"redrawWaveform\",\n    value: function redrawWaveform(newWidth, newHeight) {\n      if (!this.isDestroyed()) {\n        if (this.player.el_) {\n          var rect = this.player.el_.getBoundingClientRect();\n\n          if (newWidth === undefined) {\n            newWidth = rect.width;\n          }\n\n          if (newHeight === undefined) {\n            newHeight = rect.height;\n          }\n        }\n\n        this.surfer.drawer.destroy();\n        this.surfer.params.width = newWidth;\n        this.surfer.params.height = newHeight - this.player.controlBar.height();\n        this.surfer.createDrawer();\n        this.surfer.drawer.wrapper.className = wavesurferClassName;\n        this.surfer.drawBuffer();\n        this.surfer.drawer.progress(this.surfer.backend.getPlayedPercents());\n      }\n    }\n  }, {\n    key: \"log\",\n    value: function log(args, logType) {\n      (0, _log2.default)(args, logType, this.debug);\n    }\n  }]);\n\n  return Wavesurfer;\n}(Plugin);\n\nexports.Wavesurfer = Wavesurfer;\nWavesurfer.VERSION = \"3.0.0\";\n_video.default.Wavesurfer = Wavesurfer;\n\nif (_video.default.getPlugin('wavesurfer') === undefined) {\n  _video.default.registerPlugin('wavesurfer', Wavesurfer);\n}\n\n_video.default.use('*', function (player) {\n  _middleware.default.player = player;\n  return _middleware.default;\n});\n\n//# sourceURL=webpack://VideojsWavesurfer/./src/js/videojs.wavesurfer.js?");

/***/ }),

/***/ 0:
/*!******************************************************************************!*\
  !*** multi ./src/js/videojs.wavesurfer.js ./src/css/videojs.wavesurfer.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! /Users/thijstriemstra/projects/videojs-wavesurfer/src/js/videojs.wavesurfer.js */\"./src/js/videojs.wavesurfer.js\");\nmodule.exports = __webpack_require__(/*! /Users/thijstriemstra/projects/videojs-wavesurfer/src/css/videojs.wavesurfer.scss */\"./src/css/videojs.wavesurfer.scss\");\n\n\n//# sourceURL=webpack://VideojsWavesurfer/multi_./src/js/videojs.wavesurfer.js_./src/css/videojs.wavesurfer.scss?");

/***/ }),

/***/ "video.js":
/*!**************************!*\
  !*** external "videojs" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_video_js__;\n\n//# sourceURL=webpack://VideojsWavesurfer/external_%22videojs%22?");

/***/ }),

/***/ "wavesurfer.js":
/*!*****************************!*\
  !*** external "WaveSurfer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_wavesurfer_js__;\n\n//# sourceURL=webpack://VideojsWavesurfer/external_%22WaveSurfer%22?");

/***/ })

/******/ });
});
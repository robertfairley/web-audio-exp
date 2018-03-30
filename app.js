/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Audio.js":
/*!**********************!*\
  !*** ./src/Audio.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Audio = Audio;\n\nvar _Oscillator = __webpack_require__(/*! ./Oscillator */ \"./src/Oscillator.js\");\n\nvar _Oscillator2 = _interopRequireDefault(_Oscillator);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction Audio() {\n  var audioCtx = new AudioContext();\n  window.audioCtx = audioCtx;\n\n  var oscConfig = {\n    title: 'Oscillator 1',\n    type: 'triangle',\n    initialFrequency: 440\n  };\n\n  var osc = new _Oscillator2.default(audioCtx, oscConfig);\n  var osc2 = new _Oscillator2.default(audioCtx, { type: 'sawtooth' });\n\n  document.querySelector('#root').appendChild(osc.render());\n  document.querySelector('#root').appendChild(osc2.render());\n}\n\n//# sourceURL=webpack:///./src/Audio.js?");

/***/ }),

/***/ "./src/Oscillator.js":
/*!***************************!*\
  !*** ./src/Oscillator.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Oscilloscope = __webpack_require__(/*! ./Oscilloscope */ \"./src/Oscilloscope.js\");\n\nvar _Oscilloscope2 = _interopRequireDefault(_Oscilloscope);\n\nvar _helpers = __webpack_require__(/*! ./helpers */ \"./src/helpers/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * @class Oscillator\n * @classdesc Create an oscillator node and render relevant elements\n */\nvar Oscillator = function () {\n  function Oscillator() {\n    var audioContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new AudioContext();\n    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultProps;\n\n    _classCallCheck(this, Oscillator);\n\n    this.context = audioContext;\n    this.oscNode = audioContext.createOscillator();\n    this.gainNode = audioContext.createGain();\n\n    this.props = props;\n\n    this.title = this.props.title || 'Oscillator';\n    this.initialFrequency = this.props.initialFrequency || 440;\n    this.maxFrequency = this.props.maxFrequency || 1800;\n    this.minFrequency = this.props.minFrequency || 22;\n    this.rangeStep = this.props.rangeStep || 1;\n    this.oscNode.type = this.props.type || 'square';\n\n    this.gainNode.gain.value = 0.5;\n\n    this.gainNode.connect(this.context.destination);\n\n    this.scope = new _Oscilloscope2.default(this.context, { source: this.oscNode });\n\n    this.state = {\n      isOn: 0\n    };\n\n    this.toggle = this.toggle.bind(this);\n    this.changeFrequency = this.changeFrequency.bind(this);\n    this.changeVolume = this.changeVolume.bind(this);\n    this.resetFrequency = this.resetFrequency.bind(this);\n  }\n\n  _createClass(Oscillator, [{\n    key: 'toggle',\n    value: function toggle(event) {\n      if (!event) return;\n\n      if (this.state.isOn) {\n        this.oscNode.disconnect(this.gainNode);\n        this.scope.analyser.disconnect(this.context.destination);\n        cancelAnimationFrame(this.scope.vis);\n        this.state.isOn = 0;\n        this.switch.innerText = 'ON';\n        // this.container.querySelector('.oscilloscope-container').innerHTML = null;\n      } else {\n        this.oscNode.connect(this.gainNode);\n        this.scope.analyser.connect(this.context.destination);\n        this.scope.vis = requestAnimationFrame(this.scope.draw);\n        this.state.isOn = 1;\n        this.switch.innerText = 'OFF';\n        //  this.container.appendChild(this.scope.render());\n      }\n    }\n  }, {\n    key: 'changeFrequency',\n    value: function changeFrequency(event) {\n      var newFrequency = Math.floor(event.target.value);\n      this.oscNode.frequency.setValueAtTime(newFrequency, this.context.currentTime);\n      this.freqValue.innerText = this.oscNode.frequency.value + ' Hz';\n    }\n  }, {\n    key: 'changeVolume',\n    value: function changeVolume(event) {\n      var newVolume = Math.floor(event.target.value);\n      this.gainNode.gain.value = newVolume;\n    }\n  }, {\n    key: 'resetFrequency',\n    value: function resetFrequency(event) {\n      if (!event) return;\n\n      this.oscNode.frequency.setValueAtTime(this.initialFrequency, this.context.currentTime);\n      this.freqValue.innerText = this.initialFrequency + ' Hz';\n      this.freqRange.value = this.initialFrequency;\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      this.heading = document.createElement('div');\n      this.container = document.createElement('div');\n      this.switch = document.createElement('button');\n      this.freqRange = document.createElement('input');\n      this.freqButton = document.createElement('button');\n      this.freqValue = document.createElement('div');\n\n      this.gainRange = document.createElement('input');\n      this.gainValue = document.createElement('div');\n\n      this.container.classList.add('oscillator');\n      this.heading.classList.add('oscillator__heading');\n      this.freqRange.classList.add('oscillator__frequency');\n\n      this.freqRange.type = 'range';\n      this.freqRange.max = this.maxFrequency;\n      this.freqRange.min = this.minFrequency;\n      this.freqRange.step = this.rangeStep;\n      this.freqRange.value = this.initialFrequency;\n\n      this.gainRange.type = 'range';\n      this.gainRange.max = 1;\n      this.gainRange.min = 0;\n      this.gainRange.step = 0.01;\n      this.gainRange.value = this.gainNode.gain.value;\n\n      this.heading.innerText = this.title;\n      this.switch.innerText = 'ON';\n\n      this.freqButton.innerText = (0, _helpers.hz)(this.initialFrequency);\n      this.freqValue.innerText = (0, _helpers.hz)(this.initialFrequency);\n\n      this.oscNode.frequency.setValueAtTime(this.initialFrequency, this.context.currentTime);\n\n      this.switch.addEventListener('click', this.toggle);\n      this.freqRange.addEventListener('input', this.changeFrequency);\n      this.freqButton.addEventListener('click', this.resetFrequency);\n      this.gainRange.addEventListener('input', this.changeVolume);\n\n      this.container.appendChild(this.heading);\n      this.container.appendChild(this.freqValue);\n      this.container.appendChild(this.freqRange);\n      this.container.appendChild(this.gainValue);\n      this.container.appendChild(this.gainRange);\n      this.container.appendChild(this.switch);\n      this.container.appendChild(this.freqButton);\n      this.container.appendChild(this.scope.render());\n\n      this.oscNode.start();\n      cancelAnimationFrame(this.scope.vis);\n      return this.container;\n    }\n  }]);\n\n  return Oscillator;\n}();\n\nvar defaultProps = {\n  title: String(),\n  type: String(),\n  initialFrequency: Number(),\n  minFrequency: Number(),\n  maxFrequency: Number(),\n  rangeStep: Number()\n};\n\nexports.default = Oscillator;\n\n//# sourceURL=webpack:///./src/Oscillator.js?");

/***/ }),

/***/ "./src/Oscilloscope.js":
/*!*****************************!*\
  !*** ./src/Oscilloscope.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _constants = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * @class Oscilloscope\n * @classdesc \n */\nvar Oscilloscope = function () {\n  function Oscilloscope() {\n    var audioContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new AudioContext();\n    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultProps;\n\n    _classCallCheck(this, Oscilloscope);\n\n    if (!props.source) throw new Error('A source is required for the oscilloscope!');\n\n    this.props = props;\n\n    this.context = audioContext;\n    this.source = this.props.source;\n    this.analyser = this.context.createAnalyser();\n\n    this.analyser.fftSize = _constants.FAST_FOURIER_TRANSFORM_SIZE;\n    this.bufferLength = this.analyser.fftSize;\n    this.dataArray = new Uint8Array(this.bufferLength);\n    this.analyser.getByteTimeDomainData(this.dataArray);\n\n    this.source.connect(this.analyser);\n\n    this.title = this.props.title || null;\n    this.screenColor = this.props.screenColor || 'rgb(210, 210, 210)';\n    this.lineColor = this.props.lineColor || 'rgb(60, 60, 60)';\n  }\n\n  _createClass(Oscilloscope, [{\n    key: 'render',\n    value: function render() {\n      var _this = this;\n\n      this.container = document.createElement('div');\n      this.display = document.createElement('canvas');\n\n      this.container.classList.add('.oscilloscope-container');\n\n      this.container.appendChild(this.display);\n      this.analyser.disconnect();\n\n      this.display.width = 400;\n      this.display.height = 300;\n\n      var WIDTH = this.display.width;\n      var HEIGHT = this.display.height;\n      var CTX = this.display.getContext('2d');\n      this.vis = null;\n\n      this.draw = function () {\n        _this.vis = requestAnimationFrame(_this.draw);\n\n        _this.analyser.getByteTimeDomainData(_this.dataArray);\n        CTX.fillStyle = _this.screenColor;\n        CTX.fillRect(0, 0, WIDTH, HEIGHT);\n\n        CTX.lineWidth = 1;\n        CTX.strokeStyle = _this.lineColor;\n\n        CTX.beginPath();\n\n        var sliceWidth = WIDTH * 1.0 / _this.analyser.fftSize;\n        var position = { x: 0, y: 0 };\n\n        for (var i = 0; i < _this.analyser.fftSize; i++) {\n          var delta = _this.dataArray[i] / 128.0;\n          position.y = delta * (HEIGHT / 2);\n\n          if (i === 0) CTX.moveTo(position.x, position.y);else CTX.lineTo(position.x, position.y);\n\n          position.x += sliceWidth;\n        }\n\n        CTX.lineTo(WIDTH, HEIGHT / 2);\n        CTX.stroke();\n      };\n\n      this.draw();\n\n      //;(this.title) ? : null;\n\n      return this.container;\n    }\n  }]);\n\n  return Oscilloscope;\n}();\n\nvar defaultProps = {\n  source: null,\n  title: String(),\n  screenColor: String(),\n  lineColor: String()\n};\n\nexports.default = Oscilloscope;\n\n//# sourceURL=webpack:///./src/Oscilloscope.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar FAST_FOURIER_TRANSFORM_SIZE = exports.FAST_FOURIER_TRANSFORM_SIZE = 2048;\n\n//# sourceURL=webpack:///./src/constants.js?");

/***/ }),

/***/ "./src/helpers/frequency.js":
/*!**********************************!*\
  !*** ./src/helpers/frequency.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.hz = hz;\nfunction hz() {\n  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number();\n\n  if (!value) throw new Error('This function requires 1 argument. Received 0.');\n\n  var newValue = void 0;\n\n  if (typeof value !== 'number') {\n    newValue = parseInt(value);\n\n    if (newValue.isNaN) throw new Error('THis function requires a number or number as string as an argument.');\n  } else {\n    newValue = value;\n  }\n  return newValue + ' Hz';\n}\n\n//# sourceURL=webpack:///./src/helpers/frequency.js?");

/***/ }),

/***/ "./src/helpers/index.js":
/*!******************************!*\
  !*** ./src/helpers/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.hz = undefined;\n\nvar _frequency = __webpack_require__(/*! ./frequency */ \"./src/helpers/frequency.js\");\n\nexports.hz = _frequency.hz;\n\n//# sourceURL=webpack:///./src/helpers/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _Audio = __webpack_require__(/*! ./Audio */ \"./src/Audio.js\");\n\nvar main = document.querySelector('main');\n\nmain.innerHTML = '<h1>Web Audio API Test</h1>';\n\nwindow.app = _Audio.Audio;\n(0, _Audio.Audio)();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
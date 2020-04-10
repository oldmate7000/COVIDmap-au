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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ../node_modules/babel-loader/lib/index.js):\nSyntaxError: C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\app\\src\\index.js: Unexpected token (19:16)\n\n\u001b[0m \u001b[90m 17 | \u001b[39m        \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mstate \u001b[33m=\u001b[39m {\u001b[0m\n\u001b[0m \u001b[90m 18 | \u001b[39m            updated\u001b[33m:\u001b[39m \u001b[36mfalse\u001b[39m\u001b[33m,\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 19 | \u001b[39m            map \u001b[33m=\u001b[39m {}\u001b[0m\n\u001b[0m \u001b[90m    | \u001b[39m                \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 20 | \u001b[39m        }\u001b[0m\n\u001b[0m \u001b[90m 21 | \u001b[39m    }\u001b[0m\n\u001b[0m \u001b[90m 22 | \u001b[39m\u001b[0m\n    at Object._raise (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:742:17)\n    at Object.raiseWithData (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:735:17)\n    at Object.raise (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:729:17)\n    at Object.unexpected (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:8757:16)\n    at Object.checkExpressionErrors (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:8855:12)\n    at Object.parseMaybeAssign (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:9415:12)\n    at Object.parseMaybeAssign (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:9412:25)\n    at Object.parseExpression (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:9332:23)\n    at Object.parseStatementContent (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:11210:23)\n    at Object.parseStatement (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:11081:17)\n    at Object.parseBlockOrModuleBlockBody (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:11656:25)\n    at Object.parseBlockBody (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:11642:10)\n    at Object.parseBlock (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:11626:10)\n    at Object.parseFunctionBody (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:10634:24)\n    at Object.parseFunctionBodyAndFinish (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:10617:10)\n    at Object.parseMethod (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:10579:10)\n    at Object.pushClassMethod (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:12081:30)\n    at Object.parseClassMemberWithIsStatic (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:11998:12)\n    at Object.parseClassMember (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:11940:10)\n    at C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:11885:14\n    at Object.withTopicForbiddingContext (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:10956:14)\n    at Object.parseClassBody (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:11862:10)\n    at Object.parseClass (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:11836:22)\n    at Object.parseStatementContent (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:11123:21)\n    at Object.parseStatement (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:11081:17)\n    at Object.parseBlockOrModuleBlockBody (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:11656:25)\n    at Object.parseBlockBody (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:11642:10)\n    at Object.parseTopLevel (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:11012:10)\n    at Object.parse (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:12637:10)\n    at parse (C:\\Users\\bryce\\Documents\\MEGAsync\\Projects\\COVIDmap-au\\node_modules\\@babel\\parser\\lib\\index.js:12688:38)");

/***/ })

/******/ });
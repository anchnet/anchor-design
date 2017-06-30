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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(4)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(5)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(9),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/liuzhimeng/projects/anchor/packages/icons/src/anchor-icon.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] anchor-icon.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2b405dcb", Component.options)
  } else {
    hotAPI.reload("data-v-2b405dcb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] });
    } else {
      newStyles[id].parts.push(part);
    }
  }
  return styles;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("05c89027", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/.0.28.4@css-loader/index.js!../../../node_modules/.12.2.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2b405dcb\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/.6.0.6@sass-loader/lib/loader.js!./icons.scss", function() {
     var newContent = require("!!../../../node_modules/.0.28.4@css-loader/index.js!../../../node_modules/.12.2.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2b405dcb\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/.6.0.6@sass-loader/lib/loader.js!./icons.scss");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/* BEM in SASS --start\n * https://medium.com/@marcmintel/pushing-bem-to-the-next-level-with-sass-3-4-5239d2371321\n **/\n/* BEM in SASS --end */\n/* triangle icon */\n/* clear float */\n/* single line text */\n/* primary word */\n/* primary color */\n/* menu */\n/* BEM in SASS --start\n * https://medium.com/@marcmintel/pushing-bem-to-the-next-level-with-sass-3-4-5239d2371321\n **/\n/* BEM in SASS --end */\n/* triangle icon */\n/* clear float */\n/* single line text */\n.anchor-animation__rotate3d {\n  transition: transform 280ms;\n}\n.anchor-animation__rotate3d--top-down {\n    transform: rotate3d(0, 0, 1, 180deg);\n}\n.anchor-animation__rotate3d--left-right {\n    transform: rotate3d(0, 0, 1, 180deg);\n}\n.anchor-animation__slide-vertical-enter-active {\n  opacity: 1;\n  transition: height .3s ease-in-out, opacity .3s ease-in-out;\n}\n.anchor-animation__slide-vertical-leave-active {\n  opacity: 0;\n  transition: height .3s ease-in-out, opacity .3s ease-in-out;\n}\n.anchor-animation__slide-vertical-enter {\n  height: 0;\n  opacity: 0;\n}\n\n/* device */\n.anchor-icon-device {\n  display: inline-block;\n  vertical-align: middle;\n  background-image: url(" + __webpack_require__(7) + ");\n}\n.anchor-icon-device__instance {\n    width: 14px;\n    height: 16px;\n    background-position: 0 0;\n}\n.anchor-icon-device__volume {\n    width: 14px;\n    height: 16px;\n    background-position: -22px 0px;\n}\n.anchor-icon-device__rdbs {\n    width: 14px;\n    height: 16px;\n    background-position: -88px 0px;\n}\n.anchor-icon-device__snapshot {\n    width: 14px;\n    height: 16px;\n    background-position: -111px 0px;\n}\n.anchor-icon-device__ip {\n    width: 15px;\n    height: 15px;\n    background-position: -96px -98px;\n}\n.anchor-icon-device__vps {\n    width: 15px;\n    height: 15px;\n    background-position: -46px -192px;\n}\n.anchor-icon-device__network {\n    width: 16px;\n    height: 16px;\n    background-position: 0 -47px;\n}\n.anchor-icon-device__router {\n    width: 15px;\n    height: 15px;\n    background-position: -25px -48px;\n}\n.anchor-icon-device__loadBalancer {\n    width: 15px;\n    height: 16px;\n    background-position: -48px -48px;\n}\n.anchor-icon-device__group {\n    width: 16px;\n    height: 16px;\n    background-position: -70px -48px;\n}\n.anchor-icon-device__keyPair {\n    width: 16px;\n    height: 16px;\n    background-position: -94px -48px;\n}\n.anchor-icon-device__image {\n    width: 17px;\n    height: 16px;\n    background-position: -118px -48px;\n}\n.anchor-icon-device__recyclebin {\n    width: 14px;\n    height: 14px;\n    background-position: -144px -48px;\n}\n.anchor-icon-device__information {\n    width: 17px;\n    height: 17px;\n    background-position: -120px -94px;\n}\n.anchor-icon-device__account {\n    width: 18px;\n    height: 17px;\n    background-position: -144px -94px;\n}\n.anchor-icon-device__set {\n    width: 18px;\n    height: 17px;\n    background-position: -144px -94px;\n}\n.anchor-icon-device__consumption {\n    width: 18px;\n    height: 17px;\n    background-position: 0 -142px;\n}\n.anchor-icon-device__resource {\n    width: 18px;\n    height: 17px;\n    background-position: -26px -142px;\n}\n.anchor-icon-device__quota {\n    width: 18px;\n    height: 17px;\n    background-position: -52px -142px;\n}\n.anchor-icon-device__label {\n    width: 18px;\n    height: 17px;\n    background-position: -150px -142px;\n}\n.anchor-icon-device__news {\n    width: 18px;\n    height: 18px;\n    background-position: -78px -142px;\n}\n.anchor-icon-device__support {\n    width: 18px;\n    height: 17px;\n    background-position: -102px -142px;\n}\n.anchor-icon-device__beian {\n    width: 18px;\n    height: 17px;\n    background-position: -126px -142px;\n}\n.anchor-icon-device__apikeypair {\n    width: 18px;\n    height: 16px;\n    background-position: 0 -192px;\n}\n.anchor-icon-device__logs {\n    width: 18px;\n    height: 17px;\n    background-position: -24px -192px;\n}\n.anchor-icon-device__baremetal {\n    width: 15px;\n    height: 16px;\n    background-position: 0 -97px;\n}\n.anchor-icon-device__hosting {\n    width: 15px;\n    height: 16px;\n    background-position: -24px -96px;\n}\n.anchor-icon-device__rack {\n    width: 15px;\n    height: 16px;\n    background-position: -48px -96px;\n}\n.anchor-icon-device__fastFiber {\n    width: 15px;\n    height: 16px;\n    background-position: -72px -96px;\n}\n.anchor-icon-device__cos {\n    width: 12px;\n    height: 10px;\n    background-position: -37px -2px;\n}\n.anchor-icon-device__nas {\n    width: 12px;\n    height: 14px;\n    background-position: -56px 0px;\n}\n.anchor-icon-device__instance--active, .anchor-icon-device__instance:hover {\n    background-position: 0px -24px;\n}\n.anchor-icon-device__volume--active, .anchor-icon-device__volume:hover {\n    background-position: -22px -24px;\n}\n.anchor-icon-device__rdbs--active, .anchor-icon-device__rdbs:hover {\n    background-position: -88px -24px;\n}\n.anchor-icon-device__snapshot--active, .anchor-icon-device__snapshot:hover {\n    background-position: -111px -24px;\n}\n.anchor-icon-device__ip--active, .anchor-icon-device__ip:hover {\n    background-position: -96px -122px;\n}\n.anchor-icon-device__vps--active, .anchor-icon-device__vps:hover {\n    background-position: -70px -192px;\n}\n.anchor-icon-device__network--active, .anchor-icon-device__network:hover {\n    background-position: 0 -71px;\n}\n.anchor-icon-device__router--active, .anchor-icon-device__router:hover {\n    background-position: -25px -72px;\n}\n.anchor-icon-device__loadBalancer--active, .anchor-icon-device__loadBalancer:hover {\n    background-position: -48px -72px;\n}\n.anchor-icon-device__group--active, .anchor-icon-device__group:hover {\n    background-position: -70px -72px;\n}\n.anchor-icon-device__keyPair--active, .anchor-icon-device__keyPair:hover {\n    background-position: -94px -72px;\n}\n.anchor-icon-device__image--active, .anchor-icon-device__image:hover {\n    background-position: -118px -72px;\n}\n.anchor-icon-device__recyclebin--active, .anchor-icon-device__recyclebin:hover {\n    background-position: -144px -71px;\n}\n.anchor-icon-device__information--active, .anchor-icon-device__information:hover {\n    background-position: -120px -118px;\n}\n.anchor-icon-device__account--active, .anchor-icon-device__account:hover {\n    background-position: -144px -118px;\n}\n.anchor-icon-device__set--active, .anchor-icon-device__set:hover {\n    background-position: -144px -118px;\n}\n.anchor-icon-device__consumption--active, .anchor-icon-device__consumption:hover {\n    background-position: 0 -166px;\n}\n.anchor-icon-device__resource--active, .anchor-icon-device__resource:hover {\n    background-position: -26px -166px;\n}\n.anchor-icon-device__quota--active, .anchor-icon-device__quota:hover {\n    background-position: -52px -166px;\n}\n.anchor-icon-device__label--active, .anchor-icon-device__label:hover {\n    background-position: -150px -166px;\n}\n.anchor-icon-device__news--active, .anchor-icon-device__news:hover {\n    background-position: -78px -166px;\n}\n.anchor-icon-device__support--active, .anchor-icon-device__support:hover {\n    background-position: -102px -166px;\n}\n.anchor-icon-device__beian--active, .anchor-icon-device__beian:hover {\n    background-position: -126px -166px;\n}\n.anchor-icon-device__apikeypair--active, .anchor-icon-device__apikeypair:hover {\n    background-position: 0px -217px;\n}\n.anchor-icon-device__logs--active, .anchor-icon-device__logs:hover {\n    background-position: -24px -217px;\n}\n.anchor-icon-device__operation--active, .anchor-icon-device__operation:hover {\n    background-position: 0 -218px;\n}\n.anchor-icon-device__baremetal--active, .anchor-icon-device__baremetal:hover {\n    background-position: 0 -121px;\n}\n.anchor-icon-device__hosting--active, .anchor-icon-device__hosting:hover {\n    background-position: -24px -120px;\n}\n.anchor-icon-device__rack--active, .anchor-icon-device__rack:hover {\n    background-position: -48px -120px;\n}\n.anchor-icon-device__fastFiber--active, .anchor-icon-device__fastFiber:hover {\n    background-position: -72px -120px;\n}\n\n/* triangle */\n.anchor-icon-triangle__left {\n  display: inline-block;\n  overflow: hidden;\n  width: 0;\n  height: 0;\n  line-height: 0;\n  vertical-align: middle;\n  cursor: pointer;\n  border-top: 5px solid transparent;\n  border-bottom: 5px solid transparent;\n  border-right: 5px solid #d4d4d4;\n}\n.anchor-icon-triangle__left--active {\n    border-right-color: #E2003B;\n}\n.anchor-icon-triangle__right {\n  display: inline-block;\n  overflow: hidden;\n  width: 0;\n  height: 0;\n  line-height: 0;\n  vertical-align: middle;\n  cursor: pointer;\n  border-top: 5px solid transparent;\n  border-bottom: 5px solid transparent;\n  border-left: 5px solid #d4d4d4;\n}\n.anchor-icon-triangle__right--active {\n    border-left-color: #E2003B;\n}\n.anchor-icon-triangle__top {\n  display: inline-block;\n  overflow: hidden;\n  width: 0;\n  height: 0;\n  line-height: 0;\n  vertical-align: middle;\n  cursor: pointer;\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n  border-bottom: 5px solid #d4d4d4;\n}\n.anchor-icon-triangle__top--active {\n    border-bottom-color: #E2003B;\n}\n.anchor-icon-triangle__down {\n  display: inline-block;\n  overflow: hidden;\n  width: 0;\n  height: 0;\n  line-height: 0;\n  vertical-align: middle;\n  cursor: pointer;\n  border-top: 5px solid #d4d4d4;\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n}\n.anchor-icon-triangle__down--active {\n    border-top-color: #E2003B;\n}\n.anchor-icon-dot {\n  display: inline-block;\n  width: 6px;\n  height: 6px;\n  border-radius: 50% 50%;\n  background-color: #d4d4d4;\n  vertical-align: middle;\n}\n.anchor-icon-dot--active {\n    background-color: #E2003B;\n}\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/icons.17ba9ff.svg";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'anchor-icon',

  props: {
    type: String,
    name: String,
    active: {
      type: Boolean,
      default: false
    },
    rotating: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isRotate: function isRotate() {
      return this.type === 'triangle';
    },
    direction: function direction() {
      if (['top', 'down'].includes(name)) {
        return 'top-down';
      } else if (['left', 'right'].includes(name)) {
        return 'left-right';
      }
    }
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "anchor-animation__rotate3d--top-down"
    }
  }, [_c('i', {
    class: [
      ("anchor-icon-" + _vm.type),
      ("anchor-icon-" + _vm.type + (_vm.name ? '__' + _vm.name : '')),
      ( _obj = {
        'anchor-animation__rotate3d': _vm.isRotate,
      }, _obj[("anchor-icon-" + _vm.type + (_vm.name ? '__' + _vm.name : '') + "--active")] = _vm.active, _obj[("anchor-animation__rotate3d--" + _vm.direction)] = _vm.isRotate && _vm.rotating, _obj )
    ]
  })])
  var _obj;
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2b405dcb", module.exports)
  }
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(21),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/liuzhimeng/projects/anchor/packages/menu-parts/src/anchor-menu-group.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] anchor-menu-group.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-23f72af7", Component.options)
  } else {
    hotAPI.reload("data-v-23f72af7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(22)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(24),
  /* template */
  __webpack_require__(25),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/liuzhimeng/projects/anchor/packages/menu-parts/src/anchor-menu-title.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] anchor-menu-title.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-05e27b60", Component.options)
  } else {
    hotAPI.reload("data-v-05e27b60", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _anchorMenuVertical = __webpack_require__(13);

var _anchorMenuVertical2 = _interopRequireDefault(_anchorMenuVertical);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_anchorMenuVertical2.default.install = function (Vue, options) {};

exports.default = _anchorMenuVertical2.default;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(14)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(32),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/liuzhimeng/projects/anchor/packages/menu-vertical/src/anchor-menu-vertical.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] anchor-menu-vertical.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3a8077f8", Component.options)
  } else {
    hotAPI.reload("data-v-3a8077f8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("2b9e55d3", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/.0.28.4@css-loader/index.js!../../../node_modules/.12.2.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3a8077f8\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/.6.0.6@sass-loader/lib/loader.js!./menu-vertical.scss", function() {
     var newContent = require("!!../../../node_modules/.0.28.4@css-loader/index.js!../../../node_modules/.12.2.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3a8077f8\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/.6.0.6@sass-loader/lib/loader.js!./menu-vertical.scss");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/* BEM in SASS --start\n * https://medium.com/@marcmintel/pushing-bem-to-the-next-level-with-sass-3-4-5239d2371321\n **/\n/* BEM in SASS --end */\n/* triangle icon */\n/* clear float */\n/* single line text */\n/* primary word */\n/* primary color */\n/* menu */\n.menu-vertical {\n  height: 100%;\n  background-color: #1b1d23;\n}\n.menu-vertical__title {\n    display: block !important;\n}\n.menu-vertical__content {\n    display: block !important;\n}\n.menu-vertical__list {\n    padding-bottom: 10px;\n    background-color: #1b1d23;\n}\n", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _anchorMenuVerticalItem = __webpack_require__(17);

var _anchorMenuVerticalItem2 = _interopRequireDefault(_anchorMenuVerticalItem);

var _anchorMenuGroup = __webpack_require__(10);

var _anchorMenuGroup2 = _interopRequireDefault(_anchorMenuGroup);

var _anchorMenuTitle = __webpack_require__(11);

var _anchorMenuTitle2 = _interopRequireDefault(_anchorMenuTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'menu-vertical',

  components: {
    AnchorMenuVerticalItem: _anchorMenuVerticalItem2.default, AnchorMenuGroup: _anchorMenuGroup2.default, AnchorMenuTitle: _anchorMenuTitle2.default
  },

  props: {
    data: {
      type: Object,
      default: function _default() {
        return {
          'mainTitle1': { id: 'mainTitle1', index: '1', type: 'title', children: ['subTitle1-1', 'subTitle1-2'], text: '主标题名称1', isRoot: true },
          'subTitle1-1': { id: 'subTitle1-1', index: '1-1', type: 'title', children: ['content1-1-1', 'content1-1-2'], text: '副标题名称1-1' },
          'content1-1-1': { id: 'content1-1-1', index: '1-1-1', type: 'content', text: '菜单内容1-1-1', clickable: true },
          'content1-1-2': { id: 'content1-1-2', index: '1-1-2', type: 'content', text: '菜单内容1-1-2', clickable: true },
          'subTitle1-2': { id: 'subTitle1-2', index: '1-2', type: 'title', children: ['content1-2-1'], text: '副标题名称1-2' },
          'content1-2-1': { id: 'content1-2-1', index: '1-2-1', type: 'content', text: '菜单内容1-2-1', clickable: false },
          'mainTitle2': { id: 'mainTitle2', index: '2', type: 'title', children: ['subTitle2-1', 'subTitle2-2'], text: '主标题名称2', isRoot: true },
          'subTitle2-1': { id: 'subTitle2-1', index: '2-1', type: 'title', text: '副标题名称2-1' },
          'subTitle2-2': { id: 'subTitle2-2', index: '2-2', type: 'title', children: ['content2-2-1'], text: '副标题名称2-2' },
          'content2-2-1': { id: 'content2-2-1', index: '2-2-1', type: 'content', text: '菜单内容2-2-1', clickable: true },
          'mainTitle3': { id: 'mainTitle3', index: '3', type: 'title', children: ['content3-0-1'], text: '主标题名称3', isRoot: true },
          'content3-0-1': { id: 'content3-0-1', index: '3-0-1', type: 'content', text: '菜单内容3-0-1', clickable: false }
        };
      }
    },

    width: {
      type: Number,
      default: 240
    },

    minHeight: {
      type: Number,
      default: 300
    }
  },

  computed: {
    rootData: function rootData() {
      var _this = this;

      var newData = [];
      Object.keys(this.data).forEach(function (k) {
        var item = _this.data[k];
        if (item.isRoot) newData.push(item);
      });
      return newData;
    }
  },

  methods: {
    handleClick: function handleClick(item) {
      this.$emit('handleClick', item);
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(31),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/liuzhimeng/projects/anchor/packages/menu-vertical/src/anchor-menu-vertical-item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] anchor-menu-vertical-item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-03e085f8", Component.options)
  } else {
    hotAPI.reload("data-v-03e085f8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _anchorMenuGroup = __webpack_require__(10);

var _anchorMenuGroup2 = _interopRequireDefault(_anchorMenuGroup);

var _anchorMenuTitle = __webpack_require__(11);

var _anchorMenuTitle2 = _interopRequireDefault(_anchorMenuTitle);

var _anchorMenuContent = __webpack_require__(26);

var _anchorMenuContent2 = _interopRequireDefault(_anchorMenuContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'anchor-menu-vertical-item',

  components: {
    AnchorMenuGroup: _anchorMenuGroup2.default, AnchorMenuTitle: _anchorMenuTitle2.default, AnchorMenuContent: _anchorMenuContent2.default
  },

  props: {
    children: Array,
    data: Object
  },

  computed: {
    childrenData: function childrenData() {
      var _this = this;

      var newData = [];
      if (this.children && this.children.length) {
        this.children.forEach(function (k) {
          newData.push(_this.data[k]);
        });
      }
      return newData;
    }
  },

  methods: {
    handleClick: function handleClick(item) {
      this.$emit('handleClick', item);
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vQuery = __webpack_require__(20);

var _vQuery2 = _interopRequireDefault(_vQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'anchor-menu-group',

  props: {
    oneItem: {
      type: Boolean,
      default: false
    },

    showGroup: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      isShow: this.showGroup
    };
  },


  methods: {
    handler: function handler() {
      var _this = this;

      if (this.isShow) {
        this.fixHeight();
      }

      this.isShow = !this.isShow;

      this.$nextTick(function () {
        if (_this.isShow) {
          _this.fixHeight();
          setTimeout(function () {
            (0, _vQuery2.default)(_this.$refs.content).css({ 'height': '', 'overflow': '' });
          }, 300);
        } else {
          _this.fixHeight().css({ 'height': 0 });
          setTimeout(function () {
            (0, _vQuery2.default)(_this.$refs.content).css({ 'height': '', 'overflow': '' });
          }, 350);
        }
      });
    },
    fixHeight: function fixHeight() {
      var content = this.getContentDOM();
      content.$element.css({ 'height': content.height + 'px', 'overflow': 'hidden' });
      return content.$element;
    },
    getContentDOM: function getContentDOM() {
      var $element = (0, _vQuery2.default)(this.$refs.content);
      var $contentWrapper = (0, _vQuery2.default)(this.$refs.contentWrapper);
      var height = $contentWrapper.height();
      return { $element: $element, height: height };
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VQuery = function () {
  function VQuery() {
    _classCallCheck(this, VQuery);

    this.selector = null;
    this.init = this.init.bind(this);
  }

  _createClass(VQuery, [{
    key: 'init',
    value: function init(element) {
      if (!element) return this;
      var $selector = this.selector;

      if (typeof element === 'string') {
        if (element.includes(' ')) {
          var selectorArray = element.toString().split(' ');
          $selector = document;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = selectorArray.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var selector = _step.value;

              $selector = $selector.querySelectorAll(selector);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        } else {
          if (element.startsWith('#')) {
            $selector = document.querySelector(element);
          } else {
            $selector = document.querySelectorAll(element);
          }
        }
      } else if (element.nodeType && element.nodeType === 1) {
        $selector = element;
      } else {
        $selector = this;
      }

      this.selector = $selector;
      return this;
    }
  }, {
    key: 'clone',
    value: function clone(obj) {
      if (obj) return JSON.parse(JSON.stringify(obj));
      return null;
    }
  }, {
    key: 'on',
    value: function on(type, handler, params) {
      var _this = this;

      if (this.selector.addEventListener) {
        this.on = function () {
          _this.selector.addEventListener(type, handler.bind(_this), params);
          return _this;
        };
      } else if (this.selector.attachEvent) {
        this.on = function () {
          _this.selector.attachEvent('on' + type, handler.bind(_this));
          return _this;
        };
      } else {
        this.on = function () {
          _this.selector['on' + type] = handler.bind(_this);
          return _this;
        };
      }

      this.on(type, handler, params);
    }
  }, {
    key: 'off',
    value: function off(type, handler, useCapture) {
      var _this2 = this;

      if (this.selector.removeEventListener) {
        this.on = function () {
          _this2.selector.removeEventListener(type, handler.bind(_this2), useCapture);
          return _this2;
        };
      } else if (this.selector.detachEvent) {
        this.on = function () {
          _this2.selector.detachEvent('on' + type, handler.bind(_this2));
          return _this2;
        };
      } else {
        this.on = function () {
          _this2.selector['on' + type] = null;
          return _this2;
        };
      }

      this.off(type, handler, useCapture);
    }
  }, {
    key: '_getElementSize',
    value: function _getElementSize(el, name) {
      function getStyle(el) {
        if (window.getComputedStyle) {
          return window.getComputedStyle(el, null);
        } else {
          return el.currentStyle;
        }
      }

      var val = name === "width" ? el.offsetWidth : el.offsetHeight;
      var which = name === "width" ? ['Left', 'Right'] : ['Top', 'Bottom'];
      if (val === 0) return 0;
      var style = getStyle(el);
      for (var i = 0, a; a = which[i++];) {
        val -= parseFloat(style["border" + a + "Width"]) || 0;
        val -= parseFloat(style["padding" + a]) || 0;
      }
      return val;
    }
  }, {
    key: 'width',
    value: function width(number) {
      if (number !== undefined) {
        return this._getElementSize(this.selector, 'width');
      } else {
        this.selector.style.width = number + 'px';
      }
    }
  }, {
    key: 'height',
    value: function height(value) {
      if (value === undefined) {
        return this._getElementSize(this.selector, 'height');
      } else {
        if (typeof value === 'number') {
          this.selector.style.height = value + 'px';
        } else if (typeof value === 'string') {
          this.selector.style.height = value;
        }
      }
    }
  }, {
    key: 'css',
    value: function css(obj) {
      var _this3 = this;

      if (obj === undefined) return this;else {
        Object.keys(obj).forEach(function (k) {
          _this3.selector.style[k] = obj[k];
        });
        return this;
      }
    }
  }, {
    key: 'mouseenter',
    value: function mouseenter(handler, params) {
      this.on('mouseenter', handler, params);
      return this;
    }
  }, {
    key: 'mouseout',
    value: function mouseout(handler, params) {
      this.on('mouseout', handler, params);
      return this;
    }
  }, {
    key: 'mouseleave',
    value: function mouseleave(handler, params) {
      this.on('mouseleave', handler, params);
      return this;
    }
  }, {
    key: 'hover',
    value: function hover(handlerIn, handlerOut) {
      this.mouseenter(handlerIn).mouseleave(handlerOut);
      return this;
    }
  }]);

  return VQuery;
}();

function vQuery(selector) {
  return new VQuery().init(selector);
}

module.exports = vQuery;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['anchor-menu-group']
  }, [_c('div', {
    on: {
      "click": function($event) {
        _vm.oneItem ? '' : _vm.handler()
      }
    }
  }, [_vm._t("group-title")], 2), _vm._v(" "), (!_vm.oneItem) ? _c('transition', {
    attrs: {
      "name": "anchor-animation__slide-vertical"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isShow),
      expression: "isShow"
    }],
    ref: "content"
  }, [_c('div', {
    ref: "contentWrapper"
  }, [_vm._t("group-item")], 2)])]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-23f72af7", module.exports)
  }
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("31ded3e2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/.0.28.4@css-loader/index.js!../../../node_modules/.12.2.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-05e27b60\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/.6.0.6@sass-loader/lib/loader.js!./menu-title.scss", function() {
     var newContent = require("!!../../../node_modules/.0.28.4@css-loader/index.js!../../../node_modules/.12.2.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-05e27b60\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/.6.0.6@sass-loader/lib/loader.js!./menu-title.scss");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/* BEM in SASS --start\n * https://medium.com/@marcmintel/pushing-bem-to-the-next-level-with-sass-3-4-5239d2371321\n **/\n/* BEM in SASS --end */\n/* triangle icon */\n/* clear float */\n/* single line text */\n/* primary word */\n/* primary color */\n/* menu */\n.menu-title {\n  position: relative;\n  display: inline-block;\n  padding: 0 32px 0 50px;\n  box-sizing: border-box;\n  background-color: #2f323a;\n  user-select: none;\n  color: #fff;\n  font-size: 14px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.menu-title:hover {\n    cursor: pointer;\n}\n.menu-title__sub {\n    background-color: #2c2e34;\n    color: #cecece;\n}\n", ""]);

// exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _anchorIcon = __webpack_require__(3);

var _anchorIcon2 = _interopRequireDefault(_anchorIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * mode {string} the type of title, includes the title of main and the title of sub
 * title {string} the text of title
 * hasIcon {boolean} weather showing the icon or not
 * hasDot {boolean} weather showing the dot or not
 * hasChildren {boolean} if the component hasn't child content, hide the icon of traingle
 * alwaysActive {boolean} weather make the icon under lighting or not
 * icon {object} choose the icon, includes sets of type and name
 * triangleName {string} choose the icon of triangle
 * width {number}
 * height {number}
 * paddingLeft {number}
 */
exports.default = {
  name: 'menu-title',

  components: {
    AnchorIcon: _anchorIcon2.default
  },

  props: {
    onChangeBack: Function,

    mode: {
      type: String,
      default: 'main'
    },

    title: {
      type: String,
      default: '标题名称'
    },

    hasIcon: {
      type: Boolean,
      default: true
    },

    hasDot: {
      type: Boolean,
      default: false
    },

    hasChildren: {
      type: Boolean,
      default: true
    },

    alwaysActive: {
      type: Boolean,
      default: false
    },

    icon: {
      type: Object,
      default: function _default() {
        return {
          type: 'device',
          name: 'instance'
        };
      }
    },

    triangleName: {
      type: String,
      default: 'down'
    },

    width: {
      type: Number,
      default: 240
    },

    height: {
      type: Number,
      default: 40
    },

    paddingLeft: {
      type: Number,
      default: 50
    }
  },

  data: function data() {
    return {
      active: false,
      isShow: false
    };
  },


  computed: {
    isSub: function isSub() {
      return this.mode === 'sub';
    },
    elementStatus: function elementStatus() {
      return this.alwaysActive || this.isShow ? true : this.active;
    },
    titleStyle: function titleStyle() {
      return {
        'width': this.width + 'px',
        'height': this.height + 'px',
        'line-height': this.height + 'px',
        'padding-left': this.paddingLeft + 'px'
      };
    },
    leftIconStyle: function leftIconStyle() {
      return {
        'margin-top': this.hasDot ? '-3px' : '-7px',
        'left': this.hasDot ? this.paddingLeft - 20 + 'px' : this.paddingLeft - 30 + 'px'
      };
    },
    iconStyle: function iconStyle() {
      return {
        'position': 'absolute',
        'top': '50%'
      };
    }
  },

  methods: {
    mouseHover: function mouseHover(status) {
      this.active = status;
    },
    onClick: function onClick() {
      var isShow = !this.isShow;
      if (this.$emit.bind(null, 'handleClick')) {
        this.$emit('handleClick');
      } else {
        isShow ? this.$emit('open') : this.$emit('close');
      }
      this.isShow = isShow;
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    class: ['menu-title', {
      'menu-title__sub': _vm.isSub
    }],
    style: (_vm.titleStyle),
    attrs: {
      "title": _vm.title
    },
    on: {
      "mouseenter": function($event) {
        _vm.alwaysActive ? '' : _vm.mouseHover(true)
      },
      "mouseleave": function($event) {
        _vm.alwaysActive ? '' : _vm.mouseHover(false)
      },
      "click": function($event) {
        _vm.onClick()
      }
    }
  }, [(_vm.hasIcon || _vm.hasDot) ? _c('anchor-icon', {
    style: ([_vm.iconStyle, _vm.leftIconStyle]),
    attrs: {
      "type": _vm.hasDot ? 'dot' : _vm.icon.type,
      "name": _vm.hasDot ? '' : _vm.icon.name,
      "active": _vm.elementStatus
    }
  }) : _vm._e(), _vm._t("title", [_vm._v(_vm._s(_vm.title))]), (_vm.hasChildren) ? _c('anchor-icon', {
    class: ['anchor-animation__rotate3d', {
      'anchor-animation__rotate3d--top-down': _vm.isShow
    }],
    style: ([_vm.iconStyle, {
      'margin-top': '-2px',
      'right': _vm.isSub ? '22px' : '12px'
    }]),
    attrs: {
      "type": "triangle",
      "name": _vm.triangleName,
      "active": _vm.elementStatus
    }
  }) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-05e27b60", module.exports)
  }
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(27)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(29),
  /* template */
  __webpack_require__(30),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/liuzhimeng/projects/anchor/packages/menu-parts/src/anchor-menu-content.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] anchor-menu-content.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-054df81e", Component.options)
  } else {
    hotAPI.reload("data-v-054df81e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("31df4ae7", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/.0.28.4@css-loader/index.js!../../../node_modules/.12.2.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-054df81e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/.6.0.6@sass-loader/lib/loader.js!./menu-content.scss", function() {
     var newContent = require("!!../../../node_modules/.0.28.4@css-loader/index.js!../../../node_modules/.12.2.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-054df81e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/.6.0.6@sass-loader/lib/loader.js!./menu-content.scss");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/* BEM in SASS --start\n * https://medium.com/@marcmintel/pushing-bem-to-the-next-level-with-sass-3-4-5239d2371321\n **/\n/* BEM in SASS --end */\n/* triangle icon */\n/* clear float */\n/* single line text */\n/* primary word */\n/* primary color */\n/* menu */\n.menu-content {\n  position: relative;\n  display: inline-block;\n  padding: 0 32px 0 50px;\n  box-sizing: border-box;\n  background-color: #1b1d23;\n  user-select: none;\n  color: #cecece;\n  font-size: 14px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  transition: background-color 240ms;\n}\n.menu-content--active {\n    background-color: #000000;\n    color: #ffffff;\n}\n.menu-content__bar {\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 100%;\n    width: 4px;\n    background-color: #E2003B;\n}\n.menu-content:hover {\n    cursor: pointer;\n}\n", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _anchorIcon = __webpack_require__(3);

var _anchorIcon2 = _interopRequireDefault(_anchorIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'menu-content',

  components: {
    AnchorIcon: _anchorIcon2.default
  },

  props: {
    width: {
      type: Number,
      default: 240
    },

    height: {
      type: Number,
      default: 40
    },

    content: {
      type: String,
      default: '列表内容'
    },

    paddingLeft: {
      type: Number,
      default: 70
    }
  },

  data: function data() {
    return {
      active: false
    };
  },


  computed: {
    contentStyle: function contentStyle() {
      return {
        'width': this.width + 'px',
        'height': this.height + 'px',
        'line-height': this.height + 'px',
        'padding-left': this.paddingLeft + 'px'
      };
    },
    iconStyle: function iconStyle() {
      return {
        'position': 'absolute',
        'top': '50%'
      };
    }
  },

  methods: {
    mouseHover: function mouseHover(status) {
      this.active = status;
    },
    onClick: function onClick() {
      if (this.$emit.bind(null, 'handleClick')) {
        this.$emit('handleClick');
      }
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    class: ['menu-content', {
      'menu-content--active': _vm.active
    }],
    style: (_vm.contentStyle),
    attrs: {
      "title": _vm.content
    },
    on: {
      "mouseenter": function($event) {
        _vm.mouseHover(true)
      },
      "mouseleave": function($event) {
        _vm.mouseHover(false)
      },
      "click": function($event) {
        _vm.onClick()
      }
    }
  }, [_c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.active),
      expression: "active"
    }],
    class: ['menu-content__bar']
  }), _vm._v(" "), _vm._t("content", [_vm._v(_vm._s(_vm.content))])], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-054df81e", module.exports)
  }
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', _vm._l((_vm.childrenData), function(item, key) {
    return _c('anchor-menu-group', {
      key: key
    }, [(item.type !== 'content') ? _c('anchor-menu-title', {
      class: ['menu-vertical__title'],
      attrs: {
        "title": item.text,
        "oneItem": !item.children,
        "mode": "sub",
        "hasDot": true,
        "hasChildren": !!item.children
      },
      on: {
        "handleClick": function($event) {
          _vm.handleClick(item)
        }
      },
      slot: "group-title"
    }) : (!item.children && item.type === 'content') ? _c('anchor-menu-content', {
      class: ['menu-vertical__content'],
      attrs: {
        "content": item.text,
        "oneItem": true
      },
      on: {
        "handleClick": function($event) {
          _vm.handleClick(item)
        }
      },
      slot: "group-title"
    }) : _vm._e(), _vm._v(" "), (!!item.children) ? _c('anchor-menu-vertical-item', {
      attrs: {
        "children": item.children,
        "data": _vm.data
      },
      on: {
        "handleClick": _vm.handleClick
      },
      slot: "group-item"
    }) : _vm._e()], 1)
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-03e085f8", module.exports)
  }
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['menu-vertical'],
    style: ({
      'width': _vm.width + 'px',
      'min-height': _vm.minHeight + 'px'
    })
  }, _vm._l((_vm.rootData), function(item, key) {
    return _c('anchor-menu-group', {
      key: key
    }, [(item.level !== 2) ? _c('anchor-menu-title', {
      class: ['menu-vertical__title'],
      attrs: {
        "title": item.text,
        "hasChildren": !!item.children
      },
      on: {
        "handleClick": function($event) {
          _vm.handleClick(item)
        }
      },
      slot: "group-title"
    }) : _vm._e(), _vm._v(" "), (item.children) ? _c('anchor-menu-vertical-item', {
      attrs: {
        "children": item.children,
        "data": _vm.data
      },
      on: {
        "handleClick": _vm.handleClick
      },
      slot: "group-item"
    }) : _vm._e()], 1)
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3a8077f8", module.exports)
  }
}

/***/ })
/******/ ]);
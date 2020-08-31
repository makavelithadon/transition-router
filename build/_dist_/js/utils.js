import "../../web_modules/core-js/modules/es.symbol.proxy.js";
import "../../web_modules/core-js/modules/es.symbol.description.proxy.js";
import "../../web_modules/core-js/modules/es.symbol.iterator.proxy.js";
import "../../web_modules/core-js/modules/es.array.find.proxy.js";
import "../../web_modules/core-js/modules/es.array.from.proxy.js";
import "../../web_modules/core-js/modules/es.array.iterator.proxy.js";
import "../../web_modules/core-js/modules/es.array.slice.proxy.js";
import "../../web_modules/core-js/modules/es.function.name.proxy.js";
import "../../web_modules/core-js/modules/es.object.entries.proxy.js";
import "../../web_modules/core-js/modules/es.object.is.proxy.js";
import "../../web_modules/core-js/modules/es.object.keys.proxy.js";
import "../../web_modules/core-js/modules/es.object.to-string.proxy.js";
import "../../web_modules/core-js/modules/es.promise.proxy.js";
import "../../web_modules/core-js/modules/es.regexp.to-string.proxy.js";
import "../../web_modules/core-js/modules/es.string.iterator.proxy.js";
import "../../web_modules/core-js/modules/web.dom-collections.iterator.proxy.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import config from "../config/index.esm.js";
export var isFn = function isFn(n) {
  return n && typeof n === "function";
};
export function isObject(n) {
  return Object.prototype.toString.call(n) === "[object Object]";
}
export function isObjectEmpty(n) {
  if (!isObject(n)) throw new Error("".concat(n, " is not an object."));
  return Object.keys(n).length <= 0;
}
export function areEqual(n, m) {
  return Object.is(n, m);
}
export function promisify(fn) {
  return new Promise(function (r) {
    return fn(r);
  });
}
export function getStyle(element, property) {
  return window.getComputedStyle(element).getPropertyValue(property);
}
export function getBreakpoint(value) {
  var realVal = Object.entries(config.breakpoints.bindings).find(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return v === value;
  })[0];
  return config.breakpoints.obj[realVal];
}
export function scrollTo(element, options) {
  element.scrollIntoView(options || {
    block: "start",
    behavior: "smooth"
  });
}
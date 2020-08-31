import "../../web_modules/core-js/modules/es.symbol.proxy.js";
import "../../web_modules/core-js/modules/es.symbol.description.proxy.js";
import "../../web_modules/core-js/modules/es.symbol.iterator.proxy.js";
import "../../web_modules/core-js/modules/es.array.concat.proxy.js";
import "../../web_modules/core-js/modules/es.array.filter.proxy.js";
import "../../web_modules/core-js/modules/es.array.find.proxy.js";
import "../../web_modules/core-js/modules/es.array.for-each.proxy.js";
import "../../web_modules/core-js/modules/es.array.from.proxy.js";
import "../../web_modules/core-js/modules/es.array.index-of.proxy.js";
import "../../web_modules/core-js/modules/es.array.iterator.proxy.js";
import "../../web_modules/core-js/modules/es.array.last-index-of.proxy.js";
import "../../web_modules/core-js/modules/es.array.map.proxy.js";
import "../../web_modules/core-js/modules/es.array.reduce.proxy.js";
import "../../web_modules/core-js/modules/es.array.slice.proxy.js";
import "../../web_modules/core-js/modules/es.function.name.proxy.js";
import "../../web_modules/core-js/modules/es.object.entries.proxy.js";
import "../../web_modules/core-js/modules/es.object.get-own-property-descriptor.proxy.js";
import "../../web_modules/core-js/modules/es.object.get-own-property-descriptors.proxy.js";
import "../../web_modules/core-js/modules/es.object.keys.proxy.js";
import "../../web_modules/core-js/modules/es.object.to-string.proxy.js";
import "../../web_modules/core-js/modules/es.promise.proxy.js";
import "../../web_modules/core-js/modules/es.regexp.to-string.proxy.js";
import "../../web_modules/core-js/modules/es.string.iterator.proxy.js";
import "../../web_modules/core-js/modules/web.dom-collections.for-each.proxy.js";
import "../../web_modules/core-js/modules/web.dom-collections.iterator.proxy.js";
import "../../web_modules/regenerator-runtime/runtime.js";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import history from "../../web_modules/history/browser.js";
import { v4 as uuidv4 } from "../../web_modules/uuid.js";
import { areEqual, isFn } from "./utils.js";

function getDefaultHooks() {
  return {
    once: function once() {},
    afterOnce: function afterOnce() {},
    beforeLeave: function beforeLeave() {},
    leave: function leave() {},
    afterLeave: function afterLeave() {},
    beforeEnter: function beforeEnter() {},
    enter: function enter() {},
    afterEnter: function afterEnter() {}
  };
}

var Router = /*#__PURE__*/function () {
  function Router() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$root = _ref.root,
        root = _ref$root === void 0 ? ".root" : _ref$root,
        _ref$routes = _ref.routes,
        routes = _ref$routes === void 0 ? [] : _ref$routes,
        _ref$transitions = _ref.transitions,
        transitions = _ref$transitions === void 0 ? [] : _ref$transitions,
        _ref$preventRunning = _ref.preventRunning,
        preventRunning = _ref$preventRunning === void 0 ? false : _ref$preventRunning,
        _ref$hooks = _ref.hooks,
        hooks = _ref$hooks === void 0 ? {} : _ref$hooks,
        _ref$debug = _ref.debug,
        debug = _ref$debug === void 0 ? false : _ref$debug;

    _classCallCheck(this, Router);

    this._root = document.querySelector(root);
    this._routes = routes;
    this._transitions = transitions;
    this._history = history;
    this._isAnimated = false;
    this._preventRunning = preventRunning;
    this.current = this._getPageFromURL();
    this.next = null;
    this.previous = null;
    this.hooks = _objectSpread(_objectSpread({}, getDefaultHooks()), hooks);
    this.animationId = null;
    this.debug = debug;

    this._init();
  }

  _createClass(Router, [{
    key: "setState",
    value: function setState(options) {
      for (var _i = 0, _Object$entries = Object.entries(options); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            props = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        this[props] = value;
      }

      return this.getState();
    }
  }, {
    key: "_getPageFromURL",
    value: function _getPageFromURL() {
      var url = this._history.location.pathname;
      return url.slice(url.lastIndexOf("/"));
    }
  }, {
    key: "_init",
    value: function _init() {
      var _this = this;

      this._history.listen(function () {
        return _this._onChange();
      });

      this._handleLinks();

      this.setState({
        next: this.current
      });

      this._onChange(true);
    }
  }, {
    key: "debug",
    value: function debug() {
      console.log(this.getState());
    }
  }, {
    key: "appendToDom",
    value: function appendToDom(newDom) {
      this._root.insertAdjacentHTML("afterbegin", newDom);
    }
  }, {
    key: "removeFromDom",
    value: function removeFromDom(domToRemove) {
      if (domToRemove === null) return;

      this._root.removeChild(domToRemove);
    }
  }, {
    key: "getState",
    value: function getState() {
      var _this2 = this;

      return ["previous", "current", "next", "_root", "animationId"].reduce(function (acc, props) {
        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, props, _this2[props]));
      }, {});
    }
  }, {
    key: "changeRoute",
    value: function changeRoute(_ref2) {
      var content = _ref2.content,
          title = _ref2.title,
          scripts = _ref2.scripts;
      this.appendToDom(content);
      if (title) document.title = title;

      if (scripts && !!scripts.length) {
        var _iterator = _createForOfIteratorHelper(scripts),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var script = _step.value;
            script();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      this._handleLinks(this._root);
    }
  }, {
    key: "leave",
    value: function () {
      var _leave = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(transition, state, id) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.handleShouldAnimationContinue(id, state);

                if (!(this._root.innerHTML.length === 0)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                this.hooks.beforeLeave(state);
                this.hooks.leave(state);
                this._isAnimated = true;
                this.removeClickOnRouterLinks();

                if (!transition) {
                  _context.next = 12;
                  break;
                }

                _context.t0 = transition.leave;

                if (!_context.t0) {
                  _context.next = 12;
                  break;
                }

                _context.next = 12;
                return transition.leave(state);

              case 12:
                this._isAnimated = false;
                this.handleShouldAnimationContinue(id, state);
                this.removeFromDom(this._root.firstElementChild);
                this.hooks.afterLeave(state);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function leave(_x, _x2, _x3) {
        return _leave.apply(this, arguments);
      }

      return leave;
    }()
  }, {
    key: "enter",
    value: function () {
      var _enter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(route, transition, state, id) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.handleShouldAnimationContinue(id, state);
                this.changeRoute(route);
                this.hooks.beforeEnter(state);
                this.hooks.enter(state);
                this._isAnimated = true;

                if (!transition) {
                  _context2.next = 10;
                  break;
                }

                _context2.t0 = transition.enter;

                if (!_context2.t0) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 10;
                return transition.enter(state);

              case 10:
                this.hooks.afterEnter(state);
                this._isAnimated = false;

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function enter(_x4, _x5, _x6, _x7) {
        return _enter.apply(this, arguments);
      }

      return enter;
    }()
  }, {
    key: "once",
    value: function () {
      var _once = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(route, transition, state, id) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.handleShouldAnimationContinue(id, state);
                this._isAnimated = true;
                this.hooks.once(state);

                if (!transition) {
                  _context3.next = 8;
                  break;
                }

                _context3.t0 = transition.once;

                if (!_context3.t0) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 8;
                return transition.once(transition, state);

              case 8:
                this._isAnimated = false;
                this.hooks.afterOnce(state);
                this.enter(route, transition, state, id);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function once(_x8, _x9, _x10, _x11) {
        return _once.apply(this, arguments);
      }

      return once;
    }()
  }, {
    key: "handleShouldAnimationContinue",
    value: function handleShouldAnimationContinue(animationId, _ref3) {
      var current = _ref3.current,
          next = _ref3.next;

      if (!areEqual(this.animationId, animationId)) {
        throw new Error("Cancel animation ".concat(animationId, " from ").concat(current, " to ").concat(next));
      }
    }
  }, {
    key: "_onChange",
    value: function () {
      var _onChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(firstLoad) {
        var id, pageUrl, state, transition, nextRoute, next;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = this.animationId = uuidv4();
                pageUrl = this._getPageFromURL();
                state = this.setState({
                  next: pageUrl
                });
                transition = this.getMatchingTransition(firstLoad);
                nextRoute = this._routes.find(function (route) {
                  return route.path === pageUrl;
                });

                if (firstLoad) {
                  _context4.next = 9;
                  break;
                }

                _context4.next = 9;
                return this.leave(transition, state, id);

              case 9:
                state = this.setState(_objectSpread({
                  next: null
                }, !firstLoad && {
                  previous: this.current,
                  current: pageUrl
                }));
                next = !firstLoad ? this.enter : this.once; // Enter/Once workflow

                _context4.next = 13;
                return next.call(this, nextRoute, transition, state, id);

              case 13:
                _context4.next = 18;
                break;

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](0);
                this.debug && console.info("Error", _context4.t0);

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 15]]);
      }));

      function _onChange(_x12) {
        return _onChange2.apply(this, arguments);
      }

      return _onChange;
    }()
  }, {
    key: "getMatchingTransition",
    value: function getMatchingTransition(firstLoad) {
      var _this$getState = this.getState(),
          current = _this$getState.current,
          next = _this$getState.next;

      var foundTransition = this._transitions.find(function (_ref4) {
        var from = _ref4.from,
            to = _ref4.to;

        if (from && to) {
          return from.route === current && to.route === next;
        }

        if (to) {
          return to.route === next;
        }

        if (from) {
          return from.route === current;
        }
      });

      if (!foundTransition) {
        foundTransition = this._transitions.find(function (_ref5) {
          var leave = _ref5.leave,
              enter = _ref5.enter,
              once = _ref5.once;
          return isFn(leave) || isFn(enter) || firstLoad && isFn(once);
        });
      }

      return foundTransition;
    }
  }, {
    key: "removeClickOnRouterLinks",
    value: function removeClickOnRouterLinks() {
      for (var _i2 = 0, _arr2 = _toConsumableArray(this._root.querySelectorAll("a[href")); _i2 < _arr2.length; _i2++) {
        var link = _arr2[_i2];
        link.removeEventListener("click", this.handleClickOnRouterLinks.bind(this));
      }
    }
  }, {
    key: "handleClickOnRouterLinks",
    value: function handleClickOnRouterLinks(e, link) {
      e.preventDefault();
      e.stopPropagation();
      var url = link.getAttribute("href");
      var pathname = document.location.pathname;
      if (pathname === url || this._preventRunning && this._isAnimated) return;

      this._history.push(url);
    }
  }, {
    key: "_handleLinks",
    value: function _handleLinks() {
      var _this3 = this;

      var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
      var links = container.querySelectorAll("a[href]"); // If on first parsing we have no links so no router reason to exist

      if (!links.length && container === document) {
        console.log("No links to parse.");
        return;
      }

      var matchedLinks = this.routes.map(function (route) {
        return container.querySelector("a[href=\"".concat(route.path, "\"]"));
      }).filter(Boolean);
      if (container === document && !matchedLinks.length) throw new Error("No links match with provided routes paths");

      var _iterator2 = _createForOfIteratorHelper(matchedLinks),
          _step2;

      try {
        var _loop = function _loop() {
          var link = _step2.value;
          link.addEventListener("click", function (e) {
            return _this3.handleClickOnRouterLinks(e, link);
          });
        };

        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "_linkUrlToIdentifier",
    value: function _linkUrlToIdentifier(url) {
      return url.indexOf("/") === 0 ? url.slice(1) : url;
    }
  }, {
    key: "routes",
    get: function get() {
      return this._routes;
    }
  }]);

  return Router;
}();

export { Router as default };
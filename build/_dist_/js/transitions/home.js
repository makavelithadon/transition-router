import "../../../web_modules/core-js/modules/es.symbol.proxy.js";
import "../../../web_modules/core-js/modules/es.symbol.description.proxy.js";
import "../../../web_modules/core-js/modules/es.symbol.iterator.proxy.js";
import "../../../web_modules/core-js/modules/es.array.from.proxy.js";
import "../../../web_modules/core-js/modules/es.array.iterator.proxy.js";
import "../../../web_modules/core-js/modules/es.array.map.proxy.js";
import "../../../web_modules/core-js/modules/es.array.slice.proxy.js";
import "../../../web_modules/core-js/modules/es.function.name.proxy.js";
import "../../../web_modules/core-js/modules/es.object.to-string.proxy.js";
import "../../../web_modules/core-js/modules/es.regexp.to-string.proxy.js";
import "../../../web_modules/core-js/modules/es.string.iterator.proxy.js";
import "../../../web_modules/core-js/modules/web.dom-collections.iterator.proxy.js";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import gsap from "../../../web_modules/gsap.js";
import ScrollTrigger from "../../../web_modules/gsap/ScrollTrigger.js";
import { getBreakpoint, scrollTo } from "../utils.js";

function setImgSize() {
  var ratio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1920 / 1080;

  function setNodeSize() {
    for (var _i = 0, _arr = _toConsumableArray(document.querySelectorAll(".project-card__img-container")); _i < _arr.length; _i++) {
      var node = _arr[_i];
      node.style.height = document.querySelector("#projectsList > li:nth-child(1) > div > a > div.project-card__img-container > img").clientWidth / ratio + "px";
    }
  }

  window.addEventListener("resize", setNodeSize);
  setNodeSize();
}

export function home() {
  setImgSize();

  for (var _i2 = 0, _arr2 = _toConsumableArray(document.querySelectorAll(".appearing .inner")); _i2 < _arr2.length; _i2++) {
    var node = _arr2[_i2];
    gsap.from(node, {
      scrollTrigger: node,
      y: "110%",
      duration: 0.75,
      ease: "power3.inOut"
    });
  }

  for (var _i3 = 0, _arr3 = _toConsumableArray(document.querySelectorAll(".fade-in")); _i3 < _arr3.length; _i3++) {
    var _node = _arr3[_i3];
    gsap.from(_node, {
      scrollTrigger: _node,
      opacity: 0,
      y: 20,
      delay: 1
    }, "-=.1");
  }

  for (var _i4 = 0, _arr4 = _toConsumableArray(document.querySelectorAll(".img__layer")); _i4 < _arr4.length; _i4++) {
    var _node2 = _arr4[_i4];
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: _node2,
        start: "center bottom"
      }
    }).to(_node2, {
      x: 0,
      ease: "power2.inOut",
      duration: 0.5
    }).to(_node2, {
      x: "101%",
      duration: 0.6,
      ease: "power2.inOut",
      delay: 0.4
    });
  }

  var scrollToElements = document.querySelectorAll("[data-scrollto]");
  var contextualAction = document.querySelector(".contextual-action");

  var _loop = function _loop() {
    var element = _arr5[_i5];
    element.addEventListener("click", function (e) {
      var reached = document.querySelector(element.getAttribute("data-scrollto"));
      var y = window.scrollY + reached.getBoundingClientRect().y + 1;
      scrollTo(reached);
    });
  };

  for (var _i5 = 0, _arr5 = _toConsumableArray(scrollToElements); _i5 < _arr5.length; _i5++) {
    _loop();
  }

  gsap.from(contextualAction, {
    opacity: 0,
    y: 80,
    ease: "power2.out",
    duration: 1
  });

  var _iterator = _createForOfIteratorHelper(_toConsumableArray(document.querySelectorAll(".project-card__details")).map(function (el, index) {
    return {
      element: el,
      triggerElement: _toConsumableArray(document.querySelectorAll(".project-article"))[index]
    };
  })),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _step.value,
          element = _step$value.element,
          triggerElement = _step$value.triggerElement;
      gsap.to(element, {
        yPercent: -200,
        ease: "none",
        scrollTrigger: {
          trigger: triggerElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
    /*for (const { element, triggerElement } of [
      ...document.querySelectorAll(".project-card__img"),
    ].map((el, index) => ({
      element: el,
      triggerElement: [...document.querySelectorAll(".project-card")][index],
    }))) {
      gsap.to(element, {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: triggerElement,
          scrub: true,
        },
      });
    }*/

    /* const nodes = [...document.querySelectorAll(".project-card__img")].map(
      (el, index) => ({
        element: el,
        triggerElement: [...document.querySelectorAll(".project-article")][index],
      })
    );
    nodes.forEach(({ element, triggerElement }, index) => {
      ScrollTrigger.matchMedia({
        [`(min-width: ${getBreakpoint("xlarge")}px)`]: function () {
          gsap.to(element, {
            scrollTrigger: {
              trigger: triggerElement,
              start: "center bottom",
              end: "center top",
              onEnter: () => {
                gsap.to(`.project-card__img`, {
                  opacity: 0.1,
                  ease: "power2.out",
                  duration: 0.325,
                });
                gsap.to(element, {
                  opacity: 0.9,
                  ease: "power2.in",
                  duration: 0.5,
                });
              },
              onEnterBack: () => {
                gsap.to(`.project-card__img`, {
                  opacity: 0.1,
                  ease: "power2.out",
                  duration: 0.325,
                });
                gsap.to(element, {
                  opacity: 0.9,
                  ease: "power2.in",
                  duration: 0.5,
                });
              },
              onLeave: () => {
                gsap.to(element, {
                  opacity: 0.1,
                  ease: "power2.out",
                  duration: 0.325,
                });
              },
              onLeaveBack: () => {
                gsap.to(element, {
                  opacity: 0.1,
                  ease: "power2.out",
                  duration: 0.325,
                });
              },
            },
          });
        },
      });
    }); */

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
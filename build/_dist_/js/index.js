import "../../web_modules/core-js/modules/es.object.to-string.proxy.js";
import "../../web_modules/core-js/modules/es.promise.proxy.js";
import "../../web_modules/regenerator-runtime/runtime.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { run as runMenu } from "./animations/menu.js";
import { run as runSplash } from "./animations/splash.js";
import routes from "./pages/index.js";
import Router from "./router.js";
import gsap from "../../web_modules/gsap.js";
import ScrollTrigger from "../../web_modules/gsap/ScrollTrigger.js";
import Scrollbar from "../../web_modules/smooth-scrollbar.js";
import { home as homeTransition } from "./transitions/home.js";
gsap.registerPlugin(ScrollTrigger);

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var scrollbar;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            runMenu();
            new Router({
              root: ".container",
              debug: true,
              routes: routes,
              hooks: {
                once: function once(data) {
                  return console.log("Once", data);
                },
                afterOnce: function afterOnce(data) {
                  console.log("After once", data);
                },
                beforeEnter: function beforeEnter(data) {
                  return console.log("Before enter", data);
                },
                enter: function enter(data) {
                  console.log("Enter", data);
                  /*if (!scrollbar) {
                    scrollbar = Scrollbar.init(document.getElementById("scrollable"), {
                      damping: 0.15,
                      continuousScrolling: true,
                    });
                    scrollbar.addListener((status) => {
                      ScrollTrigger.refresh();
                    });
                  }*/
                },
                beforeLeave: function beforeLeave(data) {
                  console.log("Before leave", data); //scrollbar.scrollTo(0, 0, 500);
                },
                leave: function leave(data) {
                  console.log("Leave", data);
                },
                afterLeave: function afterLeave(data) {
                  console.log("After leave", data);
                },
                afterEnter: function afterEnter(data) {
                  console.log("After enter", data);
                }
              },
              transitions: [
              /* {
              async once(data) {
                return panelAnimation();
              },
              leave(data) {
                return leaveAnimation();
              },
              enter(data) {
                return enterAnimation();
              },
              },
              {
              from: { route: "/about" },
              to: { route: "/works" },
              leave(data) {
                return zoomOutAnimation();
              },
              enter(data) {
                return zoomInAnimation();
              },
              },
              {
              to: { route: "/about" },
              enter(data) {
                return specialAnimation();
              },
              leave(data) {
                return leaveAnimation();
              },
              }, */
              {
                to: {
                  route: "/"
                },
                once: function once() {
                  return runSplash();
                },
                leave: function leave() {},
                enter: function enter() {
                  return homeTransition({
                    scrollbar: scrollbar
                  });
                }
              }]
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _main.apply(this, arguments);
}

main();
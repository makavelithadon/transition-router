import { run as runMenu } from "@js/animations/menu";
import { run as runSplash } from "@js/animations/splash";
import routes from "@js/pages/index.js";
import Router from "@js/router";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";
import { home as homeTransition } from "@js/transitions/home";

gsap.registerPlugin(ScrollTrigger);

async function main() {
  runMenu();

  let scrollbar;

  new Router({
    root: ".container",
    debug: true,
    routes,
    hooks: {
      once: (data) => console.log("Once", data),
      afterOnce: (data) => {
        console.log("After once", data);
      },
      beforeEnter: (data) => console.log("Before enter", data),
      enter: (data) => {
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
      beforeLeave(data) {
        console.log("Before leave", data);
        //scrollbar.scrollTo(0, 0, 500);
      },
      leave: (data) => {
        console.log("Leave", data);
      },
      afterLeave(data) {
        console.log("After leave", data);
      },
      afterEnter(data) {
        console.log("After enter", data);
      },
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
        to: { route: "/" },
        once() {
          return runSplash();
        },
        leave() {},
        enter() {
          return homeTransition({ scrollbar });
        },
      },
    ],
  });
}

main();

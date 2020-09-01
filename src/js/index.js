import { run as initMenu } from "@js/animations/menu";
import { run as runSplash } from "@js/animations/splash";
import routes from "@js/pages/index.js";
import Router from "@js/router";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { home as homeTransition } from "@js/transitions/home";
import { waitForScroll as waitForScrollToFadeInTop } from "@js/animations/fade-in-top";
import { waitForScroll as waitForScrollToAppearingLettersTop } from "@js/animations/appearing-letters-top";

import { scrollTo } from "@js/utils";

const GSAP_DEFAULTS = {
  ease: "power3.inOut",
  duration: 0.6,
};

gsap.registerPlugin(ScrollTrigger);

gsap.defaults(GSAP_DEFAULTS);

let elapsedTweens = [];

async function main() {
  initMenu();

  function onEnter() {
    for (const fadeIn of [...document.querySelectorAll(".fade-in")]) {
      elapsedTweens.push(waitForScrollToFadeInTop(fadeIn));
    }
    for (const appearingIn of [
      ...document.querySelectorAll(".appearing .inner"),
    ]) {
      elapsedTweens.push(waitForScrollToAppearingLettersTop(appearingIn));
    }
  }

  function onLeave() {
    let completed = 0;
    const finishedTweens = elapsedTweens.filter((t) => t.progress() > 0);
    return new Promise((r) => {
      if (!finishedTweens.length) r();

      for (const tween of finishedTweens) {
        const tweenId = tween.vars.id;
        tween.eventCallback("onReverseComplete", () => {
          completed += 1;
          elapsedTweens = elapsedTweens.splice(
            elapsedTweens.findIndex((t) => t.vars.id === tweenId),
            1
          );
          if (completed === finishedTweens.length) r();
        });
        tween.reverse();
      }
    });
  }

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
        onEnter();
      },
      beforeLeave(data) {
        console.log("Before leave", data);
        scrollTo(document.body);
      },
      leave: (data) => {
        console.log("Leave", data);
        return onLeave();
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
          return homeTransition();
        },
      },
    ],
  });
}

main();

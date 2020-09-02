import { run as initMenu } from "@js/animations/menu";
import { run as runSplash } from "@js/animations/splash";
import routes from "@js/pages/index.js";
import Router from "@js/router";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// import ScrollToPlugin from "gsap/ScrollToPlugin";
import { home as homeTransition } from "@js/transitions/home";
import { waitForScroll as waitForScrollToFadeInTop } from "@js/animations/fade-in-top";
import { waitForScroll as waitForScrollToAppearingLettersTop } from "@js/animations/appearing-letters-top";

import { scrollTo, filterMap } from "@js/utils";
import initScrollToElements from "@js/scroll-to";

const GSAP_DEFAULTS = {
  ease: "power3.inOut",
  duration: 0.6,
};

/*

N.B: Côté router => Faire un Promise.all de hooks.leave et transitions[nextIndex].leave

Pour que les deux se fassent en parallèle, sinon, si jamais on a des Promises qui sont résolues tardivement dans chacune
des deux méthodes, alors on attends beaucoup trop longtemps avant de rentrer dans le enter du next step

Faire de même pour les méthodes enter (hooks.enter et transitions[nextIndex].enter)

*/

gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(ScrollToPlugin);

gsap.defaults(GSAP_DEFAULTS);

let registeredTweens = new Map();

async function main() {
  initMenu();

  function onEnter() {
    for (const nodes of [...document.querySelectorAll(".fade-in")]) {
      const tween = waitForScrollToFadeInTop(nodes);
      registeredTweens.set(tween.vars.id, tween);
    }
    for (const nodes of [...document.querySelectorAll(".appearing .inner")]) {
      const tween = waitForScrollToAppearingLettersTop(nodes);
      registeredTweens.set(tween.vars.id, tween);
    }

    initScrollToElements();
    /*gsap.to(window, {
      duration: 2,
      scrollTo: { y: document.body },
      ease: "power2.out",
    });*/
  }

  function onLeave() {
    const tweens = registeredTweens;

    const startedTweens = filterMap(tweens, ([, t]) => t.progress() > 0);
    const unStartedTweens = filterMap(tweens, ([, t]) => t.progress() === 0);

    if (!startedTweens.size) return Promise.resolve();

    unStartedTweens.forEach((tween) =>
      tweens.delete(tween.pause().kill().vars.id)
    );
    return Promise.all(
      Array.from(startedTweens).map(
        ([id]) =>
          new Promise((r) => {
            const tween = tweens.get(id);
            tween
              .eventCallback("onReverseComplete", () =>
                r(tweens.delete(tween.kill().vars.id))
              )
              .reverse();
          })
      )
    );
  }

  new Router({
    root: ".container",
    debug: true,
    routes,
    preventRunning: true,
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
        console.log("scrollTo body");
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
        leave() {
          // Just ofr example this code never be waited for because on the router,
          // we have a mecanism to force reject too long transitions after waiting for 2 seconds
          // return new Promise((r) => window.setTimeout(r, 10000));
        },
        enter() {
          return homeTransition();
        },
      },
    ],
  });
}

main();

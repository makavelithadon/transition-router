import { run as runMenu } from "@js/animations/menu";
import { run as runSplash } from "@js/animations/splash";
import routes from "@js/pages/index.js";
import Router from "@js/router";
import { promisify, getStyle } from "@js/utils";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";
import easing from "@js/easing";

console.log({ easing });

gsap.registerPlugin(ScrollTrigger);

async function main() {
  runMenu();

  let scrollbar;

  const home = () => {
    gsap.from(".appearing .inner", {
      scrollTrigger: ".appearing .inner",
      y: "110%",
      duration: 0.75,
      ease: "power3.inOut",
      stagger: 0.2,
    });
    gsap.from(
      ".fade-in",
      { scrollTrigger: ".fade-in", opacity: 0, y: 20, delay: 1 },
      "-=.1"
    );

    const scrollToElements = document.querySelectorAll(`[data-scrollto]`);
    const contextualAction = document.querySelector(".contextual-action");

    for (const element of [...scrollToElements]) {
      element.addEventListener("click", (e) => {
        const reached = document.querySelector(
          element.getAttribute("data-scrollto")
        );
        const y = scrollbar.offset.y + reached.getBoundingClientRect().y + 1;
        scrollbar.scrollTo(0, y, 1000, {
          easing: easing.easeInOutCubic,
        });
      });
    }

    gsap.from(contextualAction, {
      scrollTrigger: contextualAction,
      opacity: 0,
      y: 80,
      ease: "power2.out",
      duration: 1,
    });

    for (const { element, triggerElement } of [
      ...document.querySelectorAll(".project-card__details"),
    ].map((el, index) => ({
      element: el,
      triggerElement: [...document.querySelectorAll(".project-article")][index],
    }))) {
      gsap.to(element, {
        yPercent: -400,
        ease: "none",
        scrollTrigger: {
          trigger: triggerElement,
          scrub: true,
        },
      });
    }

    const nodes = [...document.querySelectorAll(".project-card__img")].map(
      (el, index) => ({
        element: el,
        triggerElement: [...document.querySelectorAll(".project-article")][
          index
        ],
      })
    );
    nodes.forEach(({ element, triggerElement }, index) => {
      console.log(this);
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
            gsap.to(element, { opacity: 1, ease: "power2.in", duration: 0.5 });
          },
          onEnterBack: () => {
            gsap.to(`.project-card__img`, {
              opacity: 0.1,
              ease: "power2.out",
              duration: 0.325,
            });
            gsap.to(element, { opacity: 1, ease: "power2.in", duration: 0.5 });
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
    });
  };

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
        if (!scrollbar) {
          scrollbar = Scrollbar.init(document.getElementById("scrollable"), {
            damping: 0.15,
            continuousScrolling: true,
          });
          scrollbar.addListener((status) => {
            ScrollTrigger.refresh();
          });
        }
      },
      beforeLeave(data) {
        console.log("Before leave", data);
        scrollbar.scrollTo(0, 0, 500);
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
          return home();
        },
      },
    ],
  });
}

main();

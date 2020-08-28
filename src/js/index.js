import { run as runMenu } from "@js/animations/menu";
import { run as runSplash } from "@js/animations/splash";
import routes from "@js/pages/index.js";
import Router from "@js/router";
import { promisify } from "@js/utils";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";

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
    for (const project of [...document.querySelectorAll(".project-item")]) {
      gsap.from(project, {
        scrollTrigger: {
          trigger: project,
          start: "bottom 96%",
        },
        opacity: 0,
        ease: "power4.inOut",
        duration: 0.8,
        delay: 0.25,
      });
    }

    const contextInfo = document.querySelector(".context-info");

    const projectsList = document.querySelector(".projects-list");
    contextInfo.addEventListener("click", () => {
      scrollbar.scrollTo(0, projectsList.getBoundingClientRect().y - 50, 1500);
    });

    gsap.from(contextInfo, {
      opacity: 0,
      y: 80,
      ease: "power2.out",
      duration: 1,
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

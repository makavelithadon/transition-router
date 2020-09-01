import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { getBreakpoint, onWindowResize } from "@js/utils";

function setProjectsImagesSizes(sizes, ratio = 1920 / 1080) {
  for (const node of [
    ...document.querySelectorAll(".project-card__img-container"),
  ]) {
    node.style.height =
      document.querySelector(
        "#projectsList > li:nth-child(1) > div > a > div.project-card__img-container > img"
      ).clientWidth /
        ratio +
      "px";
  }
}

export function home() {
  onWindowResize(setProjectsImagesSizes);

  for (const { element, triggerElement } of [
    ...document.querySelectorAll(".project-card__details"),
  ].map((el, index) => ({
    element: el,
    triggerElement: [...document.querySelectorAll(".project-article")][index],
  }))) {
    gsap.to(element, {
      yPercent: -200,
      ease: "none",
      scrollTrigger: {
        trigger: triggerElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  for (const { element, triggerElement } of [
    ...document.querySelectorAll(".project-card__img"),
  ].map((el, index) => ({
    element: el,
    triggerElement: [...document.querySelectorAll(".project-card")][index],
  }))) {
    gsap.to(element, {
      yPercent: 15,
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
                opacity: 0.5,
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
                opacity: 0.5,
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
  });
}

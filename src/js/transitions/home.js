import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { getBreakpoint, scrollTo } from "@js/utils";

function setImgSize(ratio = 1920 / 1080) {
  function setNodeSize() {
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
  window.addEventListener("resize", setNodeSize);
  setNodeSize();
}

export function home() {
  setImgSize();
  for (const node of [...document.querySelectorAll(".appearing .inner")]) {
    gsap.from(node, {
      scrollTrigger: node,
      y: "110%",
      duration: 0.75,
      ease: "power3.inOut",
    });
  }
  for (const node of [...document.querySelectorAll(".fade-in")]) {
    gsap.from(
      node,
      { scrollTrigger: node, opacity: 0, y: 20, delay: 1 },
      "-=.1"
    );
  }

  for (const node of [...document.querySelectorAll(".img__layer")]) {
    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: node,
          start: "center bottom",
        },
      })
      .to(node, { x: 0, ease: "power2.inOut", duration: 0.5 })
      .to(node, {
        x: "101%",
        duration: 0.6,
        ease: "power2.inOut",
        delay: 0.4,
      });
  }

  const scrollToElements = document.querySelectorAll(`[data-scrollto]`);
  const contextualAction = document.querySelector(".contextual-action");

  for (const element of [...scrollToElements]) {
    element.addEventListener("click", (e) => {
      const reached = document.querySelector(
        element.getAttribute("data-scrollto")
      );
      const y = window.scrollY + reached.getBoundingClientRect().y + 1;
      scrollTo(reached);
    });
  }

  gsap.from(contextualAction, {
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
}

import routes from "./pages/index.js";
import Router from "./router";
import gsap from "gsap";
import Scrollbar from "smooth-scrollbar";

// Scrollbar.use(OverscrollPlugin);

const promisify = (fn) => new Promise((r) => fn(r));

const animationDuration = 1;
const ease = "power2.out";

function zoomOutAnimation() {
  return promisify((r) => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".anim",
      { scale: 1, opacity: 1 },
      {
        scale: 0,
        opacity: 0,
        onComplete: r,
        duration: animationDuration,
        ease,
      }
    );
  });
}

function zoomInAnimation() {
  return promisify((r) => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".anim",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        onComplete: r,
        duration: animationDuration,
        ease,
      }
    );
  });
}

function specialAnimation() {
  return promisify((r) => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".anim",
      {
        y: -40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        onComplete: r,
        duration: animationDuration,
        ease,
      }
    );
  });
}

function panelAnimation() {
  return promisify((res) => {
    gsap.fromTo(
      ".panel-top",
      { y: 0 },
      { y: "-100%", delay: 1, ease, duration: 0.75 }
    );
    gsap.fromTo(
      ".panel-bottom",
      { y: 0 },
      {
        y: "100%",
        onComplete: res,
        delay: 1,
        ease,
        duration: 0.75,
      }
    );
  });
}

function enterAnimation() {
  return promisify((resolve) => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".anim",
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease,
        onComplete: resolve,
        duration: animationDuration,
      }
    );
  });
}

function leaveAnimation() {
  return promisify((res) => {
    const tl = gsap.timeline();
    tl.to(".anim", {
      x: 40,
      opacity: 0,
      stagger: 0.15,
      ease,
      onComplete: res,
      duration: animationDuration,
    });
  });
}

let scrollbar;
let yAxis = 0;

const appRouter = new Router({
  root: ".container",
  debug: true,
  // preventRunning: true,
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
          damping: 0.05,
        });
        scrollbar.addListener((status) => {
          console.log({ status });
        });
      }
      for (const link of [...document.querySelectorAll(".links a")]) {
        link.classList.remove("is-active");
      }
      document
        .querySelector(`.links a[href="${data.current}"]`)
        .classList.add("is-active");
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
      yAxis = scrollbar.offset.y;
    },
    afterEnter(data) {
      console.log("After enter", data);
    },
  },
  transitions: [
    {
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
    },
  ],
});

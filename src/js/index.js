import routes from "@js/pages/index.js";
import Router from "@js/router";
import gsap from "gsap";
import Scrollbar from "smooth-scrollbar";

// Scrollbar.use(OverscrollPlugin);

const promisify = (fn) => new Promise((r) => fn(r));

let scrollbar;

const intro = () =>
  promisify((resolve) => {
    return gsap.set("#splash", { opacity: 0 });
  });

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
          damping: 0.05,
        });
        scrollbar.addListener((status) => {
          console.log({ status });
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
      yAxis = scrollbar.offset.y;
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
      once() {
        return intro();
      },
      leave() {},
      enter() {},
    },
  ],
});

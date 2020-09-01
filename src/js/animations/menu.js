import gsap from "gsap";
import config from "@app/config/index.esm.js";

const { colors } = config;

const menuClassname = ".burger";
const menu = document.querySelector(menuClassname);
const dotAnimationDuration = 0.2;
const dotAnimationEasing = "power3.out";

function dot(nthChild) {
  return menu.querySelector(`${menuClassname}__dot:nth-child(${nthChild})`);
}

export function run() {
  gsap.set("#menu", { y: "-100%", display: "block" });
  // order: 3 - 2- 1 - 4 - 5
  const menuTimeline = gsap
    .timeline({ paused: true })
    .to(dot(3), {
      opacity: 0,
      duration: dotAnimationDuration,
      ease: dotAnimationEasing,
      x: -12,
    })
    .to(
      dot(2),
      {
        opacity: 0,
        duration: dotAnimationDuration,
        ease: dotAnimationEasing,
        x: -12,
      },
      "-=0.08"
    )
    .to(
      dot(1),
      {
        opacity: 0,
        duration: dotAnimationDuration,
        ease: dotAnimationEasing,
        y: 12,
      },
      "-=0.08"
    )
    .set(dot(4), { zIndex: 10 })
    .to(
      dot(4),
      {
        duration: dotAnimationDuration,
        ease: dotAnimationEasing,
        x: 12,
      },
      "-=0.08"
    )
    .to(
      dot(5),
      {
        opacity: 0,
        duration: dotAnimationDuration,
        ease: dotAnimationEasing,
      },
      "-=0.08"
    )
    .to("#menu", { y: 0, ease: "power3.inOut", duration: 1.5 }, "-=.4")
    .to(".r-shape", { fill: colors.black }, "-=0.9");
  menu.addEventListener("click", () => {
    const toggledClass = "toggle-menu";
    document.body.classList.toggle(toggledClass);
    menuTimeline[
      document.body.classList.contains(toggledClass) ? "play" : "reverse"
    ]();
  });
}

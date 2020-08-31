import gsap from "../../../web_modules/gsap.js";
var menuClassname = ".burger";
var menu = document.querySelector(menuClassname);
var dotAnimationDuration = 0.2;
var dotAnimationEasing = "power3.out";

function dot(nthChild) {
  return menu.querySelector("".concat(menuClassname, "__dot:nth-child(").concat(nthChild, ")"));
}

export function run() {
  gsap.set("#menu", {
    y: "-100%",
    display: "block"
  }); // order: 3 - 2- 1 - 4 - 5

  var menuTimeline = gsap.timeline({
    paused: true
  }).to(dot(3), {
    opacity: 0,
    duration: dotAnimationDuration,
    ease: dotAnimationEasing,
    x: -12
  }).to(dot(2), {
    opacity: 0,
    duration: dotAnimationDuration,
    ease: dotAnimationEasing,
    x: -12
  }, "-=0.08").to(dot(1), {
    opacity: 0,
    duration: dotAnimationDuration,
    ease: dotAnimationEasing,
    y: 12
  }, "-=0.08").set(dot(4), {
    zIndex: 10
  }).to(dot(4), {
    duration: dotAnimationDuration,
    ease: dotAnimationEasing,
    x: 12
  }, "-=0.08").to(dot(5), {
    opacity: 0,
    duration: dotAnimationDuration,
    ease: dotAnimationEasing
  }, "-=0.08").to("#menu", {
    y: 0,
    ease: "power3.inOut",
    duration: 1.5
  }, "-=.4");
  menu.addEventListener("click", function () {
    var toggledClass = "toggle-menu";
    document.body.classList.toggle(toggledClass);
    menuTimeline[document.body.classList.contains(toggledClass) ? "play" : "reverse"]();
  });
}
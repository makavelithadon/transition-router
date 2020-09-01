import gsap from "gsap";

export default function fadeInTop(defaults) {
  defaults && gsap.defaults(defaults);
  const nodes = [...document.querySelectorAll(".fade-in")];
  for (const node of nodes) {
    gsap.from(
      node,
      { scrollTrigger: node, opacity: 0, y: 20, delay: 1 },
      "-=.1"
    );
  }
}

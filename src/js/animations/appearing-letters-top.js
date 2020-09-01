import gsap from "gsap";

export default function appearingLettersTop(defaults) {
  defaults && gsap.defaults(defaults);
  const nodes = [...document.querySelectorAll(".appearing .inner")];
  for (const node of nodes) {
    gsap.from(node, {
      scrollTrigger: node,
      y: "110%",
    });
  }
}

import gsap from "gsap";

export default function reveal(defaults) {
  defaults && gsap.defaults(defaults);
  const nodes = [...document.querySelectorAll(".img__reveal")];
  if (!nodes.length) return;
  for (const node of nodes) {
    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: node,
          start: "center bottom",
        },
      })
      .to(node, { x: 0 })
      .to(node, {
        x: "101%",
        delay: 0.4,
      });
  }
}

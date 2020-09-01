import gsap from "gsap";
import { v4 as uuidv4 } from "uuid";

const defaultNode = ".fade-in";

export default function fadeInTop(node = defaultNode, options = {}) {
  return gsap.from(
    node,
    {
      id: uuidv4(),
      opacity: 0,
      y: 20,
      delay: 0.5,
      ...options,
    },
    "-=.1"
  );
}

export function waitForScroll(node = defaultNode) {
  return fadeInTop(node, { scrollTrigger: node });
}

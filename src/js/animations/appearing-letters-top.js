import gsap from "gsap";
import { v4 as uuidv4 } from "uuid";

const defaultNode = ".appearing .inner";

export default function appearingLettersTop(node = defaultNode, options = {}) {
  return gsap.from(
    node,
    {
      id: uuidv4(),
      y: "110%",
      ...options,
    },
    "-=.1"
  );
}

export function waitForScroll(node = defaultNode) {
  return appearingLettersTop(node, { scrollTrigger: node });
}

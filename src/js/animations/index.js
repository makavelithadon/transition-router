import appearingLettersTop from "./appearing-letters-top";
import fadeInTop from "./fade-in-top";
import reveal from "./reveal";
import scrollTo from "./scroll-to";
import contextualAction from "./contextual-action";

export default function allAnimations(defaults) {
  return Object.entries({
    appearingLettersTop,
    fadeInTop,
    reveal,
    scrollTo,
    contextualAction,
  }).reduce(
    (animations, [animationName, animationFn]) => ({
      ...animations,
      [animationName]: () => animationFn(defaults),
    }),
    {}
  );
}

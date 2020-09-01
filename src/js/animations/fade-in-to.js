import gsap from "gsap";

const defaultNode = ".contextual-action";

function hasClass(node) {
  return function (classname) {
    return node.classList.contains(classname);
  };
}

export default function contextualActionFn(defaults) {
  defaults && gsap.defaults(defaults);

  const contextualAction = document.querySelector(".contextual-action");

  if (!contextualAction) return;

  gsap.from(contextualAction, {
    opacity: 0,
    [prop]: finalDistance,
    ease: "power2.out",
    duration: 1,
  });
}

export default function fadeInTo(node = defaultNode, options = {}) {
  const has = hasClass(node);

  const prop = has("top") || has("bottom") ? "y" : "x";

  const distance = 80;

  const finalDistance = has("top") || has("left") ? -distance : distance;

  const tween = gsap.from(node, {
    opacity: 0,
    [prop]: finalDistance,
    ease: "power2.out",
    duration: 1,
    ...options,
  });
  return tween;
}

export function waitForScroll(node = defaultNode, runningState) {
  const tween = fadeInTop(node, { scrollTrigger: node });
  tween.pause();
  if (!runningState) return tween;
  tween[runningState]();
}

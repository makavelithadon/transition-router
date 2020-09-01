import gsap from "gsap";

function hasClass(node) {
  return function (classname) {
    return node.classList.contains(classname);
  };
}

export default function contextualActionFn(defaults) {
  defaults && gsap.defaults(defaults);

  const contextualAction = document.querySelector(".contextual-action");

  const has = hasClass(contextualAction);

  const prop = has("top") || has("bottom") ? "y" : "x";

  const distance = 80;

  const finalDistance = has("top") || has("left") ? -distance : distance;

  gsap.from(contextualAction, {
    opacity: 0,
    [prop]: finalDistance,
    ease: "power2.out",
    duration: 1,
  });
}

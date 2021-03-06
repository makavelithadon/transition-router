import { promisify } from "@js/utils";
import gsap from "gsap";
import config from "@app/config/index.esm.js";

const { colors } = config;

export function run() {
  return promisify((res) => {
    gsap.set(".r-shape", { fill: colors.bg });
    gsap.set(".logo", { y: 20 });
    gsap.to(".logo", { opacity: 1, y: 0 });
    gsap.timeline().to("#splash", {
      y: "-110%",
      duration: 1.5,
      ease: "power4.inOut",
      onComplete: res,
      delay: 1,
      onComplete: () => {
        res();
        gsap.to(".r-shape", { fill: colors.fg }, "-=1");
      },
    });
  });
}

import { promisify } from "../utils.js";
import gsap from "../../../web_modules/gsap.js";
export function run() {
  return promisify(function (res) {
    gsap.set(".r-shape", {
      fill: "#fff"
    });
    gsap.set(".logo", {
      y: 20
    });
    gsap.to(".logo", {
      opacity: 1,
      y: 0
    });
    gsap.timeline().to("#splash", {
      y: "-110%",
      duration: 1.5,
      ease: "power4.inOut",
      onComplete: res,
      delay: 1
    });
  });
}
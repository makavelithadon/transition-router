import { promisify } from "@js/utils";
import gsap from "gsap";

export function run() {
  return promisify((res) => {
    gsap.set(".r-shape", { fill: "#fff" });
    gsap.set(".logo", { y: 20 });
    gsap.to(".logo", { opacity: 1, y: 0 });
    gsap
      .timeline()
      .to("#splash", {
        y: "-110%",
        duration: 1.5,
        ease: "power4.inOut",
        onComplete: res,
        delay: 1,
      })
      .to(".r-shape", { fill: "#000" }, "-=.6");
    /*gsap.timeline()
      .to()*/
  });
}

import { scrollTo as scrollToUtil } from "@js/utils";

export default function scrollTo() {
  const scrollToElements = document.querySelectorAll(`[data-scrollto]`);

  for (const element of [...scrollToElements]) {
    element.addEventListener("click", (e) => {
      scrollToUtil(
        document.querySelector(element.getAttribute("data-scrollto"))
      );
    });
  }
}

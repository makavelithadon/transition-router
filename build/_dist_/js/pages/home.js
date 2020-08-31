import "../../../web_modules/core-js/modules/es.array.concat.proxy.js";
import "../../../web_modules/core-js/modules/es.array.join.proxy.js";
import "../../../web_modules/core-js/modules/es.array.map.proxy.js";
import "../../../web_modules/core-js/modules/es.array.slice.proxy.js";
import "../../../web_modules/core-js/modules/es.function.name.proxy.js";
import yucoImg from "../../img/yuco-poster.png.proxy.js";
import clustreeImg from "../../img/clustree-poster.png.proxy.js";
var projects = [{
  id: "clustree",
  name: '<span class="appearing"><div class="inner">Clustree</div></span>',
  years: "2019 — 2020",
  img: clustreeImg,
  color: "#009aad"
}, {
  id: "yuco",
  name: '<span class="appearing"><div class="inner">Yuco</div></span><span class="appearing"><div class="inner" style="font-size: .6em;">ex WeHobby</div></span>',
  years: "2018",
  img: yucoImg,
  color: "#e54562"
}, {
  id: "my-check-experience",
  name: '<span class="appearing"><div class="inner">MyCheck</div></span><span class="appearing"><div class="inner">Experience</div></span>',
  years: "2015 — 2017",
  img: "",
  color: "#1d99dd"
}];
export default {
  path: "/",
  title: "Romuald Duconseil — Front-End Developper — Home",
  content: "\n  <section class=\"home\">\n    <h1>\n      <span class=\"appearing\"><div class=\"inner highlight\">Front-End</div></span>\n      <span class=\"appearing\"><div class=\"inner\">Developer</div></span>\n    </h1>\n    <p class=\"fade-in\">Hello,</p>\n    <p class=\"fade-in\">\n      Je m\u2019appelle Romuald Duconseil et je suis <span class=\"highlight ff-black\">Front-End Developer</span> depuis + de 4 ans, bas\xE9 \xE0 Paris, \n      et sp\xE9cialis\xE9 dans l\u2019utilisation de la librairie JavaScript React.\n    </p>\n    <p class=\"fade-in\">\n      J\u2019aime relever des nouveaux challenges et m\u2019am\xE9liorer dans mon domaine,\n      mais aussi acqu\xE9rir de nouvelles comp\xE9tences.\n    </p>\n    <div style=\"text-align: center;\" class=\"absolute bottom center fade-in\">\n      <span class=\"contextual-action bottom\" data-action=\"projects\" data-scrollto=\".projects\"></span>\n    </div>\n  </section>\n  <section class=\"projects\">\n    <ul class=\"projects-list\" id=\"projectsList\">\n      ".concat(projects.map(function (project, index) {
    return "<li class=\"project-article from-".concat(index % 2 === 0 ? "left" : "right", "\">\n              <div class=\"project-card\">\n                <a href=\"/projects/").concat(project.id, "\" class=\"project-card__link\">\n                  <div class=\"project-card__img-container\">\n                    <div class=\"img__layer\"></div>\n                    <img src=\"").concat(project.img, "\" class=\"project-card__img\" />\n                  </div>\n                  <div class=\"project-card__details\">\n                    <h1 class=\"project-card__name\">").concat(project.name, "</h1>\n                    <h2 class=\"project-card__years\">").concat(project.years, "</h2>\n                  </div>\n                  <span class=\"project-card__count\">").concat(("0" + (index + 1)).slice(-2), "</span>\n                </a>\n              </div>\n            </li>");
  }).join(""), "\n    </ul>\n  </section>\n")
};
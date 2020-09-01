import projects from "@js/projects";
import { createResponsiveImage } from "@js/utils";

export default {
  path: "/",
  title: "Romuald Duconseil — Front-End Developper — Home",
  content: `
  <section class="home">
    <h1>
      <span class="appearing"><div class="inner highlight">Front-End</div></span>
      <span class="appearing"><div class="inner">Developer</div></span>
    </h1>
    <p class="fade-in">
      <span class="color-secondary ff-black">Hello</span>, je m’appelle Romuald Duconseil et je suis <span class="highlight ff-black">Front-End Developer</span> depuis + de 4 ans, basé à Paris, 
      et spécialisé dans l’utilisation de la librairie JavaScript React.
    </p>
    <p class="fade-in">
      J’aime relever des nouveaux challenges et m’améliorer dans mon domaine,
      mais aussi acquérir de nouvelles compétences.
    </p>
    <div style="text-align: center;" class="absolute bottom center fade-in">
      <span class="contextual-action bottom" data-action="projects" data-scrollto=".projects"></span>
    </div>
  </section>
  <section class="projects">
    <ul class="projects-list" id="projectsList">
      ${projects
        .map(
          (project, index) =>
            `<li class="project-article from-${
              index % 2 === 0 ? "left" : "right"
            }">
              <div class="project-card">
                <a href="/${project.id}" class="project-card__link">
                  <div class="project-card__img-container">
                    <div class="img__reveal"></div>
                    ${createResponsiveImage(project.img, {
                      class: "project-card__img",
                    })}
                  </div>
                  <div class="project-card__details">
                    <h1 class="project-card__name">${project.name}</h1>
                    <h2 class="project-card__years">${project.years}</h2>
                  </div>
                  <span class="project-card__count">${("0" + (index + 1)).slice(
                    -2
                  )}</span>
                </a>
              </div>
            </li>`
        )
        .join("")}
    </ul>
  </section>
`,
};

import yucoImg from "@app/img/yuco-poster.jpg";

const projects = [
  {
    id: "clustree",
    name: "Clustree",
    years: "2019 — 2020",
    img: "",
  },
  {
    id: "yuco",
    name: "Yuco",
    years: "2018",
    img: yucoImg,
  },
  {
    id: "my-check-experience",
    name: "MyCheckExperience",
    years: "2015 — 2017",
    img: "",
  },
];

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
      <span class="ff-medium">Hello</span>,<br />
      Je m’appelle Romuald Duconseil et je suis <span class="highlight ff-black">Front-End Developer</span> depuis + de 4 ans, basé à Paris, 
      et spécialisé dans l’utilisation de la librairie JavaScript React.
    </p>
    <p class="fade-in">
      J’aime relever des nouveaux challenges et m’améliorer dans mon domaine,
      mais aussi acquérir de nouvelles compétences.
    </p>
    <div style="text-align: center;" class="absolute bottom center">
      <span class="contextual-action bottom" data-action="scroll"></span>
    </div>
  </section>
  <section>
    <ul class="projects-list">
      ${projects
        .map(
          (project) =>
            `<li style="background-image: url(${project.img});" class="project-item">
              <a class="project__link" href="/projects/${project.id}">
                <h1 class="project__name">${project.name}</h1>
                <h2 class="project__years">${project.years}</h2>
              </a>
            </li>`
        )
        .join("")}
    </ul>
  </section>
`,
};

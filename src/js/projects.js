import clustreeImg from "@app/img/clustree-poster-1920w.png";
import yucoImg from "@app/img/yuco-poster-1920w.png";

// generateImageSizesQuery(yucoImg);

export default [
  {
    id: "clustree",
    name:
      '<span class="appearing"><div class="inner">Clustree<span class="color-secondary">.</span></div></span>',
    years: "2019 — 2020",
    img: clustreeImg,
    color: "#009aad",
  },
  {
    id: "yuco",
    name:
      '<span class="appearing"><div class="inner">Yuco<span class="color-secondary">.</span></div></span><span class="appearing"><div class="inner" style="font-size: .6em;">ex WeHobby</div></span>',
    years: "2018",
    img: yucoImg,
    color: "#e54562",
  },
  {
    id: "my-check-experience",
    name:
      '<span class="appearing"><div class="inner">MyCheck</div></span><span class="appearing"><div class="inner">Experience<span class="color-secondary">.</span></div></span>',
    years: "2015 — 2017",
    img: "",
    color: "#1d99dd",
  },
];

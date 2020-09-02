const path = require("path");

const ROOT = process.cwd();

const ASSETS_FOLDER = "src";
const IMG_FOLDER = "img";

const assets = path.join(ROOT, ASSETS_FOLDER);
const images = path.join(assets, IMG_FOLDER);
const js = path.join(assets, "js");
const css = path.join(assets, "css");
const fonts = path.join(css, "font");
const build = path.join(ROOT, "build");

module.exports = {
  assets,
  images,
  js,
  css,
  fonts,
  build,
};

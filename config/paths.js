const path = require("path");

const ROOT = process.cwd();

const ASSETS_FOLDER = "src";
const IMG_FOLDER = "img";

const assets = path.join(ROOT, ASSETS_FOLDER);
const images = path.join(assets, IMG_FOLDER);

module.exports = {
  assets,
  images,
};

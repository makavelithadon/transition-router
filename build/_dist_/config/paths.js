import "../../web_modules/core-js/modules/es.array.join.proxy.js";

var path = require("path");

var ROOT = process.cwd();
var ASSETS_FOLDER = "src";
var IMG_FOLDER = "img";
var assets = path.join(ROOT, ASSETS_FOLDER);
var images = path.join(assets, IMG_FOLDER);
var js = path.join(assets, "js");
var css = path.join(assets, "css");
var fonts = path.join(css, "font");
module.exports = {
  assets: assets,
  images: images,
  js: js,
  css: css,
  fonts: fonts
};
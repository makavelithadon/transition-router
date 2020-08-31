const atImport = require("postcss-import")({
  from: "src/css/index.postcss",
});

const presetEnv = require("postcss-preset-env");
const autoprefixer = require("autoprefixer");
const nested = require("postcss-nested");
const vars = require("postcss-simple-vars");
const rucksack = require("rucksack-css");
const each = require("postcss-each");
const eachVars = require("postcss-each-variables");
const cssNano = require("cssnano");
const conditionals = require("postcss-conditionals");
const customMedia = require("postcss-custom-media");
const responsiveFont = require("postcss-responsive-font");
const fontSmoothing = require("postcss-font-smoothing");
const mixins = require("postcss-mixins");
const customSelectors = require("postcss-custom-selectors");

const syntax = "postcss-scss";

const plugins = [
  fontSmoothing,
  atImport,
  presetEnv,
  autoprefixer,
  mixins,
  conditionals,
  each,
  vars,
  nested,
  eachVars,
  customSelectors,
  rucksack,
  customMedia,
  responsiveFont,
];

const env = process.env.NODE_ENV;

if (env === "production") {
  plugins.push(cssNano);
}

module.exports = {
  syntax,
  plugins,
};

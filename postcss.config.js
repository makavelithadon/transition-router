const atImport = require("postcss-import")({
  from: "src/css/index.postcss",
});

const presetEnv = require("postcss-preset-env");
const autoprefixer = require("autoprefixer");
const nested = require("postcss-nested");
const vars = require("postcss-simple-vars");
const fontMagician = require("postcss-font-magician");
const rucksack = require("rucksack-css");
const each = require("postcss-each");
const eachVars = require("postcss-each-variables");
const cssNano = require("cssnano");
const conditionals = require("postcss-conditionals");
const customMedia = require("postcss-custom-media");

const breakpoints = require("./config/breakpoints");

/* const functions = require("postcss-functions")({
  functions: {
    getMedias() {
      return breakpoints;
    },
  },
}); */

const syntax = "postcss-scss";

const plugins = [
  atImport,
  presetEnv,
  autoprefixer,
  nested,
  eachVars,
  each,
  vars,
  fontMagician,
  rucksack,
  conditionals,
  customMedia,
  // functions,
];

const env = process.env.NODE_ENV;

if (env === "production") {
  plugins.push(cssNano);
}

module.exports = {
  syntax,
  plugins,
};

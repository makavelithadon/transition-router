const fs = require("fs");
const {
  paths: { fonts: fontsPath },
  utils: { getRelativePath },
} = require("./../../config");
const { mount: snowpackMount } = require(`${process.cwd()}/snowpack.config.js`);

const fonts = fs.readdirSync(fontsPath);

const replaceMountedFolders = (path) =>
  Object.entries(snowpackMount).reduce((acc, [search, replacer]) => {
    const formattedSearch = replacer.startsWith("/") ? `/${search}` : search;
    return acc.replace(formattedSearch, replacer);
  }, path);

const preloadedFonts = fonts.map((font) => ({
  url: `${replaceMountedFolders(getRelativePath(fontsPath))}/${font}`,
  type: font.slice(font.lastIndexOf(".") + 1),
}));

module.exports = {
  preloadedFonts,
};

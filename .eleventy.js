module.exports = function (eleventyConfig) {
  return {
    dataTemplateEngine: "pug",
    dir: {
      input: "views",
      output: "public",
    },
  };
};

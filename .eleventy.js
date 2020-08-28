module.exports = function (eleventyConfig) {
  //eleventyConfig.setPugOptions({ debug: true });
  return {
    dataTemplateEngine: "pug",
    dir: {
      input: "views",
      output: "public",
    },
  };
};

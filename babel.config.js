module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        debug: true,
        modules: false,
        corejs: {
          version: 3,
          proposals: true,
        },
      },
    ],
  ],
};

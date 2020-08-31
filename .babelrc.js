module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        debug: true,
        modules: process.env.NODE_ENV === "production" ? false : true,
        corejs: {
          version: 3,
          proposals: true,
        },
      },
    ],
  ],
};

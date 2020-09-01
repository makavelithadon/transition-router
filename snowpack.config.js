const extendedWebpackConfig = require("./webpack.extended-config");

module.exports = {
  devOptions: {
    fallback: "/index.html",
  },
  mount: {
    public: "/",
    src: "/_dist_",
  },
  alias: {
    "@app": "./src",
    "@css": "./src/css",
    "@js": "./src/js",
  },
  plugins: [
    "@snowpack/plugin-babel",
    [
      "@snowpack/plugin-run-script",
      {
        cmd: "postcss --verbose src/css/index.postcss -o src/css/index.css",
        watch: "$1 --watch",
      },
    ],
    [
      "@snowpack/plugin-run-script",
      {
        cmd: "eleventy",
        watch: "$1 --watch",
      },
    ],
    [
      "@snowpack/plugin-webpack",
      {
        outputPattern: {
          assets: "_dist_/img/build/[name].[ext]",
        },
        extendConfig: (config) => {
          config.plugins = [
            ...config.plugins,
            ...extendedWebpackConfig.plugins,
          ];
          return config;
        },
      },
    ],
  ],
};

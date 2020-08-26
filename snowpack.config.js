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
        cmd: "postcss src/css/index.postcss -o src/css/index.css",
        watch: "$1 --watch",
      },
    ],
  ],
};

const fs = require("fs");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const DonePlugin = require("./plugins/done-webpack-plugin");
const { paths } = require("./../src/config");
const cwd = process.cwd();

function create200HTML() {
  fs.writeFileSync(
    path.join(`${paths.build}/200.html`),
    fs.readFileSync(path.join(`${paths.build}/index.html`), "utf-8"),
    "utf-8"
  );
}

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: cwd + "/src/img/build/*.*",
          to: `${paths.build}/_dist_/img/build/[name].[ext]`,
          force: true,
        },
        {
          from: cwd + "/CNAME",
          to: paths.build,
        },
      ],
    }),
    new DonePlugin(create200HTML),
  ],
};

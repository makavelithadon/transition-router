const CopyWebpackPlugin = require("copy-webpack-plugin");
const cwd = process.cwd();

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: cwd + "/src/img/build/*.*",
          to: cwd + "/build/_dist_/img/build/[name].[ext]",
          force: true,
        },
      ],
    }),
  ],
};

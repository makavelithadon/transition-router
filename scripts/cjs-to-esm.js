const config = require("../src/config");
const rimraf = require("rimraf");
const fs = require("fs");

function run(pathFilename, content) {
  if (fs.existsSync(pathFilename)) {
    rimraf.sync(pathFilename, fs, () => console.log("done."));
  }
  fs.writeFileSync(pathFilename, content, "utf-8");
}

run(
  `${process.cwd()}/src/config/index.esm.js`,
  `export default ${JSON.stringify(config, null, 2)}`
);

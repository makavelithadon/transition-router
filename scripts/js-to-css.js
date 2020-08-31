const fs = require("fs");
const { paths, ...restConfig } = require("../src/config");
const rimraf = require("rimraf");

const cssExtension = "postcss";

const transformations = {
  colors(colorsObj) {
    return Object.entries(colorsObj).reduce(
      (str, [varName, value]) => str + `$${varName}: ${value};\r\n`,
      ""
    );
  },
  breakpoints(breakpoints) {
    const declarations = Object.entries(breakpoints.obj).reduce(
      (str, [varName, value]) => str + `$${varName}: ${toEm(value)}em;\r\n`,
      ""
    );
    const customMedias = Object.entries(breakpoints.obj).reduce(
      (str, [varName]) =>
        str +
        `@custom-media --${breakpoints.bindings[varName]} (${
          varName === "s" ? "max" : "min"
        }-width: $${varName});\r\n`,
      ""
    );
    return `${declarations}\r\n${customMedias}`;
  },
};

function toEm(px) {
  return px / 16;
}

function generateFile(pathFilename, content) {
  if (fs.existsSync(pathFilename)) {
    rimraf.sync(pathFilename, fs, () => console.log("done."));
  }
  fs.writeFileSync(pathFilename, content, "utf-8");
}

function run() {
  const jobs = [
    {
      path: `${paths.css}/variables`,
      transform: "colors",
    },
    {
      path: `${paths.css}/core`,
      transform: "breakpoints",
    },
  ];
  for (const job of jobs) {
    generateFile(
      `${job.path}/${job.transform}.${cssExtension}`,
      transformations[job.transform](restConfig[job.transform])
    );
  }
}

run();

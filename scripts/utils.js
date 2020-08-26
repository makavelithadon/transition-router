const fs = require("fs");
const path = require("path");

exports.mkDir = function mkDir(basePath, dirname = "") {
  console.log({ basePath, dirname });
  fs.mkdir(path.join(basePath, dirname), (err) => console.error(err));
};

exports.isDirectory = function isDirectory(basePath) {
  try {
    return fs.lstatSync(basePath).isDirectory();
  } catch (error) {
    return false;
  }
};

exports.replaceAll = function replaceAll(str, ...args) {
  return args.reduce(
    (acc, [search, replacer]) => acc.split(search).join(replacer),
    str
  );
};

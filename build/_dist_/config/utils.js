import "../../web_modules/core-js/modules/es.regexp.exec.proxy.js";
import "../../web_modules/core-js/modules/es.string.replace.proxy.js";

exports.getRelativePath = function (path) {
  return path.replace(process.cwd(), "");
};
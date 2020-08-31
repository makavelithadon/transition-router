const s = 320;
const m = 480;
const l = 768;
const xl = 1280;
const xxl = 1920;
const xxxl = 2560;

module.exports = {
  originalValues: [s, m, l, xl, xxl, xxxl],
  obj: {
    s,
    m,
    l,
    xl,
    xxl,
    xxxl,
  },
  bindings: {
    s: "small",
    m: "medium",
    l: "large",
    xl: "xlarge",
    xxl: "xxlarge",
    xxxl: "xxxlarge",
  },
};

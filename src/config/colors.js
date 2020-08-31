const { rgba } = require("polished");

module.exports = {
  pink: "#ea3a7a",
  blue: "#132b4f",
  purple: "#763aea",
  "purple-darken": "#361870",
  get primary() {
    return this.purple;
  },
  get "primary-darken"() {
    return this["purple-darken"];
  },
  get secondary() {
    return this.pink;
  },
  "original-black": "#000",
  get black() {
    return rgba(this["original-black"], 0.8);
  },
  get "black-darken"() {
    return rgba(this["original-black"], 0.95);
  },
  get grey() {
    return rgba(this["original-black"], 0.4);
  },
  get "grey-lighten"() {
    return rgba(this["original-black"], 0.2);
  },
  white: "#ffffff",
  get bg() {
    return this["black-darken"];
  },
  get "bg-2"() {
    return this.blue;
  },
  get fg() {
    return this.white;
  },
  get "fg-darken"() {
    return rgba(this.fg, 0.25);
  },
  get "highlight-color"() {
    return this.purple;
  },
  get "selection-color"() {
    return this.pink;
  },
};

module.exports = class DonePlugin {
  constructor(onDoneCallback = () => {}) {
    this.onDoneCallback = onDoneCallback;
  }
  apply(compiler) {
    compiler.hooks.done.tap("done-plugin", (compilation) =>
      this.onDoneCallback(compilation)
    );
  }
};

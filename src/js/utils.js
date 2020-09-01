import config from "@app/config/index.esm";

export const isFn = (n) => n && typeof n === "function";

export function isObject(n) {
  return Object.prototype.toString.call(n) === "[object Object]";
}

export function isObjectEmpty(n) {
  if (!isObject(n)) throw new Error(`${n} is not an object.`);
  return Object.keys(n).length <= 0;
}

export function areEqual(n, m) {
  return Object.is(n, m);
}

export function promisify(fn) {
  return new Promise((r) => fn(r));
}

export function getStyle(element, property) {
  return window.getComputedStyle(element).getPropertyValue(property);
}

export function getBreakpoint(value) {
  const realVal = Object.entries(config.breakpoints.bindings).find(
    ([k, v]) => v === value
  )[0];
  return config.breakpoints.obj[realVal];
}

export function scrollTo(element, options) {
  element.scrollIntoView(options || { block: "start", behavior: "smooth" });
}

export function onWindowResize(fn, initial = true) {
  let w = window.innerWidth;
  let h = window.innerHeight;
  window.addEventListener("resize", () => {
    if (window.innerWidth !== w || window.innerHeight !== h) {
      w = window.innerWidth;
      h = window.innerHeight;
      fn({ w, h });
    }
  });
  initial && fn({ w, h });
}

export function replaceAll(str, ...args) {
  return args.reduce(
    (acc, [search, replacer]) => acc.split(search).join(replacer),
    str
  );
}

export function createResponsiveImage(url, attrs = {}, alt, realSizes = []) {
  const imageName = url.slice(url.lastIndexOf("/") + 1);
  const reWidth = /\-[0-9]+w/gi;
  if (!reWidth.test(imageName)) return;
  const originaleWidth = Number(
    replaceAll((imageName.match(reWidth) || [""])[0], ["-", ""], ["w", ""])
  );
  const extension = imageName.slice(imageName.lastIndexOf(".") + 1);

  const buildFolder = "/_dist_/img/build";

  const fullNameWithoutSize = imageName
    .replace(`-${originaleWidth}w`, "")
    .replace(`.${extension}`, "");

  function getSizes(baseWidth) {
    return [
      ...config.breakpoints.originalValues.filter((v) => v < baseWidth),
      baseWidth,
    ];
  }

  function setSrcSet(sizes) {
    return sizes.map(
      (size) =>
        `${buildFolder}/${fullNameWithoutSize}-${size}w.${extension} ${size}w`
    );
  }

  function setSizes(sizes) {
    const lastSize = sizes.pop();
    return [
      ...sizes.map((size) => `(max-width: ${size}px) ${size}px`),
      `${lastSize}px`,
    ];
  }

  const finalSizes = getSizes(originaleWidth);

  const sets = setSrcSet(finalSizes);

  const altText =
    alt ||
    fullNameWithoutSize
      .split("-")
      .map((word, index) =>
        index === 0 ? word[0].toUpperCase() + word.slice(1) : word
      )
      .join(" ");

  return `<img
    srcset="${sets.join(", ")}"
    sizes="${setSizes(finalSizes).join(", ")}"
    src="${url}"
    alt="${altText}"
    ${Object.entries(attrs)
      .map(([attrName, attrValue]) => `${attrName}=${attrValue}`)
      .join("\r\n")}
  />`;
}

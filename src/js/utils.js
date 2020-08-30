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

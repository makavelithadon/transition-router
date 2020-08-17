export const isFn = (n) => n && typeof n === "function";

export function delay(n = 1000) {
  return new Promise((r) => setTimeout(r, n));
}

export function isObject(n) {
  return Object.prototype.toString.call(n) === "[object Object]";
}

export function isObjectEmpty(n) {
  if (!isObject(n)) throw new Error(`${n} is not an object.`);
  return Object.keys(n).length <= 0;
}

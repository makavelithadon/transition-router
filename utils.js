export const isFn = (n) => n && typeof n === "function";

export function delay(n = 1000) {
  return new Promise((r) => setTimeout(r, n));
}

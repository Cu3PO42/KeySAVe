export default function makeCachedFunction(fn) {
  const cache = new WeakMap();

  return function cached(arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }

    const res = fn(arg);
    cache.set(arg, res);
    return res;
  };
}

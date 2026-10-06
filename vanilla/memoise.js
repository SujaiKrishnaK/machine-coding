function memoize(fn) {
  const map = new Map();
  return (...args) => {
    let key = JSON.stringify(args);
    if (map.has(key)) return map.get(key);
    else {
      const result = fn(...args);
      map.set(key, result);
      return result;
    }
  };
}

const add = (a, b) => a + b;

const memoized = memoize(add);
console.log(memoized(3, 4));

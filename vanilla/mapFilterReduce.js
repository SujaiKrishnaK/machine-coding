let a = [-4, 10].reduce((acc, curr) => {
  return acc + curr;
}, 0);
console.log(a, "a");
Array.prototype.myReduce = function (cb, initial) {
  let hasInitial = arguments.length > 1;
  let acc = hasInitial ? initial : this[0];
  let startIndex = hasInitial ? 0 : 1;

  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      acc = cb(acc, this[i], i, this);
    }
  }
  return acc;
};
let b = [-4, 10].myReduce((acc, curr) => {
  return acc + curr;
}, 0);
console.log(a, b, "own reduce");

//blog.nandan.dev/polyfills-of-js-array-methods-flat-map-filter-and-reduce-because-why-not


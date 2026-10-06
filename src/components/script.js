const debounce = function (fn, wait) {
  let intervalId;
  return function (...args) {
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = setTimeout(function () {
      fn(...args);
    }, wait);
  };
};

let a = debounce((x) => console.log(x), 500);

setTimeout(() => {
  a(0);
}, 4000);
setTimeout(() => {
  a(1);
}, 4000);
setTimeout(() => {
  a(2);
}, 4000);
setTimeout(() => {
  a(3);
}, 4000);
setTimeout(() => {
  a(4);
}, 5000);
setTimeout(() => {
  a(5);
}, 5800);
setTimeout(() => {
  a(6);
}, 7000);

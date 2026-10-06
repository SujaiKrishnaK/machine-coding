const nFactorial = (n) => {
  if (n < 0) return 0;
  let result = 1;
  for (let i = 2; i < n; i++) {
    result *= i;
  }
  return result;
};

const nFactorialRecursive = (n) => {
  if (n > 0) {
    return n * nFactorialRecursive(n - 1);
  }
  return 1;
};
console.log(nFactorialRecursive(10));

const fibonacci = (n) => {
  let sequence = [0, 1];
  while (sequence.length < n) {
    sequence.push(
      sequence[sequence.length - 1] + sequence[sequence.length - 2],
    );
  }
  return sequence;
};

console.log(fibonacci(10));

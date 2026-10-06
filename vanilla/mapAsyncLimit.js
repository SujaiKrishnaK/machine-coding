// 1. The Fixed Implementation
async function MapAsyncLimit(iterable, size, cb) {
  const items = Array.from(iterable); // Fix: Converts correctly, prevents empty slots

  if (size === undefined || size >= items.length) {
    return Promise.all(items.map(cb));
  }

  const results = new Array(items.length); // Fix: Initializes correct array size
  let currIndex = 0;

  async function worker() {
    // Fix: The while loop keeps the worker alive until the queue is empty
    while (currIndex < items.length) {
      let index = currIndex++;
      results[index] = await cb(items[index]);
    }
  }

  const workers = [];
  for (let i = 0; i < size; i++) {
    workers.push(worker());
  }

  await Promise.all(workers);
  return results;
}

// 2. The Fixed Test Data
const iterable = [10, 20, 30, 40, 50];
const size = 2;

const cb = async (id) => {
  // Fix: Explicitly return the promise, and wrap resolve in a callback
  return new Promise((resolve) => {
    setTimeout(() => resolve(id * 2), id * 10);
  });
};

// 3. The Fixed Execution
// Fix: Use .then() to wait for the promise to resolve before logging
MapAsyncLimit(iterable, size, cb).then((finalArray) => {
  console.log("Final Results:", finalArray);
});

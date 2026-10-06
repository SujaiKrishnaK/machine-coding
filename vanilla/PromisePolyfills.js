// Behavior: Waits for all promises to resolve and returns an array of results.
// If any promise rejects, the whole thing rejects immediately ("fails fast").

// Interview Gotcha: You cannot use .push() to store the results. Promises resolve at different speeds, but Promise.all
// guarantees the output array perfectly matches the order of the input array. You must use the array index.
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    let promiseResults = [];
    let count = 0;
    if (promises.length > 0) {
      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then((res) => {
            promiseResults[index] = res;
            count++;

            if (count === promises.length) {
              resolve(promiseResults);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  });
};

// Behavior: It's exactly what it sounds like. The first promise to finish—whether it resolves OR rejects—wins the race and settles the main promise.
// Interview Gotcha: What happens if you pass an empty array to standard Promise.race([])? It actually hangs forever pending.
// Our polyfill will mimic that by simply never calling resolve or reject.

Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

// Behavior: The opposite of Promise.all. It waits for the first promise to resolve and ignores rejections.
// It ONLY rejects if ALL promises reject, throwing an AggregateError.
// Interview Gotcha: You have to track the errors.
// If everything fails, you must return an array of those errors bundled into an AggregateError.
Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    const errors = [];
    let count = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          errors[index] = err;
          count++;
          if (count === promises.length) {
            reject(new AggregateError(err, "All promises rejected"));
          }
        });
    });
  });
};
// Behavior: It waits for all promises to finish, regardless of whether they succeed or fail.
// It never rejects (unless you pass it something that isn't an array).
// Instead, it resolves with an array of objects describing the outcome of each promise.

// Success object: { status: "fulfilled", value: val }

// Failure object: { status: "rejected", reason: err }

// Interview Gotcha: Just like Promise.all,
// you must map the results to their exact original index.
// Because it never rejects the main Promise,
// you have to track the completion count inside both the .then() and .catch() blocks.

Promise.myAllSettled = function (promises) {
  return new Promise((resolve, reject) => {
    // Edge case: input is not iterable/array
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }

    // Edge case: empty array resolves immediately
    if (promises.length === 0) {
      return resolve([]);
    }

    const results = [];
    let completedCount = 0;

    // Helper function to check if we should resolve the main promise
    const checkCompletion = () => {
      completedCount += 1;
      if (completedCount === promises.length) {
        resolve(results);
      }
    };

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          // Format the success object and place it at the correct index
          results[index] = { status: "fulfilled", value: value };
          checkCompletion();
        })
        .catch((reason) => {
          // Format the failure object and place it at the correct index
          results[index] = { status: "rejected", reason: reason };
          checkCompletion();
        });
    });
  });
};

// Create some mock promises with different resolution times and states
const p1 = new Promise((resolve) =>
  setTimeout(() => resolve("p1 resolved (100ms)"), 100),
);
const p2 = new Promise((resolve) =>
  setTimeout(() => resolve("p2 resolved (200ms)"), 200),
);
const p3 = new Promise((_, reject) =>
  setTimeout(() => reject("p3 rejected (150ms)"), 150),
);
const p4 = Promise.resolve("p4 resolved immediately");
const p5 = Promise.reject("p5 rejected immediately");

console.log("--- Testing myRace ---");

// Test 1: First to finish is a resolution (p1 is 100ms, p2 is 200ms)
Promise.prototype
  .myRace([p1, p2])
  .then((res) => console.log("myRace Test 1 (Expected: p1 resolved):", res))
  .catch((err) => console.error("myRace Test 1 Failed:", err));

// Test 2: First to finish is a rejection (p3 is 150ms, p2 is 200ms)
Promise.prototype
  .myRace([p2, p3])
  .then((res) =>
    console.log("myRace Test 2 Failed (Should have rejected):", res),
  )
  .catch((err) => console.error("myRace Test 2 (Expected: p3 rejected):", err));

console.log("--- Testing myAllSettled ---");

// Test 1: All promises resolve successfully
Promise.prototype
  .myAllSettled([p1, p4])
  .then((res) =>
    console.log("myAllSettled Test 1 (Expected: All fulfilled):", res),
  );

// Test 2: Mix of resolved and rejected promises
Promise.prototype
  .myAllSettled([p1, p3, p5])
  .then((res) =>
    console.log(
      "myAllSettled Test 2 (Expected: Mix of fulfilled/rejected):",
      res,
    ),
  );

//   console.log("--- Testing myAll ---");

// Test 1: All promises resolve
// Uncomment once implemented:

Promise.prototype
  .myAll([p1, p2, p4])
  .then((res) =>
    console.log("myAll Test 1 (Expected: Array of 3 results):", res),
  )
  .catch((err) => console.error("myAll Test 1 Failed:", err));

// Test 2: One promise rejects (should fail fast)
// Uncomment once implemented:

Promise.prototype
  .myAll([p1, p3, p4])
  .then((res) =>
    console.log("myAll Test 2 Failed (Should have rejected):", res),
  )
  .catch((err) => console.error("myAll Test 2 (Expected: p3 rejected):", err));

Promise.prototype
  .myAny([p1, p3, p5])
  .then((res) => console.log("myAny Test 1 (Expected: p1 resolved):", res))
  .catch((err) => console.error("myAny Test 1 Failed:", err));

console.log("--- Testing myAny ---");

// Test 1: Mix of rejections and resolutions. It should ignore the early rejection (p5)
// and resolve with the first successful promise (p1 at 100ms).
// Uncomment once implemented:

Promise.prototype
  .myAny([p1, p3, p5])
  .then((res) => console.log("myAny Test 1 (Expected: p1 resolved):", res))
  .catch((err) => console.error("myAny Test 1 Failed:", err));

// Test 2: All promises reject. It should wait for all of them to fail,
// then reject (ideally with an AggregateError containing all reasons).
// Uncomment once implemented:

Promise.prototype
  .myAny([p3, p5])
  .then((res) =>
    console.log("myAny Test 2 Failed (Should have rejected):", res),
  )
  .catch((err) => {
    console.log("myAny Test 2 (Expected: All promises rejected):");
    console.error(err);
  });

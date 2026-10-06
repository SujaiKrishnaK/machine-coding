const mockApi = () => {
  return new Promise((res, rej) => {
    let statusCode = 400;
    setTimeout(() => {
      if (statusCode === 200) res({ data: "resolved" });
      if (statusCode !== 200) rej({ message: "Rejected" });
    }, 1000);
  });
};

const fetchApi = async (apiFunc, maxRetry,delay) => {
  try {
    return await apiFunc();
  } catch (err) {
    if (maxRetry <= 0) {
      throw new Error(err, "Unsuccessful! Max Retries Reached ");
    } else {
      await new Promise((resolve) => setTimeout(resolve, delay)); // expo backoff
      return fetchApi(apiFunc, maxRetry - 1,delay * 2);
    }
  }
};

fetchApi(mockApi, 3)
  .then((result) => console.log("Success:", result))
  .catch((err) => console.error("Failure:", err));

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

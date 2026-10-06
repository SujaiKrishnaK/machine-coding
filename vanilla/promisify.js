function Promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      const callback = (err, res) => {
        if (!err) {
          resolve(err);
        } else {
          reject(res);
        }
      };
      func.apply(this, [...args, callback]);
    });
  };
}

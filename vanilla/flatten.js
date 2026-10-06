/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
  if (!Array.isArray(value)) throw Error("Not an Array");
  let result = [];
  value.forEach((el) => {
    if (Array.isArray(el)) result.push(...flatten(el));
    else result.push(el);
  });

  return result;
}

const userProfile = {
  name: "Sujai",
  details: {
    experience: 5.5,
    location: {
      city: "Bengaluru",
      state: "Karnataka",
    },
  },
  skills: ["JavaScript", "React"],
};

// Expected Output:
// {
//   "name": "Sujai",
//   "details.experience": 5.5,
//   "details.location.city": "Bengaluru",
//   "details.location.state": "Karnataka",
//   "skills.0": "JavaScript",
//   "skills.1": "React"
// }
const flattenObject = (obj, prefix) => {
  let result = {};
  for (let key in obj) {
    let newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      let res = flattenObject(obj[key], newKey);
      result = { ...result, ...res };
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
};
console.log(flattenObject(userProfile), "res");

const deepClone = function (data) {
  // handle primitives
  if (typeof data !== "object") return data;

  // handle arrays
  if (Array.isArray(data)) {
    return data.map((x) => deepClone(x));
  }

  // handle Objects
  let obj = {};
  for (let key in data) {
    obj[key] = deepClone(data[key]);
  }
  return obj;
};

const edgeCases = {
  emptyArray: [],
  emptyObject: {},
  "spaced key name": "valid",
  123: "numeric key",
  nestedEmpties: [[[]], { a: {} }],
};

const deeplyNested = {
  store: {
    name: "Tech Central",
    address: {
      street: "123 Innovation Way",
      city: "San Francisco",
      geo: { lat: 37.7749, lng: -122.4194 },
    },
    inventory: [
      { id: "p1", details: { name: "Laptop", tags: ["electronics", "work"] } },
      { id: "p2", details: { name: "Mouse", tags: ["accessory"] } },
    ],
  },
};

const flatArray = [1, 2, 3, "apple", "banana", true];

const flatObject = {
  id: 101,
  username: "johndoe",
  isActive: false,
  role: null,
};

const testPrimitives = [
  null,
  undefined,
  true,
  false,
  42,
  3.14159,
  "Hello, World!",
  "",
];

console.log(testPrimitives === deepClone(testPrimitives));
console.log(flatArray === deepClone(flatArray));
console.log(flatObject === deepClone(flatObject));
console.log(testPrimitives === deepClone(testPrimitives));
console.log(deeplyNested === deepClone(deeplyNested));
console.log(edgeCases === deepClone(edgeCases));

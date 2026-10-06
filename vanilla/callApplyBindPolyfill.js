Function.prototype.myCall = function (context = window, ...args) {
  // 1. Ensure 'this' points to a valid function
  if (typeof this !== "function") {
    throw new TypeError(this + " is not a function");
  }

  // 2. Handle primitive context values (e.g., strings, numbers)
  if (context === null || context === undefined) {
    context = window; // Default to global object
  } else {
    context = Object(context); // Convert primitives to objects
  }

  // 3. Create a unique property on the context object to prevent overwriting
  const uniqueProp = Symbol("fn");

  // 4. Assign the original function (this) to the context
  context[uniqueProp] = this;

  // 5. Execute the function with arguments and store the result
  const result = context[uniqueProp](...args);

  // 6. Clean up by deleting the temporary property
  delete context[uniqueProp];

  // 7. Return the function execution result
  return result;
};

Function.prototype.myApply = function (context = window, argsArray = []) {
  if (typeof this !== "function") {
    throw new TypeError(this + " is not a function");
  }

  // Ensure the second parameter is array-like
  if (
    argsArray &&
    !Array.isArray(argsArray) &&
    typeof argsArray.length !== "number"
  ) {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  }

  if (context === null || context === undefined) {
    context = window;
  } else {
    context = Object(context);
  }

  const uniqueProp = Symbol("fn");
  context[uniqueProp] = this;

  // Execute using spread operator on the array
  const result = context[uniqueProp](...argsArray);

  delete context[uniqueProp];
  return result;
};

Function.prototype.myBind = function (context, ...boundArgs) {
  if (typeof this !== "function") {
    throw new TypeError(this + " is not a function");
  }

  // Store reference to the original function
  const originalFunc = this;

  return function (...callArgs) {
    // Merge initial parameters with parameters from eventual execution
    return originalFunc.myCall(context, ...boundArgs, ...callArgs);
  };
};


const user = {
  name: 'Alex'
};

function introduce(age, country) {
  return `${this.name} is ${age} years old and lives in ${country}.`;
}

// Test myCall
console.log(introduce.myCall(user, 25, 'India')); 
// Output: "Alex is 25 years old and lives in India."

// Test myApply
console.log(introduce.myApply(user, [30, 'USA'])); 
// Output: "Alex is 30 years old and lives in USA."

// Test myBind
const boundLog = introduce.myBind(user, 35);
console.log(boundLog('UK')); 
// Output: "Alex is 35 years old and lives in UK."

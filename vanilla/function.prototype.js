Function.prototype.mycall = function (context = window, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Must be called on valid function");
  }
  if (context == null || context == undefined) {
    context = window;
  } else {
    context = Object(context);
  }

  const uniq = Symbol("fn");

  context[uniq] = this;

  let res = context[uniq](...args);
  delete context[uniq];
  return res;
};

Function.prototype.myApply = function (context = window, args = []) {
  if (typeof this !== "function") {
    throw new TypeError(this + "is not a function");
  }

  if (context === null || context === undefined) {
    context = window;
  } else {
    context = Object(context);
  }

  const func = Symbol("fn");
  context[func] = this;

  const res = context[func](...args);

  delete context[func];
  return res;
};

Function.prototype.myBind = function (context = window, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(this + "is not a function");
  }

  const original = this;

  return function (...innerOrgs) {
    return original.myCall(context, ...args, ...innerOrgs);
  };
};

Function.prototype.simpleCall = function (context = window, ...args) {
  context["originalFn"] = this;
  let res = context["originalFn"](...args);
  delete context["originalFn"];
  return res;
};
Function.prototype.simpleApply = function (context = window, argsArray) {
  context["originalFn"] = this;
  let res = context["originalFn"](...argsArray);
  delete context["originalFn"];
  return res;
};
Function.prototype.simpleBound = function (context = window, ...outerArgs) {
  let original = this;
  return function (...innerArgs) {
    return original.mycall(context, ...outerArgs, ...innerArgs);
  };
};

let context = {
  fname: "sujai",
  lname: "krishna",
};

function getName(...args) {
  return this.fname + this.lname + " " + args;
}

console.log(getName.call(context, 24, 100, 500));
console.log(getName.simpleCall(context, 24, 100, 500), "simple");
console.log(getName.simpleApply(context, [24, 100, 500]), "simple Apply");
let boundfn = getName.bind(context, 100, 200);
let simpleBoundFn = getName.simpleBound(context, 100, 200);
console.log(boundfn("abc"), "bound");
console.log(simpleBoundFn("abc"), "simple bound");

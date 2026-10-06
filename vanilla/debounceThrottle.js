// import "./styles.css";
let inp = document.getElementById("throttleinput");
let tel = document.getElementById("throttleresult");
let del = document.getElementById("debounceresult");

const debounce = (fn, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
// complete throttle with edge case
const throttle = (fn, delay) => {
  let shdWait = false;
  let waitArgs;
  const timeFunc = () => {
    if (waitArgs === null) {
      shdWait = false;
    } else {
      fn(...waitArgs);
      waitArgs = null;
      setTimeout(timeFunc, delay);
    }
  };
  return (...args) => {
    if (shdWait) {
      waitArgs = args;
      return;
    }
    fn(...args);
    shdWait = true;
    setTimeout(timeFunc, delay);
  };
};
// this doesnt handle edge case
export default function throttle(func, wait) {
  // 1. Declare the flag outside so its state is preserved across calls
  let shouldWait = false;

  // Note: Using a standard 'function' instead of an arrow function '() =>'
  // is best practice here so it properly preserves the 'this' context.
  return function (...args) {
    // 2. If we are currently in a cooling down period, ignore the call
    if (shouldWait) return;

    // 3. Execute the function immediately (preserving context)
    func.apply(this, args);

    // 4. Turn on the waiting state
    shouldWait = true;

    // 5. After 'wait' milliseconds, turn off the waiting state
    setTimeout(() => {
      shouldWait = false;
    }, wait);
  };
}
const throttleEdgeCase = function (fn, delay) {
  let shdWait = false;
  let waitArgs = null;
  let timeoutFunc = () => {
    if (waitArgs === null) {
      shdWait = false;
    } else {
      fn(...waitArgs);
      waitArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };
  return (...args) => {
    if (shdWait) {
      waitArgs = args;
      return;
    }
    fn(...args);
    shdWait = true;
    setTimeout(timeoutFunc, delay);
  };
};

let debouncedFunc = debounce((e) => {
  del.textContent = e.target.value;
}, 1000);
let throttleFunc = throttle((e) => {
  tel.textContent = e.target.value;
}, 1000);

inp.addEventListener("input", debouncedFunc);
inp.addEventListener("input", throttleFunc);


const throttle = function (cb, delay) {
    let timeoutId;
    let lastExec = 0;
    let latestArgs;
    return function (...args) {
        let elapsed = Date.now() - lastExec;
        latestArgs = args;
        if (elapsed > delay) {
            cb(...latestArgs)
            lastExec = Date.now()
        } else if(!timeoutId){            
            let remaining = delay - elapsed
            timeoutId = setTimeout(() => {
                cb(...latestArgs)
                lastExec = Date.now();
                timeoutId = null
            }, remaining)
        }
    }
}


const throttled = throttle((arg) => console.log(arg), 2000);

throttled("x")
throttled("y")
throttled("z")
throttled("a")
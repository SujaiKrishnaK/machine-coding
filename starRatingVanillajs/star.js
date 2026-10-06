// UTITLITY
const throttle = (fn, delay) => {
  let shdWait = false;
  let waitArgs = null;

  const invokeFn = () => {
    if (waitArgs === null) {
      shdWait = false;
    } else {
      fn.apply(this, ...waitArgs);
      waitArgs = null;
      setTimeout(invokeFn, delay);
    }
  };
  return (...args) => {
    if (shdWait) {
      waitArgs = args;
      return;
    }

    fn.apply(this, ...args);
    shdWait = true;
    setTimeout(invokeFn, delay);
  };
};

let starValue = 3.5;
let currHoverValue = 3.5;
const maxValue = 5;
const app = document.getElementById("app");
const wrapper = document.createElement("div");
wrapper.setAttribute("id", "star-rating");
if (app) app.append(wrapper);

function star() {
  const starSpan = document.createElement("span");
  starSpan.innerHTML = "*";
  return starSpan;
}

function createStarWrapper(type = "", index) {
  const starWrapper = document.createElement("div");
  starWrapper.setAttribute("class", `${type}-star`);
  starWrapper.addEventListener("mousemove", (e) => {
    const { left, width } = e.target.getBoundingClientRect();
    let percent = (e.clientX - left) / width;
    if (percent < 0.5) {
      currHoverValue = index + 0.5;
    } else {
      currHoverValue = index + 1;
    }
    throttledRender();
  });
  starWrapper.addEventListener("mouseleave", (e) => {
    currHoverValue = starValue;
    throttledRender();
  });
  starWrapper.addEventListener("click", (e) => {
    starValue = currHoverValue;
    throttledRender();
  });
  if (type === "half") {
    starWrapper.append(star(), star());
  } else {
    starWrapper.append(star());
  }
  return starWrapper;
}

function render() {
  app.innerHTML = "";
  let arr = Array.from({ length: maxValue }).map((x, index) => {
    if (index + 1 <= currHoverValue) return createStarWrapper("full", index);
    else if (index + 0.5 === currHoverValue)
      return createStarWrapper("half", index);
    else return createStarWrapper("default", index);
  });
  const fragment = document.createDocumentFragment();
  arr.forEach((node) => fragment.appendChild(node));

  app.append(fragment);
}
const throttledRender = throttle(render, 200);
throttledRender();

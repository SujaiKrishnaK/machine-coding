import React, { useEffect, useState } from "react";
import "./index.css";
const map = {
  red: 3000,
  yellow: 2000,
  green: 4000,
};
const TrafficLights = () => {
  const [active, setActive] = useState("red");

  useEffect(() => {
    let timeout = map[active];
    let timeoutId = setTimeout(() => {
      let index = Object.keys(map).indexOf(active);
      const nextActive = (index + 1) % Object.keys(map).length;
      setActive(Object.keys(map)[nextActive]);
    }, timeout);
    return () => clearTimeout(timeoutId);
  }, [active]);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="lights">
        <div
          className={`default ${active === "red" ? "red" : "default-color "}`}
        ></div>
        <div
          className={`default ${active === "yellow" ? "yellow" : "default-color "}`}
        ></div>
        <div
          className={`default ${active === "green" ? "green" : "default-color "}`}
        ></div>
      </div>
    </div>
  );
};
export default TrafficLights;

import React from "react";
import { useState, useEffect } from "react";
import "./index.css";

function FillUnfill() {
  const [count, setCount] = useState(0);
  const [box, setBox] = useState(Array(9).fill(undefined));
  const [start, setStart] = useState(0);
  useEffect(() => {
    if (box.every((x) => x >= 0)) {
      box.forEach((b, index) => {
        setTimeout(
          () => {
            setBox((prev) => {
              const newBox = [...prev];
              newBox[index] = undefined;
              return newBox;
            });
            if (index === 8) setStart(0);
          },
          (b + 1) * 1000,
        );
      });
    }
  }, [box]);

  const onClick = (index) => {
    if (start <= 8) {
      let duplicatedBox = [...box];
      duplicatedBox[index] = start;
      setStart((prev) => prev + 1);
      setBox(duplicatedBox);
    }
  };

  return (
    <div className="main-container">
      {box.map((x, index) => {
        return (
          <div
            className={`box ${x >= 0 ? "active" : ""}`}
            onClick={() => onClick(index)}
            key={index}
          >
            {x}
          </div>
        );
      })}
    </div>
  );
}

export default FillUnfill;

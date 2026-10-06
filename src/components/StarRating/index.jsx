import { useState } from "react";
import "./index.css";

const FILL_TYPE = {
  FULL: "full",
  HALF: "half",
};
const Star = ({
  fill = FILL_TYPE.FULL,
  onMouseMove,
  onMouseLeave,
  onClick,
}) => {
  if (fill === FILL_TYPE.HALF) {
    return (
      <div
        className="wrapper"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <span className="star left">*</span>
        <span className="star right">*</span>
      </div>
    );
  } else if (fill === FILL_TYPE.FULL) {
    return (
      <div
        className="wrapper"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <span className="star full-star">*</span>
      </div>
    );
  } else {
    return (
      <div
        className="wrapper"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <span className="star">*</span>
      </div>
    );
  }
};

export default function StarRating({ max, value, setStarValue }) {
  const [currValue, setCurrValue] = useState(value);
  const onMouseMove = (e, index) => {
    let { left, width } = e.currentTarget.getBoundingClientRect();
    let percent = (e.clientX - left) / width;
    if (percent <= 0.5) {
      setCurrValue(index + 0.5);
    } else {
      setCurrValue(index + 1);
    }
  };
  const onMouseLeave = () => setCurrValue(value);
  return (
    <div style={{ display: "flex" }}>
      {Array.from({ length: max }).map((x, index) => {
        let fill = "";
        if (index + 1 <= currValue) {
          fill = FILL_TYPE.FULL;
        } else if (index + 1 === currValue + 0.5) {
          fill = FILL_TYPE.HALF;
        }
        return (
          <Star
            fill={fill}
            onMouseLeave={onMouseLeave}
            onMouseMove={(e) => onMouseMove(e, index)}
            onClick={() => setStarValue(currValue)}
          />
        );
      })}
    </div>
  );
}

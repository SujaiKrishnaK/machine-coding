import React, { useContext, useRef, useState } from "react";
import "./index.css";
import { ToastContext } from "../../Contexts/toastContext";

const OTPInput = ({ max, setOtp }) => {
  const [value, setValue] = useState({});
  const ref = useRef(new Map());
  const toastContext = useContext(ToastContext);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        onClick={() =>
          toastContext("How are you?", "SUCCESS", "3000", "topLeft")
        }
      >
        Toast
      </button>
      <button onClick={() => toastContext("Hi", "DEFAULT", "3000", "topRight")}>
        Toast
      </button>
      <button
        onClick={() => toastContext("Hello", "SUCCESS", "3000", "bottomLeft")}
      >
        Toast
      </button>
      <button
        onClick={() =>
          toastContext("How are you?", "INFO", "3000", "bottomRight")
        }
      >
        Toast
      </button>
      <h1>OTP Input</h1>

      {Array.from({ length: max }).map((el, index) => {
        return (
          <input
            key={index}
            ref={(node) => {
              let map = ref.current;
              if (node) {
                map.set(index, node);
              }
            }}
            id={`otp-${index}`}
            value={value[index]}
            type="number"
            className="inputbox"
            onChange={(e) => {
              let val = e.target.value;
              console.log(val);
              if (e.target.value > 1) {
                val = val.slice(-1);
              }
              if (index < max) {
                let nextIndex = ref.current.get(index + 1);
                if (nextIndex) nextIndex.focus();
              }
              console.log(value, index, val);
              setValue((prev) => ({ ...prev, [index]: val }));
            }}
          />
        );
      })}
      <button
        onClick={() => {
          let val = Object.values(value).join("");
          setOtp(val);
        }}
      >
        Submit
      </button>
    </div>
  );
};
export default OTPInput;

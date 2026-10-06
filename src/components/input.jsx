import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";

export default function Input() {
  const [value, setValue] = useState("");
  let debounced = useDebounce(value, 3000);
  let throttled = useThrottle(value, 2000);
  return (
    <>
      <input
        name="Debounced Input"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <p>{debounced}</p>
      <p>{throttled}</p>
    </>
  );
}

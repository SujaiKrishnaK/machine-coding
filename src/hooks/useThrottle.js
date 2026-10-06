import React, { useState, useRef, useEffect } from "react";

export default function useThrottle(value, delay = 1000) {
  const [throttledValue, setThrottledValue] = useState("");
  const lastExec = useRef(Date.now());

  useEffect(() => {
    let elapsed = Date.now() - lastExec.current;
    let timeoutId;
    if (elapsed >= delay) {
      setThrottledValue(value);
      lastExec.current = Date.now();
    } else {
      const remainingTime = delay - elapsed;
      timeoutId = setTimeout(() => {
        setThrottledValue(value);
        lastExec.current = Date.now(); 
      }, remainingTime);
    }
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return throttledValue;
}

// import { useRef, useCallback } from 'react';

// export function useThrottleFn(fn, delay = 500) {
//   const lastTimeRef = useRef(0);
//   const fnRef = useRef(fn);

//   // Keep the latest function ref
//   fnRef.current = fn;

//   return useCallback((...args) => {
//     const now = Date.now();
//     if (now - lastTimeRef.current >= delay) {
//       lastTimeRef.current = now;
//       fnRef.current(...args);
//     }
//   }, [delay]);
// }

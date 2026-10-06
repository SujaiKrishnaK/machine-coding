import { useEffect, useState } from "react";

export const useFetch = ({ url, method }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  
  useEffect(() => {
    let isCurrent = true
    const controller = new AbortController();
    const { signal } = controller;
    async function getData() {
      setLoading(true);
      try {
        const res = await fetch(url, { method, signal });
        const data = await res.json();
        if(!isCurrent) return
        setLoading(false);
        setData(data);
      } catch (error) {
        if(!isCurrent) return
        setLoading(false);
        if (error.name !== "AbortError") {
          console.error(error, "Error");
          setError(error);
        }
      }
    }
    getData();
    return () => {
      isCurrent = false
      controller.abort();
    };
  }, [url, method]);

  return { loading, error, data };
};

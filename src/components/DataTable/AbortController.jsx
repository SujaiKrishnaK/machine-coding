import { useState, useEffect } from "react";

// Module-level cache persists across component unmounts
const cache = new Map();

export function useNativeFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Edge case: don't fetch if there's no URL (e.g., empty search box)
    if (!url) {
      setData(null);
      return;
    }

    // 1. CACHE CHECK: If we have the data, return it instantly
    if (cache.has(url)) {
      setData(cache.get(url));
      return;
    }

    // 2. RACE CONDITION PREVENTION: Initialize the AbortController
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        // 3. Defensive state setting: only update if the request wasn't aborted
        if (!signal.aborted) {
          cache.set(url, result); // Save to cache
          setData(result); // Update UI
        }
      } catch (err) {
        // Ignore abort errors, as they are intentional. Log real errors.
        if (err.name !== "AbortError" && !signal.aborted) {
          setError(err.message);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // 4. CLEANUP: Abort the previous request if the URL changes before it finishes
    return () => {
      controller.abort();
    };
  }, [url]); // Re-run whenever the URL changes

  return { data, loading, error };
}

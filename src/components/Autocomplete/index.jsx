import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import useDebounce from "../../hooks/useDebounce";

const promise = new Promise((r, e) => setTimeout(() => e(), 4000));

export default function AutoComplete() {
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    if (activeIndex > -1 && listRef.current.children.length) {
      let active = listRef.current.children[activeIndex];
      active.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);
  useEffect(() => {
    const fetchData = async () => {
      if (debouncedSearchTerm.length === 0) {
        setOptions([]);
        return;
      }
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?q=${debouncedSearchTerm}`,
      );
      if (!res.ok) {
        console.error(res.message);
      }
      const response = await res.json();
      const options = await response.map((obj) => obj.title);
      setOptions(options);
    };
    fetchData();
  }, [debouncedSearchTerm]);

  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + options.length) % options.length);
        break;
      case "Enter":
        e.preventDefault();
        setSearchTerm(options[activeIndex]);
    }
  };

  // https://jsonplaceholder.typicode.com/posts?q=dele

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ height: "60%", justifyContent: "center" }}>
        <input
          ref={inputRef}
          name="Search Input"
          className={
            options.length > 0
              ? "search searched-input"
              : "search default-input"
          }
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onKeyDown={onKeyDown}
        />

        {options.length > 0 && (
          <ul ref={listRef}>
            {options.map((opt, index) => {
              return (
                <li
                  style={{
                    backgroundColor: activeIndex === index ? "beige" : "",
                  }}
                >
                  {opt}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";

const MOCK_DATA = Array.from({ length: 10000 }, (_, index) => ({
  id: index + 1,
  title: `Item ${index + 1}`,
  description: `This is the description for item number ${index + 1}.`,
  value: Math.floor(Math.random() * 1000),
}));
const WINDOW_HEIGHT = 500;
const ITEM_HEIGHT = 30;
const SCROLL_HEIGHT = MOCK_DATA.length * ITEM_HEIGHT;

const Virtualized = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - 3);
  const endIndex = Math.min(
    MOCK_DATA.length - 1,
    Math.floor(scrollTop + WINDOW_HEIGHT / ITEM_HEIGHT) + 3,
  );
  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };
  const visualItems = MOCK_DATA.slice(startIndex, endIndex + 1).map(
    (x, index) => {
      let actualIndex = startIndex + index;
      return {
        ...x,
        actualIndex,
        offsetTop: actualIndex * ITEM_HEIGHT,
      };
    },
  );
  return (
    <>
      <input
        style={{ width: "150px", margin: 0, padding: 0 }}
        name="searchInput"
        placeholder="Search"
      ></input>
      <div
        style={{
          border: "1px solid red",
          height: WINDOW_HEIGHT,
          width: "150px",
          overflowY: "scroll",
        }}
        onScroll={handleScroll}
      >
        <ul
          style={{
            height: SCROLL_HEIGHT,
            position: "relative",
            padding: 0,
            margin: 0,
          }}
        >
          {visualItems.map((x, index) => {
            return (
              <li
                key={x.id}
                style={{
                  position: "absolute",
                  top: "0",
                  backgroundColor: index % 2 === 0 ? "blue" : "pink",
                  height: ITEM_HEIGHT,
                  transform: `translateY(${x.offsetTop}px)`,
                  width: "100%",
                  textDecoration: "none",
                  listStyle: "none",
                }}
              >
                {x.title}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Virtualized;

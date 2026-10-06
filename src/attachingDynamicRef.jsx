import { useRef } from "react";

export default function DynamicList() {
  // 1. Create a single ref to hold our Map
  const itemsRef = useRef(null);

  // Helper function to initialize and get the Map
  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  // Sample data
  const items = [
    { id: "item-1", text: "First Item" },
    { id: "item-2", text: "Second Item" },
    { id: "item-3", text: "Third Item" },
  ];

  // Example function: Scroll to a specific list item
  const scrollToId = (itemId) => {
    const map = getMap();
    const node = map.get(itemId);

    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "nearest" });
      // You can also manipulate the node directly, e.g., node.focus()
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        {items.map((item) => (
          <button key={item.id} onClick={() => scrollToId(item.id)}>
            Go to {item.text}
          </button>
        ))}
      </div>

      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            // 2. Use a callback ref to add the DOM node to our Map
            ref={(node) => {
              const map = getMap();
              if (node) {
                // If the element is mounting, add it to the Map
                map.set(item.id, node);
              } else {
                // If the element is unmounting, remove it from the Map
                map.delete(item.id);
              }
            }}
            style={{ padding: "50px 0", borderBottom: "1px solid #ccc" }}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

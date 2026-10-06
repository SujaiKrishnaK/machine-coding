// import React, { useState, useEffect, useRef, UIEvent } from 'react';

// // Configuration constants
// const ITEM_HEIGHT = 50;       // Height of each single row in pixels
// const VISIBLE_COUNT = 10;     // Number of items that fit inside viewport height
// const OVERSCAN = 5;           // Buffer elements to render above/below the fold
// const BATCH_SIZE = 50;        // Size of network requests

// // Simulated API payload fetcher
// const fetchMockApi = async (offset: number): Promise<string[]> => {
//   await new Promise((resolve) => setTimeout(resolve, 250)); // Network delay
//   return Array.from({ length: BATCH_SIZE }, (_, i) => `Data Item #${offset + i + 1}`);
// };

// export default function VanillaVirtualizedList() {
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   // App state
//   const [allItems, setAllItems] = useState<string[]>([]);
//   const [totalRecords] = useState(10000); // Simulated large server database count
//   const [scrollTop, setScrollTop] = useState(0);
//   const [isFetching, setIsFetching] = useState(false);

//   // 1. Calculate active slice bounds mathematically on every scroll update
//   let startIndex = Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN;
//   startIndex = Math.max(0, startIndex); // Prevent negative array lookups

//   let endIndex = startIndex + VISIBLE_COUNT + (OVERSCAN * 2);
//   endIndex = Math.min(totalRecords - 1, endIndex);

//   // 2. Fetch trailing records when scrolling near the end of the current local cache
//   useEffect(() => {
//     if (endIndex >= allItems.length - 10 && allItems.length < totalRecords && !isFetching) {
//       setIsFetching(true);
//       fetchMockApi(allItems.length).then((newItems) => {
//         setAllItems((prev) => [...prev, ...newItems]);
//         setIsFetching(false);
//       });
//     }
//   }, [endIndex, allItems.length, totalRecords, isFetching]);

//   // Initial mount load
//   useEffect(() => {
//     setIsFetching(true);
//     fetchMockApi(0).then((initialItems) => {
//       setAllItems(initialItems);
//       setIsFetching(false);
//     });
//   }, []);

//   // Native UI scroll listener to update visible bounds
//   const handleScroll = (e: UIEvent<HTMLDivElement>) => {
//     setScrollTop(e.currentTarget.scrollTop);
//   };

//   // 3. Compute layout dimensions
//   const totalHeight = totalRecords * ITEM_HEIGHT; // Overall tall virtual canvas track
//   const offsetY = startIndex * ITEM_HEIGHT;       // Shift relative to top viewport

//   // Construct UI DOM slices for current frame
//   const visibleItemsToRender = [];
//   for (let i = startIndex; i <= endIndex; i++) {
//     visibleItemsToRender.push({
//       index: i,
//       data: allItems[i], // Will evaluate to undefined if network is still pending
//     });
//   }

//   return (
//     <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
//       <h3>Custom React Virtualized List (No Libraries)</h3>

//       {/* Scroll Viewport Window Container */}
//       <div
//         ref={scrollContainerRef}
//         onScroll={handleScroll}
//         style={{
//           height: `${VISIBLE_COUNT * ITEM_HEIGHT}px`, // Fixed explicit height
//           width: '400px',
//           overflowY: 'auto',
//           border: '2px solid #222',
//           position: 'relative',
//           background: '#fff',
//         }}
//       >
//         {/* Invisible Track Runway: Directing the browser scrollbar length */}
//         <div style={{ height: `${totalHeight}px`, width: '100%', position: 'absolute', top: 0, left: 0 }} />

//         {/* Dynamic Display Board: Shifts down smoothly to match viewport position */}
//         <div
//           style={{
//             transform: `translateY(${offsetY}px)`,
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             willChange: 'transform',
//           }}
//         >
//           {visibleItemsToRender.map((item) => (
//             <div
//               key={item.index}
//               style={{
//                 height: `${ITEM_HEIGHT}px`,
//                 display: 'flex',
//                 alignItems: 'center',
//                 padding: '0 16px',
//                 borderBottom: '1px solid #eee',
//                 boxSizing: 'border-box',
//                 background: '#fff',
//               }}
//             >
//               {item.data ? (
//                 <span>{item.data}</span>
//               ) : (
//                 <span style={{ color: '#aaa', fontStyle: 'italic' }}>Loading row context...</span>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

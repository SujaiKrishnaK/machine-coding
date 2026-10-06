// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// app.get("/events", (req, res) => {
//   // Required SSE headers
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");

//   // Flush headers immediately
//   res.flushHeaders();

//   let count = 0;

//   const interval = setInterval(() => {
//     const eventData = {
//       id: count,
//       status: ["RECEIVED", "EVALUATED", "DECISIONED", "FAILED"][count % 4],
//       timestamp: new Date().toISOString(),
//     };

//     res.write(`data: ${JSON.stringify(eventData)}\n\n`);

//     count++;
//   }, 1000);

//   req.on("close", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//     res.end();
//   });
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/events", (req, res) => {
  // Required SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const statuses = ["RECEIVED", "EVALUATED", "DECISIONED", "FAILED"];

  // Create exactly 10 IDs and track their current status index
  const items = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    statusIndex: 0,
  }));

  const interval = setInterval(() => {
    // Pick a random item from the 10 to update
    const randomIndex = Math.floor(Math.random() * items.length);
    const item = items[randomIndex];

    // Cycle to the next status for this specific ID
    item.statusIndex = (item.statusIndex + 1) % statuses.length;

    const eventData = {
      id: item.id,
      status: statuses[item.statusIndex],
      timestamp: new Date().toISOString(),
    };

    res.write(`data: ${JSON.stringify(eventData)}\n\n`);
  }, 1000); // Emits an update for one of the 10 IDs every second

  req.on("close", () => {
    console.log("Client disconnected");
    clearInterval(interval);
    res.end();
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

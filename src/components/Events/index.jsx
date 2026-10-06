import { useEffect, useState, useRef, memo } from "react";
import "./index.css";

const Events = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const events = new EventSource("http://localhost:3000/events");

    events.onopen = () => {
      setIsConnected(true);
    };
    events.onmessage = (message) => {
      const newMessage = JSON.parse(message.data);

      setData((prevData) => {
        const d = [...prevData];
        let index = d.findIndex((x) => x.id === newMessage.id);

        if (index > -1) {
          d[index] = newMessage;
        } else {
          d.push(newMessage);
        }

        return d;
      });
    };

    return () => {
      events.close();
      setData([]);
    };
  }, []);

  if (data.length > 10) {
    setData((prev) => {
      let d = [...prev];
      return d.slice(-3);
    });
  }

  const Row = memo(({ id, status, timestamp }) => {
    return (
      <>
        <tr>
          <td>{id}</td>
          <td>
            <span key={status}>{status}</span>
          </td>
          <td>{timestamp}</td>
        </tr>
      </>
    );
  });

  return (
    <>
      <div>
        isConnected : {isConnected.toString()}
        <table style={{ width: "100%" }}>
          <thead style={{ textAlign: "left" }}>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>TimeStamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((x) => (
              <Row id={x.id} status={x.status} timestamp={x.timestamp} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Events;

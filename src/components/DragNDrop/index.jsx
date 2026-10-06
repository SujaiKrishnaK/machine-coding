import React from "react";
import "./index.css";
const statusList = ["todo", "in_progress", "done"];

export default function DragNDrop() {
  const [ticketToMove, setTicketToMove] = React.useState(null);
  const [tickets, setTickets] = React.useState([
    {
      id: 1,
      title: "Ticket 1",
      description: "This is ticket 1",
      status: statusList[0],
    },
    {
      id: 2,
      title: "Ticket 2",
      description: "This is ticket 2",
      status: statusList[1],
    },
    {
      id: 3,
      title: "Ticket 3",
      description: "This is ticket 3",
      status: statusList[2],
    },
    {
      id: 4,
      title: "Ticket 3",
      description: "This is ticket 3",
      status: statusList[2],
    },
    {
      id: 5,
      title: "Ticket 3",
      description: "This is ticket 3",
      status: statusList[2],
    },
    {
      id: 6,
      title: "Ticket 3",
      description: "This is ticket 3",
      status: statusList[2],
    },
    {
      id: 7,
      title: "Ticket 3",
      description: "This is ticket 3",
      status: statusList[2],
    },
  ]);
  const onDrop = (status) => {
    if (ticketToMove) {
      setTickets((prevTickets) => {
        let curr = tickets.find((x) => x.id === ticketToMove);
        return prevTickets.map((t) =>
          t.id === curr.id ? { ...t, status: status } : t,
        );
      });
    }
  };
  return (
    <div style={{ height: "100vh" }}>
      <div className="dragNDropContainer">
        <div className="ticketsContainer">
          <h2>To Do</h2>
          <div
            className="ticketsContainer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop("todo")}
          >
            {tickets
              .filter((t) => t.status === statusList[0])
              .map((t) => (
                <Ticket
                  id={t.id}
                  key={t.id}
                  title={t.title}
                  description={t.description}
                  status={t.status}
                  setTicketToMove={setTicketToMove}
                />
              ))}
          </div>
        </div>
        <div className="ticketsContainer">
          <h2>In Progress</h2>
          <div
            className="ticketsContainer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop("in_progress")}
          >
            {tickets
              .filter((t) => t.status === statusList[1])
              .map((t) => (
                <Ticket
                  id={t.id}
                  key={t.id}
                  title={t.title}
                  description={t.description}
                  status={t.status}
                  setTicketToMove={setTicketToMove}
                />
              ))}
          </div>
        </div>
        <div className="ticketsContainer">
          <h2>Done</h2>
          <div
            className="ticketsContainer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop("done")}
          >
            {tickets
              .filter((t) => t.status === statusList[2])
              .map((t) => (
                <Ticket
                  key={t.id}
                  id={t.id}
                  title={t.title}
                  description={t.description}
                  status={t.status}
                  setTicketToMove={setTicketToMove}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Ticket({ id, title, description, status = "todo", setTicketToMove }) {
  return (
    <div
      className="ticket"
      draggable="true"
      onDragStart={(e) => {
        setTicketToMove(id);
      }}
      onDragEnd={(e) => {
        setTicketToMove(id);
      }}
    >
      <select name="status" defaultValue={status}>
        {statusList.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

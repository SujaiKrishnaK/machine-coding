import { useEffect, useState, memo, Profiler } from "react";
import initialArray from "./data/users";
import "./index.css";
const TableRow = memo(({ user }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td key={user.age} className={"flash-update"}>
        {user.age}
      </td>
      <td>{user.occupation}</td>
    </tr>
  );
});
const Table = function ({ currPageUsers, setSortOrder }) {
  return (
    <table>
      <thead>
        <tr>
          {[
            { label: "ID", key: "id", sortable: false },
            { label: "Name", key: "name", sortable: true },
            { label: "Age", key: "age", sortable: true },
            { label: "Occupation", key: "occupation", sortable: false },
          ].map(({ label, key, sortable }) => (
            <th key={key}>
              {label}{" "}
              {sortable ? (
                <>
                  <span onClick={() => setSortOrder({ key, type: "asc" })}>
                    &#8593;
                  </span>{" "}
                  <span onClick={() => setSortOrder({ key, type: "desc" })}>
                    &#8595;
                  </span>
                </>
              ) : (
                ""
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {currPageUsers.map((user) => (
          // <Profiler
          //   onRender={(
          //     id,
          //     phase,
          //     actualDuration,
          //     baseDuration,
          //     startTime,
          //     commitTime,
          //   ) =>
          //     console.log({
          //       id,
          //       phase,
          //       actualDuration,
          //       baseDuration,
          //       startTime,
          //       commitTime,
          //     })
          //   }
          // >
          <TableRow key={user.id} user={user} />
          // </Profiler>
        ))}
      </tbody>
    </table>
  );
};
// const totalItems = initialArray.length ?? 0;

export default function DataTable() {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currPage, setCurrPage] = useState(0);
  const [sortOrder, setSortOrder] = useState(null);
  const [usersDict, setUsersDict] = useState(() => {
    let dict = {};
    initialArray.forEach((x) => {
      dict[x.id] = x;
    });
    return dict;
  });
  useEffect(() => {
    let interval = setInterval(() => {
      setUsersDict((prev) => {
        let keys = Object.keys(usersDict);
        let randomId = keys[Math.floor(Math.random() * keys.length)];
        return {
          ...prev,
          [randomId]: {
            ...prev[randomId],
            age: prev[randomId].age + 1,
          },
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [usersDict]);
  let totalItems = Object.keys(usersDict).length;
  let users = Object.values(usersDict);

  let currPageUsers = users.slice(
    currPage * itemsPerPage,
    currPage * itemsPerPage + itemsPerPage,
  );
  if (sortOrder) {
    currPageUsers = currPageUsers.sort((a, b) => {
      if (
        typeof a[sortOrder.key] === "string" &&
        typeof b[sortOrder.key] === "string"
      ) {
        return sortOrder.type === "asc"
          ? a[sortOrder.key].localeCompare(b[sortOrder.key])
          : b[sortOrder.key].localeCompare(a[sortOrder.key]);
      } else {
        return sortOrder.type === "asc"
          ? a[sortOrder.key] - b[sortOrder.key]
          : b[sortOrder.key] - a[sortOrder.key];
      }
    });
  }
  const onSortClick = (obj) => {
    setSortOrder(obj);
  };
  return (
    <div>
      <Table currPageUsers={currPageUsers} setSortOrder={onSortClick} />
      <label for="perpage">
        Per Page &nbsp;
        <select
          name="perpage"
          value={itemsPerPage}
          onChange={(e) => {
            setCurrPage(0);
            setItemsPerPage(Number(e.target.value));
          }}
        >
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select>{" "}
      </label>
      <button
        disabled={currPage === 0}
        onClick={() => {
          currPage > 0 ? setCurrPage((prev) => prev - 1) : null;
        }}
      >
        &lt;
      </button>{" "}
      {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }).map(
        (x, index) => (
          <button
            key={index}
            style={{
              borderRadius: "50%",
              borderWidth: "1px",
              marginInline: "2px",
              color: currPage + 1 === index + 1 ? "red" : "blue",
            }}
            onClick={(e) => {
              setCurrPage(index);
            }}
          >
            {index + 1}
          </button>
        ),
      )}{" "}
      <button onClick={() => setCurrPage((prev) => prev + 1)}>&gt;</button>
    </div>
  );
}

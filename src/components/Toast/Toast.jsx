import { useState } from "react";
import { ToastContext } from "../../Contexts/toastContext";
import "./Toast.css";

const TYPE_MAP = {
  SUCCESS: "green",
  INFO: "lightblue",
  DEFAULT: "gray",
};

export default function Toast({ children }) {
  const [notifications, setNotifications] = useState({
    message: "hi",
  });

  const toast = (
    message = "Hello",
    type = "DEFAULT",
    duration = "3000",
    position = "topLeft",
  ) => {
    const id = Date.now().toString();

    setNotifications((prev) => ({
      ...prev,
      [id]: {
        message,
        type,
        duration,
        position,
      },
    }));
    // 3. Schedule its removal in the future
    setTimeout(() => {
      setNotifications((prev) => {
        // Use destructuring to pull out the expired toast and keep the rest
        const { [id]: removedToast, ...remainingToasts } = prev;
        return remainingToasts;
      });
    }, parseInt(duration));
  };
  // useEffect(() => {
  //   () => clearTimeout(timerRef.current);
  // }, []);
  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className={`toasterContainer`}>
        {Object.entries(notifications).map((entries) => {
          const [k, v] = entries;
          return (
            <div
              className={`toast ${v.position}`}
              key={k}
              style={{ color: TYPE_MAP[v.type] }}
            >
              {v.message}
              {k}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

import React from "react";
import "./index.css";

const Modal = (props) => {
  const { children, title, onClose, isOpen } = props;
  if (!isOpen) return null;
  return (
    <div role="dialog" className="overlay" onClick={(e) => e.stopPropagation()}>
      <div className="content">
        <div className="closeBtn" onClick={onClose}>
          X
        </div>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;

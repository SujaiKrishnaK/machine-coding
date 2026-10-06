import React from "react";
import "./index.css";
import { useState } from "react";

function AccordionItem({ heading, contentRenderer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="accordion-wrapper" aria-describedby="accordion">
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        {heading}
        {isOpen && (
          <span style={{ position: "absolute", right: "10px" }}>&#128316;</span>
        )}
        {!isOpen && (
          <span style={{ position: "absolute", right: "10px" }}>&#128317;</span>
        )}
      </div>
      <div className={`accordion-content ${isOpen ? "show" : "hide"}`}>
        {contentRenderer()}
      </div>
    </div>
  );
}

export default function Accordion() {
  const content = () => {
    return (
      <div>
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
        </h2>

        <p>
          eum possimus optio ducimus enim deleniti nihil illum explicabo
          officiis quidem expedita asperiores qui ut et aut iusto quos voluptas
          id!{" "}
        </p>
      </div>
    );
  };
  return (
    <>
      <AccordionItem
        heading={"Heading"}
        contentRenderer={content}
      ></AccordionItem>
      <AccordionItem
        heading={"Heading2"}
        contentRenderer={content}
      ></AccordionItem>
      <AccordionItem
        heading={"Heading3"}
        contentRenderer={content}
      ></AccordionItem>
    </>
  );
}

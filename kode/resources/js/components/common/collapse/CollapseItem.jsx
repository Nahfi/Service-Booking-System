import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { BsChevronDown } from "react-icons/bs";

import "./collapse.scss";

const CollapseItem = ({ title,children, ...props }) => {
  const [open, setOpen] = useState(false);

  const attributes = {
    ...props,
    className: `collapse-item ${props.className || ""}`,
  };

  return (
    <div {...attributes}>
      <div
        onClick={() => setOpen(!open)}
        aria-controls={`${title?.toLowerCase().replace(" ", "-")}-collapse`}
        aria-expanded={open}
        role="button"
        className="collapse-btn"
      >
        <h6>{title}</h6>
        <span className={`collapse-icon ${open ? "icon-rotate" : ""}`}>
          <BsChevronDown />
        </span>
      </div>

      <Collapse in={open}>
        <div
          id={`${title?.toLowerCase().replace(" ", "-")}-collapse`}
          className="collapse-body"
        >
          {children}
        </div>
      </Collapse>
    </div>
  );
};

export default CollapseItem;

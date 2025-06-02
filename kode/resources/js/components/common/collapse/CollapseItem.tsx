import { HTMLAttributes, ReactNode, useState } from "react";
import { Collapse } from "react-bootstrap";
import { BsChevronDown } from "react-icons/bs";

import "./collapse.scss";

interface CollapseItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: string;
  children: ReactNode;
  className?: string;
}

const CollapseItem: React.FC<CollapseItemProps> = ({
  title,
  children,
  className = "",
  ...props
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const generateId = (title: string): string => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  const handleToggle = (event: DivClickEvent): void => {
    setOpen(!open);
  };


  const collapseId = generateId(title);

  const attributes: HTMLAttributes<HTMLDivElement> = {
    ...props,
    className: `collapse-item ${className}`,
  };

  return (
    <div {...attributes}>
      <div
        onClick={handleToggle}
        aria-controls={`${collapseId}-collapse`}
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
        <div id={`${collapseId}-collapse`} className="collapse-body">
          {children}
        </div>
      </Collapse>
    </div>
  );
};

export default CollapseItem;

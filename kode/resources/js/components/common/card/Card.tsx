import "../card/card.scss";

const Card = ({ children, ...props }) => {
  const attributes = {
    ...props,
    className: `card rounded-xl ${props?.className || ""}`,
  };
  return <div {...attributes}>{children}</div>;
};

export default Card;



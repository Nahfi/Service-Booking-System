import React, { HTMLAttributes, PropsWithChildren } from "react";
import "../card/card.scss";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card: React.FC<PropsWithChildren<CardProps>> = ({
    children,
    ...props
}) => {
    const attributes = {
        ...props,
        className: `card rounded-xl ${props?.className || ""}`,
    };
    return <div {...attributes}>{children}</div>;
};

export default Card;



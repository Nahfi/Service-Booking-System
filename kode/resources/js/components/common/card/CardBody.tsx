import React, { PropsWithChildren } from "react";

const CardBody: React.FC<PropsWithChildren> = ({ children,className=null }) => {
    return <div className={`card-body ${className ? className : ""}`}>{children}</div>;
};

export default CardBody;

import React, { PropsWithChildren } from "react";

const CardBody: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className="card-body">{children}</div>;
};

export default CardBody;

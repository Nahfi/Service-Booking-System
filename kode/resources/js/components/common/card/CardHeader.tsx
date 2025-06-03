
import React, { PropsWithChildren } from "react";

interface CardHeaderProps extends PropsWithChildren {
    cardTitle?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, cardTitle }) => {
    return (
        <div
            className={`card-header ${
                cardTitle ? "justify-between" : "justify-end"
            }`}
        >
            {cardTitle && <h4 className="card-title">{cardTitle}</h4>}
            {children && <div className="card-header-right">{children}</div>}
        </div>
    );
};

export default CardHeader;
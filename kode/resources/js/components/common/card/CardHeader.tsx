
import React, { PropsWithChildren } from "react";

interface CardHeaderProps extends PropsWithChildren {
    cardTitle?: string;
    description?: string | null;
}

const CardHeader: React.FC<CardHeaderProps> = ({
    children,
    cardTitle,
    description=null,
}) => {
    return (
        <div
            className={`card-header ${
                cardTitle ? "justify-between" : "justify-end"
            }`}
        >
            {(cardTitle || description) && (
                <div>
                    {cardTitle && <h4 className="card-title">{cardTitle}</h4>}
                    {description && <p className="fs-14 mt-2 text-muted">{description}</p>}
                </div>
            )}
            {React.Children.count(children) > 0 && (
                <div className="card-header-right">{children}</div>
            )}
        </div>
    );
};

export default CardHeader;
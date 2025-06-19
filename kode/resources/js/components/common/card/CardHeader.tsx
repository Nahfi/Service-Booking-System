
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { valueToKey } from "../../../utils/helper";

interface CardHeaderProps extends PropsWithChildren {
    cardTitle?: string;
    description?: string | null;
}

const CardHeader: React.FC<CardHeaderProps> = ({
    children,
    cardTitle,
    description=null,
}) => {

    const { t } = useTranslation();

    return (
        <div
            className={`card-header ${
                cardTitle ? "justify-between" : "justify-end"
            }`}
        >
            {(cardTitle || description) && (
                <div>
                    {cardTitle && (
                        <h4 className="card-title">
                            {t(valueToKey(cardTitle), cardTitle)}
                        </h4>
                    )}
                    {description && (
                        <p className="fs-14 mt-2 text-muted">
                            {t(valueToKey(description), description)}
                        </p>
                    )}
                </div>
            )}
            {React.Children.count(children) > 0 && (
                <div className="card-header-right">{children}</div>
            )}
        </div>
    );
};

export default CardHeader;
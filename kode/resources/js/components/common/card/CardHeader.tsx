
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { valueToKey } from "../../../utils/helper";

interface CardHeaderProps extends PropsWithChildren {
    cardTitle?: string;
    description?: string | null;
    icon?: React.ElementType;
    iconClassName?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({
    children,
    cardTitle,
    icon: Icon,
    description = null,
    iconClassName=null,
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
                            {Icon && <Icon className={`fs-26 me-3 ${iconClassName}`} />}
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
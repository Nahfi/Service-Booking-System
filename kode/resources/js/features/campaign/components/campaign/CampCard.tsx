import React from "react";
import Button from "../../../../components/common/button/Button";

interface CampCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    iconColor: string;
    link: string | null;
    action : (() => void) | null;
}

const CampCard: React.FC<CampCardProps> = ({
    icon,
    title,
    description,
    iconColor,
    link = null,
    action= null
}) => {

    const buttonProps: { [key: string]: any } = {};
    if (link) buttonProps.href = link;
    if (action) buttonProps.onClick = action;

    return (
        <div className="camp-card">
            <div className={`icon ${iconColor}`}>{icon}</div>
            <div className="content">
                <h6>{title}</h6>
                <p>{description}</p>
            </div>
            <Button {...buttonProps }  type="button" className="btn--lg btn--primary">
                Get Started
            </Button>
        </div>
    );
};

export default CampCard;
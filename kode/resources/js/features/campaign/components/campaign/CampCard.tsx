import React from "react";
import { Link } from "react-router-dom";

interface CampCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    iconColor: string;
    link: string;
}

const CampCard: React.FC<CampCardProps> = ({
    icon,
    title,
    description,
    iconColor,
    link,
}) => {
    return (
        <div className="camp-card">
            <div className={`icon ${iconColor}`}>{icon}</div>
            <div className="content">
                <h6>{title}</h6>
                <p>{description}</p>
            </div>
            <Link to={link} className="i-btn btn--lg btn--primary">
                Get Started
            </Link>
        </div>
    );
};

export default CampCard;
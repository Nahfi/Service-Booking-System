import React from "react";
import { Link } from "react-router-dom";


const CampCard = ({ icon, title, description, iconColor, link }) => {
    return(
        <div className="camp-card">
            <div className={`icon ${iconColor}`}>
                { icon }
            </div>
            <div className="content">
                <h6>{ title }</h6>
                <p>{ description }</p>
            </div>
            <Link to={link} className="i-btn btn--lg btn--primary">Get Started</Link>
        </div>
    )
}

export default CampCard;
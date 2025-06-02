import { Link } from "react-router-dom";

import React from "react";
import "./error.scss";

const ErrorSection: React.FC = () => {
    return (
        <section className="error-wrapper">
            <div className="error-content">
                <div className="eyes">
                    <div className="eye">
                        <div className="eye__pupil eye__pupil--left"></div>
                    </div>
                    <div className="eye">
                        <div className="eye__pupil eye__pupil--right"></div>
                    </div>
                </div>

                <h1 className="error-status">404</h1>

                <div className="error-message">
                    <p>Ooops!!! The page you are looking for is not found</p>
                </div>

                <div className="mt-5">
                    <Link
                        to="/"
                        className="i-btn btn--primary outline btn--xl pill  mt-3 fw-semibold"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ErrorSection;

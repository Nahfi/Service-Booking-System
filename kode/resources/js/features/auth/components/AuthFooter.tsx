
import type React from "react";

import { Link } from "react-router-dom";

type AuthFooterProps = {
    isSignup?: boolean;
};

const AuthFooter: React.FC<AuthFooterProps> = ({ isSignup = false }) => {
    return (
        <div>
            <div className="divider">
                <span>Or</span>
            </div>
            <div className="text-center">
                <p className="text--secondary d-flex align-items-center justify-content-center gap-2">
                    Back to 
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default AuthFooter
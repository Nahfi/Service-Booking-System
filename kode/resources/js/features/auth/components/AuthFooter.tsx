
import type React from "react";
import appleLogo from "../../../assets/images/icons/apple.svg";
import googleLogo from "../../../assets/images/icons/google.svg";

import { Link } from "react-router-dom";

type AuthFooterProps = {
    isSignup?: boolean;
};

const AuthFooter: React.FC<AuthFooterProps> = ({ isSignup = false }) => {
    return (
        <div>
            <div className="divider">
                <span>Or Sign in with</span>
            </div>
            <button className="i-btn btn--xl signup--btn w-100 mb-3">
                <span>
                    <img src={googleLogo} alt="google" />
                </span>
                Sign In with Google
            </button>
            <button className="i-btn btn--xl signup--btn w-100">
                <span>
                    <img src={appleLogo} alt="apple" />
                </span>
                Sign In with Apple
            </button>

            <div className="text-center mt-30">
                {isSignup ? (
                    <p className="text--secondary">
                        Already have an account user?{" "}
                        <Link to="/login">Login</Link>
                    </p>
                ) : (
                    <p className="text--secondary">
                        Do not have an account? <Link to="/signup">Signup</Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default AuthFooter
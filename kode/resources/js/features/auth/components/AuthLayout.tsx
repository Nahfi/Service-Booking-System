import React, { ReactNode } from "react";

// import loginBg from "../../../assets/images/login-bg.png";

 import authBanner from "../../../assets/images/auth-banner.png";


import "./auth.scss";

type AuthLayoutProps = {
    children: ReactNode,
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="auth-layout">
            <div className="container-fluid px-0">
                <div className="row g-0 align-items-center">
                    <div className="col-xxl-5 col-xl-6 auth-left">
                        <div className="auth-form-wrapper my-xl-0 my-5">{children}</div>
                    </div>

                    <div className="col-xxl-7 col-xl-6 auth-right">
                        <div className="auth-right-wrapper">
                            <div className="auth-banner">
                                <img src={authBanner} alt="Auth banner" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;

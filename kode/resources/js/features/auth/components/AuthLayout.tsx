import React, { ReactNode } from "react";

import "./auth.scss";

type AuthLayoutProps = {
    children: ReactNode,
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="auth-layout">
            <div className="container-fluid">
                <div className="row align-items-center">
                    {/* <div className="col-xxl-5 col-lg-6 d-flex align-items-center justify-content-center h-100">
                        <AuthSlider />
                    </div> */}
                    <div className="col-xxl-7 col-lg-5 py-5 px-3 mx-auto">
                        <div className="auth-form-wrapper">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;

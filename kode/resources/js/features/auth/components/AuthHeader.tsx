import React from 'react';
import headerLogo from "../../../assets/images/logo/logo.png";

type AuthLayoutProps = {
  title: string,
  description: string;
}
const AuthHeader: React.FC<AuthHeaderProps> = ({ title, description }) => {
    return (
        <div className="form-header">
            <div className="logo">
                <img src={headerLogo} alt="auth-logo" />
            </div>
            <h3>{title}</h3>
            <p>{description} </p>
        </div>
    );
};

export default AuthHeader
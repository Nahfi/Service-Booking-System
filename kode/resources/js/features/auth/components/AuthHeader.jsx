import React from 'react';
import headreLogo from "../../../assets/images/logo/logo.png";
const AuthHeader = ({title,description}) => {
  return (
    <div className="form-header">
      <div className="logo">
        <img src={headreLogo} alt="auth-logo" />
      </div>
      <h3>{title}</h3>
      <p>{description} </p>
    </div>
  );
}

export default AuthHeader
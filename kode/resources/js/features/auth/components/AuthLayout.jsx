import React from 'react';
import AuthSlider from './slider/Authslider';

import "./auth.scss";

const AuthLayout = ({children}) => {
  return (
    <div className="p-30">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-xxl-5 col-lg-6 d-flex align-items-center justify-content-center h-100">
            <AuthSlider />
          </div>
          <div className="col-xxl-7 col-lg-6 p-5">
            <div className="auth-form-wrapper">
               {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout
import type React from "react";
import { LuMessageCircle } from "react-icons/lu";
import "./preloader.scss";

const Preloader:React.FC = () => {
  return (
    <div className="preloader-wrapper">
      <div className="progress-loader"></div>
      
      <div className="preloader">
        <div className="preloader-inner">
          <div className="logo-container">
            <div className="logo-wrapper">
              <LuMessageCircle className="logo-icon" />
            </div>
          </div>

          <h1 className="app-name">QukMsg</h1>

          <div className="loading-dots">
            <div className="loading-dot"></div>
            <div className="loading-dot delay-100"></div>
            <div className="loading-dot delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;

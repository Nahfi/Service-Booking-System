import React from "react";

const CampaignSidebar = ({ activeStep, steps }) => {

  return (
    <div className="col-auto campaign-sidebar">
      <div className="campaign-sidebar-body">
        {steps.map((step, index) => {
          const isActive = activeStep >= index + 1;
          return (
            <div
              className={`step-item ${isActive ? "active" : " "}`}
              key={index}
            >
              <div className="number">{index + 1}</div>
              <div className="text">
                <h6>{step.title}</h6>
                <p className="fs-14">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignSidebar;
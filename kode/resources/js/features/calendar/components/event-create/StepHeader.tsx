import type React from "react";

const StepHeader:React.FC = ({ steps, activeStep }) => {
  return (
    <div className="campaign-steps-header">
      {steps.map((step, index) => {
        const isActive = activeStep >= index + 1;
        return (
          <div
            className={`step-item ${isActive ? "active" : " "}`}
            key={index}
          >
            <div className="number">{index + 1}</div>
            <div className="text">
              <h6 className="fs-14">{step.title}</h6>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default StepHeader
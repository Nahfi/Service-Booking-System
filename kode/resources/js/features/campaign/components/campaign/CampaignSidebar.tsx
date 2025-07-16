import React from "react";

interface Step {
    title: string;
    description: string;
}

interface CampaignSidebarProps {
    activeStep: number;
    steps: Step[];
}

const CampaignSidebar: React.FC<CampaignSidebarProps> = ({
    activeStep,
    steps,
}) => {
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
                                <h6 className="fs-14">{step.title}</h6>
                                <p className="fs-12">{step.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CampaignSidebar;
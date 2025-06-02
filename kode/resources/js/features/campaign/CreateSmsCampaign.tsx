import React, { useState } from "react";
import Button from "../../components/common/button/Button";
import PageHeader from "../../components/common/Page-header/PageHeader";
import BaseLayout from "../../components/layouts/BaseLayout";
import CampaignSetup from "./components/campaign/CampaignSetup";
import CampaignSidebar from "./components/campaign/CampaignSidebar";
import Compose from "./components/campaign/Compose";
import Review from "./components/campaign/Review";
import SetAudience from "./components/campaign/SetAudience";
import "./create-campaign.scss";

interface Step {
    title: string;
    description: string;
}

  const steps: Step[] = [
      {
          title: "Campaign Setup",
          description: "Write the essential details for your campaign",
      },
      {
          title: "Compose Message",
          description: "Write the essential details for your campaign.",
      },
      {
          title: "Set Audience",
          description: "Write the essential details for your campaign.",
      },
      {
          title: "Review",
          description: "Write the essential details for your campaign.",
      },
  ];
const CreateSmsCampaign: React.FC = () => {
    const [activeStep, setActiveStep] = useState<number>(1);

    const renderStepContent = (): React.ReactNode => {
        switch (activeStep) {
            case 1:
                return <CampaignSetup />;
            case 2:
                return <Compose />;
            case 3:
                return <SetAudience />;
            case 4:
                return <Review />;
            default:
                return <CampaignSetup />;
        }
    };
    const nextStep = (): void => {
        if (activeStep < steps?.length + 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const prevStep = (): void => {
        if (activeStep > 1) {
            setActiveStep(activeStep - 1);
        }
    };

    const handleOnSubmit = (e:FormSubmitEvent): void  => {
        e.preventDefault();
    };

    return (
        <BaseLayout className="p-0">
            <div className="row g-0 create-campaign">
                <CampaignSidebar activeStep={activeStep} steps={steps} />

                <div className="col campaign-body-wrapper">
                    <form onSubmit={handleOnSubmit}>
                        <div className="campaign-body">
                            <PageHeader title={"Create SMS Campaign"} />
                            <div className="campaign-form-wrapper ms-0 me-auto">
                                {renderStepContent()}
                            </div>
                        </div>

                        <div className="campaign-body-bottom d-flex align-items-center justify-content-between text-end">
                            <Button
                                type="button"
                                onClick={prevStep}
                                className={`btn--dark btn--md rounded-3 ${
                                    activeStep === 1 ? "opacity-0" : ""
                                }`}
                            >
                                Previous step
                            </Button>
                            {activeStep < steps?.length ? (
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    className="btn--primary btn--md rounded-3"
                                >
                                    Next step
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="btn--primary btn--md rounded-3"
                                >
                                    Submit Campaign
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </BaseLayout>
    );
};

export default CreateSmsCampaign;
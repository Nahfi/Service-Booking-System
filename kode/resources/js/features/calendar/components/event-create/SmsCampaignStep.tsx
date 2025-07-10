import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../../components/common/button/Button";
import { smsSteps } from "../../../../utils/constant";
import CampaignSetup from "../../../campaign/components/campaign/CampaignSetup";
import Review from "../../../campaign/components/campaign/Review";
import SetAudience from "../../../campaign/components/campaign/SetAudience";
import SmsCompose from "../../../campaign/components/campaign/SmsCompose";
import StepHeader from "./StepHeader";

const SmsCampaignStep = () => {
  const { t } = useTranslation("campaign");
  const [activeStep, setActiveStep] = useState<number>(1);
  const steps = smsSteps


  console.log(activeStep, steps?.length);
  
  const renderStepContent = (): React.ReactNode => {
    switch (activeStep) {
      case 1:
        return <CampaignSetup />;
      case 2:
        return <SmsCompose />;
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

  const handleOnSubmit = (e: FormSubmitEvent): void => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleOnSubmit} className="campaign-step-form">
      <div>
        <StepHeader activeStep={activeStep} steps={steps} />

        <div className="campaign-step-body mt-4">
          {renderStepContent()}
        </div>
      </div>

      <div className="modal-custom-footer justify-content-between mt-4">
        <Button
          type="button"
          onClick={prevStep}
          className={`btn--dark outline btn--lg rounded-3 ${activeStep === 1 ? "opacity-0" : ""
            }`}
        >
          {t("previous", "Previous")}
        </Button>

        {activeStep < steps?.length ? (
          <Button
            type="button"
            onClick={nextStep}
            className="btn--primary btn--lg rounded-3"
          >
            {t('next', 'Next')}
          </Button>
        ) : (
          <Button
            type="submit"
            className="btn--primary btn--lg rounded-3"
          >
            {t('submit_campaign', 'Submit Campaign')}
          </Button>
        )}
      </div>
    </form>
  )
}

export default SmsCampaignStep
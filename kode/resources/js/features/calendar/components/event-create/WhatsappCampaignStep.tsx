
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../../components/common/button/Button";
import { whatsappSteps } from "../../../../utils/constant";
import CampaignSetup from "../../../campaign/components/campaign/CampaignSetup";
import Review from "../../../campaign/components/campaign/Review";
import WhatsappCompose from "../../../campaign/components/campaign/WhatsappCompose";
import StepHeader from "./StepHeader";

const WhatsappCampaignStep = () => {
  const { t } = useTranslation("campaign");
  const [activeStep, setActiveStep] = useState<number>(1);
  const steps = whatsappSteps

  const renderStepContent = (): React.ReactNode => {
    switch (activeStep) {
      case 1:
        return <CampaignSetup />;
      case 2:
        return <WhatsappCompose />;
      case 3:
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
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <h6>Whatsapp Campaign</h6>
           <StepHeader activeStep={activeStep} steps={steps} />
        </div>

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

export default WhatsappCampaignStep;
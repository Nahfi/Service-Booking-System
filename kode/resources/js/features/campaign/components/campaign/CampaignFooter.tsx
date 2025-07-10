import type React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../../components/common/button/Button';

const CampaignFooter: React.FC = ({ prevStep, nextStep, activeStep, steps }) => {
    const { t } = useTranslation("campaign");
    
  return (
        <div className="campaign-body-bottom d-flex align-items-center justify-content-between text-end">
            <Button
                type="button"
                onClick={prevStep}
                className={`btn--dark outline btn--lg rounded-3 ${activeStep === 1 ? "opacity-0" : ""
                    }`}
          >
              {t("previous" ,"Previous")}
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
                      {t('submit_campaign', 'Submit Campaign') }
                </Button>
            )}
        </div>
    )
}

export default CampaignFooter
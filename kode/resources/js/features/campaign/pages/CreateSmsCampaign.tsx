import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuCornerUpLeft } from "react-icons/lu";
import Button from "../../../components/common/button/Button";
import PageHeader from "../../../components/common/Page-header/PageHeader";
import BaseLayout from "../../../components/layouts/BaseLayout";
import CampaignFooter from "../components/campaign/CampaignFooter";
import CampaignSetup from "../components/campaign/CampaignSetup";
import CampaignSidebar from "../components/campaign/CampaignSidebar";
import Review from "../components/campaign/Review";
import SetAudience from "../components/campaign/SetAudience";
import SmsCompose from "../components/campaign/SmsCompose";
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
    const { t } = useTranslation("campaign");
    const [activeStep, setActiveStep] = useState<number>(1);

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

    const currentStepTitle = steps[activeStep - 1]?.title || "Create SMS Campaign";

    return (
        <BaseLayout className="p-0">
            <div className="row g-0 create-campaign">
                <CampaignSidebar activeStep={activeStep} steps={steps} />

                <div className="col campaign-body-wrapper">
                    <form onSubmit={handleOnSubmit}>
                        <div className="campaign-body">
                            <PageHeader title={currentStepTitle} breadcrumbs={[
                                {
                                    title: "campaign",
                                    path: "/campaign", query_params: { refetch: "true" }
                                }, { title: "Create" }
                            ]} >
                                <Button className="btn--dark btn--md outline rounded-3" href="/campaign?refetch=true">
                                    <LuCornerUpLeft className="fs-18" />
                                    {t("back_to_campaign", "Back to Campaigns")}
                                </Button>
                            </PageHeader>

                            <div className="campaign-form-wrapper ms-0 me-auto">
                                {renderStepContent()}
                            </div>
                        </div>
 
                        
                        <CampaignFooter prevStep={prevStep} nextStep={nextStep} activeStep={activeStep} steps={steps} />
                    </form>
                </div>
            </div>
        </BaseLayout>
    );
};

export default CreateSmsCampaign;
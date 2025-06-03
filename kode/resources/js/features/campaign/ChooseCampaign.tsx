import type React from "react";
import { BsEnvelope, BsWhatsapp } from "react-icons/bs";
import PageHeader from "../../components/common/Page-header/PageHeader";
import BaseLayout from "../../components/layouts/BaseLayout";
import CampCard from "./components/campaign/CampCard";

const ChooseCampaign: React.FC = () => {
    return (
        <BaseLayout>
            <div className="row">
                <div className="col-lg-6 mx-auto text-center">
                    <PageHeader title="Choose Campaign Type" />
                </div>
            </div>
            <div className="row justify-content-center g-4">
                <div className="col-xl-3 col-lg-5 col-md-6">
                    <CampCard
                        icon={<BsEnvelope />}
                        title="SMS Campaign"
                        description="Send an SMS campaign to your selected members."
                        iconColor="color-sms"
                        link="/campaign/create-sms"
                    />
                </div>
                <div className="col-xl-3 col-lg-5 col-md-6">
                    <CampCard
                        icon={<BsWhatsapp />}
                        title="Whatsapp Campaign"
                        description="Send an SMS campaign to your selected members."
                        iconColor="color-whatsapp"
                        link="/campaign/create-whatsapp"
                    />
                </div>
            </div>
        </BaseLayout>
    );
};

export default ChooseCampaign;

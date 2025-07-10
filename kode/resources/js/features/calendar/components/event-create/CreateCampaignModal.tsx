import { BsEnvelope, BsWhatsapp } from "react-icons/bs";

import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../../../components/common/button/Button";
import CampCard from "../../../campaign/components/campaign/CampCard";
import "./event-create.scss";
import SmsCampaignStep from "./SmsCampaignStep";
import WhatsappCampaignStep from "./WhatsappCampaignStep";


const CreateCampaignModal = ({ onHide }) => {

    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    return (
    <div className="create-event">
        {selectedOption === null ? (
            <div>
                <h5 className="mb-4 text-center">Choose Campaign Type</h5>

                <div className="row justify-content-center g-4">
                    <div className="col-xl-4 col-md-6">
                        <CampCard
                            icon={<BsEnvelope />}
                            title="SMS Campaign"
                            description="Send an SMS campaign to your selected members."
                            iconColor="color-sms"
                            action={() => setSelectedOption("sms")}
                        />
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <CampCard
                            icon={<BsWhatsapp />}
                            title="Whatsapp Campaign"
                            description="Send an SMS campaign to your selected members."
                            iconColor="color-whatsapp"
                            action={() => setSelectedOption("whatsapp")}
                        />
                    </div>
                </div>

                <div className="modal-custom-footer mt-4">
                    <Button
                        type="button"
                        className="btn--dark btn--lg outline rounded-3"
                        onClick={onHide}
                    >
                        Close
                    </Button>
                </div>
            </div>
        ): (
            <div className="fade-in">
                {selectedOption === "sms" && (<SmsCampaignStep />)}
                {selectedOption === "whatsapp" && (<WhatsappCampaignStep />)}
            </div>
        )}
    </div>
    );
};

export default CreateCampaignModal;

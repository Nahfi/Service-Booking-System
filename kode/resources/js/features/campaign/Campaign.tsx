

import type React from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BaseLayout from "../../components/layouts/BaseLayout";

import { BsPlusLg } from "react-icons/bs";
import Button from "../../components/common/button/Button";
import PageHeader from "../../components/common/Page-header/PageHeader";
import AllCampaign from "./components/AllCampaign";
import SmsCampaign from "./components/SmsCampaign";
import WhatsappCampaign from "./components/WhatsappCampaign";

const Campaign: React.FC = () => {
    return (
        <BaseLayout>
            <PageHeader title={"Campaign"} shortTitle={"Manage your campaign"}>
                <Button
                    href="/campaign/choose-campaign"
                    className="btn--primary btn--lg rounded-3"
                >
                    <BsPlusLg className="fs-16" />
                    Create Campaign
                </Button>
            </PageHeader>

            <Tabs
                defaultActiveKey="all"
                id="campaign-tab"
                className="mb-4 style-1"
            >
                <Tab eventKey="all" title="All">
                    <AllCampaign/>
                </Tab>

                <Tab eventKey="sms" title="SMS">
                    <SmsCampaign/>
                </Tab>

                <Tab eventKey="whatsapp" title="Whatsapp">
                    <WhatsappCampaign/>
                </Tab>
            </Tabs>
        </BaseLayout>
    );
};

export default Campaign;

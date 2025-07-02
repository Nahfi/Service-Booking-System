import PageHeader from "@/components/common/Page-header/PageHeader";
import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import MailGateway from "./components/MailGateway";
import SmsGateway from "./components/SmsGateway";

const Gateways: React.FC = () => {

    return (
        <>
            <PageHeader
                title={"Gateway configurations"}
                breadcrumbs={[
                    { title: "Settings", path: "/setting/general" },
                    {
                        title: "Gateway configurations",
                    },
                ]}
            />

            <Tabs
                defaultActiveKey="sms-gateway"
                id="gateway-tab"
                className="mb-4 style-1"
            >
                <Tab eventKey="sms-gateway" title="SMS Gateway">
                    <SmsGateway />
                </Tab>

                <Tab eventKey="mail-gateway" title="Mail Gateway">
                    <MailGateway />
                </Tab>
            </Tabs>
        </>
    );
}

export default Gateways
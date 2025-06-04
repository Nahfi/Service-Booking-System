import PageHeader from "@/components/common/Page-header/PageHeader";
import type React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Sms from "./components/Sms";
import Whatsapp from "./components/Whatsapp";


const Templates: React.FC = () => {
    return (
        <div className="conversation-content-body">
            <div className="campaign-report">
                <div className="mb-4">
                    <PageHeader
                        title="Templates"
                        breadcrumbs={[
                            {
                                title: "Templates",
                            },
                        ]}
                    />
                </div>

                <Tabs
                    defaultActiveKey="sms"
                    id="report-tab"
                    className="mb-4 style-1"
                >
                    <Tab eventKey="sms" title="Sms">
                        <Sms />
                    </Tab>

                    <Tab eventKey="whatsapp" title="Whatsapp">
                        <Whatsapp />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default Templates;

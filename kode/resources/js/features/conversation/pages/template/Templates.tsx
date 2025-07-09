import PageHeader from "@/components/common/Page-header/PageHeader";
import type React from "react";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useSearchParams } from "react-router";
import Sms from "./components/Sms";
import Whatsapp from "./components/Whatsapp";


const Templates: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const validTabs = ["sms", "whatsapp"];
    const defaultTab = validTabs.includes(searchParams.get("type") ?? "") ? searchParams.get("type")! : "sms";
    const [activeTab, setActiveTab] = useState(defaultTab);

    const tabs = [
        { key: "sms", title: "SMS", component: <Sms /> },
        { key: "whatsapp", title: "WhatsApp", component: <Whatsapp /> },
    ];
    
    const handleTabChange = (key: string | null) => {
        if (key) {
            setActiveTab(key);
        }
      };
    
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

                <Tabs activeKey={activeTab} onSelect={handleTabChange} id="report-tab" className="mb-4 style-1">
                    {tabs.map((tab) => (
                        <Tab key={tab.key} eventKey={tab.key} title={tab.title}>
                            {tab.component}
                        </Tab>
                    ))}
                </Tabs>
            </div>
        </div>
    );
};

export default Templates;

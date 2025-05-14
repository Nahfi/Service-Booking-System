import PageHeader from "@/components/common/Page-header/PageHeader";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Sms from "./components/Sms";


const Templates = () => {
    return (
        <div className="main-content-body">
            <div className="campaign-report">
                <div className="mb-4">
                    <PageHeader
                        title="Templates"
                        shortTitle="Manage your templates here"
                    />
                </div>

                <Tabs
                    defaultActiveKey="sms"
                    id="report-tab"
                    className="mb-4 style-1"
                >
                    <Tab eventKey="sms" title="Sms">
                        <Sms/>
                    </Tab>

                    <Tab eventKey="whatsapp" title="Whatsapp">
                        <h3>Whatsapp Tab</h3>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default Templates;

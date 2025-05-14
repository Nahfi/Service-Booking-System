import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import ReportOverview from "./ReportOverview";


import PageHeader from "@/components/common/Page-header/PageHeader";
import "./report.scss";
import SendLog from "./SendLog";

const Report = () => {
  return (
    <div className="main-content-body">
      <div className="campaign-report">
        <div className="mb-4">
          <PageHeader title="Reports" description="Manage your Reports" />
        </div>

        <Tabs
          defaultActiveKey="overview"
          id="report-tab"
          className="mb-4 style-1"
        >
          <Tab eventKey="overview" title="Overview">
            <ReportOverview />
          </Tab>

          <Tab eventKey="groups" title="Send Logs">
            <SendLog />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Report;

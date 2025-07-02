import PageHeader from "@/components/common/Page-header/PageHeader";
import type React from "react";
import { Tab, Tabs } from "react-bootstrap";
import Appearance from "./components/Appearance";
import SystemSetting from "./components/SystemSetting";

const General:React.FC = () => {
  return (
      <>
          <PageHeader
              title={"General"}
              breadcrumbs={[
                  { title: "Settings" },
              ]}
          />

            <Tabs
                defaultActiveKey="system_setting"
                id="gateway-tab"
                className="mb-4 style-1"
            >
                <Tab eventKey="system_setting" title="System Setting">
                  <SystemSetting/>
                </Tab>

              <Tab eventKey="appearance" title="Appearance">
                  <Appearance/>
              </Tab>
              
            </Tabs>

      </>
  );
}

export default General
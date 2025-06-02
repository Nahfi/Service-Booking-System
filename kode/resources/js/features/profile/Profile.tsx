import type React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PageHeader from "../../components/common/Page-header/PageHeader";
import BaseLayout from "../../components/layouts/BaseLayout";
import Information from "./components/Information";
import Password from "./components/Password";
import "./profile.scss";

const Profile: React.FC = () => {
  return (
    <BaseLayout>
      <>
        <PageHeader title="My Profile" description="Manage your profile" />
        <div>
          <Tabs
            defaultActiveKey="information"
            id="fill-tab-example"
            className="mb-4 style-1"
          >
            <Tab eventKey="information" title="Information">
              <Information />
            </Tab>
            <Tab eventKey="password" title="Password">
              <Password />
            </Tab>
          </Tabs>
        </div>
      </>
    </BaseLayout>
  );
};

export default Profile;

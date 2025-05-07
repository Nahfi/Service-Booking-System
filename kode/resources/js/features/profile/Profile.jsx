import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PageHeader from "../../components/common/Page-header/PageHeader";
import BaseLayout from "../../components/layouts/BaseLayout";
import Information from "./components/Information";
import Password from "./components/Password";
import Subscription from "./components/Subscription";
import Billing from "./components/billing/Billing";
import "./profile.scss";
const Profile = () => {
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
            <Tab eventKey="subscription" title="Subscription Credit">
              <Subscription />
            </Tab>
            <Tab eventKey="billing" title="Billing">
              <Billing />
            </Tab>
            <Tab eventKey="development" title="Development">
              Tab content for Contact
            </Tab>
          </Tabs>
        </div>
      </>
    </BaseLayout>
  );
};

export default Profile;

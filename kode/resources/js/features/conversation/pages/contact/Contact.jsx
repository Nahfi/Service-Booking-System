import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { BsDownload, BsPlusLg } from "react-icons/bs";

import "./contact.scss";

import Button from "@/components/common/button/Button";
import PageHeader from "../../../../components/common/Page-header/PageHeader";
import AllContacts from "./AllContacts";
import Attribute from "./Attribute";
import Groups from "./Groups";
const Contact = () => {
  return (
      <>
          <div className="conversation-content-body">
              <div className="contact-page">
                  <PageHeader
                      title="My Contacts"
                      shortTitle="Manage your Contacts"
                  >
                      <Button className="btn--primary btn--lg rounded-3">
                          <BsPlusLg className="fs-16" /> Add Contact
                      </Button>

                      <Button className="btn--dark outline btn--lg rounded-3">
                          <BsDownload className="fs-16" />
                          Download CSV
                      </Button>
                  </PageHeader>

                  <Tabs
                      defaultActiveKey="All"
                      id="contact-tab"
                      className="mb-4 style-1"
                  >
                      <Tab eventKey="All" title="All Contacts">
                          <AllContacts />
                      </Tab>

                      <Tab eventKey="groups" title="Groups">
                          <Groups />
                      </Tab>

                      <Tab eventKey="Attribute" title="Attribute">
                          <Attribute />
                      </Tab>
                  </Tabs>
              </div>
          </div>
      </>
  );
};

export default Contact;

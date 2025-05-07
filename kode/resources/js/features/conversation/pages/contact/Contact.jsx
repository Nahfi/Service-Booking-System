import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { BsDownload, BsPlusLg } from "react-icons/bs";

import "./contact.scss";

import PageHeader from "../../../../components/common/Page-header/PageHeader";
import AllContacts from "./AllContacts";
import Attribute from "./Attribute";
import Groups from "./Groups";
const Contact = () => {
  return (
    <>
      <div className="main-content-body">
        <div className="contact-page">
          <div className="row align-items-center g-4 mb-4">
            <div className="col-xl-7 col-lg-6">
              <PageHeader
                title="My Contacts"
                description="Manage your Contacts"
              />
            </div>

            <div className="col-xl-5 col-lg-6 text-lg-end">
              <div className="d-flex align-items-center justify-content-xl-end gap-3 flex-wrap">
                <button className="i-btn btn--primary btn--lg rounded-3">
                  <BsPlusLg className="fs-16" /> Add Contact
                </button>

                <button className="i-btn btn--dark outline btn--lg rounded-3">
                  <BsDownload className="fs-16" />
                  Download CSV
                </button>
              </div>
            </div>
          </div>

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

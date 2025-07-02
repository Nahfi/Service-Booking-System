import PageHeader from "@/components/common/Page-header/PageHeader";
import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AllContacts from "./components/AllContacts";
import Attribute from "./components/Attribute";
import Groups from "./components/Groups";

import "./contact.scss";

const Contact: React.FC = () => {

    return (
        <>
            <div className="conversation-content-body">
                <div className="contact-page">
                    <PageHeader
                        title="My Contacts"
                        breadcrumbs={[
                            {
                                title: "My contacts",
                            },
                        ]}
                    />

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



import type React from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BaseLayout from "../../components/layouts/BaseLayout";

import TableWrapper from "@/components/common/table/TableWrapper";
import { BsPlusLg } from "react-icons/bs";
import Button from "../../components/common/button/Button";
import FilterWrapper from "../../components/common/filter/FilterWrapper";
import PageHeader from "../../components/common/Page-header/PageHeader";
import CampaignTable from "./components/table/CampaignTable";

const Campaign: React.FC = () => {
    return (
        <BaseLayout>
            <PageHeader title={"Campaign"} shortTitle={"Manage your campaign"}>
                <Button
                    href="/campaign/choose-campaign"
                    className="btn--primary btn--lg rounded-3"
                >
                    <BsPlusLg className="fs-16" />
                    Create Campaign
                </Button>
            </PageHeader>

            <Tabs
                defaultActiveKey="All"
                id="fill-tab-example"
                className="mb-4 style-1"
            >
                <Tab eventKey="All" title="All">
                    <FilterWrapper />
                    <div>
                        <TableWrapper>
                            <CampaignTable />
                        </TableWrapper>
                    </div>
                </Tab>

                <Tab eventKey="SMS" title="SMS">
                    <FilterWrapper />
                    <TableWrapper>
                        <CampaignTable />
                    </TableWrapper>
                </Tab>

                <Tab eventKey="Whatsapp" title="Whatsapp">
                    <FilterWrapper />
                    <TableWrapper>
                        <CampaignTable />
                    </TableWrapper>
                </Tab>
            </Tabs>
        </BaseLayout>
    );
};

export default Campaign;

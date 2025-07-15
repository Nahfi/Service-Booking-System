
import type React from "react";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LuCalendarClock, LuClock, LuContact, LuCornerUpLeft, LuMessageSquareMore, LuSend, LuTarget, LuUsers } from "react-icons/lu";
import Button from "../../../components/common/button/Button";
import CardBody from "../../../components/common/card/CardBody";
import CardHeader from "../../../components/common/card/CardHeader";
import PageHeader from "../../../components/common/Page-header/PageHeader";
import Progress from "../../../components/common/progressbar/Progress";
import TableWrapper from "../../../components/common/table/TableWrapper";
import BaseLayout from "../../../components/layouts/BaseLayout";
import MessagePreview from "../components/campaign/MessagePreview";
import ContactTable from "../components/tables/ContactTable";

const CampaignDetails: React.FC = () => {
    const { t } = useTranslation();
    return (
        <BaseLayout>
            <PageHeader title={"Campaign Name"}
                breadcrumbs={[{ title: "Campaign Name", path: "/campaign" }, { title: "Details" }]}
            >
                <Button className="btn--dark btn--md outline rounded-3" href="/campaign">
                    <LuCornerUpLeft className="fs-18" />
                    {t("back_to_campaign", "Back to campaign")}
                </Button>
            </PageHeader>

            <div className="row g-4">
                <div className="col-xl-7">
                    <Card className="h-100">
                        <CardHeader cardTitle="Black Friday Sale Campaign" description={"Created on Nov 15, 2024"} >
                            <Button className="btn--dark btn--md rounded-3" href="/campaign">
                                <LuSend className="fs-18" />
                                {t("send_now", "Send Now")}
                            </Button>
                        </CardHeader>
                        <CardBody>
                            <div className="row g-3 mb-4">
                                <div className="col-xl-6">
                                    <Card>
                                        <CardBody className="overview-card">
                                            <div className="content">
                                                <span>Total Contact</span>
                                                <h4>1.5k</h4>
                                            </div>

                                            <div className="icon-btn info-soft btn-xl rounded-circle cursor-none flex-shrink-0">
                                                <LuContact />
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>

                                <div className="col-xl-6">
                                    <Card>
                                        <CardBody className="overview-card">
                                            <div className="content">
                                                <span>Total Delivered</span>
                                                <h4>800</h4>
                                            </div>

                                            <div className="progress-wrapper">
                                                <Progress
                                                    size="md"
                                                    percentage={70}
                                                    type="circle"
                                                    color={`text-success`}
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>

                                <div className="col-xl-6">
                                    <Card>
                                        <CardBody className="overview-card">
                                            <div className="content">
                                                <span>Total Pending</span>
                                                <h4>700</h4>
                                            </div>

                                            <div className="progress-wrapper">
                                                <Progress
                                                    size="md"
                                                    percentage={70}
                                                    type="circle"
                                                    color={`text-warning`}
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>

                                <div className="col-xl-6">
                                    <Card>
                                        <CardBody className="overview-card">
                                            <div className="content">
                                                <span>Total Failed</span>
                                                <h4>700</h4>
                                            </div>

                                            <div className="progress-wrapper">
                                                <Progress
                                                    size="md"
                                                    percentage={70}
                                                    type="circle"
                                                    color={`text-danger`}
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>

                            <div>
                                <div className="mb-2">
                                    <h6 className="fs-15">Details</h6>
                                    <p className="fs-13 text-muted">An overview of the campaign's details,message and costs.</p>
                                </div>
                                <div className="row g-2">
                                    <div className="col-xl-6">
                                        <div className="py-2 px-3 bg--light border rounded-2 d-flex align-items-center gap-3">
                                            <LuTarget className="fs-20" />
                                            <div>
                                                <span className="fs-13 text-muted">
                                                    Target Audience
                                                </span>
                                                <h6 className="mt-1 fs-14">
                                                    Premium customers in US
                                                </h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-6">
                                        <div className="py-2 px-3 bg--light border rounded-2 d-flex align-items-center gap-3">
                                            <LuCalendarClock className="fs-20" />
                                            <div>
                                                <span className="fs-13 text-muted">
                                                    Schedule
                                                </span>
                                                <h6 className="mt-1 fs-14">
                                                    Nov 24, 2024 at 9:00 AM EST
                                                </h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-6">
                                        <div className="py-2 px-3 bg--light border rounded-2 d-flex align-items-center gap-3">
                                            <LuUsers className="fs-20" />
                                            <div>
                                                <span className="fs-13 text-muted">
                                                    Recipients
                                                </span>
                                                <h6 className="mt-1 fs-14">
                                                    15,000 contacts
                                                </h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-6">
                                        <div className="py-2 px-3 bg--light border rounded-2 d-flex align-items-center gap-3">
                                            <LuClock className="fs-20" />
                                            <div>
                                                <span className="fs-13 text-muted">
                                                    Duration
                                                </span>
                                                <h6 className="mt-1 fs-14">
                                                    3 days remaining
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-xl-5">
                    <Card className="h-100">
                        <CardHeader cardTitle="Message Preview" icon={LuMessageSquareMore}/>
                        <CardBody>
                            <MessagePreview whatsapp/>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <div className="mt-4">
                <TableWrapper>
                    <ContactTable />
                </TableWrapper>
            </div>
        </BaseLayout>
    );
};

export default CampaignDetails;

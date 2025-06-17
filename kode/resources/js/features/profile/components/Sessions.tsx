import React from "react";
import { LuActivity, LuFileWarning, LuLogOut, LuMapPin, LuMonitor } from "react-icons/lu";
import Button from "../../../components/common/button/Button";
import Card from "../../../components/common/card/Card";
import CardBody from "../../../components/common/card/CardBody";
import CardHeader from "../../../components/common/card/CardHeader";

const Sessions: React.FC = () => {
    return (
        <Card>
            <CardHeader
                cardTitle="Active Sessions"
                description={"Manage where you're signed in across all devices"}
            />
            <CardBody>
                <ul className="d-flex flex-column gap-3">
                    <li className="d-flex align-items-center justify-content-between flex-wrap gap-3 flex-wrap p-3 bg--light rounded-3">
                        <div className="d-flex align-items-center justify-content-start flex-wrap gap-3 flex-wrap">
                            <div className="icon-btn dark-soft  hover btn-xl rounded-circle flex-shrink-0">
                                <LuMonitor />
                            </div>
                            <div>
                                <h6>
                                    Chrome on MacBook Pro
                                    <span class="i-badge pill success-soft ms-3">
                                        Current
                                    </span>
                                </h6>
                                <div className="d-flex align-items-center gap-3 my-1 fs-14  text-muted">
                                    <span>
                                        <LuMapPin className="me-1" /> San
                                        Francisco, US
                                    </span>
                                    <span>
                                        <LuActivity className="me-1" /> San
                                        Francisco, US
                                    </span>
                                </div>
                                <p className="fs-14 text-muted">
                                    IP: 192.168.1.1
                                </p>
                            </div>
                        </div>
                    </li>

                    <li className="d-flex align-items-center justify-content-between flex-wrap gap-3 flex-wrap p-3 bg--light rounded-3">
                        <div className="d-flex align-items-center justify-content-start flex-wrap gap-3 flex-wrap">
                            <div className="icon-btn dark-soft  hover btn-xl rounded-circle flex-shrink-0">
                                <LuMonitor />
                            </div>
                            <div>
                                <h6>Edge on Windows 11</h6>
                                <div className="d-flex align-items-center gap-3 my-1 fs-14  text-muted">
                                    <span>
                                        <LuMapPin className="me-1" /> San
                                        Francisco, US
                                    </span>
                                    <span>
                                        <LuActivity className="me-1" /> San
                                        Francisco, US
                                    </span>
                                </div>
                                <p className="fs-14 text-muted">
                                    IP: 192.168.1.1
                                </p>
                            </div>
                        </div>
                        <Button className="btn--dark btn--md rounded-3 flex-shrink-0">
                            <LuLogOut /> Log out
                        </Button>
                    </li>

                    <li className="d-flex align-items-center justify-content-between flex-wrap gap-3 flex-wrap p-3 bg--light rounded-3">
                        <div className="d-flex align-items-center justify-content-start flex-wrap gap-3 flex-wrap">
                            <div className="icon-btn dark-soft  hover btn-xl rounded-circle flex-shrink-0">
                                <LuMonitor />
                            </div>
                            <div>
                                <h6>Safari on iPhone 15 Pro</h6>
                                <div className="d-flex align-items-center gap-3 my-1 fs-14  text-muted">
                                    <span>
                                        <LuMapPin className="me-1" /> San
                                        Francisco, US
                                    </span>
                                    <span>
                                        <LuActivity className="me-1" /> San
                                        Francisco, US
                                    </span>
                                </div>
                                <p className="fs-14 text-muted">
                                    IP: 192.168.1.1
                                </p>
                            </div>
                        </div>

                        <Button className="btn--dark btn--md rounded-3 flex-shrink-0">
                            <LuLogOut /> Log out
                        </Button>
                    </li>

                    <li className="d-flex align-items-center justify-content-between flex-wrap gap-3 flex-wrap p-3 fade alert alert-danger show rounded-3">
                        <div className="d-flex align-items-center justify-content-start flex-wrap gap-3 flex-wrap">
                            <div className="icon-btn danger-soft  hover btn-xl rounded-circle flex-shrink-0">
                                <LuFileWarning />
                            </div>
                            <div>
                                <h6 className="alert-heading">
                                    Sign out everywhere else
                                </h6>
                                <p className="fs-14 text-muted">
                                    End all other sessions except this one for
                                    security
                                </p>
                            </div>
                        </div>

                        <Button className="btn--danger btn--md rounded-3 flex-shrink-0">
                            <LuLogOut /> Sign Out All Others
                        </Button>
                    </li>
                </ul>
            </CardBody>
        </Card>
    );
};

export default Sessions;

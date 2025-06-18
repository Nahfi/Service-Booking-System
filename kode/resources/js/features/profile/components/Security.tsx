import React from "react";
import { LuDot } from "react-icons/lu";
import Card from "../../../components/common/card/Card";
import CardBody from "../../../components/common/card/CardBody";
import CardHeader from "../../../components/common/card/CardHeader";
import PasswordUpdate from "./PasswordUpdate";
import TwoFactorAuthentication from "./TwoFactorAuthentication";

const Security: React.FC = () => {
    return (
        <>
            <div className="row g-4">
                <div className="col-lg-9">
                    <div className="d-flex flex-column gap-4">
                        <PasswordUpdate/>
                        <TwoFactorAuthentication/>
                    </div>
                </div>

                <div className="col-lg-3">
                    <Card className="h-100">
                        <CardHeader cardTitle="Security Tips" />
                        <CardBody>
                            <ul className="d-flex flex-column gap-1">
                                <li>
                                    <LuDot />
                                    <span className="fs-14">
                                        Use a unique password for this account
                                    </span>
                                </li>
                                <li>
                                    <LuDot />
                                    <span className="fs-14">
                                        Enable two-factor authentication
                                    </span>
                                </li>
                                <li>
                                    <LuDot />
                                    <span className="fs-14">
                                        Review active sessions regularly
                                    </span>
                                </li>
                                <li>
                                    <LuDot />
                                    <span className="fs-14">
                                        Keep your recovery codes safe
                                    </span>
                                </li>
                            </ul>
                        </CardBody>
                    </Card>
                </div>
            </div>

        </>
    );
};

export default Security;
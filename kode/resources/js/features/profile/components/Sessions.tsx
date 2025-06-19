import React from "react";
import { useTranslation } from "react-i18next";
import { LuActivity, LuFileWarning, LuLogIn, LuLogOut, LuMapPin, LuMonitor } from "react-icons/lu";
import Button from "../../../components/common/button/Button";
import Card from "../../../components/common/card/Card";
import CardBody from "../../../components/common/card/CardBody";
import CardHeader from "../../../components/common/card/CardHeader";
import { valueToKey } from "../../../utils/helper";
import useGetUserSession from "../api/hooks/useGetUserSession";

const Sessions: React.FC = () => {
    const {t}=useTranslation()

    const { data, refetch, isLoading } = useGetUserSession();
    
    const sessionData = data?.data ||[];
    console.log(data);
    
    return (
        <Card>
            <CardHeader
                cardTitle="Active Sessions"
                description={"Manage where you're signed in across all devices"}
            />
            <CardBody>
                <div className="row g-4 session-list">
                    {sessionData?.length > 0 &&
                        sessionData.map((session) => (
                            <div className="col-lg-6" key={session?.id}>
                                <div className="p-3 border rounded-3 d-flex align-items-md-center justify-content-between flex-wrap gap-3 flex-md-row  flex-column-reverse  h-100 session-item">
                                    <div>
                                        <div>
                                            <h6 className="mb-2">
                                                {session?.device_name}

                                                {session?.is_current_device && (
                                                    <span className="i-badge pill success-soft ms-3">
                                                        Current
                                                    </span>
                                                )}
                                            </h6>

                                            <div className="d-flex flex-column gap-1">
                                                <div className="d-flex align-items-center gap-2 fs-14">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <LuLogIn />
                                                        {t(
                                                            valueToKey(
                                                                "Created At"
                                                            ),
                                                            "Created At"
                                                        )}
                                                        :
                                                    </div>
                                                    <p className="text-muted">
                                                        {session?.created_at}
                                                    </p>
                                                </div>

                                                <div className="d-flex align-items-center gap-2 fs-14">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <LuActivity />
                                                        {t(
                                                            valueToKey(
                                                                "Latest Activity"
                                                            ),
                                                            "Latest Activity"
                                                        )}
                                                        :
                                                    </div>
                                                    <p className="text-muted">
                                                        {
                                                            session?.last_active_at
                                                        }
                                                    </p>
                                                </div>

                                                <div className="d-flex align-items-center gap-2 fs-14">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <LuMapPin />
                                                        IP :
                                                    </div>
                                                    <p className="text-muted">
                                                        {session?.ip_address}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <Button className="btn--dark btn--md outline rounded-3 flex-shrink-0 mt-3">
                                            <LuLogOut />{" "}
                                            {t(
                                                valueToKey("Log out"),
                                                "Log out"
                                            )}
                                        </Button>
                                    </div>

                                    <div className="icon-btn dark-soft hover btn-xl rounded-circle flex-shrink-0">
                                        <LuMonitor />
                                    </div>
                                </div>
                            </div>
                        ))}

                    <div className="col-12">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 flex-wrap p-3 fade alert alert-danger show rounded-3">
                            <div className="d-flex align-items-center justify-content-start flex-wrap gap-3 flex-wrap">
                                <div className="icon-btn danger-soft  hover btn-xl rounded-circle flex-shrink-0">
                                    <LuFileWarning />
                                </div>
                                <div>
                                    <h6 className="alert-heading">
                                        Sign out everywhere else
                                    </h6>
                                    <p className="fs-14 text-muted">
                                        End all other sessions except this one
                                        for security
                                    </p>
                                </div>
                            </div>

                            <Button className="btn--danger btn--md rounded-3 flex-shrink-0">
                                <LuLogOut /> Sign Out All Others
                            </Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default Sessions;

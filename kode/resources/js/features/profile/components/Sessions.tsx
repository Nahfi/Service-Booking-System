import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { LuActivity, LuLogIn, LuLogOut, LuMapPin, LuMonitor } from "react-icons/lu";
import Button from "../../../components/common/button/Button";
import Card from "../../../components/common/card/Card";
import CardBody from "../../../components/common/card/CardBody";
import CardHeader from "../../../components/common/card/CardHeader";
import ModalWrapper, { DeleteModal } from "../../../components/common/modal";
import { useModal } from "../../../context";
import { valueToKey } from "../../../utils/helper";
import type { ModalContextType } from "../../../utils/types";
import useGetUserSession from "../api/hooks/useGetUserSession";
import useLogout from "../api/hooks/useLogout";
import useLogoutOthersSession from "../api/hooks/useLogoutOthersSession";

const Sessions: React.FC = () => {
    const { t } = useTranslation()

    const { data, refetch, isLoading } = useGetUserSession();
    const sessionData = data?.data || [];

    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid: string = "sessionModal"

    const { mutate: logoutFn, isPending } = useLogout();
    const { mutate: logoutOthersFn, isPending: OtherSessionLoader } = useLogoutOthersSession();

    const handleLogout = () => {
        logoutFn({all_device_logout : 1}, {
            onSuccess: (response) => {
                if ((response && response?.code === 200)) {
                    toast.success("Logout form all session");
                    closeModal();
                    refetch();
                }
            },
        })
    }
    
    const handleLogoutOthers = () => {
        logoutOthersFn({}, {
            onSuccess: (response) => {
                if (response && response?.code === 200) {
                    toast.success("Logout form others session");
                    closeModal();
                    refetch();
                }
            },
        })
    }
    
    return (
        <>
            <Card>
                <CardHeader
                    cardTitle="Active Sessions"
                    description={"Manage where you're signed in across all devices"}
                >
                    <Button className="btn--danger btn--lg rounded-3 outline flex-shrink-0" onClick={() => {
                        openModal(
                            modalUid,
                            "LOGOUT_OTHERS_SESSION",
                            "",
                            "md"
                        );
                    }}>
                        <LuLogOut className="fs-18" /> {t(valueToKey("Log out from other devices"),"Log out from other devices")}
                    </Button>
                </CardHeader>

                <CardBody>
                    <div className="row g-4 session-list">
                        {sessionData?.length > 0 &&
                            sessionData.map((session) => (
                                <div className="col-lg-4 col-md-6" key={session?.id}>
                                    <div className="p-3 border rounded-3 d-flex align-items-start  gap-3 flex-column  h-100 session-item">
                                        <div className="icon-btn dark-soft btn-xxl rounded-circle cursor-none flex-shrink-0">
                                            <LuMonitor />
                                        </div>

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

                                            <Button className="btn--danger btn--md outline rounded-3 flex-shrink-0 mt-3"
                                                // onClick={() => {
                                                //     openModal(
                                                //         modalUid,
                                                //         "LOGOUT_SESSION",
                                                //         "",
                                                //         "md"
                                                //     );
                                                // }}
                                            >
                                                <LuLogOut className="fs-18" />
                                                {t(
                                                    valueToKey("Log out"),
                                                    "Log out"
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </CardBody>
            </Card>

            {showModal && modalConfig?.modalUid === modalUid && (
                <ModalWrapper
                    title={modalConfig?.title}
                    onHide={closeModal}
                    show={showModal}
                    size={modalConfig?.size}
                    scrollable
                    centered
                >
                    {modalConfig?.type === "LOGOUT_SESSION" && (
                        <DeleteModal onHide={closeModal}
                            message={` Are you sure you want to log out this session?`}
                            description={`You will be signed out of your current session.
                                Make sure you've saved any unsaved work.`}
                            buttonLabel={`Log Out`}
                            onDelete={handleLogout}
                            isLoading={isPending}
                        />
                    )}

                    {modalConfig?.type === "LOGOUT_OTHERS_SESSION" && (
                        <DeleteModal onHide={closeModal}
                            message={`Are you sure you want to log out from other devices?`}
                            description={`This will sign you out from all other devices and browsers where your account is currently active.Make sure this action is intentional.`}
                            buttonLabel={`Log out other devices`}
                            onDelete={handleLogoutOthers}
                            isLoading={OtherSessionLoader}
                        />
                    )}
                </ModalWrapper>
            )}
        </>
    );
};

export default Sessions;


import type React from "react";
import { CardBody } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { LuTrash2 } from "react-icons/lu";
import { useDispatch } from "react-redux";
import Button from "../../../components/common/button/Button";
import Card from "../../../components/common/card/Card";
import CardHeader from "../../../components/common/card/CardHeader";
import ModalWrapper, { DeleteModal } from "../../../components/common/modal";
import { useModal } from "../../../context";
import { setUser } from "../../../redux/slices/userSlice";
import { valueToKey } from "../../../utils/helper";
import type { ModalContextType } from "../../../utils/types";
import useDeleteProfile from "../api/hooks/useDeleteProfile";
import useUserOnlineStatus from "../api/hooks/useUserOnlineStatus";
import OnlineStatus from "./OnlineStatus";
import ProfileForm from "./ProfileForm";

const ProfileInformation: React.FC = ({ user }) => {

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid: string = "profileInfoModal";

    const { mutate: updateOnlineStatusFn, isPending: isOnlineStatusPending } = useUserOnlineStatus();

    const { mutate: profileDeleteFn, isPending: deleteProfileLoader } = useDeleteProfile();

    const handleUpdateOnlineStatus = () => {
        const postData = {
            id: user?.id,
            value: user?.status === "active" ? "inactive" : "active",
        };

        updateOnlineStatusFn(postData, {
            onSuccess: (response) => {
                if (response) {
                    const updatedUser = {
                        ...user,
                        status: postData?.value,
                        is_online: response?.data?.is_online,
                    };
                    dispatch(setUser(updatedUser));
                    toast.success("Update online status");
                }
            }
        });
    }

    const handleProfileDelete = () => {
        profileDeleteFn({}, {
            onSuccess: (response) => {
                if (response) {
                    toast.success("Your account is deleted");
                }
            }
        })
    }

    return (
        <>
            <div className="row g-4">
                <div className="col-lg-8">
                    <ProfileForm user={user} />
                </div>

                <div className="col-lg-4">
                    <OnlineStatus onStatusUpdate={handleUpdateOnlineStatus} user={user} isPending={isOnlineStatusPending} />

                    <Card className="mt-4">
                        <CardHeader
                            cardTitle="Danger Zone"
                            description="These actions cannot be undone please proceed with caution."
                        />
                        <CardBody>
                            <div className="d-flex align-items-center justify-content-between gap-4 flex-wrap p-3 fade alert alert-danger show rounded-3 mb-0">
                                <div>
                                    <h6 className="fs-14 mb-1">
                                        {t(
                                            valueToKey(
                                                `Delete Account Permanently`
                                            ),
                                            `Delete Account Permanently`
                                        )}
                                        ?
                                    </h6>

                                    <p className="fs-13 text-muted">
                                        {t(
                                            valueToKey(
                                                `Permanently remove your account and all data`
                                            ),
                                            `Permanently remove your account and all data`
                                        )}
                                    </p>
                                </div>

                                <Button
                                    className="btn--danger btn--md rounded-3 flex-shrink-0"
                                    onClick={() =>
                                        openModal(
                                            modalUid,
                                            "PROFILE_DELETE",
                                            "",
                                            "md"
                                        )}
                                >
                                    <LuTrash2 />
                                    {t(
                                        valueToKey(`Delete Account`),
                                        `Delete Account`
                                    )}
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

            {showModal && modalConfig?.modalUid === modalUid && (
                <ModalWrapper
                    title={modalConfig?.title}
                    onHide={closeModal}
                    show={showModal}
                    size={modalConfig?.size}
                    scrollable
                    centered
                >
                    {modalConfig?.type === "PROFILE_DELETE" && (
                        <DeleteModal message="Are you sure you want to delete your account permanently?" description="All your data will be lost and cannot be recovered." onHide={closeModal} isLoading={deleteProfileLoader} onDelete={handleProfileDelete}/>
                    )}
                </ModalWrapper>
            )}
        </>
    );
};

export default ProfileInformation;

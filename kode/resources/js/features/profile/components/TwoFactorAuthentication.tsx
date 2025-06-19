import React, { useContext, useState } from "react";
import {
    LuEye,
    LuQrCode,
    LuShield
} from "react-icons/lu";
import Button from "../../../components/common/button/Button";
import Card from "../../../components/common/card/Card";
import CardBody from "../../../components/common/card/CardBody";
import CardHeader from "../../../components/common/card/CardHeader";
import ModalWrapper from "../../../components/common/modal";
import { ModalContext } from "../../../context";
import type { ModalContextType } from "../../../utils/types";
import AddTwoFactor from "./modals/AddTwoFactor";
import UpdateTwoFactor from "./modals/UpdateTwoFactor";


const TwoFactorAuthentication: React.FC = () => {

    const { showModal, modalConfig, openModal, closeModal } = useContext(
        ModalContext
    ) as ModalContextType;

    const [isEnable, setIsEnable] = useState<boolean>(false);

    const handleOpenAddModal = () => {
        openModal(
            "TWO-FACTOR-AUTHENTICATION",
            "Setup Two-Factor Authentication",
            "md"
        );
    };

    const handleOpenUpdateModal = () => {
        openModal(
            "UPDATE-TWO-FACTOR",
            "Setup Two-Factor Authentication",
            "lg"
        );
    };
    return (
        <>
            <Card>
                <CardHeader
                    cardTitle="Two-Factor Authentication"
                    description={
                        "Add an extra layer of security to your account"
                    }
                />

                <CardBody>
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-4 flex-wrap p-3 bg--light rounded-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                            <div className="icon-btn dark-soft  hover btn-xl rounded-circle flex-shrink-0">
                                <LuShield />
                            </div>
                            <div>
                                <h6 className="d-flex align-items-center gap-4 mb-1">
                                    Two-factor verification
                                    <span className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                        />
                                    </span>
                                </h6>
                                <p className="fs-14 text-muted">
                                    Secure your account with time-based codes
                                </p>
                            </div>
                        </div>

                        {!isEnable ? (
                            <Button
                                className="btn--dark btn--md rounded-3 mt-3"
                                onClick={handleOpenAddModal}
                            >
                                <LuQrCode /> Enable 2FA
                            </Button>
                        ) : (
                            <Button
                                className="btn--info btn--md rounded-3 mt-3"
                                onClick={handleOpenUpdateModal}
                            >
                                <LuEye />
                                View authentication
                            </Button>
                        )}
                    </div>
                </CardBody>
            </Card>

            <ModalWrapper
                title={modalConfig?.title}
                onHide={closeModal}
                show={showModal}
                size={modalConfig?.size}
                scrollable
                centered
            >
                {modalConfig?.type === "TWO-FACTOR-AUTHENTICATION" && (
                    <AddTwoFactor
                        onModalClose={closeModal}
                        setIsEnable={setIsEnable}
                    />
                )}

                {modalConfig?.type === "UPDATE-TWO-FACTOR" && (
                    <UpdateTwoFactor onModalClose={closeModal} />
                )}
            </ModalWrapper>
        </>
    );
};

export default TwoFactorAuthentication;

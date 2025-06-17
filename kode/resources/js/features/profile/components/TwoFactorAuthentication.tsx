import React, { useContext } from "react";
import {
    LuMonitor,
    LuQrCode
} from "react-icons/lu";
import Button from "../../../components/common/button/Button";
import Card from "../../../components/common/card/Card";
import CardBody from "../../../components/common/card/CardBody";
import CardHeader from "../../../components/common/card/CardHeader";
import ModalWrapper from "../../../components/common/modal";
import { ModalContext } from "../../../context";
import type { ModalContextType } from "../../../utils/types";

const TwoFactorAuthentication: React.FC = () => {
    const { showModal, modalConfig, openModal, closeModal } = useContext(ModalContext) as ModalContextType;

    const handleOpenModal = () => {
        openModal(
            "TWO-FACTOR-AUTHENTICATION",
            "Setup Two-Factor Authentication",
            "md"
        );
    }
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
                    <ul className="d-flex flex-column gap-3 mb-4">
                        <li className="d-flex align-items-center justify-content-between flex-wrap gap-4 flex-wrap p-3 bg--light rounded-3">
                            <div className="d-flex align-items-center justify-content-between flex-wrap gap-4">
                                <div className="icon-btn dark-soft  hover btn-xl rounded-circle flex-shrink-0">
                                    <LuMonitor />
                                </div>
                                <div>
                                    <h6>Authenticator App</h6>
                                    <p className="fs-14 text-muted">
                                        Secure your account with time-based
                                        codes
                                    </p>
                                </div>
                            </div>

                            <span class="i-badge pill danger-soft flex-shrink-0">
                                Inactive
                            </span>
                        </li>
                    </ul>

                    <div>
                        <Button
                            className="btn--dark btn--lg rounded-3 flex-shrink-0"
                            onClick={handleOpenModal}
                        >
                            <LuQrCode /> Enable 2FA
                        </Button>
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
                    <form className="two-factor-modal">
                        <div className="two-factor-wrapper">
                            <p>Follow these steps to secure your account</p>
                            <div className="text-center my-4">
                                <div
                                    className="two-factor-qrcode mb-2 rounded-2
                                "
                                >
                                    <LuQrCode />
                                </div>
                                <p className="fs-14 text-muted">
                                    Scan this QR code with your authenticator
                                    app
                                </p>
                            </div>

                        </div>
                        <div className="modal-custom-footer mt-4">
                            <Button
                                type="button"
                                className="btn--dark btn--lg outline rounded-3"
                                onClick={closeModal}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                className="btn--primary btn--lg rounded-3"
                            >
                                Enable 2FA
                            </Button>
                        </div>
                    </form>
                )}
            </ModalWrapper>
        </>
    );
};

export default TwoFactorAuthentication;

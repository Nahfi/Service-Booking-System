import React, { useContext } from "react";
import { LuDot, LuQrCode, LuShield } from "react-icons/lu";
import Button from "../../../components/common/button/Button";
import Card from "../../../components/common/card/Card";
import CardBody from "../../../components/common/card/CardBody";
import CardHeader from "../../../components/common/card/CardHeader";
import Field from "../../../components/common/from/Field";
import ModalWrapper from "../../../components/common/modal";
import { ModalContext } from "../../../context";
import type { ModalContextType } from "../../../utils/types";

const Password: React.FC = () => {
    const { showModal, modalConfig, openModal, closeModal } = useContext(
        ModalContext
    ) as ModalContextType;

    const handleOpenModal = () => {
        openModal(
            "TWO-FACTOR-AUTHENTICATION",
            "Setup Two-Factor Authentication",
            "md"
        );
    };
    return (
        <>
            <div className="row g-4">
                <div className="col-md-8">
                    <div className="d-flex flex-column gap-4">
                        <Card>
                            <CardHeader
                                cardTitle="Change Password"
                                description={
                                    "Keep your account secure with a strong password"
                                }
                            />
                            <CardBody>
                                <form>
                                    <div className="row g-4">
                                        <div className="col-12">
                                            <Field
                                                label="Current Password"
                                                required
                                            >
                                                <input
                                                    type="text"
                                                    id="current_password"
                                                    name="current_password"
                                                    className="form-control"
                                                    placeholder="Enter your current password"
                                                    required
                                                />
                                            </Field>
                                        </div>
                                        <div className="col-md-6">
                                            <Field
                                                label="New password"
                                                required
                                            >
                                                <input
                                                    type="text"
                                                    id="password"
                                                    name="password"
                                                    className="form-control"
                                                    placeholder="Enter your New Password"
                                                    required
                                                />
                                            </Field>
                                        </div>
                                        <div className="col-md-6">
                                            <Field
                                                label="Confirm New Password"
                                                required
                                            >
                                                <input
                                                    type="text"
                                                    id="password_confirmation"
                                                    name="password_confirmation"
                                                    className="form-control"
                                                    placeholder="Enter your confirmation password"
                                                    required
                                                />
                                            </Field>
                                        </div>
                                    </div>

                                    <div className="text-end mt-4">
                                        <Button className="btn--primary btn--lg">
                                            Update password
                                        </Button>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>

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
                                                <LuShield />
                                            </div>
                                            <div>
                                                <h6>Authenticator App</h6>
                                                <p className="fs-14 text-muted">
                                                    Secure your account with
                                                    time-based codes
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
                    </div>
                </div>

                <div className="col-md-4">
                    <Card>
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
}

export default Password;
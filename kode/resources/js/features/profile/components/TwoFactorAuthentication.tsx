import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
    LuQrCode,
    LuShield
} from "react-icons/lu";
import { useDispatch } from "react-redux";
import Button from "../../../components/common/button/Button";
import Card from "../../../components/common/card/Card";
import CardBody from "../../../components/common/card/CardBody";
import CardHeader from "../../../components/common/card/CardHeader";
import ModalWrapper from "../../../components/common/modal";
import { useModal } from "../../../context";
import { valueToKey } from "../../../utils/helper";
import type { ModalContextType, RootUserType } from "../../../utils/types";
import useGetTwoFactorSetup from "../api/hooks/2fa/useGetTwoFactorSetup";
import useTwoFactorDisable from "../api/hooks/2fa/useTwoFactorDisable";
import TwoFactorModal from "./modals/TwoFactorModal";


interface TwoFactorAuthenticationProps {
    user: RootUserType;
}

const TwoFactorAuthentication: React.FC<TwoFactorAuthenticationProps> = ({ user }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    
    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid: string = "twoFactorModal"

    const [localTwoFactorEnabled, setLocalTwoFactorEnabled] = useState(user?.two_factor_enabled);

    console.log(localTwoFactorEnabled);
    
    const { data, refetch, isLoading } = useGetTwoFactorSetup();
    const twoFactorData = useMemo(() => data?.data || null, [data]);
    
    const { mutate: twoFactorDisableFn, isPending } = useTwoFactorDisable();

    console.log(twoFactorData);
    

    useEffect(() => {
        setLocalTwoFactorEnabled(user?.two_factor_enabled);
    }, [user?.two_factor_enabled]);


    const handleTwoFactorDisable = () => {
        if (localTwoFactorEnabled) {
            // setLocalTwoFactorEnabled(false);
            twoFactorDisableFn({}, {
                onSuccess: (response) => {
                    if (response && response?.code == 200) {
                        setLocalTwoFactorEnabled(response?.data?.two_factor_enabled);
                        dispatch(setUser(response?.data));
                        refetch();
                        toast.success("Two factor authentication disabled successfully");
                    }
                }
            });
        }
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
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-4 flex-wrap p-3 bg--light rounded-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                            <div className="icon-btn dark-soft btn-xl rounded-circle flex-shrink-0 cursor-none">
                                <LuShield />
                            </div>
                            <div>
                                <h6 className="d-flex align-items-center gap-4 mb-1">
                                    {t(valueToKey("Two-factor verification"), "Two-factor verification")}
                                </h6>
                                <p className="fs-14 text-muted">
                                    {t(valueToKey("Secure your account with time-based codes"),
                                        "Secure your account with time-based codes")}
                                </p>
                            </div>
                        </div>

                        {(!localTwoFactorEnabled) ? (
                            <Button
                                className="btn--dark btn--md rounded-3 mt-3"
                                onClick={() => {
                                    openModal(
                                        modalUid,
                                        "TWO-FACTOR-AUTHENTICATION",
                                        "Setup Two-Factor Authentication",
                                        "xl",
                                        twoFactorData
                                    );
                                }}
                            >
                                <LuQrCode /> {t(valueToKey("Enable 2FA"), "Enable 2FA")}
                            </Button>
                        ) : (
                            <span className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="two-factor"
                                    disabled={isPending}
                                    checked={localTwoFactorEnabled}
                                    onChange={handleTwoFactorDisable}
                                />
                            </span>
                        )
                    }
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
                    {modalConfig?.type === "TWO-FACTOR-AUTHENTICATION" && (
                        <TwoFactorModal onModalClose={closeModal} twoFactorData={twoFactorData} setLocalTwoFactorEnabled={setLocalTwoFactorEnabled} />
                    )}
                </ModalWrapper>
            )}
        </>
    );
};

export default TwoFactorAuthentication;

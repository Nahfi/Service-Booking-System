import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { LuCopy, LuRotateCw } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';
import Button from '../../../../components/common/button/Button';
import Field from '../../../../components/common/from/Field';
import { setUser } from '../../../../redux/slices/userSlice';
import { onCopy, valueToKey } from '../../../../utils/helper';
import useTwoFactorVerify from '../../api/hooks/2fa/useTwoFactorVerify';

const TwoFactorModal = ({ onModalClose, twoFactorData, setLocalTwoFactorEnabled }) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [otp, setOtp] = useState('');

    const recovery_codes = twoFactorData?.recovery_codes;

    const { mutate: TwoFactorVerifyFn, isPending } = useTwoFactorVerify();

    const handleOptInput = (e) => {
        setOtp(e.target.value)
    }
    
    const handleTwoFactorVerify = () => {
        const code = { code: otp }
        TwoFactorVerifyFn((code), {
            onSuccess: (response) => {
                if (response && response?.code==200) {
                    setLocalTwoFactorEnabled(response?.data?.two_factor_enabled);
                    dispatch(setUser(response?.data));
                    onModalClose();
                    toast.success("Authentication  is successful");
                }
            }
        })
    }

    return (
        <div className="two-factor-modal">
            <div>
                <div className='mb-4'>
                    <p className='d-flex align-items-center gap-1 flex-wrap fs-16 lh-2'>You will need an authenticator mobile app to complete this process, such as one of the following:
                        <Link to={`https://shorturl.at/xc7By`} target='_blank'>Google authenticator</Link>,
                        <Link to={`https://shorturl.at/IoSW8`} target='_blank'>Microsoft authenticator</Link>.
                    </p>
                </div>

                <div className="row g-4">
                    <div className="col-lg-6">
                        <div className='d-flex align-items-center justify-content-between gap-3 mb-1'>
                          <h6 className="mb-2 fs-14">{t(valueToKey("Your Recovery code"), "Your Recovery code")}:</h6>
                            <div className="d-flex align-items-center gap-2">
                                <Button
                                    iconBtn={true}
                                    tooltipText="Regenerate Recovery Codes"
                                    icon={LuRotateCw}
                                    className="danger-soft btn-ghost hover btn-sm circle fs-16"
                                />

                                <Button
                                    iconBtn={true}
                                    tooltipText="Copy code"
                                    icon={LuCopy}
                                    className="info-soft btn-ghost hover btn-sm circle fs-16"
                                    onClick={() => onCopy(recovery_codes)}
                                />
                            </div>
                        </div>

                        <div className="border bg--light rounded-3 py-2 px-2 mb-3 d-flex align-items-center flex-wrap gap-1">
                            {recovery_codes && recovery_codes.map((code) => (
                                <span className="fs-13" key={code}>
                                    {code},
                                </span>
                            ))}

                        </div>
                       

                        <p className="fs-14 fade alert alert-warning show p-2 mb-0">
                            <b className="me-1">{t("important", "Important")}:</b>
                            {t(valueToKey("Store these recovery codes in a secure password manager.They can be used to recover access to your account if"), "Store these recovery codes in a secure password manager.They can be used to recover access to your account if")}
                        </p>
                    </div>

                    <div className="col-lg-6">
                        <div className="two-factor-wrapper">
                            <div>
                                <div>
                                    <div className='d-flex align-items-center gap-2'>
                                        <p className='i-badge pill dark-soft bg-transparent border fw-semibold'>
                                            Step 1
                                        </p>
                                        <h6 className='fs-15 text-muted'>Scan QR Code</h6>
                                    </div>
                                    <p className="fs-13 text-muted">
                                        {t(valueToKey("Scan this QR code with your authenticator app"),
                                            "Scan this QR code with your authenticator app")}
                                    </p>
                                </div>

                                <div
                                    className="two-factor-qrcode mb-2"
                                >
                                    <img src={twoFactorData?.qr_code} alt='qr_code' className='w-100 h-100' />
                                </div>
                            </div>

                            <div>
                                <div>
                                    <div className='d-flex align-items-center gap-2'>
                                        <p className='i-badge pill dark-soft bg-transparent border fw-semibold'>
                                            Step 2
                                        </p>
                                        <h6 className='fs-15 text-muted'>Get Verification Code</h6>
                                    </div>
                                    <p className='fs-13 text-muted mb-3'>After scanning the QR code above, enter the six-digit code generated by your authenticator.</p>

                                    <Field>
                                        <input type="text" name='otp' value={otp} onChange={handleOptInput} className='form-control'/>
                                    </Field>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal-custom-footer mt-4">
                <Button
                    type="button"
                    className="btn--dark btn--lg outline rounded-3"
                    onClick={onModalClose}
                >
                    {t("cancel", "Cancel")}
                </Button>

                <Button
                    onClick={handleTwoFactorVerify}
                    className="btn--primary btn--lg rounded-3"
                    isLoading={isPending}
                >
                    {t("verify_now", "Verify now")}

                </Button>
            </div>
        </div>
    );
};

export default TwoFactorModal;


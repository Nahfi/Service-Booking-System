import { LuCopy, LuQrCode, LuRotateCw } from 'react-icons/lu';
import Button from '../../../../components/common/button/Button';

const recovery_codes = [
    "Vn8OFKh7EJ-Gruiz",
    "Tp4dd9nqfK-VqZKN",
    "bERYcnj1sd-5X5Ie",
    "W87GREHRyp-EkBW0",
    "PFMhKVTljg-AhbKW",
    "bmPep65ZmX-UZxbI",
    "v3EvEktwOO-rDLWS",
    "fbucxBi4vd-wwXg7",
];

const UpdateTwoFactor = ({ onModalClose }) => {
    return (
        <div className="two-factor-modal">
            <p className="mb-3">Follow these steps to secure your account</p>

            <div className="row g-4 justify-content-center">
                <div className="col-lg-5">
                    <div className="two-factor-wrapper">
                        <div className="text-center">
                            <div
                                className="two-factor-qrcode mb-2 rounded-2
                    "
                            >
                                <LuQrCode />
                            </div>
                            <p className="fs-14 text-muted">
                                Scan this QR code with your authenticator app
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-7">
                    <h6 className="mb-2 fs-14">Your Recovery code:</h6>
                    
                    <div className="border bg--light rounded-3 py-2 px-3 mb-3 position-relative">
                        {recovery_codes &&
                            recovery_codes.map((code, index) => (
                                <p className="fs-14" key={index}>
                                    {code}
                                </p>
                            ))}

                        <div className="position-absolute top-0 end-0 d-flex align-items-center gap-1">
                            <Button
                                iconBtn={true}
                                tooltipText="Regenerate Recovery Codes"
                                icon={LuRotateCw}
                                className="danger-soft btn-ghost hover btn-sm fs-18"
                            />

                            <Button
                                iconBtn={true}
                                tooltipText="Copy"
                                icon={LuCopy}
                                className="info-soft btn-ghost hover btn-sm fs-18"
                            />
                        </div>
                    </div>

                    <p className="fs-14 fade alert alert-warning show p-2 mb-0">
                        <b className="me-1">Important:</b>
                        Store these recovery codes in a secure password manager.
                        They can be used to recover access to your account if
                    </p>
                </div>
            </div>

            <div className="modal-custom-footer mt-4">
                <Button
                    className="btn--dark btn--lg outline rounded-3"
                    onClick={onModalClose}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default UpdateTwoFactor;
import { LuQrCode } from 'react-icons/lu';
import Button from '../../../../components/common/button/Button';

const AddTwoFactor = ({ onModalClose, setIsEnable }) => {
    return (
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
                        Scan this QR code with your authenticator app
                    </p>
                </div>
            </div>
            
            <div className="modal-custom-footer mt-4">
                <Button
                    type="button"
                    className="btn--dark btn--lg outline rounded-3"
                    onClick={onModalClose}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    className="btn--primary btn--lg rounded-3"
                    onClick={() => {
                        setIsEnable(true);
                        onModalClose();
                    }}
                >
                    Enable 2FA
                </Button>
            </div>
        </form>
    );
};

export default AddTwoFactor;
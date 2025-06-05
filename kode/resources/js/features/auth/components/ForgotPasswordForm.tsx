import Button from "@/components/common/button/Button";
import type React from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Field from "../../../components/common/from/Field";
import useTogglePassword from "../../../hook/useTogglePassword";
import type { FormSubmitEvent } from "../../../utils/types";

interface LoginFormProps {
    handlePasswordUpdate: (e: FormSubmitEvent) => void;
    loading: boolean;
}

const ForgotPasswordForm: React.FC = ({ handlePasswordUpdate, loading }) => {
    const passwordToggle = useTogglePassword();
    const confirmPasswordToggle = useTogglePassword();

    return (
        <form onSubmit={handlePasswordUpdate}>
            <div className="row g-3">
                <div className="col-12">
                    <Field label="Verification Code" required>
                        <input
                            type="text"
                            id="verification_code"
                            name="verification_code"
                            className="form-control"
                            placeholder="Enter your verification code"
                            required
                        />
                    </Field>
                </div>

                <div className="col-12">
                    <Field label="password">
                        <div className="password-wrapper">
                            <input
                                type={
                                    !passwordToggle.visible
                                        ? "password"
                                        : "text"
                                }
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter Password"
                            />
                            <span
                                className="password-toggle"
                                onClick={passwordToggle.togglePassword}
                            >
                                {!passwordToggle.visible ? (
                                    <LuEye />
                                ) : (
                                    <LuEyeOff />
                                )}
                            </span>
                        </div>
                    </Field>
                </div>

                <div className="col-12">
                    <Field label="Confirm Password">
                        <div className="password-wrapper">
                            <input
                                type={
                                    !confirmPasswordToggle.visible
                                        ? "password"
                                        : "text"
                                }
                                id="password_confirmation"
                                className="form-control"
                                name="password_confirmation"
                                placeholder="Enter Confirm Password"
                            />
                            <span
                                className="password-toggle"
                                onClick={confirmPasswordToggle.togglePassword}
                            >
                                {!confirmPasswordToggle.visible ? (
                                    <LuEye />
                                ) : (
                                    <LuEyeOff />
                                )}
                            </span>
                        </div>
                    </Field>
                </div>

                <div className="col-12">
                    <Button
                        type="submit"
                        className="btn--xl btn--primary w-100 rounded-3 mt-3"
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;

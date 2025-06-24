
import type React from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link } from "react-router-dom";
import { UAParser } from "ua-parser-js";
import Button from "../../../components/common/button/Button";
import Field from "../../../components/common/from/Field";
import useTogglePassword from "../../../hook/useTogglePassword";
import type { FormSubmitEvent } from "../../../utils/types";

interface LoginFormProps {
    handleLogin: (e: FormSubmitEvent) => void;
    loading: boolean;
}


const LoginForm: React.FC = ({ handleLogin ,loading}) => {
    const { visible, togglePassword } = useTogglePassword();

    const userAgent = window?.navigator?.userAgent;
    const parser = new UAParser(userAgent);
    const result = parser.getResult();
    const deviceName = `${result.os.name}-${result.browser.name}-${result.device.type || "Desktop"}`;

    return (
        <form onSubmit={handleLogin}>
            <div className="row g-3">
                <input
                    type="hidden"
                    name="device_name"
                    id="device_name"
                    defaultValue={deviceName}
                    required
                />

                <div className="col-12">
                    <Field label="email" required>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                            required
                        />
                    </Field>
                </div>

                <div className="col-12">
                    <div className="password-wrapper">
                        <Field label="password" required>
                            <input
                                type={visible ? "text" : "password"}
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter Password"
                                required
                            />
                        </Field>
                        <span
                            className="password-toggle"
                            onClick={togglePassword}
                        >
                            {!visible ? <LuEye /> : <LuEyeOff />}
                        </span>
                    </div>
                </div>

                <div className="col-12">
                    <div className="row">
                        <div className="col-6">
                            <Field label="Remember me">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    name="remember_me"
                                />
                            </Field>
                        </div>
                        <div className="col-6 text-end">
                            <div className="forget-pass">
                                <Link to="/forgot-password">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <Button
                        type="submit"
                        className="btn--xl btn--primary w-100 rounded-3 mt-3"
                        isLoading={loading}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
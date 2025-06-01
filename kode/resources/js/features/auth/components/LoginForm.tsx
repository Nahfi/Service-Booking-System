
import Button from "@/components/common/button/Button";
import type React from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link } from "react-router-dom";
import Field from "../../../components/common/from/Field";
import useTogglePassword from "../../../hook/useTogglePassword";

const LoginForm: React.FC = () => {
    const { visible, togglePassword } = useTogglePassword();

    return (
        <form action="#">
            <div className="row g-4">
                <div className="col-12">
                    <Field label="email" required>
                        <input
                            type="text"
                            id="email"
                            className="form-control"
                            placeholder="Enter Email"
                        />
                    </Field>
                </div>
                <div className="col-12">
                    <div className="password-wrapper">
                        <Field label="password" required>
                            <input
                                type={visible ? "text" : "password"}
                                id="password"
                                className="form-control"
                                placeholder="Enter Password"
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
                                <input type="checkbox" id="remember" />
                            </Field>
                        </div>
                        <div className="col-6 text-end">
                            <div className="forget-pass">
                                <Link to="/">Forgot Password?</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <Button
                        type="submit"
                        className="btn--xl btn--primary w-100 rounded-3"
                    >
                        Login
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;

import Button from "@/components/common/button/Button";
import React from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Field from "../../../components/common/from/Field";
import useTogglePassword from "../../../hook/useTogglePassword";

const SignupForm: React.FC  = () => {
  const passwordToggle = useTogglePassword();
  const confirmPasswordToggle = useTogglePassword();

  return (
      <form action="#">
        <div className="row g-4">
          <div className="col-12">
            <Field label="Full Name" required>
              <input
                type="text"
                id="fullName"
                className="form-control"
                placeholder="Enter Full Name"
              />
            </Field>
          </div>

          <div className="col-12">
            <Field label="Email" required>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter Email"
              />
            </Field>
          </div>

          <div className="col-12">
            <Field label="password">
              <div className="password-wrapper">
                <input
                  type={!passwordToggle.visible ? "password" : "text"}
                  id="password"
                  className="form-control"
                  placeholder="Enter Password"
                />
                <span
                  className="password-toggle"
                  onClick={passwordToggle.togglePassword}
                >
                  {!passwordToggle.visible ? <LuEye /> : <LuEyeOff />}
                </span>
              </div>
            </Field>
          </div>

          <div className="col-12">
            <Field label="Confirm Password">
              <div className="password-wrapper">
                <input
                  type={!confirmPasswordToggle.visible ? "password" : "text"}
                  id="cpassword"
                  className="form-control"
                  placeholder="Confirm Password"
                />
                <span
                  className="password-toggle"
                  onClick={confirmPasswordToggle.togglePassword}
                >
                  {!confirmPasswordToggle.visible ? <LuEye /> : <LuEyeOff />}
                </span>
              </div>
            </Field>
          </div>

          <div className="col-12">
            <Field
              label="I agree to the"
              labelLink={{ href: "/#", text: "terms and conditions" }}
            >
              <input type="checkbox" id="agree-terms" />
            </Field>
          </div>

          <div className="col-12">
            <Button type="submit" className="btn--xl btn--primary w-100 rounded-3">
              Register
            </Button>
          </div>
        </div>
      </form>
  );
};

export default SignupForm;

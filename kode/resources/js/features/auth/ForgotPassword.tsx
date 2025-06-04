
import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import type { FormSubmitEvent } from "../../utils/types";
import { useEmailVerify } from "./api/hook/useEmailVerify";
import { usePasswordUpdate } from "./api/hook/usePasswordUpdate";
import AuthFooter from "./components/AuthFooter";
import AuthHeader from "./components/AuthHeader";
import AuthLayout from "./components/AuthLayout";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import VerifyEmailForm from "./components/VerifyEmailForm";

interface FormConfiguration {
    password_update: boolean;
    email: string | null;
}

const ForgotPassword: React.FC = () => {

    const navigate = useNavigate(); 
    const { mutate: emailVerify, isPending } = useEmailVerify();
    const { mutate: passwordUpdateFn, isPending: passwordUpdateLoader } = usePasswordUpdate();

    const [formConfiguration, setFormConfiguration] =useState<FormConfiguration>({
            password_update: false,
            email: null,
    });
    
    const handleEmailVerify = async (event: FormSubmitEvent): void => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formInput = Object.fromEntries(formData.entries());
        const postData = { email :formInput.email};
        
        emailVerify(postData, {
            onSuccess: (response) => {
                if (response) {
                    toast.success(response?.message);
                    setFormConfiguration((prevState) => {
                        return {
                            ...prevState,
                            password_update: true,
                            email: formInput.email,
                        };
                    });
                }
            },
        });
    };

    const handlePasswordUpdate = async (event: FormSubmitEvent): void => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const postData = Object.fromEntries(formData.entries());

        postData.email = formConfiguration.email;

        passwordUpdateFn(postData, {
            onSuccess: (response) => {
                if (response) {
                    toast.success(response?.message);  
                    navigate("/login");
                }
            },
        });
    };




    console.log(formConfiguration);
    
    return (
        <AuthLayout>
            <>
                <AuthHeader
                    title={
                        !formConfiguration.password_update
                            ? "Forgot Password"
                            : "Reset password"
                    }
                    description={
                        !formConfiguration.password_update
                            ? "Please enter your email to receive a verification code"
                            : "Your new password must different to previous password"
                    }
                />

                {!formConfiguration.password_update ? (
                    <VerifyEmailForm
                        handleEmailVerify={handleEmailVerify}
                        loading={isPending}
                    />
                ) : (
                    <ForgotPasswordForm
                        handlePasswordUpdate={handlePasswordUpdate}
                        loading={passwordUpdateLoader}
                    />
                )}

                <AuthFooter />
            </>
        </AuthLayout>
    );
};

export default ForgotPassword;

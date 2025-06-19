import type React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useEmailVerify } from "./api/hook/useEmailVerify";
import AuthHeader from "./components/AuthHeader";
import AuthLayout from "./components/AuthLayout";
import VerifyEmailForm from "./components/VerifyEmailForm";

const VerifyEmail: React.FC = () => {

    const navigate = useNavigate(); 
    const { mutate: emailVerify, isPending, error } = useEmailVerify();

    const handleEmailVerify = async (event: FormSubmitEvent): void => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const postData = Object.fromEntries(formData.entries());

        emailVerify(postData, {
            onSuccess: (response) => {
                if (response) {
                    toast.success(response?.message);  
                    navigate("/forgot-password");
                }
            },
        });
    };

    return (
        <AuthLayout>
            <>
                <AuthHeader
                    title={"Verify your email"}
                    description={"Please enter your verification code"}
                />
                <VerifyEmailForm
                    handleEmailVerify={handleEmailVerify}
                    loading={isPending}
                />
            </>
        </AuthLayout>
    );
};

export default VerifyEmail;

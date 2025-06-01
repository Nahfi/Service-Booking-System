
import type React from "react";
import AuthHeader from "./components/AuthHeader";
import AuthLayout from "./components/AuthLayout";
import SignupForm from "./components/SignupForm";

const Signup: React.FC = () => {
    return (
        <AuthLayout>
            <>
                <AuthHeader
                    title={"Welcome to QukMsg!"}
                    description={"Register to new account"}
                />
                <SignupForm />
            </>
        </AuthLayout>
    );
};

export default Signup;


import type React from "react";
import AuthHeader from "./components/AuthHeader";
import AuthLayout from "./components/AuthLayout";
import LoginForm from "./components/LoginForm";

const Login: React.FC = () => {
    return (
        <AuthLayout>
            <>
                <AuthHeader
                    title={"Welcome Back!"}
                    description={"Sign in your account"}
                />
                <LoginForm />
            </>
        </AuthLayout>
    );
};

export default Login;

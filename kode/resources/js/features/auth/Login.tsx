
import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../../redux/slices/userSlice";
import { getToken } from "../../utils/helper";
import { useSignIn } from "./api/hook/useSignIn";
import AuthHeader from "./components/AuthHeader";
import AuthLayout from "./components/AuthLayout";
import LoginForm from "./components/LoginForm";

const Login: React.FC = () => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const token = getToken() 
    const { mutate: signIn, isPending, error } = useSignIn();

    const handleLogin = async (e: FormSubmitEvent): void => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const signInData = Object.fromEntries(formData.entries());

        signIn(signInData, {
            onSuccess: (response) => {
                if (response) {
                    const token = response?.data?.access_token;
                    const user = response?.user;
                    if (token && user) {
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("token", token);
                        }
                        dispatch(setUser(user));
                    }
                }
            },
        });
    };


    return (
        <AuthLayout>
            <>
                <AuthHeader
                    title={"Welcome Back!"}
                    description={"Sign in your account"}
                />
                <LoginForm handleLogin={handleLogin} loading={isPending} />
            </>
        </AuthLayout>
    );
};

export default Login;

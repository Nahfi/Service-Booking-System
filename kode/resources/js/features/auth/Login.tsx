
import Cookies from "js-cookie";
import type React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import SEO from "../../components/common/seo/SEO";
import { setUser } from "../../redux/slices/userSlice";
import type { RootState } from "../../redux/store/store";
import { getToken } from "../../utils/helper";
import { useSignIn } from "./api/hook/useSignIn";
import AuthHeader from "./components/AuthHeader";
import AuthLayout from "./components/AuthLayout";
import LoginForm from "./components/LoginForm";

interface LoginFormData {
    email: string;
    password: string;
    device_name: string;
    remember_me?: boolean;
    code?: string;
}


const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [authenticationCode, setAuthenticationCode] = useState<boolean>(false);
    const [loginData, setLoginData] = useState<LoginFormData | null>(null);

    const user = useSelector((state: RootState) => state.user);
    const token = getToken()

    const { mutate: signIn, isPending, error } = useSignIn();

    const handleLogin = (e: FormSubmitEvent): void => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const signInData = Object.fromEntries(formData.entries()) as LoginFormData;

        const finalSignInData = authenticationCode && loginData
            ? { ...loginData, code: signInData.code }
            : signInData;


        if (!authenticationCode) {
            setLoginData(signInData);
        }

        signIn(signInData, {
            onSuccess: (response) => {
                if (response && response?.code == 200) {
                    const token = response?.data?.access_token;
                    const user = response?.user;
                    if (token && user) {
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("token", token);
                        }
                        dispatch(setUser(user));
                        Cookies.set("authToken", token, { path: "/", secure: true });
                        navigate('/');
                    }
                } else if (response?.code === 401) {
                    if ((response?.event === 'unauthorized_request') && (response?.data?.error === '2FA code required')) {
                        setAuthenticationCode(true);
                    }
                }
            },
            onError: (error) => {
                // Reset 2FA state on error to allow retry
                if (authenticationCode) {
                    setAuthenticationCode(false);
                    setLoginData(null);
                }
            }
        });
    };

    return (
        <>
            <SEO title="Login" />

            <AuthLayout>
                <>
                    <AuthHeader
                        title={"Welcome Back!"}
                        description={"Sign in your account"}
                    />
                    <LoginForm handleLogin={handleLogin} loading={isPending} authenticationCode={authenticationCode} loginData={loginData} />
                </>
            </AuthLayout>
        </>
    );
};

export default Login;

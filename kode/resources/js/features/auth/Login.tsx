
import type React from "react";
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
import Cookies from "js-cookie";

const Login: React.FC = () => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.user);
    const token = getToken() 
    const { mutate: signIn, isPending, error } = useSignIn();

    const handleLogin = (e: FormSubmitEvent): void => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const signInData = Object.fromEntries(formData.entries());

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
                }
            },
        });
    };

    return (
        <>
            <SEO title="Login"/>
            
            <AuthLayout>
                <>
                    <AuthHeader
                        title={"Welcome Back!"}
                        description={"Sign in your account"}
                    />
                    <LoginForm handleLogin={handleLogin} loading={isPending} />
                </>
            </AuthLayout>
        </>
    );
};

export default Login;

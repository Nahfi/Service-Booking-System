
import AuthFooter from "./components/AuthFooter";
import AuthHeader from "./components/AuthHeader";
import AuthLayout from "./components/AuthLayout";
import SignupForm from "./components/SignupForm";

const Signup = () => {
    return (
        <AuthLayout>
            <>
                <AuthHeader
                    title={"Welcome to QukMsg!"}
                    description={"Register to new account"}
                />
                <SignupForm />
                <AuthFooter isSignup={"true"} />
            </>
        </AuthLayout>
    );
};

export default Signup;

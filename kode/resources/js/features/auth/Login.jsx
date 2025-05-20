
import AuthHeader from "./components/AuthHeader";
import AuthLayout from "./components/AuthLayout";
import LoginForm from "./components/LoginForm";

const Login = () => {
    return (
      <AuthLayout>
        <>
          <AuthHeader
            title={"Welcome Back!"}
            description={"Sign in your account"}
          />
          <LoginForm />
          {/* <AuthFooter /> */}
        </>
      </AuthLayout>
    );
};

export default Login;

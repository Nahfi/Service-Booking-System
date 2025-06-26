import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { getToken } from "../../utils/helper";

interface ApiErrorResponse {
  data?: {
    errors?: Record<string, string[]>;
    error?: string;
  };
  message?: string;
  is_user_authenticate?: boolean;
}


const handleTokenExpire = (redirectPath: string = "/login"): void => {
    if (getToken()) {
        toast.error("Your account is inactive or Your token has been expired");
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            const navigate = useNavigate();
            navigate(redirectPath);
        }
    }
};

const onErrorResponse = (data: AxiosError): void => {

  const response = data?.response;
  const resData = response?.data as ApiErrorResponse | undefined;
  if (resData) {

    const errors = resData?.data?.errors;

    if (errors) {
      Object.values(errors)
        .flat()
        .forEach((message) => {
          toast.error(message);
        });
    } else if (resData?.data?.error) {
      toast.error(resData?.data?.error);
    } else if (resData?.message) {
      toast.error(resData?.message);
    }

    if (resData?.is_user_authenticate === false) {
      handleTokenExpire();
    }
  }
};

export { onErrorResponse };


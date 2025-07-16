import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { resetUserStorage } from "../../features/auth/utils/authController";
import { getToken } from "../../utils/helper";

interface ApiErrorResponse {
  success: boolean;
  code: number
  data?: {
    errors?: Record<string, string[]>;
    error?: string;
  };
  message?: string;
  is_user_authenticate?: boolean;
}


const handleTokenExpire = (redirectPath: string = "/login"): void => {
  const persistKey = "persist:quk-msg";
  const token = getToken()

  if (token) {
      toast.error("Your account is inactive or Your token has been expired");
      if (typeof window !== "undefined") {
          localStorage.removeItem("token");
      }
      resetUserStorage(
          persistKey,
          JSON.parse(localStorage.getItem(persistKey))
      );
      const queryClient = new QueryClient();
      queryClient.clear();
      window.location.href = redirectPath;
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


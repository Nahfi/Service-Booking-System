import MainApi from "@/api-manager/MainApi";
import { onErrorResponse } from "@/api-manager/api-error-response/ErrorResponses";
import { useMutation } from "@tanstack/react-query";

const logout = () => {
    try {
        const { data } = MainApi.post(`/logout`);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useLogout = () => {
    return useMutation({
        mutationKey: "user-sign-Out",
        mutationFn: logout,
        onError: onErrorResponse,
    });
};

export default useLogout;
import MainApi from "@/api-manager/MainApi";
import { onErrorResponse } from "@/api-manager/api-error-response/ErrorResponses";
import { useMutation } from "@tanstack/react-query";


const logout = async (data = null) => {

    const URL =
        data && data?.all_device_logout
            ? "/logout?all_device_logout=1"
            : "/logout";
    try {
        const { data } = await MainApi.post(URL);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useLogout = () => {
    return useMutation({
        mutationKey: ["user-sign-Out"],
        mutationFn: logout,
        onError: onErrorResponse,
    });
};

export default useLogout;
import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";

const logoutOthersSession = async () => {
    try {
        const { data } = await MainApi.post(`/sessions/logout-others`);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useLogoutOthersSession = () => {
    return useMutation({
        mutationKey: ["user-logout-all-session"],
        mutationFn: logoutOthersSession,
        onError: onErrorResponse,
    });
};

export default useLogoutOthersSession;
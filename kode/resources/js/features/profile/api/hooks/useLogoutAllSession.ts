import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";

const userSignOutAllSession = () => {
    try {
        const { data } = MainApi.post(`/sessions/logout-others`);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useLogoutAllSession = () => {
    return useMutation({
        mutationKey: "user-logout-all-session",
        mutationFn: userSignOutAllSession,
        onError: onErrorResponse,
    });
};

export default useLogoutAllSession;
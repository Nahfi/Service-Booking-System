import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";


const updateOnlineStatus = async (postData) => {
    try {
        const { data } = await MainApi.post(
            `/profile/toggle-online-status`,
            postData
        );
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

 const useUserOnlineStatus = () => {
    return useMutation({
        mutationKey: "update-user-online-status",
        mutationFn: updateOnlineStatus,
        onError: onErrorResponse,
    });
};

export default useUserOnlineStatus;
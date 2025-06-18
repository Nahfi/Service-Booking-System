import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";

const updateFcmToken= (postData) => {
    try {
        const { data } = MainApi.post(`/profile/update-fcm-token`, postData);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

 const useUpdateFcmToken = () => {
    return useMutation({
        mutationKey: "user-fcm-token",
        mutationFn: updateFcmToken,
        onError: onErrorResponse,
    });
};
export default useUpdateFcmToken;
import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";


const userSignOut = (postData) => {
    try {
        const { data } = MainApi.post(`/logout`, postData);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useSignOut = () => {
    return useMutation({
        mutationKey: "user-sign-Out",
        mutationFn: userSignOut,
        onError: onErrorResponse,
    });
};

export default useSignOut;
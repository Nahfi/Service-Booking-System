import { onErrorResponse } from "@/api-manager/api-error-response/ErrorResponses";
import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";

interface emailVerifyData {
    email: string;
    code: string | number;
}

const emailVerifyFn = async (postData: emailVerifyData) => {
    try {
        const { data } = await MainApi.post(`/password/verify-email`, postData);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

export const useEmailVerify = () => {
    return useMutation({
        mutationKey: "email-verify",
        mutationFn: emailVerifyFn,
        onError: onErrorResponse,
    });
};

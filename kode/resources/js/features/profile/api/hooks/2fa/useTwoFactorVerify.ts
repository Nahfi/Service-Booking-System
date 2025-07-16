import MainApi from "@/api-manager/MainApi";
import { onErrorResponse } from "@/api-manager/api-error-response/ErrorResponses";
import { useMutation } from "@tanstack/react-query";

const verifyTwoFactor = async (postData) => {
    try {
        const { data } = await MainApi.post(`/2fa/verify`, postData);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useTwoFactorVerify = () => {
    return useMutation({
        mutationKey: ["verify-two-factor"],
        mutationFn: verifyTwoFactor,
        onError: onErrorResponse,
    });
};

export default useTwoFactorVerify;

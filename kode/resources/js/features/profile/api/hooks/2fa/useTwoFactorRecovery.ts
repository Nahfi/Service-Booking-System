import MainApi from "@/api-manager/MainApi";
import { onErrorResponse } from "@/api-manager/api-error-response/ErrorResponses";
import { useMutation } from "@tanstack/react-query";

const recoveryTwoFactor = async () => {
    try {
        const { data } = await MainApi.post(`/2fa/verify`);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useTwoFactorRecovery = () => {
    return useMutation({
        mutationKey: ["recovery-two-factor"],
        mutationFn: recoveryTwoFactor,
        onError: onErrorResponse,
    });
};

export default useTwoFactorRecovery;

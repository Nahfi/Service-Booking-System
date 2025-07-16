
import MainApi from "@/api-manager/MainApi";
import { onErrorResponse } from "@/api-manager/api-error-response/ErrorResponses";
import { useMutation } from "@tanstack/react-query";

const disableTwoFactor = async () => {
    try {
        const { data } = await MainApi.post(`/2fa/disable`);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useTwoFactorDisable = () => {
    return useMutation({
        mutationKey: ["disable-two-factor"],
        mutationFn: disableTwoFactor,
        onError: onErrorResponse,
    });
};

export default useTwoFactorDisable;
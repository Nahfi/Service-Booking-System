import MainApi from "@/api-manager/MainApi";
import { onErrorResponse } from "@/api-manager/api-error-response/ErrorResponses";
import { useMutation } from "@tanstack/react-query";

const updateStatus = async (postData) => {
    try {
        const url = `/languages/update-status`;
        const { data } = await MainApi.post(url, postData);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useLanguageStatus = () => {
    return useMutation({
        mutationKey: "language-status",
        mutationFn: updateStatus,
        onError: onErrorResponse,
    });
};

export default useLanguageStatus;

import MainApi from "@/api-manager/MainApi";
import { onErrorResponse } from "@/api-manager/api-error-response/ErrorResponses";
import { useMutation } from "@tanstack/react-query";

const languageStore = async (storeData) => {
    try {
        const { data } = await MainApi.post(`/languages`, storeData);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useStoreLanguage = () => {
    return useMutation({
        mutationKey: "language-store",
        mutationFn: languageStore,
        onError: onErrorResponse,
    });
};


export default useStoreLanguage;

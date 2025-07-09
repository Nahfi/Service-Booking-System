import { onErrorResponse } from "@/api-manager/api-error-response/ErrorResponses";
import MainApi from "@/api-manager/MainApi";
import { useMutation } from "@tanstack/react-query";

const languageDelete = async (id) => {
    try {
        const { data } = await MainApi.delete(`/languages/${id}`);
        return data; 
    } catch (error) {
        onErrorResponse(error)
        return  null;
    }
};

const useDeleteLanguage = () => {
    return useMutation({
        mutationKey: "language-delete",
        mutationFn: languageDelete,
        onError: onErrorResponse,
    });
};


export default useDeleteLanguage;
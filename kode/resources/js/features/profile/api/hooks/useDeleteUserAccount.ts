
import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";

const userDelete = async (id) => {
    try {
        const { data } = await MainApi.delete(`/profile/destroy-account`);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

 const useDeleteUserAccount = () => {
    return useMutation({
        mutationKey: "user-account-delete",
        mutationFn: userDelete,
        onError: onErrorResponse,
    });
};

export default useDeleteUserAccount;
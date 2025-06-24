
import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";

const deleteRole = async (id) => {
    try {
        const { data } = await MainApi.delete(`users/${id}?is_trash=1`);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useDeleteUser = () => {
    return useMutation({
        mutationKey: "user-delete",
        mutationFn: deleteRole,
        onError: onErrorResponse,
    });
};

export default useDeleteUser; 
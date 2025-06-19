
import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";

const deleteRole = async (id) => {
    try {
        const { data } = await MainApi.delete(`roles/${id}`);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useRoleDelete = () => {
    return useMutation({
        mutationKey: "user-delete-roles",
        mutationFn: deleteRole,
        onError: onErrorResponse,
    });
};

export default useRoleDelete; 
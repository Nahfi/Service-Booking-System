
import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";
import type { ApiActionResponse } from "../../../../utils/types";

interface DeleteUserPayload {
    id: number;
    is_trash?: number;
}

const deleteUser = async (
    data: DeleteUserPayload
): Promise<ApiActionResponse | null> => {
    const URL = data?.is_trash
        ? `users/${data?.id}?is_trash=1`
        : `users/${data?.id}`;
    try {
        const { data } = await MainApi.delete(URL);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useDeleteUser = () => {
    return useMutation<ApiActionResponse | null, Error, DeleteUserPayload>({
        mutationKey: "user-delete",
        mutationFn: deleteUser,
        onError: onErrorResponse,
    });
};

export default useDeleteUser; 
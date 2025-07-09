import MainApi from "@/api-manager/MainApi";
import { onErrorResponse } from "@/api-manager/api-error-response/ErrorResponses";
import { useMutation } from "@tanstack/react-query";
import type { ApiActionResponse } from "../../../../utils/types";

const getData = async (id: number): Promise<ApiActionResponse | null> => {
    try {
        const { data } = await MainApi.get<ApiActionResponse>(
            `/users/restore/${id}`
        );
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useRestoreUser = () => {
    return useMutation<ApiActionResponse | null, Error>({
        mutationKey: "user-restore",
        mutationFn: getData,
        onError: onErrorResponse,
    });
};

export default useRestoreUser;

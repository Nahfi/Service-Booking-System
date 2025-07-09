import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";
import type { ApiActionResponse } from "../../../../utils/types";

interface BulkUserActionPayload {
    ids: number[];
    action: string;
    value?: string; 
}
const deleteBulkUser = async (
    postData: BulkUserActionPayload
): Promise<ApiActionResponse | null> => {
    try {
        const { data } = await MainApi.post(`/users/bulk`, postData);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useBulkUserAction = () => {
    return useMutation<ApiActionResponse | null, Error, BulkUserActionPayload>({
        mutationKey: "user-bulk-delete",
        mutationFn: deleteBulkUser,
        onError: onErrorResponse,
    });
};

export default useBulkUserAction;

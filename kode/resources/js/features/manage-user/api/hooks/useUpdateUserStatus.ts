
import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";
import type { ApiActionResponse } from "../../../../utils/types";

interface StatusUpdatePayload {
    id: number;
    value: string;
    is_trash?: string;
}

const updateStatus = async (
    postData: StatusUpdatePayload
): Promise<ApiActionResponse | null> => {
    try {
        const url = `/users/update-status`;
        const { data } = await MainApi.post(url, postData);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

 const useUpdateUserStatus = () => {
     return useMutation<ApiActionResponse | null, Error, StatusUpdatePayload>({
         mutationKey: "user-update-status",
         mutationFn: updateStatus,
         onError: onErrorResponse,
     });
 };

export default useUpdateUserStatus;
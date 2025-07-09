
import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";
import type { SaveUserApiResponse, SaveUserPayload } from "../../utils/type";

const saveUser = async (
    postData: SaveUserPayload
): Promise<SaveUserApiResponse> => {
    try {
        const url = postData?.id ? `/users/${postData?.id}` : `/users`;

        const { data } = postData?.id
            ? await MainApi.patch<SaveUserApiResponse>(url, postData)
            : await MainApi.post<SaveUserApiResponse>(url, postData);

        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useSaveUser = () => {
    return useMutation<SaveUserApiResponse, unknown, SaveUserPayload>({
        mutationKey: ["save-user"],
        mutationFn: saveUser,
        onError: onErrorResponse,
    });
};

export default useSaveUser;

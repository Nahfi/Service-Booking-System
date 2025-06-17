import { useMutation } from "@tanstack/react-query";

import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";
import MainApi from "../../../../api-manager/MainApi";
interface profileUpdateData {
    email: string;
    code: string | number;
}


const profileUpdate = async (postData: profileUpdateData) => {
    try {
        const { data } = await MainApi.post("profile/1?method=patch", postData);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

export const useUpdateProfile = () => {
    return useMutation({
        mutationKey: "business-profile-update",
        mutationFn: profileUpdate,
        onError: onErrorResponse,
    });
};

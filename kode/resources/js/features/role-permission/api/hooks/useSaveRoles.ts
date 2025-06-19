import { onErrorResponse } from "@/api-manager/api-error-response/ErrorResponses";
import MainApi from "@/api-manager/MainApi";

import { useMutation } from "@tanstack/react-query";

const saveRoles = async (postData) => {
    try {
        const url = postData?.id
            ? `/roles/${postData?.id}?_method=patch`
            : `/roles`;
        
        const { data } = await MainApi.post(url, postData);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useSaveRoles = () => {
    return useMutation({
        mutationKey: "save-user-role",
        mutationFn: saveRoles,
        onError: onErrorResponse,
    });
};

export default useSaveRoles;


import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";

const saveUser = async (postData) => {
    try {
        const url = postData?.id
            ? `/users/${postData?.id}?_method=patch`
            : `/users`;
        
        const { data } = await MainApi.post(url, postData);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useSaveUser = () => {
    return useMutation({
        mutationKey: "save-user",
        mutationFn: saveRoles,
        onError: onErrorResponse,
    });
};

export default useSaveRoles;

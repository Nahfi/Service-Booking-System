import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";


const deleteBulkUser = async (postData) => {
    try {
        const { data } = await MainApi.post(`/users/bulk`, postData);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useBulkUserAction = () => {
    return useMutation({
        mutationKey: "user-bulk-delete",
        mutationFn: deleteBulkUser,
        onError: onErrorResponse,
    });
};

export default useBulkUserAction;


import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";

const updateStatus = async (postData) => {
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
     return useMutation({
         mutationKey: "user-update-status",
         mutationFn: updateStatus,
         onError: onErrorResponse,
     });
 };

export default useUpdateUserStatus;
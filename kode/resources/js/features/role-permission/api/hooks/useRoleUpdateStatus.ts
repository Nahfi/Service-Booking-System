
import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";

const updateStatus = async (postData) => {
    try {
        const url = `/roles/update-status`;
        const { data } = await MainApi.post(url, postData);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

 const useRolesStatusUpdate = () => {
     return useMutation({
         mutationKey: "user-update-roles-status",
         mutationFn: updateStatus,
         onError: onErrorResponse,
     });
 };

export default useRolesStatusUpdate;
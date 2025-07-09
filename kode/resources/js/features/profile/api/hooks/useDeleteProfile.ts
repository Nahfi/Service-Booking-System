
import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";

const deleteProfile = async () => {
    try {
        const { data } = await MainApi.delete(`/profile/destroy-account`);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

 const useDeleteProfile = () => {
     return useMutation({
         mutationKey: ["user-account-delete"],
         mutationFn: deleteProfile,
         onError: onErrorResponse,
     });
 };

export default useDeleteProfile;
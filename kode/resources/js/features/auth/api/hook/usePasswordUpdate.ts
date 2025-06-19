import { onErrorResponse } from "@/api-manager/api-error-response/ErrorResponses";
import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";

interface passwordUpdateData {
    email: string;
    password: string;
    password_confirmation: string;
    verification_code: string | number;
}

const passwordUpdateFn = async (postData: passwordUpdateData) => {
    try {
        const { data } = await MainApi.post(`/password/update`, postData);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

export const usePasswordUpdate = () => {
    return useMutation({
        mutationKey: "update-password",
        mutationFn: passwordUpdateFn,
        onError: onErrorResponse,
    });
};

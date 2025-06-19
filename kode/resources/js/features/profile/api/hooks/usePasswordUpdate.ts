import { useMutation } from "@tanstack/react-query";

import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";
import MainApi from "../../../../api-manager/MainApi";


interface passwordUpdateData {
    password_confirmation: string;
    password: string;
    current_password: string;
}

const passwordUpdate = async (postData: passwordUpdateData) => {
    try {
        const { data } = await MainApi.post(
            `/profile/update-password`,
            postData
        );
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const usePasswordUpdate = () => {
    return useMutation({
        mutationKey: "user-update-password",
        mutationFn: passwordUpdate,
        onError: onErrorResponse,
    });
};

export default usePasswordUpdate;
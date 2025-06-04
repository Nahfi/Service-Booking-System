import { useMutation } from "@tanstack/react-query";

import { onErrorResponse } from "@/api-manager/api-error-response/ErrorResponses";
import MainApi from "@/api-manager/MainApi";

const userSignIn = async (signInData) => {
    try {
        const { data } = await MainApi.post(`/login`, signInData);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

export const useSignIn = () => {
    return useMutation({
        mutationKey: "sign-In",
        mutationFn: userSignIn,
        onError: onErrorResponse,
    });
};

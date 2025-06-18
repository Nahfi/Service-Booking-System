import { useMutation } from "@tanstack/react-query";

import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";
import MainApi from "../../../../api-manager/MainApi";

interface Address {
    country: string;
    city: string;
    full_address: string;
    postal_code: string | number;
}

interface MetaData {
    [key: string]: string;
}

interface ProfileUpdateData {
    name: string;
    email: string;
    phone: string;
    image?: File | null; 
    address: Address;
    meta_data?: MetaData;
}

const profileUpdate = async (postData: profileUpdateData) => {
    try {
        const id = postData.get("userId");
        const { data } = await MainApi.patch(`/profile/${id}`, postData);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useUpdateProfile = () => {
    return useMutation({
        mutationKey: "user-profile-update",
        mutationFn: profileUpdate,
        onError: onErrorResponse,
    });
};

export default useUpdateProfile;
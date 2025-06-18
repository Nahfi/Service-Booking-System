
import { useMutation } from "@tanstack/react-query";

const userDelete = async (id) => {
    try {
        const { data } = await MainApi.delete(`/profile/destroy-account`);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

 const useDeleteUserAccount = () => {
    return useMutation({
        mutationKey: "user-account-delete",
        mutationFn: userDelete,
        onError: onErrorResponse,
    });
};

export default useDeleteUserAccount;
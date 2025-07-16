import MainApi from "@/api-manager/MainApi";
import { onErrorResponse } from "@/api-manager/api-error-response/ErrorResponses";
import { useQuery } from "@tanstack/react-query";

const getData = async () => {
    try {
        const { data } = await MainApi.get(`/2fa/setup`);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

export default function useGetTwoFactorSetup(enabled = true) {
    return useQuery({
        queryKey: ["get-user-two-factor-setup"],
        queryFn: getData,
        staleTime: 100000,
        cacheTime: 100000,
        onError: onErrorResponse,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: enabled,
    });
}

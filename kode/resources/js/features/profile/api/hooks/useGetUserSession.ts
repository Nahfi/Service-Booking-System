
import { useQuery } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";

const getData = async () => {
    try {
        const { data } = await MainApi.get(`/sessions`);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

export default function useGetUserSession(enabled = true) {
    return useQuery({
        queryKey: ["get-user-sessions"],
        queryFn: getData,
        staleTime: 100000,
        cacheTime: 100000,
        onError: onErrorResponse,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: enabled,
    });
}

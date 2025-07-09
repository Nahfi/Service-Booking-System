
import MainApi from "@/api-manager/MainApi";
import { onErrorResponse } from "@/api-manager/api-error-response/ErrorResponses";
import { useQuery } from "@tanstack/react-query";

const getData = async () => {
    try {
        const { data } = await MainApi.get(`/roles`);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useGetRoles = (enabled = true)=> {
    return useQuery({
        queryKey: ["user-get-roles"],
        queryFn: getData,
        staleTime: 1000 * 60 * 5,
        cacheTime: 100000,
        onError: onErrorResponse,
        // refetchOnWindowFocus: false,
        // refetchOnMount: false,
        enabled: enabled,
    });
}

export default useGetRoles;
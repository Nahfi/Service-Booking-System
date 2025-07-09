import { useQuery } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";

const getData = async (id) => {
    console.log(id);
    
    try {
        const { data } = await MainApi.get(`/roles/${id}`);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useShowRole = (id) => {
    return useQuery({
        queryKey: ["user-get-role", id],
        queryFn: () => getData(id),
        enabled: !!id,
        staleTime: 100000,
        cacheTime: 100000,
        onError: onErrorResponse,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};

export default useShowRole;


import { useQuery } from "@tanstack/react-query";
import { onErrorResponse } from "../../../../../../api-manager/api-error-response/ErrorResponses";
import MainApi from "../../../../../../api-manager/MainApi";
import type { ApiResponse } from "../../utils/type";


const getData = async (): Promise<ApiResponse | null> => {
    try {
        const { data } = await MainApi.get<ApiResponse>(
            `/notification-templates`
        );
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useGetNotificationTemplates = (enabled = true) => {
    return useQuery<ApiResponse | null>({
        queryKey: ["user-notification-templates"],
        queryFn: getData,
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: enabled,
    });
};

export default useGetNotificationTemplates;
import { useQuery } from "@tanstack/react-query";
import MainApi from "../../../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../../../api-manager/api-error-response/ErrorResponses";
import type { SingleTemplateResponse } from "../../utils/type";


const getData = async (id: number): Promise<SingleTemplateResponse | null> => {
    try {
        const { data } = await MainApi.get<SingleTemplateResponse>(
            `/notification-templates/${id}`
        );
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useShowNotificationTemplate = (id?: number) => {
    return useQuery<SingleTemplateResponse | null>({
        queryKey: ["user-notification-template", id],
        queryFn: () => getData(id),
        enabled: !!id,
        staleTime: Infinity,
        cacheTime: Infinity,
        onError: onErrorResponse,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};

export default useShowNotificationTemplate;

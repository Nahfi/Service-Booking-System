
import MainApi from "@/api-manager/MainApi";
import { onErrorResponse } from "@/api-manager/api-error-response/ErrorResponses";
import { useQuery } from "@tanstack/react-query";
import type { LanguageApiResponse } from "../../utils/type";


const getData = async (): Promise<LanguageApiResponse | null> => {
    try {
        const { data } = await MainApi.get<LanguageApiResponse>(
            `/languages`
        );
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useGetLanguage = (enabled = true) => {
    return useQuery<LanguageApiResponse | null>({
        queryKey: ["user-language"],
        queryFn: getData,
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: enabled,
    });
};

export default useGetLanguage;
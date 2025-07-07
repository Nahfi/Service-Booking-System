
import { useQuery } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";
import { getFilterableUrl } from "../../../../utils/helper";
import type { UserResponseType } from "../../utils/type";

const getData = async (filters: {
    [key: string]: string;
}): Promise<UserResponseType | null> => {
    try {
        let URL = getFilterableUrl(`/users`, filters);
        const { data } = await MainApi.get<UserResponseType>(URL);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useGetUsers = (filters: { [key: string]: string } = {}) => {
    const isTrash = filters.is_trash === "1";
    const baseKey = isTrash ? "get-user-trash" : "get-user";
    
     return useQuery<UserResponseType | null, Error>({
         queryKey: [baseKey, JSON.stringify(filters)],
         queryFn: () => getData(filters),
         staleTime: 100000,
         cacheTime: 100000,
         refetchOnWindowFocus: false,
         refetchOnMount: false,
         onError: onErrorResponse,
     });
 };
export default useGetUsers;

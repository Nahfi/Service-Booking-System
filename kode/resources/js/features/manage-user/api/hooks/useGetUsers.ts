
import { useQuery } from "@tanstack/react-query";
import MainApi from "../../../../api-manager/MainApi";
import { onErrorResponse } from "../../../../api-manager/api-error-response/ErrorResponses";
import { getFilterableUrl } from "../../../../utils/helper";

const getData = async (filters: { [key: string]: string }) => {
    try {
        let url = getFilterableUrl(`/users`, filters);
        const { data } = await MainApi.get(url);
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

 const useGetUsers = (filters: { [key: string]: string } = {}) => {
     return useQuery({
         queryKey: ["admin-get-employees", JSON.stringify(filters)],
         queryFn: () => getData(filters),
         staleTime: 100000,
         cacheTime: 100000,
         refetchOnWindowFocus: false,
         refetchOnMount: false,
         onError: onErrorResponse,
     });
 };
export default useGetUsers;

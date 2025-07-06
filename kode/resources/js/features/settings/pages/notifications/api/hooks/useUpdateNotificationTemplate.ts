import { onErrorResponse } from "@/api-manager/api-error-response/ErrorResponses";
import { useMutation } from "@tanstack/react-query";
import MainApi from "../../../../../../api-manager/MainApi";
import type { UpdateTemplateInput } from "../../utils/type";

const templateUpdate = async (
    postData: UpdateTemplateInput
): Promise<UpdateTemplateResponse | null> => {
    try {
        const url = `/notification-templates/${postData?.id}`;
        const { data } = await MainApi.patch<UpdateTemplateResponse>(
            url,
            postData
        );
        return data;
    } catch (error) {
        onErrorResponse(error);
        return null;
    }
};

const useUpdateNotificationTemplate = () => {
    return useMutation<
        UpdateTemplateResponse | null,
        unknown,
        UpdateTemplateInput
    >({
        mutationKey: "update-notification-templates",
        mutationFn: templateUpdate,
        onError: onErrorResponse,
    });
};

export default useUpdateNotificationTemplate;

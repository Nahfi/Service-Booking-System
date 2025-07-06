import PageHeader from "@/components/common/Page-header/PageHeader";
import React, { useMemo } from "react";
import { useParams } from "react-router";
import SpinnerLoader from "../../../../components/common/loader/SpinnerLoader";
import useShowNotificationTemplate from "./api/hooks/useShowNotificationTemplate";
import SaveNotificationTemplates from "./components/SaveNotificationTemplates";

const TemplateDetails: React.FC = () => {
    const { templateId } = useParams<{ templateId: string }>();

    const { data, refetch, isLoading } = useShowNotificationTemplate(templateId);
    const template = useMemo(() => data?.data || null, [data]);

    return (
        <>
            <PageHeader
                title={"Update Templates"}
                breadcrumbs={[
                    {
                        title: "Notification Templates",
                        path: "/setting/notification-templates",
                    },
                    {
                        title: "Edit",
                    },
                ]}
            />

            {isLoading ? (
                <div className='d-flex align-items-center justify-content-center py-5 border'>
                    <SpinnerLoader />
                </div>
            ) :
                (<SaveNotificationTemplates template={template} refetchFn={refetch} />)}


        </>
    );
}

export default TemplateDetails;
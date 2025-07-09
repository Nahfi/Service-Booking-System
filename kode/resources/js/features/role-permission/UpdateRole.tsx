import type React from "react";
import { useMemo } from "react";
import { useParams } from "react-router";
import PageHeader from "../../components/common/Page-header/PageHeader";
import BaseLayout from "../../components/layouts/BaseLayout";
import useShowRole from "./api/hooks/useShowRole";
import SaveRole from "./components/SaveRole";

const UpdateRole: React.FC = () => {
    const { roleId } = useParams<{ roleId: string }>();
    
    const { data, refetch, isLoading } = useShowRole(roleId);
    const role = useMemo(() => data?.data || null, [data]);


    return (
        <BaseLayout>
            <>
                <PageHeader
                    title={"Update Role"}
                    breadcrumbs={[
                        { title: "Manage Role", path: "/roles", query_params: { refetch: "true" } },
                        { title: "Update" },
                    ]}
                />

                <SaveRole role={role} isLoading={isLoading} refetchFn={refetch} />
            </>
        </BaseLayout>
    );
};

export default UpdateRole;

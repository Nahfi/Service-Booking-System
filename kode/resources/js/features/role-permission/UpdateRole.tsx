import type React from "react";
import { useLocation } from "react-router";
import PageHeader from "../../components/common/Page-header/PageHeader";
import BaseLayout from "../../components/layouts/BaseLayout";
import SaveRole from "./components/SaveRole";

const UpdateRole: React.FC = () => {
    const location = useLocation();
    console.log(location.state);
    
    return (
        
        <BaseLayout>
            <>
                <PageHeader
                    title={"Update Role"}
                    breadcrumbs={[
                        { title: "Manage Role", path: "/roles" },
                        { title: "Update" },
                    ]}
                />

                <SaveRole />
            </>
        </BaseLayout>
    );
};

export default UpdateRole;

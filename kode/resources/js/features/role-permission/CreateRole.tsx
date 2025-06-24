
import type React from "react";
import PageHeader from "../../components/common/Page-header/PageHeader";
import BaseLayout from "../../components/layouts/BaseLayout";
import SaveRole from "./components/SaveRole";


const CreateRole:React.FC = () => {
  return (
      <BaseLayout>
          <>
              <PageHeader
                  title={"Create Role"}
                  breadcrumbs={[
                      { title: "Manage Role", path: "/roles" },
                      { title: "Create", },
                  ]}
              />

             <SaveRole/>
          </>
      </BaseLayout>
  );
};

export default CreateRole;

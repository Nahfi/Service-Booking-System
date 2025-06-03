
import TableWrapper from "@/components/common/table/TableWrapper";
import type React from "react";
import { BsPlusLg } from "react-icons/bs";
import Button from "../../components/common/button/Button";
import Filter from "../../components/common/filter/Filter";
import PageHeader from "../../components/common/Page-header/PageHeader";
import PaginationWrapper from "../../components/common/pagination/PaginationWrapper";
import BaseLayout from "../../components/layouts/BaseLayout";
import RoleListTable from "./components/table/RoleListTable";

const ManageRole: React.FC = () => {
  return (
      <BaseLayout>
          <>
              <PageHeader
                  title={"Manage Roles"}
                  breadcrumbs={[{ title: "Manage Role" }]}
              >
                  <Button
                      href="/roles/create"
                      className="btn--primary btn--md rounded-3"
                  >
                      <BsPlusLg className="fs-16" />
                      Add New
                  </Button>
              </PageHeader>

              <div>
                  <div className="mb-4">
                      <Filter />
                  </div>

                  <TableWrapper>
                      <RoleListTable />
                  </TableWrapper>

                  <div className="mt-4">
                      <PaginationWrapper />
                  </div>
              </div>
          </>
      </BaseLayout>
  );
};

export default ManageRole;

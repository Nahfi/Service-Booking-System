import Button from "@/components/common/button/Button";
import PaginationWrapper from "@/components/common/pagination/PaginationWrapper";
import TableWrapper from "@/components/common/table/TableWrapper";

import type React from "react";
import { BsPlusLg } from "react-icons/bs";
import FilterWrapper from "../../../../../components/common/filter/FilterWrapper";
import TemplateTable from "./table/TemplateTable";

const Whatsapp: React.FC = () => {
  return (
      <>
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
              <FilterWrapper className={"mb-0"} />

              <Button
                  className="btn--primary btn--md rounded-3 flex-shrink-0"
                  href="create?type=whatsapp"
              >
                  <BsPlusLg className="fs-18" /> Create Template
              </Button>
          </div>

          <TableWrapper>
              <TemplateTable />
          </TableWrapper>

          <div className="mt-4">
              <PaginationWrapper />
          </div>
      </>
  );
}

export default Whatsapp;
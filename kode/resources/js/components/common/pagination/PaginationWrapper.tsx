import type React from "react";
import { useTranslation } from "react-i18next";
import { LuChevronsLeft, LuChevronsRight } from "react-icons/lu";
import { valueToKey } from "../../../utils/helper";
import Button from "../button/Button";
import "./pagination.scss";


const PaginationWrapper: React.FC = ({
  pagination_data,
  handlePageChange,
  loader = false,
}) => {
  const { t } = useTranslation();
  
  const currentPage = pagination_data?.current_page;
  const totalPages = pagination_data?.last_page;
  return (
      pagination_data &&
      (pagination_data.prev_page || pagination_data.next_page) && (
          <div className="pagination-wrapper mt-4">
              <Button className="btn--dark btn--md outline rounded-3"
                  onClick={() => handlePageChange(pagination_data?.prev_page)}
                  disabled={!pagination_data?.prev_page}>
                  <LuChevronsLeft className="fs-18" /> {t(valueToKey("Previous"), "Previous")}
              </Button>

              <span className="fs-14 text-muted">
                  {t("page") || "Page"} <b>{currentPage}</b> {t("of") || "of"} <b>{totalPages}</b> 
              </span>

              <Button className="btn--dark btn--md outline rounded-3"
                  onClick={() => handlePageChange(pagination_data.next_page)}
                  disabled={!pagination_data.next_page}
              >
                  {t(valueToKey("Next"), "Next")} <LuChevronsRight className="fs-18"/>
              </Button>
          </div>
      )
  );
};

export default PaginationWrapper;

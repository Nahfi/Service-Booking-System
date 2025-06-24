import type React from "react";
import { useTranslation } from "react-i18next";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
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
          <div className="pagination-wrapper">
              <Button className="btn--dark btn--md outline rounded-pill">
                  <BsChevronLeft /> {t(valueToKey("Previous"), "Previous")}
              </Button>

              <span className="fs-14 text-muted">
                  {`${(t("page"), "Page")} ${currentPage} of ${totalPages}`}
              </span>

              <Button className="btn--dark btn--md outline rounded-pill">
                  {t(valueToKey("Next"), "Next")} <BsChevronRight />
              </Button>
          </div>
      )
  );
};

export default PaginationWrapper;

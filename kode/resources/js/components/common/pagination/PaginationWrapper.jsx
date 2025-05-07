import { BsChevronLeft, BsChevronRight, BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import "./pagination.scss";
const PaginationWrapper = () => {
  return (
    <div className="pagination-wrapper">
      <Button className="i-btn btn--dark btn--md outline rounded-3">
        <BsChevronLeft /> Previous
      </Button>

      <nav className="pagination-links">
        <Link to="#" className="pagination-link active">
          1
        </Link>
        <Link to="#" className="pagination-link">
          2
        </Link>
        <Link to="#" className="pagination-link">
          3
        </Link>
        <Link to="#" className="pagination-link">
          <BsThreeDots />
        </Link>
        <Link to="#" className="pagination-link">
          10
        </Link>
      </nav>

      <Button className="i-btn btn--dark btn--md outline rounded-3">
        Next <BsChevronRight />
      </Button>
    </div>
  );
};

export default PaginationWrapper;

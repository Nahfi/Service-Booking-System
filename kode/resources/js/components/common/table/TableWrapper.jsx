
import TableLoader from "../loader/TableLoader";
import "./table.scss";

const TableWrapper = ({children,loader=false}) => {
    return (
      <div className="table-container table-responsive">
        <table className="table align-middle">{children}</table>
        {loader && <TableLoader />}
      </div>
    );
};

export default TableWrapper;
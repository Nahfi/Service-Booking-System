
import TableLoader from "../loader/TableLoader";
import "./table.scss";

const Table = ({children,loader=false}) => {
    return (
      <div className="table-container table-responsive">
        <table className="table align-middle">{children}</table>
        {loader && <TableLoader />}
      </div>
    );
};

export default Table;
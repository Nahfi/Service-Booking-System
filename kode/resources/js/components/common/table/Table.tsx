import TableLoader from "../loader/TableLoader";
import "./table.scss";

import { FC, ReactNode } from "react";
type TableWrapperProps = {
    children: ReactNode;
    loader?: boolean;
};

const Table: FC<TableWrapperProps> = ({ children, loader = false }) => {
    return (
        <div className="table-container table-responsive">
            <table className="table align-middle">{children}</table>
            {loader && <TableLoader />}
        </div>
    );
};

export default Table;

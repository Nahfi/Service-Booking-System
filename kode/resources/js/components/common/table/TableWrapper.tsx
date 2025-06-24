
import { FC, ReactNode } from "react";
import TableLoader from "../loader/TableLoader";
import "./table.scss";

type TableWrapperProps = {
    children: ReactNode;
    loader?: boolean;
};

const TableWrapper: FC<TableWrapperProps> = ({ children, loader = false }) => {
    console.log(loader);
    
    return (
        <div className="table-container table-responsive">
            <table className="align-middle">{children}</table>

            {loader && <TableLoader />}
        </div>
    );
};

export default TableWrapper;
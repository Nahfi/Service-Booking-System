import Button from "@/components/common/button/Button";
import Filter from "@/components/common/filter/Filter";
import PaginationWrapper from "@/components/common/pagination/PaginationWrapper";
import TableWrapper from "@/components/common/table/TableWrapper";
import { BsPlusLg } from "react-icons/bs";
import GatewayTable from "./GatewayTable";

const MailGateway = ({ openModal }) => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                <Filter className={"mb-0"} />

                <Button
                    className="btn--primary btn--md rounded-3 flex-shrink-0"
                    onClick={() =>
                        openModal("CREATE_MAIL", "Create mail gateway", "lg")
                    }
                >
                    <BsPlusLg className="fs-18" /> Add
                </Button>
            </div>

            <TableWrapper>
                <GatewayTable openModal={openModal} type={"mail"} />
            </TableWrapper>

            <div className="mt-4">
                <PaginationWrapper />
            </div>
        </>
    );
};

export default MailGateway;
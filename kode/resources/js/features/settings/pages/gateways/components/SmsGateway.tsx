import Button from "@/components/common/button/Button";
import PaginationWrapper from "@/components/common/pagination/PaginationWrapper";
import TableWrapper from "@/components/common/table/TableWrapper";
import React from "react";
import { BsPlusLg } from "react-icons/bs";
import FilterWrapper from "../../../../../components/common/filter/FilterWrapper";
import type { OpenModalFn } from "../../../../../utils/types";
import GatewayTable from "./GatewayTable";

interface SmsGatewayProps {
    openModal: OpenModalFn;
}


const SmsGateway: React.FC<SmsGatewayProps> = ({ openModal }) => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                <FilterWrapper className={"mb-0"} />

                <Button
                    className="btn--primary btn--md rounded-3 flex-shrink-0"
                    onClick={() => openModal("CREATE_SMS", "Create SMS gateway", "md")}
                >
                    <BsPlusLg className="fs-18" /> Add
                </Button>
            </div>

            <TableWrapper>
                <GatewayTable openModal={openModal} type={"sms"} />
            </TableWrapper>

            <div className="mt-4">
                <PaginationWrapper />
            </div>
        </>
    );
};

export default SmsGateway
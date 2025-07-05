import Button from "@/components/common/button/Button";
import PaginationWrapper from "@/components/common/pagination/PaginationWrapper";
import TableWrapper from "@/components/common/table/TableWrapper";
import React from "react";
import { LuPlus } from "react-icons/lu";
import FilterWrapper from "../../../../../components/common/filter/FilterWrapper";
import ModalWrapper, { DeleteModal } from "../../../../../components/common/modal";
import { useModal } from "../../../../../context";
import type { ModalContextType, OpenModalFn } from "../../../../../utils/types";
import SaveSmsGatewayModal from "./modals/SaveSmsGatewayModal";
import GatewayTable from "./tables/GatewayTable";

interface SmsGatewayProps {
    openModal: OpenModalFn;
}


const SmsGateway: React.FC<SmsGatewayProps> = () => {

    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid = "smsGatewayModal";

    return (
        <>
            <div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                    <FilterWrapper className={"mb-0"} />

                    <Button
                        className="btn--primary btn--md rounded-3 flex-shrink-0"
                        onClick={() => openModal(modalUid, "CREATE_SMS", "Create SMS gateway", "md")}
                    >
                        <LuPlus className="fs-20" /> Add gateway
                    </Button>
                </div>

                <TableWrapper>
                    <GatewayTable
                        actions={{
                            modal: { fn: openModal, modalUid },
                        }}
                        type={"sms"} />
                </TableWrapper>

                <div className="mt-4">
                    <PaginationWrapper />
                </div>
            </div>

            {showModal && modalConfig?.modalUid === modalUid && (
                <ModalWrapper
                    title={modalConfig?.title}
                    onHide={closeModal}
                    show={showModal}
                    size={modalConfig?.size}
                    scrollable
                    centered
                >
                    {(modalConfig?.type === "CREATE_SMS" ||
                        modalConfig?.type === "EDIT_SMS") && (
                            <SaveSmsGatewayModal closeModal={closeModal} />
                        )}

                    {modalConfig?.type === "DELETE" && (
                        <DeleteModal onHide={closeModal} />
                    )}
                </ModalWrapper>
            )}
        </>
    );
};

export default SmsGateway
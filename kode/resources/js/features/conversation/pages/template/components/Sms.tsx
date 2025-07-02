import Button from "@/components/common/button/Button";
import PaginationWrapper from "@/components/common/pagination/PaginationWrapper";
import TableWrapper from "@/components/common/table/TableWrapper";
import type React from "react";

import { BsPlusLg } from "react-icons/bs";
import FilterWrapper from "../../../../../components/common/filter/FilterWrapper";
import ModalWrapper, { DeleteModal } from "../../../../../components/common/modal";
import { useModal } from "../../../../../context";
import type { ModalContextType } from "../../../../../utils/types";
import SaveSmsTemplate from "./modals/SaveSmsTemplate";
import TemplateTable from "./table/TemplateTable";

const Sms: React.FC = () => {
    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid = "smsTemplateModals";

    return (
        <>
            <div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                    <FilterWrapper className={"mb-0"} />

                    <Button
                        className="btn--primary btn--md rounded-3 flex-shrink-0"
                        onClick={() => openModal(
                            modalUid,
                            "CREATE",
                            "Create sms template",
                            "md"
                        )}
                    >
                        <BsPlusLg className="fs-18" /> Create Template
                    </Button>
                </div>

                <TableWrapper>
                    <TemplateTable
                        type={"sms"}
                        actions={{
                            modal: { fn: openModal, modalUid },
                        }} />
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
                    {(modalConfig?.type === "CREATE" || modalConfig?.type === "EDIT") && <SaveSmsTemplate onHide={closeModal} />}
                    
                    {modalConfig?.type === "DELETE" && (
                        <DeleteModal onHide={closeModal} />
                    )}
                </ModalWrapper>
            )}
        </>
    );
}

export default Sms
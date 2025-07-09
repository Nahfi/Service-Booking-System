

import ModalWrapper, { DeleteModal } from "@/components/common/modal";
import PageHeader from "@/components/common/Page-header/PageHeader";
import PaginationWrapper from "@/components/common/pagination/PaginationWrapper";
import TableWrapper from "@/components/common/table/TableWrapper";
import React from "react";
import FilterWrapper from "../../../../components/common/filter/FilterWrapper";
import { useModal } from "../../../../context";
import type { ModalContextType } from "../../../../utils/types";
import TranslateTable from "./components/tables/TranslateTable";

const Translate: React.FC = () => {
    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid = "translateModal"

    return (
        <>
            <div>
                <PageHeader
                    title={"Language translate"}
                    breadcrumbs={[
                        { title: "Settings", path: "/setting/general" },
                        {
                            title: "Manage Language",
                            path: "/setting/language"
                        },
                        {
                            title: "Translate"
                        },
                    ]}
                />

                <div>
                    <FilterWrapper />

                    <TableWrapper>
                        <TranslateTable actions={{
                            modal: { fn: openModal, modalUid },
                        }} />
                    </TableWrapper>

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
                    {modalConfig?.type === "DELETE" && (
                        <DeleteModal onHide={closeModal} />
                    )}
                </ModalWrapper>
            )}
        </>
    );
}

export default Translate;
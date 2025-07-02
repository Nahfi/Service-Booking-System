

import Button from "@/components/common/button/Button";
import ModalWrapper, { DeleteModal } from "@/components/common/modal";
import PageHeader from "@/components/common/Page-header/PageHeader";
import PaginationWrapper from "@/components/common/pagination/PaginationWrapper";
import TableWrapper from "@/components/common/table/TableWrapper";
import React from "react";
import { LuPlus } from "react-icons/lu";
import FilterWrapper from "../../../../components/common/filter/FilterWrapper";
import { useModal } from "../../../../context";
import type { ModalContextType } from "../../../../utils/types";
import SaveLanguage from "./components/modals/SaveLanguage";
import LanguageTable from "./components/tables/LanguageTable";

const Language: React.FC = () => {
    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid ="languageModal"

    return (
        <>
            <div>
                <PageHeader
                    title={"Manage Language"}
                    breadcrumbs={[
                        { title: "Settings", path: "/setting/general" },
                        {
                            title: "Manage Language",
                        },
                    ]}
                />

                <div>
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                        <FilterWrapper className={"mb-0"} />

                        <Button
                            className="btn--primary btn--md rounded-3 flex-shrink-0"
                            onClick={() => openModal(modalUid,"CREATE","Create Language","md")}
                        >
                            <LuPlus className="fs-20" /> Add
                        </Button>
                    </div>

                    <TableWrapper>
                        <LanguageTable actions={{
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
                    {(modalConfig?.type === "CREATE" || modalConfig?.type === "EDIT") && (
                        <SaveLanguage onHide={closeModal} />
                    )}
                    {modalConfig?.type === "DELETE" && (
                        <DeleteModal onHide={closeModal} />
                    )}
                </ModalWrapper>
            )}
        </>
    );
}

export default Language
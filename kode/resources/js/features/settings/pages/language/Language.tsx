

import Button from "@/components/common/button/Button";
import ModalWrapper, { DeleteModal } from "@/components/common/modal";
import PageHeader from "@/components/common/Page-header/PageHeader";
import TableWrapper from "@/components/common/table/TableWrapper";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { LuPlus } from "react-icons/lu";
import FilterWrapper from "../../../../components/common/filter/FilterWrapper";
import { useModal } from "../../../../context";
import type { ModalContextType } from "../../../../utils/types";
import useDeleteLanguage from "./api/hooks/useDeleteLanguage";
import useGetLanguage from "./api/hooks/useGetLanguage";
import useLanguageStatus from "./api/hooks/useLanguageStatus";
import SaveLanguage from "./components/modals/SaveLanguage";
import LanguageTable from "./components/tables/LanguageTable";

const Language: React.FC = () => {
    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid = "languageModal"

    const { data, refetch, isLoading } = useGetLanguage();
    const languages = useMemo(() => data?.data || null, [data]);

    const { mutate: updateStatus } = useLanguageStatus();
    const { mutate: deleteLanguageFn, isPending: deleteButtonLoader } = useDeleteLanguage();

    const [filteredLanguages, setFilteredLanguages] = useState(languages);

    useEffect(() => {
        if (languages) setFilteredLanguages(languages);
    }, [languages]);

    const searchLanguages = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = languages.filter(language =>
            language.name.toLowerCase().includes(searchTerm)
        );
        setFilteredLanguages(filtered);
    };


    const handleStatusChange = (language) => {
        const postData = {
            id: language?.id,
            value: language?.status === "active" ? "inactive" : "active",
        };
        updateStatus(postData, {
            onSuccess: (response) => {
                if (response) {
                    toast.success("Updated");
                    refetch();
                }
            },
        });
    };

    const handleResourceDelete = () => {
        deleteLanguageFn(modalConfig?.data, {
            onSuccess: (response) => {
                if (response) {
                    toast.success("Deleted");
                    closeModal();
                    refetch();
                }
            },
        });
    };

    return (
        <>
            <div>
                <PageHeader
                    title={"Manage Language"}
                    breadcrumbs={[
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
                            onClick={() => openModal(modalUid, "CREATE", "Create Language", "md")}
                        >
                            <LuPlus className="fs-20" /> Add
                        </Button>
                    </div>

                    <TableWrapper loader={isLoading}>
                        <LanguageTable
                            languages={filteredLanguages}
                            actions={{
                                status: { fn: handleStatusChange },
                                modal: { fn: openModal, modalUid },
                            }}
                            loader={isLoading}
                        />
                    </TableWrapper>
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
                        <SaveLanguage onHide={closeModal} language={filteredLanguages} refetchFn={refetch} />
                    )}
                    {modalConfig?.type === "DELETE" && (
                        <DeleteModal onHide={closeModal} onDelete={handleResourceDelete} isLoading={deleteButtonLoader} />
                    )}
                </ModalWrapper>
            )}
        </>
    );
}

export default Language
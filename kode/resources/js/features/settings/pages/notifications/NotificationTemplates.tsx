import Button from "@/components/common/button/Button";
import Filter from "@/components/common/filter/Filter";
import ModalWrapper, { DeleteModal } from "@/components/common/modal";
import PageHeader from "@/components/common/Page-header/PageHeader";
import PaginationWrapper from "@/components/common/pagination/PaginationWrapper";
import TableWrapper from "@/components/common/table/TableWrapper";
import { ModalContext } from "@/context";
import React, { useContext } from "react";
import { BsPlusLg } from "react-icons/bs";
import type { ModalContextType } from "../../../../utils/types";
import NotificationTable from "./components/NotificationTable";

const NotificationTemplates: React.FC = () => {
    const { showModal, modalConfig, openModal, closeModal } = useContext(ModalContext) as ModalContextType;

    return (
        <>
            <PageHeader
                title={"Notification Templates"}
                breadcrumbs={[
                    { title: "Settings", path: "/setting/general" },
                    {
                        title: "Notification Templates",
                    },
                ]}
            />

            <div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                    <Filter className={"mb-0"} />

                    <Button
                        className="btn--primary btn--md rounded-3 flex-shrink-0"
                        href="/setting/notification-templates/create"
                    >
                        <BsPlusLg className="fs-18" /> Add
                    </Button>
                </div>

                <TableWrapper>
                    <NotificationTable openModal={openModal} />
                </TableWrapper>

                <div className="mt-4">
                    <PaginationWrapper />
                </div>
            </div>

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
        </>
    );
}

export default NotificationTemplates
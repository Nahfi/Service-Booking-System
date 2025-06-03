import React, { useContext } from "react";
import {
    BsPlusLg,
    BsRecycle
} from "react-icons/bs";

import Button from "@/components/common/button/Button";
import TableWrapper from "@/components/common/table/TableWrapper";
import BaseLayout from "@/components/layouts/BaseLayout";
import { ModalContext } from "@/context";
import Filter from "../../components/common/filter/Filter";
import { DeleteModal } from "../../components/common/modal";
import ModalWrapper from "../../components/common/modal/ModalWrapper";
import PageHeader from "../../components/common/Page-header/PageHeader";
import PaginationWrapper from "../../components/common/pagination/PaginationWrapper";
import type { ModalContextType } from "../../utils/types";
import SaveUserModal from "./components/SaveUserModal";
import UserTable from "./components/UserTable";


const Users: React.FC = () => {
    const { showModal, modalConfig, openModal, closeModal } = useContext(ModalContext) as ModalContextType;

    return (
        <>
            <BaseLayout>
                <PageHeader
                    title={"Manage Staffs"}
                    breadcrumbs={[
                        { title: "Manage User" },
                    ]}
                >
                    <>
                        <Button
                            onClick={() =>
                                openModal("CREATE", "Create User", "lg")
                            }
                            className="btn--primary btn--md rounded-3"
                        >
                            <BsPlusLg className="fs-16" /> Add New staff
                        </Button>

                        <Button className="btn--danger btn--md rounded-3">
                            <BsRecycle className="fs-16" />
                            Recycle Bin
                        </Button>
                    </>
                </PageHeader>

                <div>
                    <div className="mb-4">
                        <Filter />
                    </div>

                    <TableWrapper>
                        <UserTable openModal={openModal} />
                    </TableWrapper>

                    <div className="mt-4">
                        <PaginationWrapper />
                    </div>
                </div>
            </BaseLayout>

            <ModalWrapper
                title={modalConfig?.title}
                onHide={closeModal}
                show={showModal}
                size={modalConfig?.size}
                scrollable
                centered
            >
                {(modalConfig?.type === "CREATE" ||
                    modalConfig?.type === "EDIT") && (
                    <SaveUserModal closeModal={closeModal} />
                )}

                {modalConfig?.type === "DELETE" && (
                    <DeleteModal onHide={closeModal} />
                )}
            </ModalWrapper>
        </>
    );
};

export default Users;

import { useContext } from "react";
import {
    BsPlusLg,
    BsRecycle
} from "react-icons/bs";

import Button from "@/components/common/button/Button";
import { DeleteModal } from "@/components/common/modal";
import TableWrapper from "@/components/common/table/TableWrapper";
import BaseLayout from "@/components/layouts/BaseLayout";
import { ModalContext } from "@/context";
import Filter from "../../components/common/filter/Filter";
import ModalWrapper from "../../components/common/modal/ModalWrapper";
import PageHeader from "../../components/common/Page-header/PageHeader";
import PaginationWrapper from "../../components/common/pagination/PaginationWrapper";
import SaveUserModal from "./components/SaveUserModal";
import UserTable from "./components/UserTable";

const Users = () => {

    const { showModal, modalConfig, openModal, closeModal } = useContext(ModalContext);

    return (
        <>
            <BaseLayout>
                <PageHeader
                    title={"Manage Staffs"}
                    shortTitle={"Manage your Staff"}
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

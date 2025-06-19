import React, { useContext } from "react";
import {
    BsPlusLg,
    BsRecycle
} from "react-icons/bs";


import toast from "react-hot-toast";
import Button from "../../components/common/button/Button";
import Filter from "../../components/common/filter/Filter";
import { DeleteModal } from "../../components/common/modal";
import ModalWrapper from "../../components/common/modal/ModalWrapper";
import PageHeader from "../../components/common/Page-header/PageHeader";
import PaginationWrapper from "../../components/common/pagination/PaginationWrapper";
import SEO from "../../components/common/seo/SEO";
import TableWrapper from "../../components/common/table/TableWrapper";
import BaseLayout from "../../components/layouts/BaseLayout";
import { ModalContext } from "../../context";
import type { ModalContextType } from "../../utils/types";
import useDeleteUser from "./api/hooks/useDeleteUser";
import useGetUsers from "./api/hooks/useGetUsers";
import useUpdateUserStatus from "./api/hooks/useUpdateUserStatus";
import SaveUserModal from "./components/SaveUserModal";
import UserTable from "./components/UserTable";


const Users: React.FC = () => {
    const { showModal, modalConfig, openModal, closeModal } = useContext(ModalContext) as ModalContextType;

    const { data, refetch, isPending } = useGetUsers();
    const usersData = data?.data || [];

    const { mutate: updateStatus } = useUpdateUserStatus();
    const { mutate: deleteRoleFn, isPending: deleteButtonLoader } = useDeleteUser();

    const handleStatusChange = (user) => {
        const toastId = toast.loading("Updating.....");
        const postData = {
            id: user?.id,
            value: user?.status === "active" ? "inactive" : "active",
        };

        updateStatus(postData, {
            onSuccess: (response) => {
                if (response) {
                    toast.success("Updated");
                    refetch();
                    if (response?.success) {
                        toast.dismiss(toastId);
                    }
                }
            },
        });
    };

    const handleResourceDelete = () => {
        deleteRoleFn(modalConfig?.data, {
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
            <SEO title="Manage User" />

            <BaseLayout>
                <PageHeader
                    title={"Manage Staffs"}
                    breadcrumbs={[{ title: "Manage User" }]}
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
                        <UserTable
                            openModal={openModal}
                            usersData={usersData}
                            isPending={isPending}
                            actions={{
                                status: { fn: handleStatusChange },
                                modal: { fn: openModal },
                            }}
                        />
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
                    <SaveUserModal
                        closeModal={closeModal}
                        modalConfig={modalConfig}
                    />
                )}

                {modalConfig?.type === "DELETE" && (
                    <DeleteModal
                        onHide={closeModal}
                        onDelete={handleResourceDelete}
                        isLoading={deleteButtonLoader}
                    />
                )}
            </ModalWrapper>
        </>
    );
};

export default Users;

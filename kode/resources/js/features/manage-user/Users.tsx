import React, { useContext, useState } from "react";
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
import { handlePageChange } from "../../utils/helper";
import type { FormSubmitEvent, ModalContextType } from "../../utils/types";
import useGetRoles from "../role-permission/api/hooks/useGetRoles";
import useDeleteUser from "./api/hooks/useDeleteUser";
import useGetUsers from "./api/hooks/useGetUsers";
import useUpdateUserStatus from "./api/hooks/useUpdateUserStatus";
import SaveUserModal from "./components/SaveUserModal";
import UserTable from "./components/UserTable";
import type { ModalConfigType, RoleType, UserType } from "./utils/type";


const Users: React.FC = () => {
    const { showModal, modalConfig, openModal, closeModal } = useContext(ModalContext) as ModalContextType;

    const [filters, setFilters] = useState({});
    const { data, refetch, isPending } = useGetUsers();
    const usersData: UserType[] = data?.data || [];
    const paginationData = data?.pagination_meta || null;

    const { mutate: updateStatus } = useUpdateUserStatus();
    const { mutate: deleteRoleFn, isPending: deleteButtonLoader } = useDeleteUser();

    const { data: rolesData } = useGetRoles();
    const roles: RoleType[] = rolesData?.data || [];

    const handleStatusChange = (user: UserType) => {
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
                }
            },

            onSettled: () => {
                toast.dismiss(toastId);
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

    const onPageChange = (page) => {
        handlePageChange(page, setFilters);
    };

    const handleOnFilter = (e: FormSubmitEvent): void => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const postData = Object.fromEntries(formData.entries());

        console.log(postData);
        

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
                    <div>
                        <Filter onSubmit={handleOnFilter} filters={{
                            search: { name: "search" },
                            dateRange:{ name:"date"}
                        }} />
                    </div>

                    <TableWrapper loader={isPending}>
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

                    <PaginationWrapper
                        pagination_data={paginationData}
                        handlePageChange={onPageChange}
                        loader={isPending}
                    />
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
                        modalConfig={modalConfig as ModalConfigType}
                        refetchFn={refetch}
                        roles={roles}
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

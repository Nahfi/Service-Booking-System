import React, { useState } from "react";


import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { LuPlus, LuRecycle, LuTrash2 } from "react-icons/lu";
import Button from "../../components/common/button/Button";
import FilterWrapper from "../../components/common/filter/FilterWrapper";
import { DeleteModal } from "../../components/common/modal";
import ModalWrapper from "../../components/common/modal/ModalWrapper";
import PageHeader from "../../components/common/Page-header/PageHeader";
import PaginationWrapper from "../../components/common/pagination/PaginationWrapper";
import SEO from "../../components/common/seo/SEO";
import TableWrapper from "../../components/common/table/TableWrapper";
import BaseLayout from "../../components/layouts/BaseLayout";
import { useModal } from "../../context";
import { handlePageChange, valueToKey } from "../../utils/helper";
import type { FormSubmitEvent, ModalContextType } from "../../utils/types";
import useGetRoles from "../role-permission/api/hooks/useGetRoles";
import useBulkUserDelete from "./api/hooks/useBulkUserAction";
import useDeleteUser from "./api/hooks/useDeleteUser";
import useGetUsers from "./api/hooks/useGetUsers";
import useUpdateUserStatus from "./api/hooks/useUpdateUserStatus";
import SaveUserModal from "./components/SaveUserModal";
import UserFilter from "./components/UserFilter";
import UserTable from "./components/UserTable";
import type { ModalConfigType, RoleType, UserType } from "./utils/type";


const UserRecycleBin: React.FC = () => {
    const { t } = useTranslation();
    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid = "userModal"

    const [filters, setFilters] = useState({ is_trash: 1});
    const [selectedId, setSelectedId] = useState<number[]>([]);

    const { data, refetch, isLoading } = useGetUsers();

    const usersData: UserType[] = data?.data || [];
    const paginationData = data?.pagination_meta || null;

    const { mutate: updateStatus } = useUpdateUserStatus();
    const { mutate: deleteUserFn, isPending: deleteButtonLoader } = useDeleteUser();
    const { mutate: deleteBulkUserFn, isPending: BulkDeleteButtonLoader } = useBulkUserDelete();

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
        deleteUserFn(modalConfig?.data, {
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

    const handleBulkDelete = () => {
        deleteBulkUserFn
    }

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
                                openModal(modalUid, "CREATE", "Create User", "lg")
                            }
                            className="btn--primary btn--md rounded-3"
                        >
                            <LuPlus className="fs-18" />
                            {t(valueToKey("Add New staff"), "Add New staff")}
                        </Button>
                    </>
                </PageHeader>

                <div>
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                        <FilterWrapper className="mb-0">
                            <UserFilter onFilter={handleOnFilter} />
                        </FilterWrapper>

                        <div className="d-flex align-items-center gap-3">
                            {selectedId.length > 0 && (
                                <Button
                                    onClick={() =>
                                        openModal(
                                            modalUid,
                                            "DELETE_BULK",
                                            "",
                                            "",
                                            selectedId
                                        )
                                    }
                                    className="btn--danger btn--md rounded-3"
                                >
                                    <LuTrash2 className="fs-18" />
                                    {t(
                                        valueToKey("Delete Selected"),
                                        `Delete ${selectedId.length} user`
                                    )}
                                </Button>
                            )}

                            <Button className="btn--dark btn--md rounded-3">
                                <LuRecycle className="fs-18" />
                                {t(valueToKey("Recycle Bin"), "Recycle Bin")}
                            </Button>
                        </div>
                    </div>

                    <TableWrapper loader={isLoading}>
                        <UserTable
                            openModal={openModal}
                            usersData={usersData}
                            bulkActions={{ selectedId, setSelectedId }}
                            actions={{
                                status: { fn: handleStatusChange },
                                modal: { fn: openModal, modalUid },
                            }}
                        />
                    </TableWrapper>

                    <PaginationWrapper
                        pagination_data={paginationData}
                        handlePageChange={onPageChange}
                        loader={isLoading}
                    />
                </div>
            </BaseLayout>

            {showModal && modalConfig?.modalUid === modalUid && (
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
                            />
                        )}

                    {modalConfig?.type === "DELETE" && (
                        <DeleteModal
                            onHide={closeModal}
                            onDelete={handleResourceDelete}
                            isLoading={deleteButtonLoader}
                        />
                    )}

                    {modalConfig?.type === "DELETE_BULK" && (
                        <DeleteModal onHide={closeModal} />
                    )}
                </ModalWrapper>
            )}
        </>
    );
};

export default UserRecycleBin;

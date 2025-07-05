import React, { useEffect, useMemo, useRef, useState } from "react";


import { Dropdown } from "react-bootstrap";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { LuCircleCheckBig, LuPlus, LuRecycle, LuTrash2 } from "react-icons/lu";
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
import { BulkActionTypes } from "../../utils/constant";
import { handlePageChange, valueToKey } from "../../utils/helper";
import type { FormSubmitEvent, ModalContextType } from "../../utils/types";
import useGetRoles from "../role-permission/api/hooks/useGetRoles";
import useBulkUserAction from "./api/hooks/useBulkUserAction";
import useDeleteUser from "./api/hooks/useDeleteUser";
import useGetUsers from "./api/hooks/useGetUsers";
import useUpdateUserStatus from "./api/hooks/useUpdateUserStatus";
import SaveUserModal from "./components/Modals/SaveUserModal";
import UserDetailsModal from "./components/Modals/UserDetailsModal";
import UserFilter from "./components/UserFilter";
import UserTable from "./components/UserTable";
import type { ModalConfigType, RoleType, UserType } from "./utils/type";


const Users: React.FC = () => {
    const { t } = useTranslation();
    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid = "userModal"

    const filterRef = useRef<HTMLDivElement | null>(null);

    const [filters, setFilters] = useState<{ [key: string]: string }>({});
    const [selectedId, setSelectedId] = useState<number[]>([]);
    const { data, refetch, isLoading } = useGetUsers(filters);

    const usersData: UserType[] = useMemo(() => data?.data || [], [data]);

    const paginationData = data?.pagination_meta || null;
    console.log(paginationData);
    

    const { mutate: updateStatus } = useUpdateUserStatus();
    const { mutate: deleteUserFn, isPending: deleteButtonLoader } = useDeleteUser();
    const { mutate: BulkUserActionFn, isPending: BulkActionLoader } = useBulkUserAction();

    const { data: rolesData } = useGetRoles();
    const roles: RoleType[] = useMemo(() => rolesData?.data || [], [rolesData]);

    const formattedRoles = useMemo(
        () =>
            roles.map(item => ({
                value: item.id,
                label: item.email,
            })) || [],
        [roles]
      );
    const roleOptions = roles.map((role) => ({
        value: role.id,
        label: role.name,
    }));

    useEffect(() => {
        refetch();
        setFilters((prevState) => ({
            ...prevState,
            page: 0,
        }));
    }, []);

    const handleStatusChange = (user: UserType) => {
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
            }
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

    const handleBulkAction = (actionType: BulkActionTypes, value?: "active" | "inactive") => {

        const postData: { bulk_ids: number[]; type: BulkActionTypes; value?: "active" | "inactive" } = {
            bulk_ids: selectedId,
            type: actionType,
        };

        if (actionType === BulkActionTypes.STATUS && value) {
            postData.value = value;
        }

        BulkUserActionFn(postData, {
            onSuccess: (response) => {
                if (response) {
                    toast.success(
                        actionType === BulkActionTypes.DELETE || actionType === BulkActionTypes.FORCE_DELETE
                            ? "Users deleted successfully"
                            : actionType === BulkActionTypes.RESTORE
                                ? "Users restored successfully"
                                : "User statuses updated successfully"
                    );
                    setSelectedId([]);
                    refetch();
                    if (actionType === BulkActionTypes.DELETE) {
                        closeModal();
                    }
                }
            },
        });
    };


    const handleOnFilter = (e: FormSubmitEvent): void => {

        const toastId = toast.loading("Searching .....");
        e.preventDefault();

        const { search, date, role_id } = e.target;

        const newFilters = {
            ...(search.value && { search: search.value }),
            ...(date.value && { date: date.value }),
            ...(role_id.value && { role_id: role_id.value }),
        };

        setFilters((prevState) => ({
            ...prevState,
            ...newFilters,
            page: 0,
        }));

        toast.dismiss(toastId);
    };

    const handleOnFilterReset = (setDateRange, setSelectInput) => {
        setFilters({});
        const toastId = toast.loading("Resetting filter...");

        setDateRange([
            null,
            null,
        ])
        setSelectInput({
            'role_id': "",
        })

        if (filterRef.current) {
            filterRef.current.reset();
        }

        refetch();
        toast.dismiss(toastId);
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
                            <form onSubmit={handleOnFilter} ref={filterRef}>
                                <UserFilter roles={roles} onReset={handleOnFilterReset} />
                            </form>
                        </FilterWrapper>

                        <div className="d-flex align-items-center gap-3">
                            {selectedId.length > 0 && (

                                <>
                                    <Button
                                        onClick={() =>
                                            openModal(
                                                modalUid,
                                                "DELETE_BULK",
                                                "",
                                                "md",
                                                selectedId
                                            )
                                        }
                                        className="btn--danger btn--md rounded-3"
                                    >
                                        <LuTrash2 className="fs-18" />
                                        {t(
                                            valueToKey("Delete Users"),
                                            `Delete Users`
                                        )}
                                    </Button>

                                    <Dropdown className="icon-dropdown">
                                        <Dropdown.Toggle className="i-btn btn--warning btn--md rounded-3" id="dropdown-status">
                                            <LuCircleCheckBig className="fs-18 text-white" />
                                            <span className="text-white">
                                                {t(
                                                    valueToKey("Status Update"),
                                                    `Status update`
                                                )}</span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="dropdown-content">
                                            <Dropdown.Item
                                                as="button"
                                                onClick={() => handleBulkAction(BulkActionTypes.STATUS, "active")}
                                            >
                                                Active
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                as="button"
                                                onClick={() => handleBulkAction(BulkActionTypes.STATUS, "inactive")}
                                            >
                                                Inactive
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>


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
                            loader={isLoading}
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
                                roles={roles}
                                modalConfig={modalConfig as ModalConfigType}
                                refetchFn={refetch}
                            />
                    )}
                    
                    {modalConfig?.type === "VIEW_DETAILS" && (
                        <UserDetailsModal onHide={closeModal} modalData={modalConfig?.data} />
                    )}

                    {modalConfig?.type === "DELETE" && (
                        <DeleteModal
                            onHide={closeModal}
                            onDelete={handleResourceDelete}
                            isLoading={deleteButtonLoader}
                        />
                    )}

                    {modalConfig?.type === "DELETE_BULK" && (
                        <DeleteModal
                            onHide={closeModal}
                            onDelete={() => handleBulkAction(BulkActionTypes.DELETE)}
                            isLoading={BulkActionLoader}
                        />
                    )}
                </ModalWrapper>
            )}
        </>
    );
};

export default Users;


import React, { useEffect, useMemo, useRef, useState } from "react";


import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LuCircleCheckBig, LuCornerUpLeft, LuRotateCcw, LuTrash2 } from "react-icons/lu";
import { useSearchParams } from "react-router";
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
import { handlePageChange } from "../../utils/helper";
import type { FormSubmitEvent, ModalContextType } from "../../utils/types";
import useGetRoles from "../role-permission/api/hooks/useGetRoles";
import useBulkUserAction from "./api/hooks/useBulkUserAction";
import useDeleteUser from "./api/hooks/useDeleteUser";
import useGetUsers from "./api/hooks/useGetUsers";
import useRestoreUser from "./api/hooks/useRestoreUser";
import useUpdateUserStatus from "./api/hooks/useUpdateUserStatus";
import SaveUserModal from "./components/Modals/SaveUserModal";
import UserDetailsModal from "./components/Modals/UserDetailsModal";
import UserFilter from "./components/UserFilter";
import UserTable from "./components/UserTable";
import type { ModalConfigType, RoleType, UserType } from "./utils/type";
import { bulkUserAction, deleteUser, resetUserFilter, restoreUser, updateUserStatus, userFilter } from "./utils/userController";

const filterObject = { is_trash: "1", page: "0" };

const UsersRecycleBin: React.FC = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const queryRefetch = searchParams.get("refetch");

    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid: string = "userRecycleModal"

    const isTrash: boolean = true;

    const filterRef = useRef<HTMLDivElement | null>(null);

    const [filters, setFilters] = useState<{ [key: string]: string }>(filterObject);
    const [selectedId, setSelectedId] = useState<number[]>([]);
    const { data, refetch, isLoading } = useGetUsers(filters);

    const usersData: UserType[] = useMemo(() => data?.data || [], [data]);
    const paginationData = data?.pagination_meta || null;

    const { mutate: updateStatus } = useUpdateUserStatus();
    const { mutate: deleteUserFn, isPending: deleteButtonLoader } = useDeleteUser();
    const { mutate: BulkUserActionFn, isPending: BulkActionLoader } = useBulkUserAction();

    const { mutate: restoreUserFn, isPending:restoreLoader } = useRestoreUser();
    
    const { data: rolesData } = useGetRoles();
    const roles: RoleType[] = useMemo(() => rolesData?.data || [], [rolesData]);
    
    const formattedRoles = useMemo(
        () =>
            roles.map(role => ({
                value: role.id,
                label: role.name,
            })) || [],
        [roles]
    );

    useEffect(() => {
        if (queryRefetch) {
            refetch();
        }
    }, [queryRefetch]);

    // useEffect(() => {
    //     refetch();
    //     setFilters((prevState) => ({
    //         ...prevState,
    //         page: 0,
    //     }));
    // }, []);


    const handleStatusChange = (user: UserType) => {
        updateUserStatus(user, updateStatus, refetch, isTrash)
    };

    const handleResourceDelete = () => {
        deleteUser(modalConfig?.data, deleteUserFn, closeModal, refetch, isTrash)
    };

    const handleResourceRestore = () => {
        restoreUser(modalConfig?.data, restoreUserFn, closeModal, refetch)
    }

    const onPageChange = (page) => {
        handlePageChange(page, setFilters);
        setSelectedId([]);
    };

    const handleBulkAction = (actionType: BulkActionTypes, value?: "active" | "inactive") => {
        bulkUserAction(actionType, value, BulkUserActionFn, selectedId, setSelectedId, refetch, closeModal)
    };

    const handleOnFilter = (event: FormSubmitEvent): void => {
        userFilter(event, setFilters)
    };

    const handleOnFilterReset = (setDateRange, setSelectInput) => {
        resetUserFilter(filterRef, setDateRange, setSelectInput, setFilters, refetch, filterObject)
    }

    return (
        <>
            <SEO title="User Recycle Bin" />

            <BaseLayout>
                <PageHeader
                    title={"User Recycle Bin"}
                    breadcrumbs={[{ title: "Manage User", path: "/users", query_params: { refetch: "true" } }, { title: "User Recycle Bin" }]}
                >
                    <Button className="btn--dark btn--md outline rounded-3" href="/users?refetch=true">
                        <LuCornerUpLeft className="fs-18" />
                        {t("back_to_user")}
                    </Button>
                </PageHeader>

                <div>
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                        <FilterWrapper className="mb-0">
                            <form onSubmit={handleOnFilter} ref={filterRef}>
                                <UserFilter onReset={handleOnFilterReset} roles={formattedRoles} />
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
                                        {t("delete_users")}
                                    </Button>

                                    <Button
                                        onClick={() =>
                                            openModal(
                                                modalUid,
                                                "RESTORE_BULK",
                                                "",
                                                "md",
                                                selectedId
                                            )
                                        }
                                        className="btn--info btn--md rounded-3"
                                    >
                                        <LuRotateCcw className="fs-18" />
                                        {t(
                                            "restore_users"
                                        )}
                                    </Button>

                                    <Dropdown className="icon-dropdown">
                                        <Dropdown.Toggle className="i-btn btn--warning btn--md rounded-3" id="dropdown-status">
                                            <LuCircleCheckBig className="fs-18 text-white" />
                                            <span className="text-white">
                                                {t(`status_update`)}
                                            </span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="dropdown-content">
                                            <Dropdown.Item
                                                as="button"
                                                onClick={() => handleBulkAction(BulkActionTypes.STATUS, "active")}
                                            >
                                                {t(`active`)}
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                as="button"
                                                onClick={() => handleBulkAction(BulkActionTypes.STATUS, "inactive")}
                                            >
                                                {t(`inactive`)}
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                            )}

                        </div>
                    </div>

                    <TableWrapper loader={isLoading}>
                        <UserTable 
                            usersData={usersData}
                            bulkActions={{ selectedId, setSelectedId }}
                            actions={{
                                status: { fn: handleStatusChange },
                                modal: { fn: openModal, modalUid },
                            }}
                            loader={isLoading}
                            isTrash={isTrash}
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
                                roles={formattedRoles}
                                modalConfig={modalConfig as ModalConfigType}
                                refetchFn={refetch}
                                isTrash={isTrash}
                            />
                        )}

                    {modalConfig?.type === "VIEW_DETAILS" && (
                        <UserDetailsModal onHide={closeModal} modalData={modalConfig?.data} />
                    )}

                    {modalConfig?.type === "DELETE" && (
                        <DeleteModal
                            message="Are you sure you want to permanently delete?"
                            description="The user will be removed permanently and cannot be recovered"
                            onHide={closeModal}
                            onDelete={handleResourceDelete}
                            isLoading={deleteButtonLoader}
                        />
                    )}

                    {modalConfig?.type === "DELETE_BULK" && (
                        <DeleteModal
                            message="Are you sure you want to permanently delete these users?"
                            description="These users will be removed permanently and cannot be recovered"
                            onHide={closeModal}
                            onDelete={() => handleBulkAction(BulkActionTypes.FORCE_DELETE)}
                            isLoading={BulkActionLoader}
                        />
                    )}

                    {modalConfig?.type === "RESTORE" && (
                        <DeleteModal
                            message="Are you sure you want to restore this user?"
                            description="Restores the user's access and previous settings"
                            onHide={closeModal}
                            onDelete={handleResourceRestore}
                            isLoading={restoreLoader}
                            buttonLabel="Confirm"
                            type="Confirm"
                        />
                    )}

                    {modalConfig?.type === "RESTORE_BULK" && (
                        <DeleteModal
                            message="Are you sure you want to restore these users?"
                            description="Restores these users's access and previous settings"
                            onHide={closeModal}
                            onDelete={() => handleBulkAction(BulkActionTypes.RESTORE)}
                            isLoading={BulkActionLoader}
                            buttonLabel="Confirm"
                            type="Confirm"
                        />
                    )}
                </ModalWrapper>
            )}
        </>
    );
};

export default UsersRecycleBin;

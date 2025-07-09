import React, { useEffect, useMemo, useRef, useState } from "react";


import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LuCircleCheckBig, LuPlus, LuRecycle, LuTrash2 } from "react-icons/lu";
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
import { bulkUserAction, deleteUser, resetUserFilter, updateUserStatus, userFilter } from "./utils/userController";

const filterObject = { page: "0" };

const Users: React.FC = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const queryRefetch = searchParams.get("refetch");
    
    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid = "userModal"

    const filterRef = useRef<HTMLDivElement | null>(null);

    const [filters, setFilters] = useState<{ [key: string]: string }>(filterObject);
    const [selectedId, setSelectedId] = useState<number[]>([]);
    const { data, refetch, isLoading } = useGetUsers(filters);

    const usersData: UserType[] = useMemo(() => data?.data || [], [data]);
    const paginationData = data?.pagination_meta || null;

    const { mutate: updateStatus } = useUpdateUserStatus();
    const { mutate: deleteUserFn, isPending: deleteButtonLoader } = useDeleteUser();
    const { mutate: BulkUserActionFn, isPending: BulkActionLoader } = useBulkUserAction();

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


    const handleStatusChange = (user: UserType) => {
        updateUserStatus(user, updateStatus, refetch)
    };

    const handleResourceDelete = () => {
        deleteUser(modalConfig?.data, deleteUserFn, closeModal, refetch)
    };

    const onPageChange = (page) => {
        handlePageChange(page, setFilters);
        setSelectedId([]);
    };

    const handleBulkAction = (actionType: BulkActionTypes, value?: "active" | "inactive") => {
        bulkUserAction(actionType,value,BulkUserActionFn,selectedId,setSelectedId,refetch,closeModal)
    };

    const handleOnFilter = (event: FormSubmitEvent): void => {
        userFilter(event, setFilters)
    };

    const handleOnFilterReset = (setDateRange, setSelectInput) => {
        resetUserFilter(filterRef, setDateRange, setSelectInput, setFilters, refetch, filterObject)
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

                            <Button className="btn--dark btn--md rounded-3" href="/users/recycle-bin?refetch=true">
                                <LuRecycle className="fs-18" />
                                {t(valueToKey("Recycle Bin"), "Recycle Bin")}
                            </Button>
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
                            />
                        )}

                    {modalConfig?.type === "VIEW_DETAILS" && (
                        <UserDetailsModal onHide={closeModal} modalData={modalConfig?.data} />
                    )}

                    {modalConfig?.type === "DELETE" && (
                        <DeleteModal
                            message="Move user to Recycle Bin?"
                            description="The user will lose access but can be restored later"
                            onHide={closeModal}
                            onDelete={handleResourceDelete}
                            isLoading={deleteButtonLoader}
                        />
                    )}

                    {modalConfig?.type === "DELETE_BULK" && (
                        <DeleteModal
                            message="Move all selected users to Recycle Bin?"
                            description="These users will be disabled, but you can restore them later"
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



import type React from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BsPlusLg } from "react-icons/bs";
import { LuRefreshCw } from "react-icons/lu";
import Button from "../../components/common/button/Button";
import ModalWrapper, { DeleteModal } from "../../components/common/modal";
import PageHeader from "../../components/common/Page-header/PageHeader";
import SEO from "../../components/common/seo/SEO";
import TableWrapper from "../../components/common/table/TableWrapper";
import BaseLayout from "../../components/layouts/BaseLayout";
import { ModalContext } from "../../context";
import { valueToKey } from "../../utils/helper";
import type { ModalContextType } from "../../utils/types";
import useGetRoles from "./api/hooks/useGetRoles";
import useRoleDelete from "./api/hooks/useRoleDelete";
import useRolesStatusUpdate from "./api/hooks/useRoleUpdateStatus";
import RoleListTable from "./components/table/RoleListTable";

const ManageRole: React.FC = () => {

    const { t } = useTranslation();

    const { showModal, modalConfig, openModal, closeModal } = useContext(ModalContext) as ModalContextType;
    const { data, refetch, isPending } = useGetRoles();
    const roles = data?.data || null;


    const { mutate: updateStatus } = useRolesStatusUpdate();
    const { mutate: deleteRoleFn, isPending: deleteButtonLoader } =
        useRoleDelete();

    const handleStatusChange = (role) => {
        const toastId = toast.loading("Updating.....");
        const postData = {
            id: role?.id,
            value: role?.status === "active" ? "inactive" : "active",
        };

        updateStatus(postData, {
            onSuccess: (response) => {
                if (response) {
                    toast.success("Updated");
                    refetch();
                    toast.dismiss(toastId);
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

    const handleOnRefresh = () => refetch();

    return (
        <>
            <SEO title="Manage Role" />

            <BaseLayout>
                <>
                    <PageHeader
                        title={"Manage Roles"}
                        breadcrumbs={[{ title: "Manage Role" }]}
                    >
                        <Button
                            className="btn--danger btn--md outline rounded-3"
                            onClick={handleOnRefresh}
                        >
                            <LuRefreshCw className="fs-16" />
                            {t(valueToKey("Refetch"), "Refetch")}
                        </Button>

                        <Button
                            href="/roles/create"
                            className="btn--primary btn--md rounded-3"
                        >
                            <BsPlusLg className="fs-16" />
                            {t(valueToKey("Create role"), "Create role")}
                        </Button>
                    </PageHeader>

                    <div>
                        <TableWrapper loader={isPending}>
                            <RoleListTable
                                roles={roles}
                                isPending={isPending}
                                actions={{
                                    status: { fn: handleStatusChange },
                                    modal: { fn: openModal },
                                }}
                            />
                        </TableWrapper>
                    </div>
                </>
            </BaseLayout>

            <ModalWrapper
                title={modalConfig?.title}
                onHide={closeModal}
                show={showModal}
                size={modalConfig?.size}
                scrollable
                centered
            >
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

export default ManageRole;

import type React from "react";
import toast from "react-hot-toast";
import { BulkActionTypes } from "../../../utils/constant";
import type { SaveUserPayload, UserType } from "./type";

export const updateUserStatus = (
    user: UserType,
    updateStatus,
    refetch,
    isTrash: boolean = false
) => {
    const postData = {
        id: user?.id,
        value: user?.status === "active" ? "inactive" : "active",
        ...(isTrash && { is_trash: "1" }),
    };

    updateStatus(postData, {
        onSuccess: (response) => {
            if (response) {
                toast.success("Updated");
                refetch();
            }
        },
    });
};

export const deleteUser = (
    data: number,
    deleteUserFn,
    closeModal,
    refetch,
    isTrash: boolean = false
) => {
    deleteUserFn(
        { id: data, is_trash: isTrash },
        {
            onSuccess: (response) => {
                if (response) {
                    toast.success(
                        isTrash ? "Permanently Deleted" : "Moved to Recycle Bin"
                    );
                    closeModal();
                    refetch();
                }
            },
        }
    );
};

export const restoreUser = (data: number, restoreUserFn, closeModal, refetch) => {
    restoreUserFn(data, {
        onSuccess: (response) => {
            if (response) {
                toast.success("User restored successfully");
                closeModal();
                refetch();
            }
        },
    });
};

export const bulkUserAction = (
    actionType: BulkActionTypes,
    value: "active" | "inactive" | undefined,
    BulkUserActionFn: any,
    selectedId: number[],
    setSelectedId: React.Dispatch<React.SetStateAction<number[]>>,
    refetch: () => void,
    closeModal: () => void
) => {
    const postData: {
        bulk_ids: number[];
        type: BulkActionTypes;
        value?: "active" | "inactive";
    } = {
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
                if (
                    actionType === BulkActionTypes.DELETE ||
                    actionType === BulkActionTypes.FORCE_DELETE ||
                    actionType === BulkActionTypes.RESTORE
                ) {
                    closeModal();
                }
            }
        },
    });
};

export const userFilter = (event, setFilters) => {
    const toastId = toast.loading("Searching .....");
    event.preventDefault();

    const { search, date, role_id } = event.target;

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

export const resetUserFilter = (
    filterRef,
    setDateRange,
    setSelectInput,
    setFilters,
    refetch,
    filterObject
) => {
    setFilters(filterObject);
    const toastId = toast.loading("Resetting filter...");

    if (filterRef.current) {
        filterRef.current.reset();
    }
    setDateRange([null, null]);
    setSelectInput({
        role_id: "",
    });

    refetch();
    toast.dismiss(toastId);
};

export const saveUser = (event, saveUserFn, refetchFn, closeModal) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const addressData = [
        {
            country: formData.get("country") as string,
            city: formData.get("city") as string,
            full_address: formData.get("full_address") as string,
            postal_code: formData.get("postal_code") as string,
        },
    ];

    formData.delete("country");
    formData.delete("city");
    formData.delete("full_address");
    formData.delete("postal_code");

    const postData = Object.fromEntries(
        formData.entries()
    ) as unknown as SaveUserPayload;

    // Handle password fields
    if (!postData.password || postData.password === "") {
        delete postData.password;
    }
    if (
        !postData.password_confirmation ||
        postData.password_confirmation === ""
    ) {
        delete postData.password_confirmation;
    }

    postData.address = addressData;

    saveUserFn(postData, {
        onSuccess: (response) => {
            if (response) {
                toast.success("User create successfully!");
                event.target.reset();
                refetchFn();
                closeModal();
            }
        },
    });
};
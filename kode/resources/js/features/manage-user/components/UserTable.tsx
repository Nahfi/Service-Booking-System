import { FC } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import { useTranslation } from "react-i18next";
import { LuEllipsisVertical, LuEye, LuSquarePen, LuTrash2 } from "react-icons/lu";
import { Link } from "react-router";
import NoDataFound from "../../../components/common/NoDataFound/NoDataFound";
import { valueToKey } from "../../../utils/helper";
import type { InputChangeEvent, OpenModalFn } from "../../../utils/types";
import type { UserType } from "../utils/type";


interface ActionHandlers {
    status?: {
        fn: (user: UserType) => void;
    };
    modal?: {
        fn: (
            type: "EDIT" | "DELETE",
            title?: string,
            size?: string,
            data?: any
        ) => void;
    };
}

interface BulkActions {
    selectedId: number[]; // Assuming user.id is a number; adjust to string if needed
    setSelectedId: React.Dispatch<React.SetStateAction<number[]>>;
}

interface UserTableProps {
    openModal: OpenModalFn;
    usersData: UserType[];
    isPending?: boolean;
    bulkActions: BulkActions;
    actions?: ActionHandlers;
}

const UserTable: FC<UserTableProps> = ({
    openModal,
    usersData,
    bulkActions,
    actions = {},
}) => {
    const { t } = useTranslation();

    const { selectedId, setSelectedId } = bulkActions;

    const handleOnSelect = (event: InputChangeEvent, id: number) => {
        if (event.target.checked) {
            setSelectedId((prev) => [...new Set([...prev, id])]);
        } else {
            setSelectedId((prev) =>
                prev.filter((selectedId) => selectedId !== id)
            );
        }
    };

    const handleOnBulkSelect = (event: InputChangeEvent) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            const checkedRecords = usersData.map((user) => user?.id);
            setSelectedId((prev) => [...new Set([...prev, ...checkedRecords])]);
        } else {
            setSelectedId([]);
        }
    };

    return (
        <>
            <thead>
                <tr>
                    <th>
                        <div className="d-flex justify-content-start align-items-center gap-3 lh-1">
                            {usersData?.length > 0 && (
                                <input
                                    type="checkbox"
                                    id="bulk"
                                    onChange={handleOnBulkSelect}
                                    checked={
                                        usersData.length > 0 &&
                                        usersData.length === selectedId.length
                                    }
                                />
                            )}

                            {t(valueToKey("User Details"), "User Details")}
                        </div>
                    </th>
                    <th> {t(valueToKey("Role Name"), "Role Name")}</th>
                    <th>{t(valueToKey("Status"), "Status")}</th>
                    <th>{t(valueToKey("Created By"), "Created By")}</th>
                    <th>{t(valueToKey("Actions"), "Actions")}</th>
                </tr>
            </thead>

            <tbody>
                {usersData?.length > 0 ? (
                    usersData?.map((user) => (
                        <tr key={user?.id}>
                            <td>
                                <div className="d-flex justify-content-start align-items-center gap-3">
                                    <input
                                        type="checkbox"
                                        name="bulk-check"
                                        checked={selectedId.includes(user?.id)}
                                        id={`user-${user?.id}`}
                                        onChange={(event) =>
                                            handleOnSelect(event, user?.id)
                                        }
                                    />

                                    <div className="d-flex justify-content-start align-items-center gap-3">
                                        <div className="flex-shrink-0 avatar avatar-md circle">
                                            <img
                                                src={user?.img_url}
                                                alt="user profile image"
                                                className="w-100 h-100"
                                            />
                                        </div>

                                        <div>
                                            <h6 className="fs-15">
                                                {user?.name || "--"}
                                            </h6>
                                            <div>
                                                <p className="fs-14 text-muted d-inline-block">
                                                    {user?.email || "--"}
                                                </p>

                                                <p
                                                    to="tel:012345678"
                                                    className="fs-14 text-muted d-block"
                                                >
                                                    {user?.phone || "--"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td>{user?.role?.name || "--"}</td>

                            <td>
                                <span className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id={`user-${user?.id}`}
                                        checked={user?.status === "active"}
                                        onChange={() =>
                                            actions?.status?.fn(user)
                                        }
                                    />
                                </span>
                            </td>

                            <td>
                                <span>{user?.created_at}</span>
                            </td>

                            <td>
                                <div className="d-flex align-items-center justify-content-end gap-1">
                                    <Dropdown className="icon-dropdown">
                                        <Dropdown.Toggle className="icon-btn dark-soft btn-ghost hover btn-sm fs-18 rounded-circle p-0">
                                            <LuEllipsisVertical />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <div className="dropdown-content">
                                                <Dropdown.Item
                                                    as={Link}
                                                    to={`/users/${user?.id}`}
                                                >
                                                    <LuEye />
                                                    {t(
                                                        valueToKey(
                                                            "View Details"
                                                        ),
                                                        "View Details"
                                                    )}
                                                </Dropdown.Item>

                                                <Dropdown.Item
                                                    as={"button"}
                                                    onClick={() =>
                                                        actions?.modal?.fn(
                                                            actions?.modal?.modalUid,
                                                            "EDIT",
                                                            "Update User",
                                                            "lg",
                                                            user
                                                        )
                                                    }
                                                >
                                                    <LuSquarePen />
                                                    {t(
                                                        valueToKey("Edit"),
                                                        "Edit"
                                                    )}
                                                </Dropdown.Item>

                                                <Dropdown.Item
                                                    as={"button"}
                                                    onClick={() =>
                                                        actions?.modal?.fn(
                                                            actions?.modal?.modalUid,
                                                            "DELETE",
                                                            "",
                                                            "",
                                                            user?.id
                                                        )
                                                    }
                                                >
                                                    <LuTrash2 />
                                                    {t(
                                                        valueToKey(
                                                            "Delete"
                                                        ),
                                                        "Delete"
                                                    )}
                                                </Dropdown.Item>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5}>
                            <NoDataFound />
                        </td>
                    </tr>
                )}
            </tbody>
        </>
    );
};

export default UserTable;

import { FC } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {
    BsThreeDotsVertical
} from "react-icons/bs";

import { useTranslation } from "react-i18next";
import { LuSquarePen, LuTrash2 } from "react-icons/lu";
import NoDataFound from "../../../components/common/NoDataFound/NoDataFound";
import { valueToKey } from "../../../utils/helper";
import type { OpenModalFn } from "../../../utils/types";


interface UserTableProps {
    openModal: OpenModalFn;
}

const UserTable: FC<UserTableProps> = ({
    openModal,
    usersData,
    actions = {},
}) => {
    const { t } = useTranslation();

    return (
        <>
            <thead>
                <tr>
                    <th>
                        <div className="d-flex justify-content-start align-items-center gap-3 lh-1">
                            <input type="checkbox" id="roleId" />
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
                                        name="contactCheckbox"
                                        id={user?.uid}
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
                                            <BsThreeDotsVertical />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <ul className="dropdown-content">
                                                <li>
                                                    <Dropdown.Item
                                                        as={"button"}
                                                        onClick={() =>
                                                            openModal(
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
                                                </li>

                                                <li>
                                                    <Dropdown.Item
                                                        as={"button"}
                                                        onClick={() =>
                                                            actions?.modal?.fn(
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
                                                </li>
                                            </ul>
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


import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
    BsThreeDotsVertical
} from "react-icons/bs";
import { LuSquarePen, LuTrash2 } from 'react-icons/lu';
import { Link } from 'react-router';
import NoDataFound from '../../../../components/common/NoDataFound/NoDataFound';
import { valueToKey } from '../../../../utils/helper';

const RoleListTable: React.FC = ({ roles, isPending, actions={} }) => {
    const { t } = useTranslation();

    return (
        <>
            <thead>
                <tr>
                    <th>
                        <div className="d-flex justify-content-start align-items-center gap-2 lh-1">
                            #
                            <span>
                                {t(valueToKey("Role Name"), "Role Name")}
                            </span>
                        </div>
                    </th>
                    <th>{t(valueToKey("Status"), "Status")}</th>
                    <th>{t(valueToKey("Created By"), "Created By")}</th>
                    <th>{t(valueToKey("Actions"), "Actions")}</th>
                </tr>
            </thead>

            <tbody>
                {(!isPending && roles?.length > 0) ? (
                    roles?.map((role, index) => (
                        <tr key={role?.id}>
                            <td>
                                <div className="d-flex justify-content-start align-items-start gap-2">
                                    <b>{index + 1}.</b>
                                    <h6 className="fs-14">{role?.name}</h6>
                                </div>
                            </td>

                            <td>
                                <span className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id={`role-${role?.id}`}
                                        checked={role?.status === "active"}
                                        onChange={() =>
                                            actions?.status?.fn(role)
                                        }
                                    />
                                </span>
                            </td>

                            <td>
                                <span>{role?.created_at}</span>
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
                                                        as={Link}
                                                        state={{
                                                            some: "value",
                                                        }}
                                                        to="/roles/edit"
                                                    >
                                                        <LuSquarePen />
                                                        {t(
                                                            valueToKey(
                                                                "Edit Role"
                                                            ),
                                                            "Edit Role"
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
                                                                role?.id
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
                        <td colSpan="5">
                            <NoDataFound />
                        </td>
                    </tr>
                )}
            </tbody>
        </>
    );
};

export default RoleListTable;
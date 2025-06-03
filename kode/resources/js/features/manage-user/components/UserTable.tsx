import { FC } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {
    BsThreeDotsVertical
} from "react-icons/bs";
import { Link } from "react-router-dom";

import userImg from "@/assets/images/user/user-1.png";
import Button from "@/components/common/button/Button";
import { LuLogIn, LuSquarePen, LuTrash2 } from "react-icons/lu";
import type { OpenModalFn } from "../../../utils/types";


interface UserTableProps {
    openModal: OpenModalFn;
}

const UserTable: FC<UserTableProps> = ({ openModal }) => {
    return (
        <>
            <thead>
                <tr>
                    <th>
                        <div className="d-flex justify-content-start align-items-center gap-3 lh-1">
                            <input type="checkbox" id="roleId" />
                            Profile Details
                        </div>
                    </th>
                    <th>Status</th>
                    <th>Created By</th>
                    <th>Role Type</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {Array.from({ length: 7 }).map((_, ind) => (
                    <tr key={ind}>
                        <td>
                            <div className="d-flex justify-content-start align-items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="contactCheckbox"
                                    id={ind}
                                />

                                <div className="d-flex justify-content-start align-items-center gap-3">
                                    <div className="flex-shrink-0 avatar avatar-md circle">
                                        <img src={userImg} alt="" />
                                    </div>

                                    <div>
                                        <h6 className="fs-15">Jane Cooper</h6>
                                        <div>
                                            <Link
                                                to="mailto:Alanrebeca@kodepixel.com"
                                                className="fs-14 text-ternary d-inline-block"
                                            >
                                                Alanrebeca@kodepixel.com
                                            </Link>

                                            <Link
                                                to="tel:012345678"
                                                className="fs-14 text-ternary d-block"
                                            >
                                                +1(555) 678-9012
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id={`switch-${ind + 1}`}
                                />
                            </div>
                        </td>

                        <td>
                            <span className="i-badge pill info-soft">
                                Admin
                            </span>
                        </td>

                        <td>
                            <span className="i-badge pill info-soft">
                                Admin
                            </span>
                        </td>

                        <td>
                            <span className="">3 days ago</span>
                        </td>

                        <td>
                            <div className="d-flex align-items-center justify-content-end gap-1">
                                <Button
                                    iconBtn={true}
                                    tooltipText="Login this user"
                                    icon={LuLogIn}
                                    className="success-soft btn-ghost hover btn-sm rounded-circle fs-18"
                                />

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
                                                            "lg"
                                                        )
                                                    }
                                                >
                                                    <LuSquarePen />
                                                    Edit
                                                </Dropdown.Item>
                                            </li>

                                            <li>
                                                <Dropdown.Item
                                                    as={"button"}
                                                    onClick={() =>
                                                        openModal("DELETE")
                                                    }
                                                >
                                                    <LuTrash2 />
                                                    Delete
                                                </Dropdown.Item>
                                            </li>
                                        </ul>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </>
    );
};

export default UserTable;

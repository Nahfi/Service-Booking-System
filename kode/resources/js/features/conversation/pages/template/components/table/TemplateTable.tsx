import type React from "react";
import { Dropdown } from "react-bootstrap";
import { LuEllipsisVertical, LuSquarePen, LuTrash2 } from "react-icons/lu";
import { Link } from "react-router";

const TemplateTable: React.FC = ({ type=null ,actions }) => {
    return (
        <>
            <thead>
                <tr>
                    <th>
                        <div className="d-flex justify-content-start align-items-center gap-2 lh-1">
                            <b>#</b> <span>Name</span>
                        </div>
                    </th>
                    <th>Category</th>
                    <th>Preview</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {Array.from({ length: 7 }).map((_, ind) => (
                    <tr key={ind}>
                        <td>
                            <div className="d-flex justify-content-start align-items-center gap-2 lh-1">
                                <b>{ind + 1}</b> <span>Template-{ind + 1}</span>
                            </div>
                        </td>

                        <td>
                            <span>Marketing</span>
                        </td>

                        <td>
                            <span>Mzee is goingto be in jinja city, make</span>
                        </td>

                        <td>
                            <span className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id={`template-${ind + 1}`}
                                />
                            </span>
                        </td>

                        <td>
                            <span>05/14/2025 07:58 AM</span>
                        </td>

                        <td>
                            <div className="d-flex align-items-center justify-content-end gap-1">
                                <Dropdown className="icon-dropdown">
                                    <Dropdown.Toggle
                                        id="dropdown-5"
                                        className="icon-btn dark-soft btn-ghost hover btn-md fs-18 circle p-0"
                                    >
                                        <LuEllipsisVertical />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu align={`end`}>
                                        <div className="dropdown-content">
                                            {type === "whatsapp" && (
                                                <Dropdown.Item as={Link}
                                                    to={`create?type=whatsapp"`}
                                                >
                                                    <LuSquarePen />
                                                    Edit
                                                </Dropdown.Item>
                                            )}

                                            {type === "sms" && (
                                                <Dropdown.Item as="button"
                                                    onClick={() => actions.modal.fn(
                                                        actions.modal.modalUid,
                                                        "EDIT",
                                                        "Update sms template",
                                                        "md"
                                                    )
                                                }
                                            >
                                                <LuSquarePen />
                                                Edit
                                            </Dropdown.Item>)}

                                            <Dropdown.Item as="button"
                                                onClick={() => actions.modal.fn(
                                                    actions.modal.modalUid,
                                                    "DELETE",
                                                    "",
                                                    ""
                                                )
                                                }
                                            >
                                                <LuTrash2 />
                                                Delete
                                            </Dropdown.Item>
                                        </div>
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

export default TemplateTable;

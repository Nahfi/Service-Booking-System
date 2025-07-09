import React from "react";
import { Dropdown } from "react-bootstrap";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { LuEllipsisVertical, LuSquarePen, LuTrash2 } from "react-icons/lu";

interface GatewayTableProps {
    type: "sms" | "mail" | null;
    openModal: OpenModalFn;
}

const GatewayTable: React.FC<GatewayTableProps> = ({
    type = null,
    actions,
}) => {
    return (
        <>
            <thead>
                <tr>
                    <th>
                        <div className="d-flex justify-content-start align-items-center gap-2 lh-1">
                            <b>#</b> <span>Name</span>
                        </div>
                    </th>

                    <th>Default</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {Array.from({ length: 7 }).map((_, ind) => (
                    <tr key={ind}>
                        <td>
                            <span className="d-flex align-items-center gap-2">
                                <b>{ind + 1}.</b> Gateway 1
                            </span>
                        </td>

                        <td>
                            <span className="i-badge pill success-soft py-1">
                                <BsFillCheckCircleFill className="me-1" />{" "}
                                Default
                            </span>
                        </td>

                        <td>
                            <div className="d-flex align-items-center justify-content-end gap-1">
                                <Dropdown className="icon-dropdown">
                                    <Dropdown.Toggle
                                        id="dropdown-5"
                                        className="icon-btn dark-soft btn-ghost hover btn-md fs-18 rounded-3 p-0"
                                    >
                                        <LuEllipsisVertical />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu align={`end`}>
                                        <div className="dropdown-content">
                                            <Dropdown.Item as="button" onClick={() =>
                                                type === "sms"
                                                    ? actions.modal.fn(
                                                        actions.modal.modalUid,
                                                        "EDIT_SMS",
                                                        "Update SMS Gateway",
                                                        "md"
                                                    )
                                                    : actions.modal.fn(
                                                        actions.modal.modalUid,
                                                        "EDIT_MAIL",
                                                        "Update mail Gateway",
                                                        "lg"
                                                    )
                                            }
                                            >
                                                <LuSquarePen />
                                                Edit
                                            </Dropdown.Item>

                                            <Dropdown.Item as="button"
                                                onClick={() => actions.modal.fn(
                                                    actions.modal.modalUid,
                                                    "DELETE",
                                                    "",
                                                    ""
                                                )}>
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

export default GatewayTable
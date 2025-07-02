import { Dropdown } from "react-bootstrap"
import { LuEllipsisVertical, LuSquarePen, LuTrash2 } from "react-icons/lu"

const ContactTable = ({ actions }) => {
    return (
        <>
            <thead>
                <tr>
                    <th>
                        <div className="d-flex justify-content-start align-items-center gap-2 lh-1">
                            <b>#</b>
                            <span>Name</span>
                        </div>
                    </th>
                    <th>Phone Number</th>
                    <th>Status</th>
                    <th>Date Added</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {Array.from({ length: 7 }).map((_, ind) => (
                    <tr key={ind}>
                        <td>
                            <div className="d-flex justify-content-start align-items-start gap-2">
                                <b>{ind + 1}.</b>
                                <span>
                                    Jane Cooper
                                </span>
                            </div>
                        </td>

                        <td>
                            <span className="text--primary">
                                5146846548465
                            </span>
                        </td>

                        <td>
                            <span className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id={`contact-${ind}`}
                                />
                            </span>
                        </td>

                        <td>
                            <span className="text--primary">
                                25/06/2024
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
                                            <Dropdown.Item as="button" onClick={() => actions.modal.fn(
                                                actions.modal.modalUid,
                                                "EDIT",
                                                "Update contact",
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
    )
}

export default ContactTable
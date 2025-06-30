import { Dropdown } from "react-bootstrap"
import { LuEllipsisVertical, LuSquarePen, LuTrash2 } from "react-icons/lu"

const GroupTable = () => {
    return (
        <>
            <thead>
                <tr>
                    <th>
                        <div className="d-flex justify-content-start align-items-center gap-3 lh-1">
                            <input
                                type="checkbox"
                            />
                            No
                        </div>
                    </th>
                    <th>Group Name</th>
                    <th>Contacts </th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: 7 }).map((_, ind) => (
                    <tr key={ind}>
                        <td>
                            <div className="d-flex justify-content-start align-items-start gap-3">
                                <input
                                    type="checkbox"
                                    name="contactCheckbox"
                                    id={ind}
                                />
                                <h6 className="fs-15">{ind + 1}</h6>
                            </div>
                        </td>

                        <td>
                            <span className="text--primary">
                                Team {ind + 1}
                            </span>
                        </td>

                        <td>
                            <span className="i-badge pill success-soft">
                                View All
                            </span>
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
                                            <Dropdown.Item as="button">
                                                <LuSquarePen />
                                                Edit
                                            </Dropdown.Item>

                                            <Dropdown.Item as="button">
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

export default GroupTable
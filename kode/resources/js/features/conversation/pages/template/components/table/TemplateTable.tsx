import type React from "react";
import { Dropdown } from "react-bootstrap";
import {
    BsPencilSquare,
    BsThreeDotsVertical,
    BsTrash3
} from "react-icons/bs";

const TemplateTable: React.FC = () => {
    return (
        <>
            <thead>
                <tr>
                    <th>
                        <b>#</b> Name
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
                            <span>new_test_template</span>
                        </td>

                        <td>
                            <span>Marketing</span>
                        </td>

                        <td>
                            <span>Mzee is goingto be in jinja city, make</span>
                        </td>

                        <td>
                            <span className="i-badge pill success-soft lh-1 py-2">
                                Approved
                            </span>
                        </td>

                        <td>
                            <span>05/14/2025 07:58 AM</span>
                        </td>

                        <td>
                            <div className="d-flex align-items-center justify-content-end gap-2">
                                <Dropdown className="icon-dropdown">
                                    <Dropdown.Toggle
                                        id="dropdown-5"
                                        className="icon-btn dark-soft btn-ghost hover btn-md fs-18 rounded-3 p-0"
                                    >
                                        <BsThreeDotsVertical />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu align={`end`}>
                                        <ul className="dropdown-content">
                                            <li>
                                                <Dropdown.Item as="button">
                                                    <BsPencilSquare />
                                                    Mute
                                                </Dropdown.Item>
                                            </li>

                                            <li>
                                                <Dropdown.Item as="button">
                                                    <BsTrash3 />
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

export default TemplateTable;

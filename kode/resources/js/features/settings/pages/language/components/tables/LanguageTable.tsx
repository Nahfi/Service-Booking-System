import { Dropdown } from 'react-bootstrap'
import { LuEllipsisVertical, LuLanguages, LuSquarePen, LuTrash2 } from 'react-icons/lu'
import Button from '../../../../../../components/common/button/Button'

const LanguageTable = ({ actions }) => {
    return (
        <>
            <thead>
                <tr>
                    <th>
                        <span className="d-flex align-items-center gap-2 lh-1">
                            <b>#</b> <span>Name</span>
                        </span>
                    </th>
                    <th>Code</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {Array.from({ length: 7 }).map((_, ind) => (
                    <tr key={ind}>
                        <td>
                            <span className="d-flex align-items-center gap-2">
                                <b>{ind + 1}.</b> Lang
                            </span>
                        </td>

                        <td>
                            <span>
                                EN
                            </span>
                        </td>

                        <td>
                            <span className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id={`lang-${ind + 1}`}
                                />
                            </span>
                        </td>

                        <td>
                            <span>22 Jun, 2025 04:56</span>
                        </td>

                        <td>
                            <div className="d-flex align-items-center justify-content-end gap-1">
                                <Button
                                    iconBtn={true}
                                    tooltipText="Translate"
                                    icon={LuLanguages}
                                    className="info-soft btn-ghost hover btn-sm rounded-circle fs-18"
                                    href={`/setting/language/${ind}`}
                                />

                                <Dropdown className="icon-dropdown">
                                    <Dropdown.Toggle
                                        id="dropdown-5"
                                        className="icon-btn dark-soft btn-ghost hover btn-md fs-18 circle p-0"
                                    >
                                        <LuEllipsisVertical />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu align={`end`}>
                                        <div className="dropdown-content">
                                            <Dropdown.Item as="button" onClick={() => actions.modal.fn(
                                                actions.modal.modalUid,
                                                "EDIT",
                                                "Update language",
                                                "md"
                                            )
                                            }
                                            >
                                                <LuSquarePen />
                                                Edit
                                            </Dropdown.Item>

                                            <Dropdown.Item as="button" onClick={() => actions.modal.fn(
                                                actions.modal.modalUid,
                                                "DELETE",
                                                "",
                                                ""
                                            )
                                            }>
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

export default LanguageTable
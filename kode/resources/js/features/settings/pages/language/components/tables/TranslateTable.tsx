import { LuCopy, LuTrash2 } from 'react-icons/lu'
import Button from '../../../../../../components/common/button/Button'
import Field from '../../../../../../components/common/from/Field'

const TranslateTable = ({ actions }) => {
    return (
        <>
            <thead>
                <tr>
                    <th>
                        <span className="d-flex align-items-center gap-2 lh-1">
                            <b>#</b> <span>Key</span>
                        </span>
                    </th>
                    <th>Value</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {Array.from({ length: 7 }).map((_, ind) => (
                    <tr key={ind}>
                        <td>
                            <span className="d-flex align-items-center gap-2">
                                <b>{ind + 1}.</b> <span>Lang</span>
                            </span>
                        </td>

                        <td>
                            <Field>
                                <div className="input-group overflow-hidden border rounded-3">
                                    <input
                                        type="text"
                                        name="custom_api_url"
                                        className="form-control h-40 border-0"
                                        placeholder="Enter translate value"
                                    />
                                    <span
                                        className="input-group-text border-0 py-0 px-2"
                                        id="copy"
                                    >
                                        <Button
                                            iconBtn={true}
                                            tooltipText="Copy"
                                            icon={LuCopy}
                                            className="info-soft btn-ghost hover btn-sm rounded-circle fs-16"
                                        />
                                    </span>
                                </div>
                            </Field>
                        </td>

                        <td>
                            <div className="d-flex align-items-center justify-content-end gap-1">
                                <Button
                                    iconBtn={true}
                                    tooltipText="Delete"
                                    icon={LuTrash2}
                                    className="danger-soft btn-ghost hover btn-sm rounded-circle fs-18"
                                    onClick={() => actions.modal.fn(
                                        actions.modal.modalUid,
                                        "DELETE",
                                        "",
                                        ""
                                    )}

                                />

                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </>

    )
}

export default TranslateTable
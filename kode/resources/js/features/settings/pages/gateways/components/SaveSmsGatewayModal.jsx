import Button from "@/components/common/button/Button";
import Field from "@/components/common/from/Field";
import { useState } from "react";
import { LuCopy, LuPlus, LuX } from "react-icons/lu";

const SaveSmsGatewayModal = ({ closeModal }) => {

    const [inputs, setInputs] = useState([]);


    const handleAddItem = () => {
        const newItem = { id: Date.now(), name: "", value: "" };
        setInputs((prev) => [...prev, newItem]);
    };

    const handleRemoveItem = (id) => {
        setInputs((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <form>
            <div className="row g-3">
                <div className="col-12">
                    <Field label="Gateway Name">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your campaign name"
                            className="form-control"
                        />
                    </Field>
                </div>

                <div className="col-12">
                    <Field label="API URL" required>
                        <div className="input-group overflow-hidden">
                            <span
                                className="input-group-text border-0 py-0 px-1"
                                id="apiUrl"
                            >
                                <select
                                    name="custom_api_method"
                                    id="apiMethod"
                                    className="form-select input-group-select"
                                >
                                    <option value="get">Get</option>
                                    <option value="post">Post</option>
                                </select>
                            </span>

                            <input
                                type="text"
                                name="custom_api_url"
                                className="form-control"
                                placeholder="URL"
                            />
                        </div>
                    </Field>
                </div>

                <div className="col-12">
                    <p className="fs-14 mb-2 text-dark">Short Code</p>
                    <div className="px-3 py-1 border rounded-4">
                        <ul className="ul-list">
                            <li className="py-1">
                                <div className="d-flex align-items-center gap-3 info-list-left copy-section">
                                    <b className="fs-14 d-flex align-items-center gap-3 copy-content">
                                        {"{{message}}"}
                                    </b>

                                    <Button
                                        iconBtn={true}
                                        tooltipText="Copy"
                                        icon={LuCopy}
                                        className="info-soft btn-ghost hover btn-sm rounded-circle fs-18"
                                    />
                                </div>

                                <span className="fs-14">Message</span>
                            </li>

                            <li className="py-1">
                                <div className="d-flex align-items-center gap-3 info-list-left copy-section">
                                    <b className="fs-14 d-flex align-items-center gap-3 copy-content">
                                        {"{{number}}"}
                                    </b>
                                    <Button
                                        iconBtn={true}
                                        tooltipText="Copy"
                                        icon={LuCopy}
                                        className="info-soft btn-ghost hover btn-sm rounded-circle fs-16"
                                    />
                                </div>

                                <span className="line-clamp-1 fs-14">
                                    Number
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-12">
                    <div className="row g-3 mt-1">
                        <div className="p-3 border rounded-4">
                            <div className="d-flex align-items-center justify-content-between gap-4">
                                <h6 className="fs-14">Header</h6>
                                <Button
                                    iconBtn={true}
                                    tooltipText="Add"
                                    icon={LuPlus}
                                    type="button"
                                    className="dark-soft hover btn-sm rounded-circle fs-18"
                                    onClick={handleAddItem}
                                />
                            </div>

                            <div className="d-flex flex-column gap-3">
                                {inputs?.length > 0 &&
                                    inputs?.map((item, index) => (
                                        <div
                                            key={item.id}
                                            className="mt-3 input-variable d-flex align-items-center justify-content-end gap-2"
                                        >
                                            <div className="flex-grow-1">
                                                <Field>
                                                    <input
                                                        type="text"
                                                        id={`${name}-name-${index}`}
                                                        defaultValue={
                                                            item?.name
                                                        }
                                                        required
                                                        name={`variable_${name}_name[${index}]`}
                                                        className="form-control rounded-2 h-40"
                                                        placeholder="Enter header name"
                                                    />
                                                </Field>
                                            </div>

                                            <div className="flex-grow-1">
                                                <Field>
                                                    <input
                                                        type="text"
                                                        id={`${name}-name-${index}`}
                                                        defaultValue={
                                                            item?.value
                                                        }
                                                        required
                                                        name={`variable_${name}_name[${index}]`}
                                                        className="form-control rounded-2 h-40"
                                                        placeholder="Enter header value"
                                                    />
                                                </Field>
                                            </div>

                                            <Button
                                                type="button"
                                                iconBtn={true}
                                                tooltipText="Remove"
                                                icon={LuX}
                                                className="danger-soft btn-md rounded-circle flex-shrink-0 fs-18"
                                                onClick={() =>
                                                    handleRemoveItem(item.id)
                                                }
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="p-3 border rounded-4">
                            <div className="d-flex align-items-center justify-content-between gap-4">
                                <h6 className="fs-14">Body</h6>
                                <Button
                                    iconBtn={true}
                                    tooltipText="Add"
                                    icon={LuPlus}
                                    type="button"
                                    className="dark-soft hover btn-sm rounded-circle fs-18"
                                    onClick={handleAddItem}
                                />
                            </div>

                            <div
                                className={`d-flex flex-column gap-3 ${
                                    inputs?.length > 0 ? "mt-3" : ""
                                }`}
                            >
                                {inputs?.length > 0 &&
                                    inputs?.map((item, index) => (
                                        <div
                                            key={item.id}
                                            className="input-variable d-flex align-items-center justify-content-end gap-3"
                                        >
                                            <div className="flex-grow-1">
                                                <Field>
                                                    <input
                                                        type="text"
                                                        id={`${name}-name-${index}`}
                                                        defaultValue={
                                                            item?.name
                                                        }
                                                        required
                                                        name={`variable_${name}_name[${index}]`}
                                                        className="form-control rounded-2 h-40"
                                                        placeholder="Enter body name"
                                                    />
                                                </Field>
                                            </div>

                                            <div className="flex-grow-1">
                                                <Field>
                                                    <input
                                                        type="text"
                                                        id={`${name}-name-${index}`}
                                                        defaultValue={
                                                            item?.value
                                                        }
                                                        required
                                                        name={`variable_${name}_name[${index}]`}
                                                        className="form-control rounded-2 h-40"
                                                        placeholder="Enter body value"
                                                    />
                                                </Field>
                                            </div>

                                            <Button
                                                type="button"
                                                iconBtn={true}
                                                tooltipText="Remove"
                                                icon={LuX}
                                                className="danger-soft btn-md rounded-circle flex-shrink-0 fs-18"
                                                onClick={() =>
                                                    handleRemoveItem(item.id)
                                                }
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal-custom-footer mt-4">
                <Button
                    type="button"
                    className="i-btn btn--dark btn--lg outline rounded-3"
                    onClick={closeModal}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    className="i-btn btn--primary btn--lg rounded-3"
                >
                    Save
                </Button>
            </div>
        </form>
    );
};

export default SaveSmsGatewayModal
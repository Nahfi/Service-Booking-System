import Button from "@/components/common/button/Button";
import Field from "@/components/common/from/Field";
import type React from "react";

interface SaveMailGatewayModalProps {
    closeModal: () => void;
}

const SaveMailGatewayModal: React.FC<SaveMailGatewayModalProps> = ({
    closeModal,
}) => {
    return (
        <form>
            <div className="row g-3">
                <div className="col-12">
                    <Field label="Gateway Name" required>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your campaign name"
                            className="form-control"
                            required
                        />
                    </Field>
                </div>

                <div className="col-md-6">
                    <Field label="From Address" required>
                        <input
                            type="text"
                            id="from-address"
                            name="from-address"
                            placeholder="Enter form address"
                            className="form-control"
                            required
                        />
                    </Field>
                </div>

                <div className="col-md-6">
                    <Field label="From Name" required>
                        <input
                            type="text"
                            id="from-name"
                            name="from-name"
                            placeholder="Enter form name"
                            className="form-control"
                            required
                        />
                    </Field>
                </div>

                <div className="col-md-6">
                    <Field label="Driver" required>
                        <input
                            type="text"
                            id="from-name"
                            name="from-name"
                            placeholder="Enter driver"
                            className="form-control"
                            required
                        />
                    </Field>
                </div>

                <div className="col-md-6">
                    <Field label="Host" required>
                        <input
                            type="text"
                            id="from-name"
                            name="from-name"
                            placeholder="Enter host"
                            className="form-control"
                            required
                        />
                    </Field>
                </div>

                <div className="col-md-6">
                    <Field label="Port" required>
                        <input
                            type="text"
                            id="from-name"
                            name="from-name"
                            placeholder="Enter port"
                            className="form-control"
                            required
                        />
                    </Field>
                </div>

                <div className="col-md-6">
                    <Field label="Encryption" required>
                        <select
                            className="form-select"
                            id="country"
                            aria-label="State"
                        >
                            <option>--Select Encryption--</option>
                            <option value="tlc">
                                Stander Encryption (TLS)
                            </option>
                            <option value="ssl">Secure Encryption (SSL)</option>
                        </select>
                    </Field>
                </div>

                <div className="col-md-6">
                    <Field label="Username" required>
                        <input
                            type="text"
                            id="from-name"
                            name="from-name"
                            placeholder="Enter Username"
                            className="form-control"
                            required
                        />
                    </Field>
                </div>

                <div className="col-md-6">
                    <Field label="Password" required>
                        <input
                            type="text"
                            id="from-name"
                            name="from-name"
                            placeholder="Enter Password"
                            className="form-control"
                            required
                        />
                    </Field>
                </div>

                <div className="col-12">
                    <Field label="Template" required>
                        <select
                            className="form-select"
                            id="template"
                            aria-label="State"
                            name="template"
                        >
                            <option>--Select Template--</option>
                            <option value="tlc">Template - 1</option>
                            <option value="ssl">Template - 1</option>
                        </select>
                    </Field>
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

export default SaveMailGatewayModal
import type React from 'react'
import { GoSync } from 'react-icons/go'
import Button from '../../../../../components/common/button/Button'
import Card from '../../../../../components/common/card/Card'
import CardBody from '../../../../../components/common/card/CardBody'
import CardHeader from '../../../../../components/common/card/CardHeader'
import Field from '../../../../../components/common/from/Field'

const Appearance: React.FC = () => {
    return (
        <Card>
            <CardHeader cardTitle='Appearance Configure' />
            <CardBody>
                <form>
                    <div className="row gx-4 gy-3">
                        <div className="col-md-6">
                            <Field label="Primary Color" required>
                                <div className="input-group overflow-hidden border rounded-3">
                                    <span
                                        className="input-group-text border-0 py-0 px-1"
                                        id="apiUrl"
                                    >
                                        <input
                                            type="color"
                                            name="primary-color"
                                            className="form-control input-group-select input-color"
                                            placeholder="Enter your primary color"
                                        />
                                    </span>

                                    <input
                                        type="text"
                                        name="custom_api_url"
                                        className="form-control border-0"
                                        placeholder="URL"
                                    />

                                    <span
                                        className="input-group-text border-0 py-0 px-2"
                                        id="copy"
                                    >
                                        <Button
                                            iconBtn={true}
                                            tooltipText="Reset"
                                            icon={GoSync}
                                            className="info-soft btn-ghost hover btn-sm rounded-circle fs-16"
                                        />
                                    </span>
                                </div>
                            </Field>
                        </div>

                        <div className="col-md-6">
                            <Field label="Primary Text Color" required>
                                <div className="input-group overflow-hidden border rounded-3">
                                    <span
                                        className="input-group-text border-0 py-0 px-1"
                                        id="apiUrl"
                                    >
                                        <input
                                            type="color"
                                            name="primary-color"
                                            className="form-control input-group-select input-color"
                                            placeholder="Enter your primary color"
                                        />
                                    </span>

                                    <input
                                        type="text"
                                        name="custom_api_url"
                                        className="form-control border-0"
                                        placeholder="URL"
                                    />

                                    <span
                                        className="input-group-text border-0 py-0 px-2"
                                        id="copy"
                                    >
                                        <Button
                                            iconBtn={true}
                                            tooltipText="Reset"
                                            icon={GoSync}
                                            className="info-soft btn-ghost hover btn-sm rounded-circle fs-16"
                                        />
                                    </span>
                                </div>
                            </Field>
                        </div>

                        <div className="col-md-6">
                            <Field label="Secondary Color" required>
                                <div className="input-group overflow-hidden border rounded-3">
                                    <span
                                        className="input-group-text border-0 py-0 px-1"
                                        id="apiUrl"
                                    >
                                        <input
                                            type="color"
                                            name="primary-color"
                                            className="form-control input-group-select input-color"
                                            placeholder="Enter your primary color"
                                        />
                                    </span>

                                    <input
                                        type="text"
                                        name="custom_api_url"
                                        className="form-control border-0"
                                        placeholder="URL"
                                    />

                                    <span
                                        className="input-group-text border-0 py-0 px-2"
                                        id="copy"
                                    >
                                        <Button
                                            iconBtn={true}
                                            tooltipText="Reset"
                                            icon={GoSync}
                                            className="info-soft btn-ghost hover btn-sm rounded-circle fs-16"
                                        />
                                    </span>
                                </div>
                            </Field>
                        </div>

                        <div className="col-md-6">
                            <Field label="Secondary Text Color" required>
                                <div className="input-group overflow-hidden border rounded-3">
                                    <span
                                        className="input-group-text border-0 py-0 px-1"
                                        id="apiUrl"
                                    >
                                        <input
                                            type="color"
                                            name="primary-color"
                                            className="form-control input-group-select input-color"
                                            placeholder="Enter your primary color"
                                        />
                                    </span>

                                    <input
                                        type="text"
                                        name="custom_api_url"
                                        className="form-control border-0"
                                        placeholder="URL"
                                    />

                                    <span
                                        className="input-group-text border-0 py-0 px-2"
                                        id="copy"
                                    >
                                        <Button
                                            iconBtn={true}
                                            tooltipText="Reset"
                                            icon={GoSync}
                                            className="info-soft btn-ghost hover btn-sm rounded-circle fs-16"
                                        />
                                    </span>
                                </div>
                            </Field>
                        </div>

                        <div className="col-md-6">
                            <Field label="Site Logo" uploadText="Upload your logo here" required>
                                <input type="file" id="avatar" name="avatar" className="form-control" />
                            </Field>
                        </div>

                        <div className="col-md-6">
                            <Field label="Favicon Icon" uploadText="Upload your favicon here" required>
                                <input type="file" id="avatar" name="avatar" className="form-control" />
                            </Field>
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-end mt-4">
                        <Button
                            type="submit"
                            className="btn--primary btn--lg rounded-3"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}

export default Appearance
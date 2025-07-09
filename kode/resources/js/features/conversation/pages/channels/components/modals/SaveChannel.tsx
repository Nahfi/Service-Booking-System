
import type React from 'react'
import Button from '../../../../../../components/common/button/Button'
import Field from '../../../../../../components/common/from/Field'

const SaveChannel: React.FC = ({ onHide,type=null }) => {
    return (
        <form action="#">
            <div className='row g-3'>
                <div className="col-lg-6">
                    <Field label={"Channel Name"} required>
                        <input
                            type="text"
                            id="name"
                            name='name'
                            placeholder="Enter channel name"
                            className="form-control"
                            required
                        />
                    </Field>
                </div>

                {type === "sms" ? (
                    <>
                        <div className="col-lg-6">
                            <Field label="SMS Provider">
                                <select
                                    name='status'
                                    className="form-select"
                                    id="sms_provide"
                                    aria-label="SMS Provider"
                                >
                                    <option selected> Select Provider </option>
                                    <option twilio="inactive">Twilio</option>
                                    <option twilio="aws">AWS SNS</option>
                                    <option twilio="aws">Message Bird</option>
                                </select>
                            </Field>
                        </div>

                        <div className="col-lg-6">
                            <Field label={"API Key"} required>
                                <input
                                    type="text"
                                    id="api_key"
                                    name='api_key'
                                    placeholder="Enter api key"
                                    className="form-control"
                                    required
                                />
                            </Field>
                        </div>

                        <div className="col-lg-6">
                            <Field label={"Sender ID"} required>
                                <input
                                    type="text"
                                    id="sender_id"
                                    name='sender_id'
                                    placeholder="Enter sender ID"
                                    className="form-control"
                                    required
                                />
                            </Field>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="col-lg-6">
                            <Field label={"Phone Number"} required>
                                <input
                                    type="tel"
                                    id="name"
                                    name='name'
                                    placeholder="Enter phone number"
                                    className="form-control"
                                    required
                                />
                            </Field>
                        </div>

                        <div className="col-lg-6">
                            <Field label={"Business Name"} required>
                                <input
                                    type="text"
                                    id="name"
                                    name='name'
                                    placeholder="Enter business name"
                                    className="form-control"
                                    required
                                />
                            </Field>
                        </div>
                    </>
                )}


                <div className="col-lg-6">
                    <Field label={"Webhook URL"} required>
                        <input
                            type="text"
                            id="name"
                            name='name'
                            placeholder="Enter webhook URL"
                            className="form-control"
                            required
                        />
                    </Field>
                </div>

                <div className="col-lg-6">
                    <Field label="Status">
                        <select
                            name='status'
                            className="form-select"
                            id="attribute-type"
                            aria-label="Attribute"
                        >
                            <option value="active" selected> Active </option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </Field>
                </div>
            </div>

            <div className="modal-custom-footer mt-4">
                <Button
                    className="i-btn btn--dark outline btn--lg rounded-3"
                    type="button"
                    onClick={onHide}
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
    )
}

export default SaveChannel
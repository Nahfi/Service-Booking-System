import { FC } from "react";
import Field from "../../../../components/common/from/Field";

const CampaignSetup: FC = () => {
    return (
        <div className="row g-4">
            <div className="col-12">
                <Field label="Campaign name">
                    <input
                        type="text"
                        id="campaignName"
                        placeholder="Enter your campaign name"
                        className="form-control"
                    />
                </Field>
            </div>
            <div className="col-md-6">
                <Field label="Sender name">
                    <input
                        type="text"
                        id="sender"
                        placeholder="Enter your sender name"
                        className="form-control"
                    />
                </Field>
            </div>
            <div className="col-md-6">
                <Field label="Choose Gateway">
                    <select
                        className="form-select"
                        id="country"
                        aria-label="State"
                    >
                        <option selected>Choose your state</option>
                        <option value="1">Spain</option>
                        <option value="2">England</option>
                        <option value="3">Bangladesh</option>
                        <option value="3">Dhaka</option>
                    </select>
                </Field>
            </div>
            <div className="col-12">
                <Field label="Phone Number" required>
                    <div className="row g-1">
                        <div className="col-2">
                            <select
                                className="form-select"
                                id="country"
                                aria-label="State"
                            >
                                <option selected>Choose your state</option>
                                <option value="1">Spain</option>
                                <option value="2">England</option>
                                <option value="3">Bangladesh</option>
                                <option value="3">Dhaka</option>
                            </select>
                        </div>
                        <div className="col-10">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="+1 (000) 000-0000"
                                id="phone-input"
                            />
                        </div>
                    </div>
                </Field>
            </div>
            <div className="col-12">
                <h6 className="mb-3">Select the time schedule</h6>
                <div className="d-flex flex-column gap-3">
                    <Field label="Send now">
                        <input type="radio" name="time" id="sendNow" />
                    </Field>
                    <Field label="Schedule for later">
                        <input type="radio" name="time" id="later" />
                    </Field>
                </div>
            </div>
            <div className="col-12">
                <Field label="Choose date">
                    <input type="date" id="date" className="form-control" />
                </Field>
            </div>
            <div className="col-12">
                <div className="row g-2">
                    <div className="col-2">
                        <Field>
                            <select
                                className="form-select"
                                id="hour"
                                aria-label="State"
                            >
                                <option value="1">01</option>
                                <option value="2">02</option>
                                <option value="3">03</option>
                                <option value="4">04</option>
                                <option value="5">05</option>
                            </select>
                        </Field>
                    </div>
                    <div className="col-2">
                        <Field>
                            <select
                                className="form-select"
                                id="minute"
                                aria-label="State"
                            >
                                <option value="1">01</option>
                                <option value="2">02</option>
                                <option value="3">03</option>
                                <option value="4">04</option>
                                <option value="5">05</option>
                            </select>
                        </Field>
                    </div>
                    <div className="col-12">
                        <span className="fs-14 fw-bold">
                            Asia/Dhaka GMT +06:00
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignSetup;

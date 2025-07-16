import { FC, useState } from "react";
import { BsCalendar2Range } from "react-icons/bs";
import DateTimePicker from "../../../../components/common/datepicker/DateTimePicker";
import Field from "../../../../components/common/from/Field";

const CampaignSetup: FC = () => {

    const [files, setFiles] = useState<null>(null);

    const handleFileUpload = (uploadedFile) => {
        setImages((prevFile) => [...prevFile, ...uploadedFile]);
    };

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());

    return (
        <div className="row g-3 fade-in">
            <div className="col-12">
                <Field label="Campaign name" required>
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
                <Field label="Sender name">
                    <input
                        type="text"
                        id="sender"
                        name="sender"
                        placeholder="Enter your sender name"
                        className="form-control"
                    />
                </Field>
            </div>

            <div className="col-md-6">
                 <Field label="Phone Number" required htmlFor="number">
                    <div className="input-group overflow-hidden border rounded-3">
                        <span
                            className="input-group-text border-0 py-0 px-1"
                            id="apiUrl"
                        >
                            <select
                                name="country"
                                id="country"
                                className="form-select input-group-select"
                                aria-label="Country code"
                                
                            > 
                                <option value="">Select Country</option>
                                <option value="bangladesh">Bangladesh</option>
                                <option value="india">India</option>
                            </select>
                        </span>

                        <input
                            type="tel"
                            id="number"
                            name="number"
                            className="form-control border-0"
                            placeholder="Enter sender phone number"
                        />
                    </div>
                </Field>
            </div>

            <div className="col-12">
                <Field label="Choose Gateway" required>
                    <select
                        className="form-select"
                        id="gateway"
                        name="gateway"
                        aria-label="Gateway"
                        required
                    >
                        <option value={""}>-- Select Gateway --</option>
                        <option value="twilio">Twilio</option>
                        <option value="click_send">ClickSend</option>
                        <option value="infobip">Infobip</option>
                    </select>
                </Field>
            </div>

            <div className="col-12">
                <div className="mb-3">
                    <h6 className="fs-15">Send time</h6>
                    <p className="fs-13">When do you want to send your campaign?</p>
                </div>

                <div className="d-flex flex-column gap-3">
                    <div className="d-flex gap-3">
                        <label className="custom-radio">
                            <input type="radio" className="radio" name="send_now"/>
                            <span className="radio-btn">
                                <span className="radio-btn-icon"/>
                                <div>
                                    <h6 className="fs-14 mb-1">Send now</h6>
                                    <p className="fs-13">Send your text message campaign now.</p>
                                </div>
                            </span>
                        </label>

                        <label className="custom-radio">
                            <input type="radio" className="radio" name="send_now" />
                            <span className="radio-btn">
                                <span className="radio-btn-icon" />
                                <div className="">
                                    <h6 className="fs-14 mb-1">Schedule for later</h6>
                                    <p className="fs-13">Choose a specific day and time to send in the future</p>
                                </div>
                            </span>
                        </label>
                    </div>
                </div>

                <div className="row g-3 mt-3">
                    <div className="col-lg-6 col-md-12">
                        <Field label="Set schedule" className="date-date-wrapper">
                            <div className="field-with-icon w-100">
                                <BsCalendar2Range className="field-icon" />
                                <DateTimePicker
                                    selected={selectedDateTime}
                                    onChange={(date) => setSelectedDateTime(date)}
                                    showTimeSelect
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    className="form-control"
                                    placeholderText="Select date"
                                />

                                <input type="hidden" name="date" value={selectedDateTime} />
                            </div>
                        </Field>
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <Field label="Timezone">
                            <select
                                className="form-select"
                                id="hour"
                                aria-label="State"
                            >
                                <option value="1">Asia/Dhaka GMT +06:00</option>
                                <option value="2">(UTC+03:30) Tehran</option>
                                <option value="3">(UTC-09:00) Alaska</option>
                                <option value="4">(UTC-10:00) Hawaii</option>
                                <option value="5">(UTC-05:00) Indiana (East)</option>
                            </select>
                        </Field>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CampaignSetup;

// Compose.jsx
import React, { useState } from "react"; // Fixed import here

import { useTranslation } from "react-i18next";
import { LuLayoutTemplate } from "react-icons/lu";
import Field from "../../../../components/common/from/Field";
import SelectBox from "../../../../components/common/from/SelectBox";
import type { InputChangeEvent } from "../../../../utils/types";
import MessagePreview from "./MessagePreview";

type SmsType = "text" | "unicode";

const TemplateOption = [
    { value: "template-1", label: "Template-1" },
    { value: "template-2", label: "Template-2" },
    { value: "template-3", label: "Template-3" },
];


const SmsCompose: React.FC = () => {
    const { t } = useTranslation();

    const [message, setMessage] = useState<string>("");
    const [images, setImages] = useState<string[]>([]);
    const [smsType, setSmsType] = useState<SmsType>("text");

    const handleImagesUpload = (uploadedImages: string[]): void => {
        setImages((prevImages) => [...prevImages, ...uploadedImages]);
    };

    const handleDelete = (indexToDelete: number): void => {
        setImages(images.filter((_, index) => index !== indexToDelete));
    };

    const handleMessageChange = (e: InputChangeEvent): void => {
        setMessage(e.target.value);
    };

    const handleSmsTypeChange = (e: InputChangeEvent): void => {
        setSmsType(e.target.value as SmsType);
    };

    return (
        <div className="row g-0 fade-in">
            <div className="col-xxl-8 col-xl-7 col-lg-6 border-end py-30 pe-lg-30">
                <div className="row g-3">
                    <div className="col-12">
                        <Field label="SMS Type">
                            <div className="d-flex gap-3">
                                <label className="custom-radio" htmlFor="text">
                                    <input type="radio" className="radio" name="sms_type"  id="text"/>
                                    <span className="radio-btn">
                                        <span className="radio-btn-icon" />
                                        <div>
                                            <h6 className="fs-14 mb-1">Text</h6>
                                            <p className="fs-13">Standard SMS messages with a maximum of 160 characters.</p>
                                        </div>
                                    </span>
                                </label>

                                <label className="custom-radio" htmlFor="unicode">
                                    <input type="radio" className="radio" name="sms_type" id="unicode" />
                                    <span className="radio-btn">
                                        <span className="radio-btn-icon" />
                                        <div className="">
                                            <h6 className="fs-14 mb-1">Unicode</h6>
                                            <p className="fs-13">Unicode SMS supports all languages and symbols.</p>
                                        </div>
                                    </span>
                                </label>
                            </div>
                        </Field>
                    </div>

                    <div className="col-12">
                        <Field label={"Use Template"} htmlFor="template">
                            <SelectBox
                                    id="template"
                                    options={TemplateOption}
                                    icon={<LuLayoutTemplate />}
                                    name="template"
                                    placeholder={t("Choose Template")}
                                />
                        </Field>
                    </div>
                    
                    <div className="col-12">
                        <Field label="Message">
                            <textarea
                                className="form-control"
                                id="message"
                                name="message"
                                rows={5}
                                value={message}
                                onChange={handleMessageChange}
                                placeholder="Enter your message here..."
                            />
                        </Field>
                    </div>


                    {/* <div className="col-12">
                        <h6 className="fs-15 mb-3">Choose SMS type</h6>
                        <div className="d-flex gap-4">
                            <Field label="Text">
                                <input
                                    type="radio"
                                    name="smsType"
                                    id="text"
                                    value="text"
                                    checked={smsType === "text"}
                                    onChange={handleSmsTypeChange}
                                />
                            </Field>

                            <Field label="Unicode">
                                <input
                                    type="radio"
                                    name="smsType"
                                    id="unicode"
                                    value="unicode"
                                    checked={smsType === "unicode"}
                                    onChange={handleSmsTypeChange}
                                />
                            </Field>
                        </div>
                    </div> */}
                </div>
            </div>

            <div className="col-xxl-4 col-xl-5 col-lg-6 py-30">
                <MessagePreview
                    message={message}
                    images={images}
                />
            </div>
        </div>
    );
};

export default SmsCompose;

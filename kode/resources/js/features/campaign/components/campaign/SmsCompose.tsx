// Compose.jsx
import React, { useState } from "react"; // Fixed import here

import Field from "../../../../components/common/from/Field";
import FileUploader from "../../../../components/common/from/FileUploader";
import type { InputChangeEvent } from "../../../../utils/types";
import MessagePreview from "./MessagePreview";

type SmsType = "text" | "unicode";

const SmsCompose: React.FC = () => {
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
        <div className="row g-0">
            <div className="col-xxl-8 col-xl-7 col-lg-6 border-end py-30 pe-lg-30">
                <div className="row g-4">
                    <div className="col-12">
                        <Field label="Message">
                            <textarea
                                className="form-control"
                                id="message"
                                name="message"
                                rows={6}
                                value={message}
                                onChange={handleMessageChange}
                                placeholder="Enter your message here..."
                            />
                        </Field>
                    </div>


                    <div className="col-12">
                        <Field
                            label="Profile photo"
                            htmlFor={"profile_photo"}
                        >
                            <FileUploader
                                defaultFiles={
                                    []
                                }
                                uploadText="Select a file or drag and drop here"
                                maxFile="JPG or PNG, file size no more than 5MB"
                                onUpload={
                                    handleImagesUpload
                                }
                                accept="image/*"
                                multiple={false}
                                name="image"
                            />
                        </Field>
                    </div>

                    <div className="col-12">
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
                    </div>
                </div>
            </div>

            <div className="col-xxl-4 col-xl-5 col-lg-6 py-30">
                <MessagePreview
                    message={message}
                    images={images}
                    smsType={smsType}
                />
            </div>
        </div>
    );
};

export default SmsCompose;

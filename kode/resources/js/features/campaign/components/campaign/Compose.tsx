// Compose.jsx
import React, { useState } from "react"; // Fixed import here
import { RxCrossCircled } from "react-icons/rx";

import Field from "../../../../components/common/from/Field";
import ImageUpload from "../../../../components/common/from/ImageUpload";
import type { InputChangeEvent } from "../../../../utils/types";
import MessagePreview from "./MessagePreview";

type SmsType = "text" | "unicode";

const Compose: React.FC = () => {
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
        <div className="row">
            <div className="col-xxl-8 col-xl-7 col-lg-6 border-end py-30 pe-lg-30">
                <div className="row g-4">
                    <div className="col-12">
                        <Field label="Message">
                            {/* <RichTextEditor
                              value={message}
                              onChange={handleMessageChange}
                            /> */}
                            <textarea
                                className="form-control"
                                rows={6}
                                value={message}
                                onChange={handleMessageChange}
                                placeholder="Enter your message here..."
                            />
                        </Field>
                    </div>

                    <div className="col-12">
                        <ImageUpload
                            label="Add image/Gif"
                            onImagesUpload={handleImagesUpload}
                            uploadText="Drag your file(s) or Browse"
                            maxFile="Max 20 MB files are allowed"
                        />
                    </div>

                    <div className="col-12">
                        {images.length > 0 && (
                            <div className="selected-image">
                                {images.map((image, index) => (
                                    <div className="image" key={index}>
                                        <button
                                            className="cross"
                                            type="button"
                                            onClick={() => handleDelete(index)}
                                        >
                                            <RxCrossCircled size={20} />
                                        </button>
                                        <img
                                            src={image}
                                            alt={`selected-${index}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
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

export default Compose;

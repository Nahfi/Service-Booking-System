import Button from '@/components/common/button/Button';
import Field from '@/components/common/from/Field';
import FileUploader from '@/components/common/from/FileUploader';
import React, { useState } from 'react';
import { BsPlusLg, BsXLg } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';

const WhatsappTemplate: React.FC = () => {

    const [images, setImages] = useState([]);

    const handleMessageChange = (value) => {
        setMessage(value);
    };

    const handleImagesUpload = (uploadedImages) => {
        setImages((prevImages) => [...prevImages, ...uploadedImages]);
    };

    const handleDelete = (indexToDelete) => {
        setImages(images.filter((_, index) => index !== indexToDelete));
    };

    const [headerText, setHeaderText] = useState("");

    const [bodyText, setBodyText] = useState("");

    const [buttonText, setButtonText] = useState("");
    const [buttonSelectValue, setButtonSelectValue] = useState("");
    const [urlText, setUrlText] = useState("");

    const handleHeaderChange = (e) => setHeaderText(e.target.value);
    const handleBodyChange = (e) => setBodyText(e.target.value);
    const handleButtonChange = (e) => setButtonText(e.target.value);
    const handleUrlChange = (e) => setUrlText(e.target.value);

    const [inputs, setInputs] = useState([]);


    const handleAddItem = () => {
        const newItem = { id: Date.now(), name: "", value: "" };
        setInputs((prev) => [...prev, newItem]);
    };

    const handleRemoveItem = (id) => {
        setInputs((prev) => prev.filter((item) => item.id !== id));
    };
    return (
        <form action="">
            <div className="row g-3">
                <div className="col-12">
                    <Field label="Template Name">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter template name"
                        />
                    </Field>
                </div>

                <div className="col-md-6">
                    <Field label="Choose Category">
                        <select
                            className="form-select"
                            id="category"
                            aria-label="State"
                        >
                            <option selected>Choose your state</option>
                            <option value="marketing">Marketing</option>
                            <option value="utility">Utility</option>
                        </select>
                    </Field>
                </div>

                <div className="col-md-6">
                    <Field label="Choose language">
                        <select
                            className="form-select"
                            id="country"
                            aria-label="State"
                        >
                            <option selected>Select Language</option>
                            <option value="1">Spain</option>
                            <option value="2">England</option>
                            <option value="3">Bangladesh</option>
                            <option value="3">Dhaka</option>
                        </select>
                    </Field>
                </div>

                <div className="col-12">
                    <Field label="Header(Optional)">
                        <>
                            <p className="mb-1 fs-14">
                                Add a title or choose which type file you will use
                                for this header.
                            </p>
                            <select
                                className="form-select"
                                id="country"
                                aria-label="State"
                            >
                                <option selected>Choose media</option>
                                <option value="text">Text</option>
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                                <option value="document">Document</option>
                            </select>
                        </>
                    </Field>
                </div>

                <div className="col-12">
                    <Field>
                        <input
                            type="text"
                            placeholder="{{1}}"
                            className="form-control"
                            value={headerText}
                            onChange={handleHeaderChange}
                        />
                    </Field>
                </div>

                <div className="col-12">
                    <FileUploader
                        uploadText="Select a file or drag and drop here"
                        maxFile="JPG, PNG or PDF, file size no more than 10MB"
                        onImagesUpload={handleImagesUpload}
                    />
                    {images.length > 0 && (
                        <div className="selected-image mt-3">
                            {images.map((image, index) => (
                                <div className="image" key={index}>
                                    <button
                                        className="cross"
                                        type="button"
                                        onClick={() => handleDelete(index)}
                                    >
                                        <RxCrossCircled size={20} />
                                    </button>
                                    <img src={image} alt={`selected-${index}`} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="col-12">
                    <Field label="Body">
                        <textarea
                            name="body"
                            id=""
                            className="form-control"
                            placeholder="{{1}}*fgf*"
                            onChange={handleBodyChange}
                        ></textarea>
                    </Field>
                    <div className="mt-3">
                        <Button
                            type="button"
                            className="btn--lg btn--primary outline"
                            onClick={handleAddItem}
                        >
                            <BsPlusLg /> Add Variable
                        </Button>

                        <div className="mt-3 d-flex flex-column gap-3">
                            {inputs?.length > 0 &&
                                inputs?.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="input-variable d-flex align-items-center justify-content-end gap-2"
                                    >
                                        <div className="flex-grow-1">
                                            <Field>
                                                <input
                                                    type="text"
                                                    id={`${name}-name-${index}`}
                                                    defaultValue={item?.name}
                                                    required
                                                    name={`variable_${name}_name[${index}]`}
                                                    className="form-control"
                                                />
                                            </Field>
                                        </div>

                                        <Button
                                            type="button"
                                            iconBtn={true}
                                            tooltipText="Remove"
                                            icon={BsXLg}
                                            className="dark-soft btn-lg rounded-3"
                                            onClick={() =>
                                                handleRemoveItem(item.id)
                                            }
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <Field label="Footer">
                        <textarea
                            name="footer"
                            className="form-control"
                            id="templateFooter"
                            placeholder="{{1}}*fgf*"
                        ></textarea>
                    </Field>
                </div>

                <div className="col-12">
                    <Field label="Buttons">
                        <div>
                            <p className="subtitle fs-14 mb-2">
                                Create button that let customers reply to your
                                message
                            </p>
                            <div className="row">
                                <div className="col-xl-4 col-lg-6 col-md-6">
                                    <select
                                        className="form-select"
                                        id="country"
                                        aria-label="State"
                                    >
                                        <option selected>Select</option>
                                        <option value="1">Video</option>
                                        <option value="2">Pdf</option>
                                        <option value="3">Text</option>
                                        <option value="3">Doc</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </Field>
                </div>

                <div className="col-12">
                    <Field label="Buttons">
                        <div>
                            <p className="subtitle fs-14 mb-2">
                                Create button that let customers reply to your
                                message
                            </p>
                            <div className="row g-3">
                                <div className="col-xl-4 col-lg-6 col-md-6">
                                    <select
                                        className="form-select"
                                        id="country"
                                        aria-label="State"
                                    >
                                        <option selected>Call to actions</option>
                                        <option value="1">Video</option>
                                        <option value="2">Pdf</option>
                                        <option value="3">Text</option>
                                        <option value="3">Doc</option>
                                    </select>
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6">
                                    <select
                                        className="form-select"
                                        id="country"
                                        aria-label="State"
                                    >
                                        <option selected>Visit Website</option>
                                        <option value="1">Video</option>
                                        <option value="2">Pdf</option>
                                        <option value="3">Text</option>
                                        <option value="3">Doc</option>
                                    </select>
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6">
                                    <select
                                        className="form-select"
                                        id="country"
                                        aria-label="State"
                                    >
                                        <option selected>Dynamic</option>
                                        <option value="1">Video</option>
                                        <option value="2">Pdf</option>
                                        <option value="3">Text</option>
                                        <option value="3">Doc</option>
                                    </select>
                                </div>

                                <div className="col-12">
                                    <Field>
                                        <input
                                            type="text"
                                            placeholder="Button text"
                                            className="form-control"
                                            onChange={handleButtonChange}
                                        />
                                    </Field>
                                </div>

                                <div className="col-12">
                                    <Field>
                                        <input
                                            type="text"
                                            placeholder="www.url.com {{1}}"
                                            className="form-control"
                                            value={urlText}
                                            onChange={handleUrlChange}
                                        ></input>
                                    </Field>
                                </div>
                            </div>
                        </div>
                    </Field>
                </div>
            </div>
        </form>
    );
}

export default WhatsappTemplate
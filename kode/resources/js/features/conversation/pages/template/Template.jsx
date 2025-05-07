import React, { useState } from "react";
import { BsPlusLg, BsXLg } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import Button from "../../../../components/common/button/Button";
import Field from "../../../../components/common/from/Field";
import ImageUpload from "../../../../components/common/from/ImageUpload";
import PageHeader from "../../../../components/common/Page-header/PageHeader";
import MessagePreview from "../../../campaign/components/campaign/MessagePreview";

const Template = () => {
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
  // const values = {};

    // useEffect(() => {
    //   if (values !== null) {
    //     let formattedInputs = Object.entries(values).map(([name, value]) => ({
    //       id: Date.now() + Math.random(),
    //       name: name,
    //       value: value,
    //     }));

    //     setInputs(formattedInputs);
    //   }
    // }, [values]);

    const handleAddItem = () => {
      const newItem = { id: Date.now(), name: "", value: "" };
      setInputs((prev) => [...prev, newItem]);
  };
  
    const handleRemoveItem = (id) => {
      setInputs((prev) => prev.filter((item) => item.id !== id));
    };

  return (
    <div>
      <div className="main-content-body py-0">
        <div className="row h-100 g-0">
          <div className="col-xxl-8 col-xl-7 col-lg-6 border-lg-end py-30 pe-lg-30">
            <div className="mb-4">
              <PageHeader title="Template" description="Manage your contacts" />
            </div>
            <div className="form-wrapper-width ms-0 me-auto">
              <form action="">
                <div className="row g-3">
                  <div className="col-12">
                    <Field label="Template Name">
                      <select
                        className="form-select"
                        id="country"
                        aria-label="State"
                      >
                        <option selected>Select Template</option>
                        <option value="1">Spain</option>
                        <option value="2">England</option>
                        <option value="3">Bangladesh</option>
                        <option value="3">Dhaka</option>
                      </select>
                    </Field>
                  </div>

                  <div className="col-12">
                    <Field label="Choose template">
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
                        <p className="mb-1">
                          Add a title or choose which type file you will use for
                          this header.
                        </p>
                        <select
                          className="form-select"
                          id="country"
                          aria-label="State"
                        >
                          <option selected>Select</option>
                          <option value="1">Video</option>
                          <option value="2">Text</option>
                          <option value="3">Text</option>
                          <option value="3">Doc</option>
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
                    <ImageUpload
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
                                onClick={() => handleRemoveItem(item.id)}
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
                          Create button that let customers reply to your message
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
                          Create button that let customers reply to your message
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
                              <textarea
                                type="text"
                                placeholder="www.url.com {{1}}"
                                className="form-control"
                                value={urlText}
                                onChange={handleUrlChange}
                              ></textarea>
                            </Field>
                          </div>
                        </div>
                      </div>
                    </Field>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-5 col-lg-6 py-30 position-relative">
            <MessagePreview
              headerText={headerText}
              bodyText={bodyText}
              buttonText={buttonText}
              buttonSelectValue={buttonSelectValue}
              urlText={urlText}
              images={images}
              whatsapp
            />
          </div>
        </div>
      </div>
      <div className="position-relative bottom-0 end-0 p-3 border-top w-100 text-end">
        <Link to="#" className="i-btn btn--primary btn--lg">
          Next step
        </Link>
      </div>
    </div>
  );
};

export default Template;

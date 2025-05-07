// Compose.jsx
import React, { useState } from "react"; // Fixed import here
import { RxCrossCircled } from "react-icons/rx";

import Field from "../../../../components/common/from/Field";
import ImageUpload from "../../../../components/common/from/ImageUpload";
import MessagePreview from "./MessagePreview";

const Compose = () => {
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);

  // const handleMessageChange = (value) => {
  //   setMessage(value);
  // };

  const handleImagesUpload = (uploadedImages) => {
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  const handleDelete = (indexToDelete) => {
    setImages(images.filter((_, index) => index !== indexToDelete));
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
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message here..."
              ></textarea>
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
                    <img src={image} alt={`selected-${index}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-12">
            <h6 className="fs-15 mb-3">Choose SMS type</h6>
            <div className="d-flex gap-4">
              <Field label="Text">
                <input type="radio" name="smsType" id="text" />
              </Field>
              <Field label="Unicode">
                <input type="radio" name="smsType" id="unicode" />
              </Field>
              <Field label="MMS">
                <input type="radio" name="smsType" id="mms" />
              </Field>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-4 col-xl-5 col-lg-6 py-30">
        <MessagePreview message={message} images={images} />
      </div>
    </div>
  );
};

export default Compose;

import React from "react";
import Field from "../../common/from/Field";

const ImageUpload = ({label, onImagesUpload, inputNote, uploadText, maxFile }) => {

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const imageArray = files.map((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
            });
        });

        Promise.all(imageArray).then((uploadedImages) => {
            onImagesUpload(uploadedImages);
        });
    };

    return(
        <div>
            <Field label={label} inputNote ={inputNote} uploadText={uploadText} maxFile={maxFile}>
                <input
                    type="file"
                    className="form-control"
                    onChange={handleImageUpload}
                    multiple
                />
            </Field>
        </div>
    )
}

export default ImageUpload;
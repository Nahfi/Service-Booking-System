import React from "react";
import type { InputChangeEvent } from "../../../utils/types";
import Field from "./Field";

interface ImageUploadProps {
    label?: string;
    onImagesUpload: (images: (string | ArrayBuffer | null)[]) => void;
    inputNote?: string;
    uploadText?: string;
    maxFile?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    label,
    onImagesUpload,
    inputNote,
    uploadText,
    maxFile,
}) => {
    const handleImageUpload = (event: InputChangeEvent): void => {
        const files = Array.from(event.target.files || []);
        const imageArray = files.map(
            (file) =>
                new Promise<string | ArrayBuffer | null>((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                        resolve(reader.result);
                    };
                })
        );

        Promise.all(imageArray).then((uploadedImages) => {
            onImagesUpload(uploadedImages);
        });
    };

    return (
        <div>
            <Field
                label={label}
                inputNote={inputNote}
                uploadText={uploadText}
                maxFile={maxFile}
            >
                <input
                    type="file"
                    className="form-control"
                    onChange={handleImageUpload}
                    multiple
                />
            </Field>
        </div>
    );
};

export default ImageUpload;

import React, { useState } from "react";
import { LuX } from "react-icons/lu";
import type { InputChangeEvent } from "../../../utils/types";
import Button from "../button/Button";
import Field from "./Field";

export interface UploadedFile {
    name: string;
    type: string;
    size: number;
    file: File;
    preview: string;
}

interface FileUploaderProps {
    label?: string;
    id?: string;
    name?: string;
    onUpload: (files: UploadedFile[]) => void;
    uploadText?: string;
    maxFile?: string;
    multiple?: boolean;
    accept?: string;
    defaultFiles?: string[];
}

const FileUploader: React.FC<FileUploaderProps> = ({
    label,
    id,
    name,
    onUpload,
    uploadText = "Select a file or drag and drop here",
    maxFile = "JPG orPNG , file size no more than 10MB",
    multiple = false,
    accept = "image/*",
    defaultFiles = [],
}) => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [defaultPreviews, setDefaultPreviews] = useState<string[]>(defaultFiles);

    const handleChange = (event: InputChangeEvent) => {
        const selectedFiles = Array.from(event.target.files || []);

        const newFiles: UploadedFile[] = selectedFiles.map((file) => ({
            name: file.name,
            type: file.type,
            size: file.size,
            file: file,
            preview: URL.createObjectURL(file)
        }));

        const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
        setFiles(updatedFiles);
        onUpload(updatedFiles);

        // Clear default previews when new files are selected
        if (newFiles.length > 0) {
            setDefaultPreviews([]);
        }
    };

    const handleDelete = (index: number) => {
        const fileToDelete = files[index];
        // Clean up the preview URL to prevent memory leaks
        URL.revokeObjectURL(fileToDelete.preview);

        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        onUpload(updatedFiles);
    };

    const handleDeleteDefault = (index: number) => {
        const updatedDefaults = defaultPreviews.filter((_, i) => i !== index);
        setDefaultPreviews(updatedDefaults);
    };

    return (
        <div>
            <Field
                label={label}
                uploadText={uploadText}
                maxFile={maxFile}
            >
                <input
                    id={id}
                    type="file"
                    name={name}
                    className="form-control"
                    onChange={handleChange}
                    multiple={multiple}
                    accept={accept}
                />
            </Field>

            {/* Show default files */}
            {defaultPreviews?.length > 0 && (
                <div className="selected-image mt-3">
                    {defaultPreviews?.map((preview, index) => (
                        <div className="image" key={`default-${index}`}>
                            <Button
                                className="cross"
                                type="button"
                                onClick={() => handleDeleteDefault(index)}
                            >
                                <LuX />
                            </Button>
                            <img src={preview} alt="Default preview" />
                        </div>
                    ))}
                </div>
            )}

            {/* Show uploaded files */}
            {files.length > 0 && (
                <div className="selected-image mt-3">
                    {files.map((file, index) => (
                        <div className="image" key={`uploaded-${index}`}>
                            <Button
                                className="cross"
                                type="button"
                                onClick={() => handleDelete(index)}
                            >
                                <LuX />
                            </Button>

                            {file.type.startsWith("image/") ? (
                                <img
                                    src={file.preview}
                                    alt={file.name}
                                    title={`${file.name} (${(file.size / 1024).toFixed(1)} KB)`}
                                />
                            ) : (
                                <span title={`${file.name} (${(file.size / 1024).toFixed(1)} KB)`}>
                                    {file.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUploader;
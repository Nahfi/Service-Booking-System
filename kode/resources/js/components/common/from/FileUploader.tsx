import React, { useEffect, useMemo, useState } from "react";
import { LuX } from "react-icons/lu";
import type { InputChangeEvent } from "../../../utils/types";
import Button from "../button/Button";
import Field from "./Field";

export interface UploadedFile {
    name: string;
    type: string;
    data: string | ArrayBuffer | null;
}

interface FileUploaderProps {
    label?: string;
    onUpload: (files: UploadedFile[]) => void;
    inputNote?: string;
    uploadText?: string;
    maxFile?: string;
    multiple?: boolean;
    accept?: string;
    defaultFiles?: (string | File)[];
}

const FileUploader: React.FC<FileUploaderProps> = ({
    label,
    onUpload,
    inputNote,
    uploadText,
    maxFile,
    multiple = false,
    accept = "image/*",
    defaultFiles = [],
}) => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    const defaultFilesKey = useMemo(() => {
        return JSON.stringify(
            defaultFiles.map((file) =>
                typeof file === "string" ? file : file.name
            )
        );
    }, [defaultFiles]);

    useEffect(() => {
        const formatted = defaultFiles.length
            ? defaultFiles.map((file) => {
                  if (typeof file === "string") {
                      return {
                          name: "default",
                          type: "image/jpeg",
                          data: file,
                      };
                  } else {
                      return {
                          name: file.name,
                          type: file.type,
                          data: URL.createObjectURL(file),
                      };
                  }
              })
            : [];

        // Compare new formatted files with current files
        const prevFilesKey = JSON.stringify(files.map((file) => file.name));
        const newFilesKey = JSON.stringify(formatted.map((file) => file.name));

        // Only update state and call onUpload if files have changed
        if (prevFilesKey !== newFilesKey) {
            setFiles(formatted);
            onUpload(formatted);
        }
    }, [defaultFilesKey, onUpload]);

    const handleChange = (event: InputChangeEvent) => {
        const selectedFiles = Array.from(event.target.files || []);
        const readers = selectedFiles.map((file) => {
            return new Promise<UploadedFile>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve({
                        name: file.name,
                        type: file.type,
                        data: reader.result,
                    });
                };
                reader.readAsDataURL(file);
            });
        });

        Promise.all(readers).then((results) => {
            const updated = multiple ? [...files, ...results] : results;
            setFiles(updated);
            onUpload(updated);
        });
    };

    const handleDelete = (index: number) => {
        const updated = files.filter((_, i) => i !== index);
        setFiles(updated);
        onUpload(updated);
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
                    onChange={handleChange}
                    multiple={multiple}
                    accept={accept}
                />
            </Field>

            {files.length > 0 && (
                <div className="selected-image mt-3">
                    {files.map((file, index) => (
                        <div className="image" key={index}>
                            <Button
                                className="cross"
                                type="button"
                                onClick={() => handleDelete(index)}
                            >
                                <LuX/>
                            </Button>

                            {file.type.startsWith("image/") ? (
                                <img
                                    src={file.data as string}
                                    alt={file.name}
                                />
                            ) : (
                                <span>{file.name}</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUploader;

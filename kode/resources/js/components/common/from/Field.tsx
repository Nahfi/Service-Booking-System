
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { FaCloudUploadAlt } from "react-icons/fa";

import { Link } from "react-router-dom";
import { valueToKey } from "../../../utils/helper";

interface LabelLink {
    href: string;
    text: string;
}

interface FieldProps {
    children: ReactElement;
    label?: string;
    labelLink?: LabelLink;
    htmlFor?: string;
    error?: string | null;
    inputNote?: string;
    required?: boolean;
    uploadText?: string;
    maxFile?: string;
    className?: string;
}

const Field: React.FC<FieldProps> = ({
    children,
    label,
    labelLink,
    htmlFor,
    error,
    inputNote,
    required=false,
    uploadText,
    maxFile,
    className = "",
}) => {
    const id = htmlFor || getChildId(children);

    const childProps = children.props || {};
    const inputType = childProps.type;
    const childType = children.type;

    const isCheckbox = inputType === "checkbox";
    const isRadio = inputType === "radio";
    const isTextarea = childType === "textarea";
    const isFileInput = inputType === "file";

    const { t } = useTranslation();

    return (
        <div
            className={`form-inner ${className ? className : ""} ${
                isRadio ? "radio-wrapper" : ""
            } `}
        >
            {isCheckbox || isRadio ? (
                <div
                    className={`input-wrapper d-flex align-items-center gap-2 ${
                        isCheckbox ? "checkbox-wrapper" : "radio-wrapper"
                    }`}
                >
                    {children}
                    {label && (
                        <label
                            htmlFor={id}
                            className="form-label mb-0 fw-normal"
                        >
                            {t(valueToKey(label), label)}
                            {labelLink && (
                                <Link to={labelLink.href} className="ms-1">
                                    {labelLink.text}
                                </Link>
                            )}
                            {required && (
                                <span className="text-danger ms-1">*</span>
                            )}
                        </label>
                    )}
                </div>
            ) :
                isFileInput ? (
                <div className="file-input-wrapper">
                    {label && (
                        <label htmlFor={id} className="form-label">
                            {t(valueToKey(label), label)}
                            {labelLink && (
                                <Link to={labelLink.href} className="ms-1">
                                    {labelLink.text}
                                </Link>
                            )}
                            {required && (
                                <span className="text-danger ms-1">*</span>
                            )}
                        </label>
                    )}
                    <div className="file-input">
                            <FaCloudUploadAlt size={36} />
                            <div>
                                <p>{uploadText || "Drag your file(s) or Browse"}</p>
                                {maxFile && <span className="mt-1">{maxFile}</span>}
                            </div>
                    </div>
                    {children}
                </div>
                )
                    :
                    (
                <>
                    {label && (
                        <label htmlFor={id} className="form-label">
                            {t(valueToKey(label), label)}
                            {labelLink && (
                                <Link to={labelLink.href} className="ms-1">
                                    {labelLink.text}
                                </Link>
                            )}
                            {required && (
                                <span className="text-danger ms-1">*</span>
                            )}
                        </label>
                    )}
                    {children}
                </>
            )}

            {!!error && (
                <div role="alert" className="text-danger fs-13 mt-1">
                    {error}
                </div>
            )}

            {inputNote && (
                <span className="fs-14 mt-2 d-block">{inputNote}</span>
            )}
        </div>
    );
};

const getChildId = (children: ReactElement): string | undefined => {
    const child = React.Children.only(children);
    const childProps = child?.props as Record<string, any>;
    
    if ("id" in childProps) {
      return childProps?.id;
    }
    
    return undefined;
  };

export default Field;

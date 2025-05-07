import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

import { Link } from "react-router-dom";

const Field = ({
  children,
  label,
  labelLink,
  htmlFor,
  error,
  inputNote,
  required,
  uploadText,
  maxFile,
}) => {
  const id = htmlFor || getChildId(children);

  const isCheckbox = React.Children.only(children).props.type === "checkbox";
  const isRadio = React.Children.only(children).props.type === "radio";
  const isTextarea = React.Children.only(children).type === "textarea";
  const isFileInput = React.Children.only(children).props.type === "file";

  return (
    <div className={`form-inner ${isRadio ? "radio-wrapper" : ""}`}>
      {isCheckbox || isRadio ? (
        <div
          className={`input-wrapper d-flex align-items-center gap-2 ${
            isCheckbox ? "checkbox-wrapper" : "radio-wrapper"
          }`}
        >
          {children}
          {label && (
            <label htmlFor={id} className="form-label mb-0 fw-normal">
              {label}{" "}
              {labelLink && (
                <Link to={labelLink.href} className="ms-1">
                  {labelLink.text}
                </Link>
              )}
              {required && <span className="text-danger ms-1">*</span>}
            </label>
          )}
        </div>
      ) : isFileInput ? (
        <div className="file-input-wrapper">
          {label && (
            <label htmlFor={id} className="form-label">
              {label}{" "}
              {labelLink && (
                <Link to={labelLink.href} className="ms-1">
                  {labelLink.text}
                </Link>
              )}
              {required && <span className="text-danger ms-1">*</span>}
            </label>
          )}
          <div className="file-input">
            <FaCloudUploadAlt size={40} />
            <p>{uploadText}</p>
            <span className="fs-11 mt-1">{maxFile}</span>
          </div>
          {children}
        </div>
      ) : (
        <>
          {label && (
            <label htmlFor={id} className="form-label">
              {label}
              {labelLink && (
                <Link to={labelLink.href} className="ms-1">
                  {labelLink.text}
                </Link>
              )}
              {required && <span className="text-danger ms-1">*</span>}
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

      {inputNote && <span className="fs-14 mt-2 d-block">{inputNote}</span>}
    </div>
  );
};

const getChildId = (children) => {
  const child = React.Children.only(children);
  if ("id" in child?.props) {
    return child.props.id;
  }
};

export default Field;






import type React from "react";
import Button from "../../button/Button";

import type { ButtonClickEvent } from "@/utils/types";

interface DeleteModalProps {
    isLoading?: boolean;
    onDelete: (e?: ButtonClickEvent) => void;
    onHide: () => void;
    message?: string;
    description?: string;
     buttonLabel?: string;
    type?: "Confirm" | "Delete" | string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ ...props }) => {
    const {
        isLoading,
        onDelete,
        onHide,
        message = "",
        description = "",
        buttonLabel="",
        type = "",
    } = props;

    return (
        <div className="text-center">
            <div>
                <h3 className="fs-20 mb-2 fw-600">
                    {message || `Delete this record`}
                </h3>
                <p className="text-muted fs-14">{description || `Do You Want To Delete this Records?`}</p>
            </div>

            <div className="d-flex align-items-center justify-content-center gap-3 mt-5">
                <Button
                    className="i-btn btn--dark btn--lg outline rounded-3"
                    disabled={isLoading}
                    onClick={() => {
                        onHide();
                    }}
                >
                    Cancel
                </Button>

                <Button
                    className={`i-btn btn--${
                        type === "Confirm" ? "info" : "danger"
                    } btn--lg rounded-3`}
                    disabled={isLoading}
                    isLoading={isLoading}
                    onClick={onDelete}
                >
                    {buttonLabel || `Delete`}
                </Button>
            </div>
        </div>
    );
};

export default DeleteModal;

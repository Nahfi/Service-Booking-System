
import React, { ReactNode } from "react";

import Modal, { type ModalProps } from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { LuX } from "react-icons/lu";
import { valueToKey } from "../../../utils/helper";
import Button from "../button/Button";
import "./modal.scss";

interface ModalWrapperProps extends Omit<ModalProps, "children"> {
    title?: string;
    children?: ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, title, onHide, animation = false, ...props }) => {
        const { t } = useTranslation()
        
        return (
            <Modal
                {...props}
                onHide={onHide}
                aria-labelledby="modal-wrapper"
                animation={animation}
            >
                <Modal.Header>
                    <Modal.Title>{t(valueToKey(title), title)}</Modal.Title>
                    <Button
                        iconBtn={true}
                        icon={LuX}
                        className="dark-soft btn-ghost circle hover btn-sm fs-20"
                        onClick={onHide}
                    />
                </Modal.Header>

                <Modal.Body>{children}</Modal.Body>
            </Modal>
        );
    }

export default ModalWrapper;

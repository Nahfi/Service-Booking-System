
import { forwardRef } from "react";
import Modal from "react-bootstrap/Modal";
import { LuX } from "react-icons/lu";
import Button from "../button/Button";
import "./modal.scss";

const ModalWrapper = forwardRef(
  ({ children, title, onHide,show,...props }, ref) => {
    // const modalRef = useRef();

    return (
      <Modal
        {...props}
        // ref={modalRef}
        show={show}
        onHide={onHide}
        aria-labelledby="modal-wrapper"
        animation={false}
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
          <Button
            iconBtn={true}
            icon={LuX}
            className="dark-soft btn-ghost circle hover btn-sm"
            onClick={onHide}
          />
        </Modal.Header>

        <Modal.Body>{children}</Modal.Body>
      </Modal>
    );
  }
);

export default ModalWrapper;

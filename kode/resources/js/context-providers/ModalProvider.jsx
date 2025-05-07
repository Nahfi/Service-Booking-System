
import React, { useCallback, useState } from "react";
import { ModalContext } from "../context";
 const ModalProvider = ({ children }) => {
//   const modalRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "",
    title: "",
    size: "",
    data: null,
  });

  const openModal = useCallback((type, title, size, data = null) => {
    setModalConfig({ type, title, size, data });
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setModalConfig({ type: "", title: "", size: "", data: null });
  }, []);

  return (
    <ModalContext.Provider
      value={{ showModal, modalConfig, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider
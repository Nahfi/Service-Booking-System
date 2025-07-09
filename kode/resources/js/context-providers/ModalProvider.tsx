
import React, { ReactNode, useCallback, useState } from "react";
import { ModalContext } from "../context";
import type { ModalConfigType } from "../utils/types";


// Define the context value shape
interface ModalProviderProps {
    children: ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalConfig, setModalConfig] = useState<ModalConfigType>({
        modalUid: "",
        type: "",
        title: "",
        size: "",
        data: null,
    });
    

    const openModal = useCallback(
        (
            modalUid: string,
            type: string,
            title: string,
            size: string,
            data: any | null = null
        ) => {
            setModalConfig({ modalUid, type, title, size, data });
            setShowModal(true);
        },
        []
    );

    const closeModal = useCallback(() => {
        setShowModal(false);
        setModalConfig({ modalUid:"", type: "", title: "", size: "", data: null });
    }, []);

    return (
        <ModalContext.Provider
            value={{ showModal, modalConfig, openModal, closeModal }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;

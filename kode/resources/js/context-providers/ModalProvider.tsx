
import React, { ReactNode, useCallback, useState } from "react";
import { ModalContext } from "../context";

// Define the shape of modalConfig
interface ModalConfig {
    type: string;
    title: string;
    size: string;
    data: any | null;
}

// Define the context value shape
interface ModalContextType {
    showModal: boolean;
    modalConfig: ModalConfig;
    openModal: (
        type: string,
        title: string,
        size: string,
        data?: any | null
    ) => void;
    closeModal: () => void;
}

interface ModalProviderProps {
    children: ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalConfig, setModalConfig] = useState<ModalConfig>({
        type: "",
        title: "",
        size: "",
        data: null,
    });

    const openModal = useCallback(
        (
            type: string,
            title: string,
            size: string,
            data: any | null = null
        ) => {
            setModalConfig({ type, title, size, data });
            setShowModal(true);
        },
        []
    );

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

export default ModalProvider;

import React, { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ModalWrapper, { DeleteModal } from "../../../../components/common/modal";
import { ModalContext } from "../../../../context";
import type { ModalContextType } from "../../../../utils/types";
import "./chat-wrapper.scss";
import ChatBody from "./components/chat-body/ChatBody";
import ChatContacts from "./components/chat-contact/ChatContacts";
import ChatLoader from "./components/chat-loader/ChatLoader";
import ChatProfile from "./components/chat-profile/ChatProfile";
import EmptyChat from "./components/empty-chat/EmptyChat";
import AddNote from "./components/modals/AddNote";
import ChooseTemplate from "./components/modals/ChooseTemplate";

const WhatsappChat: React.FC = () => {
    const [showContact, setShowContact] = useState<boolean>(true);
    const [showProfile, setShowProfile] = useState<boolean>(false);
    const isXXLDown = useMediaQuery({ query: "(max-width: 1399.98px)" });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [chatInit, setChatInit] = useState<boolean>(true);

    const { showModal, modalConfig, openModal, closeModal } = useContext(
        ModalContext
    ) as ModalContextType;

    const handleShowContact = () => {
        setShowContact((prev) => prev = true);
    };
    const handleHideContact = () => {
        setShowContact((prev) => prev = false);
    };

    const handleShowProfile = () => {
        if (isXXLDown) setShowProfile((show) => !show);
    };

    const handleHideProfile = () => {
        if (isXXLDown) {
            setShowProfile(false);
        }
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    return (
        <>
            <div className="whatsapp-chat-wrapper">
                <div className="row g-0">
                    <ChatContacts
                        contactAction={{
                            handleHideContact,
                            showContact,
                            handleSelectUser,
                        }}
                    />

                    {selectedUser === null ? (
                        <EmptyChat />
                    ) : isLoading ? (
                        <ChatLoader />
                    ) : (
                        <>
                            <ChatBody
                                chatActions={{
                                    handleShowContact,
                                    handleShowProfile,
                                    openModal,
                                }}
                                user={selectedUser}
                            />
                            <ChatProfile
                                profileAction={{
                                    handleHideProfile,
                                    showProfile,
                                    openModal,
                                }}
                                user={selectedUser}
                            />
                        </>
                    )}
                </div>
            </div>

            <ModalWrapper
                title={modalConfig?.title}
                onHide={closeModal}
                show={showModal}
                size={modalConfig?.size}
                scrollable
                centered
            >
                {(modalConfig?.type === "ADD_NOTE" ||
                    modalConfig?.type === "EDIT_NOTE") && (
                    <AddNote onHide={closeModal} />
                )}

                {modalConfig?.type === "CHOOSE_TEMPLATE" && (
                    <ChooseTemplate onHide={closeModal} />
                )}

                {modalConfig?.type === "DELETE" && (
                    <DeleteModal onHide={closeModal} />
                )}
            </ModalWrapper>
        </>
    );
};

export default WhatsappChat;

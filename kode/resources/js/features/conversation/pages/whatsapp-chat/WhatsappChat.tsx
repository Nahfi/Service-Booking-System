import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import ModalWrapper, { DeleteModal } from "../../../../components/common/modal";
import { useModal } from "../../../../context";
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

    const [newChat, setNewChat] = useState<boolean>(false);

    const { showModal, modalConfig, openModal, closeModal } = useModal() as ModalContextType;
    const modalUid = "whatsappChatModal";

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

    const handleShowNewChat = () => {
        setNewChat(true);
    }

    const handleHideNewChat = () => {
        setNewChat(false);
    };

    const handleSelectTemplate = () => {
        handleSelectUser(modalConfig?.data);
        closeModal();
        handleHideNewChat();
    }
    
    return (
        <>
            <div className="whatsapp-chat-wrapper">
                <div className="row g-0">
                    <ChatContacts
                        contactAction={{
                            handleHideContact,
                            showContact,
                            handleSelectUser,
                            newChatAction: { handleShowNewChat, handleHideNewChat, newChat },
                            modal: { openModal, modalUid },
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
                                    modal: { openModal, modalUid },
                                }}
                                user={selectedUser}
                            />
                            <ChatProfile
                                profileAction={{
                                    handleHideProfile,
                                    showProfile,
                                    modal: { openModal, modalUid },
                                }}
                                user={selectedUser}
                            />
                        </>
                    )}
                </div>
            </div>

            {showModal && modalConfig?.modalUid === modalUid && (
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
                        <ChooseTemplate onHide={closeModal} onTemplateSubmit={handleSelectTemplate} />
                    )}

                    {modalConfig?.type === "DELETE" && (
                        <DeleteModal onHide={closeModal} />
                    )}
                </ModalWrapper>
            )}
        </>
    );
};

export default WhatsappChat;

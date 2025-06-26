import React, { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ModalWrapper, { DeleteModal } from "../../../../components/common/modal";
import { ModalContext } from "../../../../context";
import type { ModalContextType } from "../../../../utils/types";

import { useLocation } from "react-router";
import "./chat-wrapper.scss";
import ChatBody from "./components/chat-body/ChatBody";
import ChatContacts from "./components/chat-contact/ChatContacts";
import ChatProfile from "./components/chat-profile/ChatProfile";
import AddNote from "./components/modals/AddNote";
import AddUser from "./components/modals/AddUser";



const ChatWrapper: React.FC = () => {

  const location = useLocation();
  const pathValue = location.pathname.split("/").pop();

  const [showContact, setShowContact] = useState<boolean>(true);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const isXXLDown = useMediaQuery({ query: "(max-width: 1399.98px)" });

  const { showModal, modalConfig, openModal, closeModal } = useContext(ModalContext) as ModalContextType;

  const handleShowContact = () => {
    setShowContact((show) => !show);
  };

  const handleHideContact = () => {
    setShowContact(false);
  };

  const handleShowProfile = () => {
    if (isXXLDown) setShowProfile((show) => !show);
  };

  const handleHideProfile = () => {
    if (isXXLDown) {
      setShowProfile(false);
    }
  };

  return (
      <>
          <div className="chat-wrapper">
              <div className="row g-0">
                  <ChatContacts
                      contactAction={{ handleHideContact, openModal }}
                      type={pathValue}
                  />
                  <ChatBody
                      onHandle={{ handleShowContact, handleShowProfile }}
                      type={pathValue}
                  />
                  <ChatProfile
                      profileAction={{
                          handleHideProfile,
                          showProfile,
                          openModal,
                      }}
                      type={pathValue}
                  />
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

              {modalConfig?.type === "DELETE" && (
                  <DeleteModal onHide={closeModal} />
              )}

              {modalConfig?.type === "ADD_USER" && (
                  <AddUser onHide={closeModal} />
              )}
          </ModalWrapper>
      </>
  );
};

export default ChatWrapper;

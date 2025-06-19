import React, { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ModalWrapper from "../../../../components/common/modal";
import { ModalContext } from "../../../../context";
import type { ModalContextType } from "../../../../utils/types";

import "./chat-wrapper.scss";
import ChatBody from "./components/chat-body/ChatBody";
import ChatContacts from "./components/chat-contact/ChatContacts";
import ChatProfile from "./components/chat-profile/ChatProfile";



const ChatWrapper: React.FC = () => {
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
                  <ChatContacts contactAction={{ handleHideContact }} />
                  <ChatBody onHandle={{ handleShowContact, handleShowProfile }}/>
                  <ChatProfile profileAction={{ handleHideProfile, showProfile }}
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
              {/* <AddNote onModalClose={closeModal} /> */}
          </ModalWrapper>
      </>
  );
};

export default ChatWrapper;

import React, { useContext, useMemo, useState } from "react";
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
import AddUser from "./components/modals/AddUser";


const ChatWrapper: React.FC = () => {

    const pathValue = useMemo(() => {
        return location.pathname.split("/").pop() || "";
    }, [location.pathname]);
    const isXXLDown = useMediaQuery({ query: "(max-width: 1399.98px)" });

  const [showContact, setShowContact] = useState<boolean>(true);
    const [showProfile, setShowProfile] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const [selectedUser, setSelectedUser] = useState(null);
 
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
    
  const handleSelectUser = (user) => {
      setSelectedUser(user);
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
      }, 1000);
   }

  return (
      <>
          <div className="chat-wrapper">
              <div className="row g-0">
                  <ChatContacts
                      contactAction={{
                          handleHideContact,
                          handleSelectUser,
                          openModal,
                      }}
                      type={pathValue}
                  />

                  {selectedUser === null ? (
                      <EmptyChat />
                  ) : isLoading ? (
                      <ChatLoader/>
                  ) : (
                      <>
                          <ChatBody
                              onHandle={{
                                  handleShowContact,
                                  handleShowProfile,
                              }}
                              type={pathValue}
                              user={selectedUser}
                          />
                          <ChatProfile
                              profileAction={{
                                  handleHideProfile,
                                  showProfile,
                                  openModal,
                              }}
                              type={pathValue}
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

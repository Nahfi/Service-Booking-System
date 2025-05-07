import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import ChatBody from "./chat-body/ChatBody";
import ChatContacts from "./chat-contact/ChatContacts";
import ChatProfile from "./chat-profile/ChatProfile";
import "./chat-wrapper.scss";

const ChatWrapper = () => {
  const [showContact, setShowContact] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const isXXLDown = useMediaQuery({ query: "(max-width: 1399.98px)" });

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
    <div className="chat-wrapper">
      <div className="row g-0">
        <ChatContacts contactAction={{ handleHideContact,   }} />
        <ChatBody onHandle={{ handleShowContact, handleShowProfile }} />
        <ChatProfile profileAction={{ handleHideProfile, showProfile }} />
      </div>
    </div>
  );
};

export default ChatWrapper;

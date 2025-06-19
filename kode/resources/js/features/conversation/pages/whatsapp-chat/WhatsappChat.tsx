import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import ChatBody from "./chat-body/ChatBody";
import ChatContacts from "./chat-contact/ChatContacts";
import ChatProfile from "./chat-profile/ChatProfile";
import "./chat-wrapper.scss";

const WhatsappChat: React.FC = () => {
    const [showContact, setShowContact] = useState<boolean>(true);
    const [showProfile, setShowProfile] = useState<boolean>(false);
    const isXXLDown = useMediaQuery({ query: "(max-width: 1399.98px)" });

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

    return (
        <div className="whatsapp-chat-wrapper">
            <div className="row g-0">
                <ChatContacts
                    contactAction={{ handleHideContact, showContact }}
                />
                <ChatBody
                    onHandle={{
                        handleShowContact,
                        handleShowProfile,
                    }}
                />
                <ChatProfile
                    profileAction={{ handleHideProfile, showProfile }}
                />
            </div>
        </div>
    );
};

export default WhatsappChat;

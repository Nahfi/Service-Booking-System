import type React from "react";

import userOne from "@/assets/images/user/user-1.png";
const ContactItem: React.FC = ({
    contact,
    handleSelectUser,
    handleHideContact,
}) => {
    return (
        <div
            key={contact.id}
            className={`contact-link ${contact?.id === 1 ? "active" : ""}`}
            onClick={() => {
                handleSelectUser(contact);
                handleHideContact();
            }}
        >
            <div
                className={`contact-item ${
                    contact.status === "unread" ? "unread" : ""
                }`}
            >
                <div className="contact-info">
                    <div className="contact-avatar">
                        <img src={userOne} alt="" />
                        <span
                            className={`online-status ${
                                contact.isOnline ? "text-success" : ""
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                            >
                                <circle cx="5.5" cy="5" r="5" fill="#fff" />
                                <circle
                                    cx="5.49967"
                                    cy="5.00065"
                                    r="4.16667"
                                    fill="currentColor"
                                />
                            </svg>
                        </span>
                    </div>
                    <div>
                        <h6 className="line-clamp-1">{contact.name}</h6>
                        <p className="mt-1 line-clamp-1">{contact.message}</p>
                    </div>
                </div>
                <div className="text-end flex-shrink-0">
                    <div className="d-flex align-items-end flex-column">
                        <p className="fs-12 mb-1">{contact.time}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactItem
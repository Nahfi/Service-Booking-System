import { Dropdown } from 'react-bootstrap';
import { LuArchiveX, LuBan, LuBellOff, LuChevronDown, LuHeart, LuMessageSquareDot, LuPin, LuTrash2 } from 'react-icons/lu';

import userOne from "@/assets/images/user/user-1.png";

const ContactItem = ({
    contact,
    onContactHide,
    onSelectUser,
    themeSettings,
}) => {
    console.log(contact);
    
    return (
        <div
            className={`contact-link ${contact?.id === 1 ? "active" : ""}`}
            onClick={() => {
                onSelectUser(contact);
                onContactHide();
            }}
        >
            <div
                className={`contact-item ${
                    contact.isUnread ? "unread" : ""
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
                        <Dropdown className="icon-dropdown contact-item-dropdown">
                            <Dropdown.Toggle
                                id={`contact-dropdown-${contact.id}`}
                                className="icon-btn fs-20 bg-transparent p-0"
                            >
                                <LuChevronDown className="text-muted" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                align={themeSettings.dir === "ltr" ? "end" : ""}
                            >
                                <div className="dropdown-content">
                                    <Dropdown.Item as={"button"}>
                                        <LuArchiveX /> Archive chat
                                    </Dropdown.Item>
                                    <Dropdown.Item as={"button"}>
                                        <LuBellOff /> Mute notifications
                                    </Dropdown.Item>
                                    <Dropdown.Item as={"button"}>
                                        <LuPin /> Pin Chat
                                    </Dropdown.Item>
                                    <Dropdown.Item as={"button"}>
                                        <LuMessageSquareDot /> Mark as unread
                                    </Dropdown.Item>
                                    <Dropdown.Item as={"button"}>
                                        <LuHeart /> Add to favourites
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item as={"button"}>
                                        <LuBan /> Block
                                    </Dropdown.Item>
                                    <Dropdown.Item as={"button"}>
                                        <LuTrash2 /> Delete chat
                                    </Dropdown.Item>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactItem
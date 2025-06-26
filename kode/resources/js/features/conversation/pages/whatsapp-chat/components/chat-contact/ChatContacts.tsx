import { useContext, useEffect, useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import { LuChevronDown, LuMessageSquarePlus, LuSearch, LuX } from "react-icons/lu";
import { Link } from "react-router-dom";

import userOne from "@/assets/images/user/user-1.png";
import Button from "@/components/common/button/Button";
import SpinnerLoader from "@/components/common/loader/SpinnerLoader";
import { ThemeContext } from "@/context";
import type { ThemeContextType } from "../../../../../../utils/types";
import EmptyContact from "../../../chat/components/chat-contact/EmptyContact";
import "./chat-contact.scss";

interface ChatContactsProps {
    contactAction: {
        handleHideContact: () => void;
        showContact: boolean;
    };
}

const contactsData = Array.from({ length: 0 }).map((_, ind) => ({
    id: ind,
    name: `Jane Doe ${ind + 1}`,
    message: "Hi, I want to make enquiries",
    time: "12:55 am",
    isOnline: ind % 2 === 0,
    type: ind % 3 === 0 ? "SMS" : "CHAT",
    isUnread: ind % 2 === 1,
    isFavorite: ind % 3 === 0,
    isGroup: ind % 4 === 0,
}));

const tabMenu = ["all", "unread", "favorite", "groups"];

const ChatContacts: React.FC<ChatContactsProps> = ({ contactAction }) => {
    const { handleHideContact, showContact } = contactAction;
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredContacts, setFilteredContacts] = useState(contactsData);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { themeSettings } = useContext(ThemeContext) as ThemeContextType;

    useEffect(() => {
        setIsLoading(true);
        const debounceTimer = setTimeout(() => {
            if (searchQuery.trim() === "") {
                setFilteredContacts(contactsData);
            } else {
                const lowerQuery = searchQuery.toLowerCase();
                setFilteredContacts(
                    contactsData.filter(
                        (contact) =>
                            contact.name.toLowerCase().includes(lowerQuery) ||
                            contact.message.toLowerCase().includes(lowerQuery)
                    )
                );
            }
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    const handleClearSearch = () => {
        setSearchQuery("");
        setFilteredContacts(contactsData);
    };

    const filterContactsByTab = (tabKey) => {
        switch (tabKey) {
            case "unread":
                return filteredContacts.filter((contact) => contact.isUnread);
            case "favorite":
                return filteredContacts.filter((contact) => contact.isFavorite);
            case "groups":
                return filteredContacts.filter((contact) => contact.isGroup);
            default:
                return filteredContacts;
        }
    };

    return (
        <div className={`col-auto chat-contacts ${showContact ? "show" : ""}`}>
            <Tab.Container id="contact-tab" defaultActiveKey="1">
                <div className="chat-header contact-header gap-2">
                    <h6>Whatsapp</h6>
                    <div className="flex-shrink-0">
                        <div className="d-flex align-items-center gap-1">
                            <Button
                                iconBtn={true}
                                icon={LuMessageSquarePlus}
                                tooltipText="New Chat"
                                className="dark-soft btn-ghost btn-sm fs-18 circle"
                            />
                        </div>
                    </div>
                </div>

                <div className="whatsapp-tab">
                    <Tab.Container
                        id="whatsapp-contact-tab-container"
                        defaultActiveKey="all"
                    >
                        <div className="whatsapp-contact-tab-container">
                            {filteredContacts?.length > 0 ? (
                                <>
                                    <div className="px-3 py-2">
                                        <div className="contact-search">
                                            <div className="px-2 flex-shrink-0">
                                                <LuSearch className="fs-18" />
                                            </div>
                                            <input
                                                type="text"
                                                className="flex-grow-1"
                                                placeholder="Search contacts..."
                                                value={searchQuery}
                                                onChange={(e) =>
                                                    setSearchQuery(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {searchQuery && (
                                                <Button
                                                    iconBtn={true}
                                                    icon={LuX}
                                                    className="fs-16 text-danger"
                                                    onClick={handleClearSearch}
                                                />
                                            )}
                                        </div>

                                        <div className="mt-2">
                                            <Nav
                                                variant="pills"
                                                className="whatsapp-contact-tab"
                                            >
                                                {tabMenu?.map((menu) => (
                                                    <Nav.Item key={menu}>
                                                        <Nav.Link
                                                            as="button"
                                                            eventKey={menu}
                                                        >
                                                            <span className="text-capitalize">
                                                                {menu}
                                                            </span>
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                ))}
                                            </Nav>
                                        </div>
                                    </div>

                                    <div className="contact-wrapper scroll scroll-3">
                                        {isLoading ? (
                                            <div className="loader-container py-5 d-flex align-items-center justify-content-center flex-column gap-3 px-3">
                                                <SpinnerLoader size={"lg"} />
                                                <p className="text-muted">
                                                    Searching...
                                                </p>
                                            </div>
                                        ) : (
                                            <Tab.Content>
                                                {tabMenu?.map((tabKey) => (
                                                    <Tab.Pane
                                                        key={tabKey}
                                                        eventKey={tabKey}
                                                        transition={true}
                                                    >
                                                        <div className="contact-list">
                                                            {filterContactsByTab(
                                                                tabKey
                                                            ).length > 0 ? (
                                                                filterContactsByTab(
                                                                    tabKey
                                                                ).map(
                                                                    (
                                                                        contact,
                                                                        ind
                                                                    ) => (
                                                                        <Link
                                                                            to="#"
                                                                            key={
                                                                                contact.id
                                                                            }
                                                                            className={`contact-link ${
                                                                                ind ===
                                                                                1
                                                                                    ? "active"
                                                                                    : ""
                                                                            }`}
                                                                            onClick={
                                                                                handleHideContact
                                                                            }
                                                                        >
                                                                            <div className="contact-item">
                                                                                <div className="contact-info">
                                                                                    <div className="contact-avatar">
                                                                                        <img
                                                                                            src={
                                                                                                userOne
                                                                                            }
                                                                                            alt=""
                                                                                        />
                                                                                        <span
                                                                                            className={`online-status ${
                                                                                                contact.isOnline
                                                                                                    ? "text-success"
                                                                                                    : ""
                                                                                            }`}
                                                                                        >
                                                                                            <svg
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                width="10"
                                                                                                height="10"
                                                                                                viewBox="0 0 10 10"
                                                                                                fill="none"
                                                                                            >
                                                                                                <circle
                                                                                                    cx="5.5"
                                                                                                    cy="5"
                                                                                                    r="5"
                                                                                                    fill="#fff"
                                                                                                />
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
                                                                                        <h6 className="line-clamp-1">
                                                                                            {
                                                                                                contact.name
                                                                                            }
                                                                                        </h6>
                                                                                        <p className="mt-1 line-clamp-1">
                                                                                            {
                                                                                                contact.message
                                                                                            }
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="text-end flex-shrink-0">
                                                                                    <div className="d-flex align-items-end flex-column">
                                                                                        <p className="fs-12 mb-1">
                                                                                            {
                                                                                                contact.time
                                                                                            }
                                                                                        </p>
                                                                                        <Dropdown className="icon-dropdown contact-item-dropdown">
                                                                                            <Dropdown.Toggle
                                                                                                id={`contact-dropdown-${contact.id}`}
                                                                                                className="icon-btn fs-20 bg-transparent p-0"
                                                                                            >
                                                                                                <LuChevronDown className="text-muted" />
                                                                                            </Dropdown.Toggle>
                                                                                            <Dropdown.Menu
                                                                                                align={
                                                                                                    themeSettings.dir ===
                                                                                                    "ltr"
                                                                                                        ? "end"
                                                                                                        : ""
                                                                                                }
                                                                                            >
                                                                                                <div className="dropdown-content">
                                                                                                    <Dropdown.Item>
                                                                                                        New
                                                                                                        Group
                                                                                                    </Dropdown.Item>
                                                                                                    <Dropdown.Item>
                                                                                                        Archived
                                                                                                    </Dropdown.Item>
                                                                                                    <Dropdown.Item>
                                                                                                        Starred
                                                                                                        message
                                                                                                    </Dropdown.Item>
                                                                                                    <Dropdown.Item>
                                                                                                        Select
                                                                                                        chats
                                                                                                    </Dropdown.Item>
                                                                                                </div>
                                                                                            </Dropdown.Menu>
                                                                                        </Dropdown>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    )
                                                                )
                                                            ) : (
                                                                <div className="px-3 py-5 fs-18 text-center text-muted">
                                                                    No{" "}
                                                                    {tabKey ===
                                                                    "all" ? (
                                                                        <b>
                                                                            {
                                                                                searchQuery
                                                                            }
                                                                        </b>
                                                                    ) : (
                                                                        tabKey
                                                                    )}{" "}
                                                                    found
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Tab.Pane>
                                                ))}
                                            </Tab.Content>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <EmptyContact />
                            )}
                        </div>
                    </Tab.Container>
                </div>
            </Tab.Container>
        </div>
    );
};

export default ChatContacts;

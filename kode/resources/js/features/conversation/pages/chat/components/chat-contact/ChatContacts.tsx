

import { useContext, useEffect, useRef, useState } from "react";

import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";

import Button from "@/components/common/button/Button";
import { ThemeContext } from "@/context";

import { useTranslation } from "react-i18next";
import { LuSearch, LuUserPlus, LuX } from "react-icons/lu";
import SpinnerLoader from "../../../../../../components/common/loader/SpinnerLoader";
import { keyToValue, valueToKey } from "../../../../../../utils/helper";
import type {
    OpenModalFn,
    ThemeContextType
} from "../../../../../../utils/types";
import "./chat-contact.scss";
import ContactItem from "./ContactItem";
import DeviceSetup from "./DeviceSetup";
import EmptyContact from "./EmptyContact";

interface Contact {
    id: number;
    name: string;
    message: string;
    time: string;
    isOnline: boolean;
    type: "SMS" | "CHAT";
    status: "read" | "unread";
}

interface ChatContactsProps {
    contactAction: {
        handleHideContact: () => void;
        showContact: boolean;
        openModal: OpenModalFn;
    };
    type: string;
}


const contactsData: Contact[] = Array.from({ length: 8 }).map((_, ind) => ({
    id: ind,
    name: `Jane Doe ${ind + 1}`,
    message: "Hi, I want to make enquiries",
    time: "12:55 am",
    isOnline: ind % 2 === 0,
    type: ind % 3 === 0 ? "SMS" : "CHAT",
    status: ind % 2 === 0 ? "read" : "unread",
}));

const tabMenus = ["all", "read", "unread"];


const ChatContacts: React.FC<ChatContactsProps> = ({
    contactAction,
    type,
}) => {
    const { handleHideContact, showContact,handleSelectUser,modal } =
        contactAction;
  
    
    const { t } = useTranslation();

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedSim, setSelectedSim] = useState<string | null>(null);

    const handleSelectSim = (gateway: string, sim: string) => {
        setSelectedSim(`${gateway}: ${sim}`);
    };

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const { themeSettings } = useContext(ThemeContext) as ThemeContextType;

    const getFilteredAndSearchedContacts = (tabKey: string) => {
        let filtered = contactsData;

        if (searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (contact) =>
                    contact.name.toLowerCase().includes(lowerQuery) ||
                    contact.message.toLowerCase().includes(lowerQuery)
            );
        }

        switch (tabKey) {
            case "read":
                return filtered.filter((contact) => contact.status === "read");
            case "unread":
                return filtered.filter(
                    (contact) => contact.status === "unread"
                );
            default:
                return filtered;
        }
    };

    useEffect(() => {
        if (searchQuery.trim() !== "") {
            setIsLoading(true);
            const debounceTimer = setTimeout(() => {
                setIsLoading(false);
            }, 300);

            return () => clearTimeout(debounceTimer);
        }
    }, [searchQuery]);

    const handleClearSearch = () => {
        setSearchQuery("");
    };

    return (
        <div
            className="col-auto chat-contacts"
            style={{
                transform: showContact ? "translateX(0)" : "",
            }}
        >
            <Tab.Container id="contact-tab" defaultActiveKey={"all"}>
                <div className="chat-header contact-header gap-2">
                    <Nav variant="pills" className="contact-tab">
                        {tabMenus.map((menu) => (
                            <Nav.Item key={menu}>
                                <Nav.Link as={Button} eventKey={menu}>
                                    {t(valueToKey(menu), keyToValue(menu))}
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>

                    <div className="flex-shrink-0">
                        <div className="d-flex align-items-center gap-1">
                            <Button
                                iconBtn={true}
                                icon={LuUserPlus}
                                tooltipText="Add user"
                                className="dark-soft btn-ghost btn-sm fs-18 circle"
                                onClick={() =>
                                    modal.openModal(modal.modalUid,"ADD_USER", "Add User", "md")
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="contact-tab-content">
                    {contactsData?.length > 0 ? (
                        <>
                            <div className="px-3 py-2">
                                {type === "sms" && (
                                    <div className="d-flex align-items-center justify-content-between gap-3 mb-2">
                                        <h6 className="fs-14">Choose Device</h6>
                                        <DeviceSetup/>
                                    </div>
                                )}

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
                                            setSearchQuery(e.target.value)
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
                            </div>

                            {isLoading ? (
                                <div className="loader-container py-5 d-flex align-items-center justify-content-center flex-column gap-3 px-3">
                                    <SpinnerLoader size={"lg"} />
                                    <p className="text-muted">Searching...</p>
                                </div>
                            ) : (
                                <Tab.Content>
                                    {tabMenus?.map((tabKey) => (
                                        <Tab.Pane
                                            key={tabKey}
                                            eventKey={tabKey}
                                            transition={true}
                                        >
                                            <div className="contact-menu scroll scroll-3 scroll-hover">
                                                <div className="contact-list">
                                                    {(() => {
                                                        const filteredContacts =
                                                            getFilteredAndSearchedContacts(
                                                                tabKey
                                                            );
                                                        return filteredContacts.length >
                                                            0 ? (
                                                            filteredContacts.map(
                                                                (
                                                                    contact,
                                                                    ind
                                                                ) => (
                                                                    <ContactItem
                                                                        contact={
                                                                            contact
                                                                        }
                                                                        handleSelectUser={
                                                                            handleSelectUser
                                                                        }
                                                                        handleHideContact={
                                                                            handleHideContact
                                                                        }
                                                                    />
                                                                )
                                                            )
                                                        ) : (
                                                            <div className="px-3 py-5 fs-18 text-center text-muted">
                                                                No{" "}
                                                                {tabKey ===
                                                                "all" ? (
                                                                    searchQuery ? (
                                                                        <>
                                                                            results
                                                                            for{" "}
                                                                            <b>
                                                                                {
                                                                                    searchQuery
                                                                                }
                                                                            </b>
                                                                        </>
                                                                    ) : (
                                                                        "contacts"
                                                                    )
                                                                ) : (
                                                                    `${tabKey} contacts`
                                                                )}{" "}
                                                                found
                                                            </div>
                                                        );
                                                    })()}
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                    ))}
                                </Tab.Content>
                            )}
                        </>
                    ) : (
                        <EmptyContact openModal={openModal} />
                    )}
                </div>
            </Tab.Container>
        </div>
       
    );
};

export default ChatContacts;
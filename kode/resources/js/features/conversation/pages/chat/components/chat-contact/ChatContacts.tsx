// import { useContext, useEffect, useRef, useState } from "react";

// import Nav from "react-bootstrap/Nav";
// import Tab from "react-bootstrap/Tab";

// import userOne from "@/assets/images/user/user-1.png";
// import Button from "@/components/common/button/Button";
// import { ThemeContext } from "@/context";

// import { Dropdown, DropdownButton } from "react-bootstrap";
// import { useTranslation } from "react-i18next";
// import { LuSearch, LuUserPlus, LuX } from "react-icons/lu";
// import SpinnerLoader from "../../../../../../components/common/loader/SpinnerLoader";
// import { keyToValue, valueToKey } from "../../../../../../utils/helper";
// import type { OpenModalFn, ThemeContextType } from "../../../../../../utils/types";
// import "./chat-contact.scss";
// import EmptyContact from "./EmptyContact";


// interface Contact {
//     id: number;
//     name: string;
//     message: string;
//     time: string;
//     isOnline: boolean;
//     type: "SMS" | "CHAT";
//     isUnread: boolean;
//     isRead: boolean;
// }
// interface ChatContactsProps {
//     contactAction: {
//         handleHideContact: () => void;
//         showContact: boolean;
//         openModal: OpenModalFn;
//     };
//     type: string;
// }


// const contactsData: Contact[] = Array.from({ length: 12 }).map((_, ind) => ({
//     id: ind,
//     name: `Jane Doe ${ind + 1}`,
//     message: "Hi, I want to make enquiries",
//     time: "12:55 am",
//     isOnline: ind % 2 === 0,
//     type: ind % 3 === 0 ? "SMS" : "CHAT",
//     isUnread: ind % 3 === 1,
//     isRead: ind % 2 === 0,
// }));

// const tabMenus = ["all", "read", "unread"];

// const devices = {
//     devise_one: ["sim_one", "sim_two"],
//     devise_two: ["sim_one", "sim_two"],
//     devise_three: [],
//     devise_four: ["sim_one", "sim_two"],
// };

// const ChatContacts: React.FC<ChatContactsProps> = ({ contactAction, type }) => {
//     const { handleHideContact, showContact, openModal } = contactAction;

//     const { t } = useTranslation();

//     const [searchQuery, setSearchQuery] = useState<string>("");
//     const [filteredContacts, setFilteredContacts] = useState(contactsData);
//     const [isLoading, setIsLoading] = useState<boolean>(false);

//     const [selectedSim, setSelectedSim] = useState(null);

//     const handleSelectSim = (gateway, sim) => {
//         setSelectedSim(`${gateway}: ${sim}`);
//     };
//     const dropdownRef = useRef<HTMLDivElement | null>(null);

//     const { themeSettings } = useContext(ThemeContext) as ThemeContextType;

//     useEffect(() => {
//         setIsLoading(true);
//         const debounceTimer = setTimeout(() => {
//             if (searchQuery.trim() === "") {
//                 setFilteredContacts(contactsData);
//             } else {
//                 const lowerQuery = searchQuery.toLowerCase();
//                 setFilteredContacts(
//                     contactsData.filter(
//                         (contact) =>
//                             contact.name.toLowerCase().includes(lowerQuery) ||
//                             contact.message.toLowerCase().includes(lowerQuery)
//                     )
//                 );
//             }
//             setIsLoading(false);
//         }, 300);

//         return () => clearTimeout(debounceTimer);
//     }, [searchQuery]);

//     const handleClearSearch = () => {
//         setSearchQuery("");
//         setFilteredContacts(contactsData);
//     };

//     const filterContactsByTab = (tabKey) => {
//         switch (tabKey) {
//             case "read":
//                 return filteredContacts.filter((contact) => contact.isRead);
//             case "unread":
//                 return filteredContacts.filter((contact) => contact.isUnread);
//             default:
//                 return filteredContacts;
//         }
//     };

//     return (
//         <div
//             className="col-auto chat-contacts"
//             style={{
//                 transform: showContact ? "translateX(0)" : "",
//             }}
//         >
//             <Tab.Container id="contact-tab" defaultActiveKey={"all"}>
//                 <div className="chat-header contact-header gap-2">
//                     <Nav variant="pills" className="contact-tab">
//                         {tabMenus.map((menu) => (
//                             <Nav.Item key={menu}>
//                                 <Nav.Link as={Button} eventKey={menu}>
//                                     {t(valueToKey(menu), keyToValue(menu))}
//                                 </Nav.Link>
//                             </Nav.Item>
//                         ))}
//                     </Nav>

//                     <div className="flex-shrink-0">
//                         <div className="d-flex align-items-center gap-1">
//                             <Button
//                                 iconBtn={true}
//                                 icon={LuUserPlus}
//                                 tooltipText="Add user"
//                                 className="dark-soft btn-ghost btn-sm fs-18 circle"
//                                 onClick={() =>
//                                     openModal("ADD_USER", "Add User", "md")
//                                 }
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="contact-tab-content ">
//                     {filteredContacts?.length > 0 ? (
//                         <>
//                             <div className="px-3 py-2">
//                                 {type === "sms" && (
//                                     <div className="d-flex align-items-center justify-content-between gap-3 mb-2">
//                                         <h6 className="fs-14">Choose Device</h6>

//                                         <DropdownButton
//                                             id="gateway-dropdown"
//                                             title={
//                                                 selectedSim || "Choose Device"
//                                             }
//                                             aria-label="Choose Device"
//                                             className="gateway-dropdown"
//                                             ref={dropdownRef}
//                                             autoClose="outside"
//                                             variant="primary"
//                                         >
//                                             {Object.entries(devices).map(
//                                                 ([gateway, sims], index) => (
//                                                     <Dropdown.Item
//                                                         as="div"
//                                                         key={`${gateway}-${index}`}
//                                                         className="p-0 w-100 nested-dropdown"
//                                                     >
//                                                         <DropdownButton
//                                                             id={`sim-dropdown-${gateway}`}
//                                                             title={keyToValue(
//                                                                 gateway
//                                                             )}
//                                                             className="w-100"
//                                                             variant="light"
//                                                             autoClose="outside"
//                                                         >
//                                                             {sims.map((sim) => (
//                                                                 <Dropdown.Item
//                                                                     as="button"
//                                                                     key={`${gateway}-${sim}`}
//                                                                     onClick={() =>
//                                                                         handleSelectSim(
//                                                                             gateway,
//                                                                             sim
//                                                                         )
//                                                                     }
//                                                                     className="py-2"
//                                                                 >
//                                                                     {sim}
//                                                                 </Dropdown.Item>
//                                                             ))}
//                                                         </DropdownButton>
//                                                     </Dropdown.Item>
//                                                 )
//                                             )}
//                                         </DropdownButton>
//                                     </div>
//                                 )}

//                                 <div className="contact-search">
//                                     <div className="px-2 flex-shrink-0">
//                                         <LuSearch className="fs-18" />
//                                     </div>
//                                     <input
//                                         type="text"
//                                         className="flex-grow-1"
//                                         placeholder="Search contacts..."
//                                         value={searchQuery}
//                                         onChange={(e) =>
//                                             setSearchQuery(e.target.value)
//                                         }
//                                     />
//                                     {searchQuery && (
//                                         <Button
//                                             iconBtn={true}
//                                             icon={LuX}
//                                             className="fs-16 text-danger"
//                                             onClick={handleClearSearch}
//                                         />
//                                     )}
//                                 </div>
//                             </div>

//                             {isLoading ? (
//                                 <div className="loader-container py-5 d-flex align-items-center justify-content-center flex-column gap-3 px-3">
//                                     <SpinnerLoader size={"lg"} />
//                                     <p className="text-muted">Searching...</p>
//                                 </div>
//                             ) : (
//                                 <Tab.Content>
//                                     {tabMenus?.map((tabKey) => (
//                                         <Tab.Pane
//                                             key={tabKey}
//                                             eventKey={tabKey}
//                                             transition={true}
//                                         >
//                                             <div className="contact-menu scroll scroll-3 scroll-hover">
//                                                 <div className="contact-list">
//                                                     {filterContactsByTab(tabKey)
//                                                         .length > 0 ? (
//                                                         filterContactsByTab(
//                                                             tabKey
//                                                         ).map(
//                                                             (contact, ind) => (
//                                                                 <div
//                                                                     key={
//                                                                         contact.id
//                                                                     }
//                                                                     className={`contact-link ${
//                                                                         ind ===
//                                                                         1
//                                                                             ? "active"
//                                                                             : ""
//                                                                     }`}
//                                                                     onClick={
//                                                                         handleHideContact
//                                                                     }
//                                                                 >
//                                                                     <div
//                                                                         className={`contact-item ${
//                                                                             contact?.isUnread
//                                                                                 ? "unread"
//                                                                                 : ""
//                                                                         }`}
//                                                                     >
//                                                                         <div className="contact-info">
//                                                                             <div className="contact-avatar">
//                                                                                 <img
//                                                                                     src={
//                                                                                         userOne
//                                                                                     }
//                                                                                     alt=""
//                                                                                 />
//                                                                                 <span
//                                                                                     className={`online-status ${
//                                                                                         contact.isOnline
//                                                                                             ? "text-success"
//                                                                                             : ""
//                                                                                     }`}
//                                                                                 >
//                                                                                     <svg
//                                                                                         xmlns="http://www.w3.org/2000/svg"
//                                                                                         width="10"
//                                                                                         height="10"
//                                                                                         viewBox="0 0 10 10"
//                                                                                         fill="none"
//                                                                                     >
//                                                                                         <circle
//                                                                                             cx="5.5"
//                                                                                             cy="5"
//                                                                                             r="5"
//                                                                                             fill="#fff"
//                                                                                         />
//                                                                                         <circle
//                                                                                             cx="5.49967"
//                                                                                             cy="5.00065"
//                                                                                             r="4.16667"
//                                                                                             fill="currentColor"
//                                                                                         />
//                                                                                     </svg>
//                                                                                 </span>
//                                                                             </div>
//                                                                             <div>
//                                                                                 <h6 className="line-clamp-1">
//                                                                                     {
//                                                                                         contact.name
//                                                                                     }
//                                                                                 </h6>
//                                                                                 <p className="mt-1 line-clamp-1">
//                                                                                     {
//                                                                                         contact.message
//                                                                                     }
//                                                                                 </p>
//                                                                             </div>
//                                                                         </div>
//                                                                         <div className="text-end flex-shrink-0">
//                                                                             <div className="d-flex align-items-end flex-column">
//                                                                                 <p className="fs-12 mb-1">
//                                                                                     {
//                                                                                         contact.time
//                                                                                     }
//                                                                                 </p>
//                                                                             </div>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             )
//                                                         )
//                                                     ) : (
//                                                         <div className="px-3 py-5 fs-18 text-center text-muted">
//                                                             No{" "}
//                                                             {tabKey ===
//                                                             "all" ? (
//                                                                 <b>
//                                                                     {
//                                                                         searchQuery
//                                                                     }
//                                                                 </b>
//                                                             ) : (
//                                                                 tabKey
//                                                             )}{" "}
//                                                             found
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </Tab.Pane>
//                                     ))}
//                                 </Tab.Content>
//                             )}
//                         </>
//                     ) : (
//                         <EmptyContact />
//                     )}
//                 </div>
//             </Tab.Container>
//         </div>
//     );
// };

// export default ChatContacts;


import { useContext, useEffect, useRef, useState } from "react";

import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";

import userOne from "@/assets/images/user/user-1.png";
import Button from "@/components/common/button/Button";
import { ThemeContext } from "@/context";

import { useTranslation } from "react-i18next";
import { LuSearch, LuUserPlus, LuX } from "react-icons/lu";
import SpinnerLoader from "../../../../../../components/common/loader/SpinnerLoader";
import { keyToValue, valueToKey } from "../../../../../../utils/helper";
import type {
    OpenModalFn,
    ThemeContextType,
} from "../../../../../../utils/types";
import "./chat-contact.scss";
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

const devices = {
    devise_one: ["sim_one", "sim_two"],
    devise_two: ["sim_one", "sim_two"],
    devise_three: [],
    devise_four: ["sim_one", "sim_two"],
};

const ChatContacts: React.FC<ChatContactsProps> = ({
    contactAction,
    type,
}) => {
    const { handleHideContact, showContact,handleSelectUser, openModal } =
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
                                    openModal("ADD_USER", "Add User", "md")
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

                                        {/* <DropdownButton
                                            id="gateway-dropdown"
                                            title={
                                                selectedSim || "Choose Device"
                                            }
                                            aria-label="Choose Device"
                                            className="gateway-dropdown"
                                            ref={dropdownRef}
                                            autoClose="outside"
                                            variant="primary"
                                        >
                                            {Object.entries(devices).map(
                                                ([gateway, sims], index) => (
                                                    <Dropdown.Item
                                                        as="div"
                                                        key={`${gateway}-${index}`}
                                                        className="p-0 w-100 nested-dropdown"
                                                    >
                                                        <DropdownButton
                                                            id={`sim-dropdown-${gateway}`}
                                                            title={keyToValue(
                                                                gateway
                                                            )}
                                                            className="w-100"
                                                            variant="light"
                                                            autoClose="outside"
                                                        >
                                                            {sims.map((sim) => (
                                                                <Dropdown.Item
                                                                    as="button"
                                                                    key={`${gateway}-${sim}`}
                                                                    onClick={() =>
                                                                        handleSelectSim(
                                                                            gateway,
                                                                            sim
                                                                        )
                                                                    }
                                                                    className="py-2"
                                                                >
                                                                    {sim}
                                                                </Dropdown.Item>
                                                            ))}
                                                        </DropdownButton>
                                                    </Dropdown.Item>
                                                )
                                            )}
                                        </DropdownButton> */}

                                        {/* <div class="device-setup">
                                            <div>Device-1</div>
                                            <ul className="device-setup">
                                                <li>Profile</li>
 
                                                <li class="sub-drop">
                                                    <a href="#"> Team</a>
                                                    <ul>
                                                        <li>
                                                            <a href="#">
                                                                 Developers
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                 Designers
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                 Marketers
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                 Accountants
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div> */}
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
                                                                    <div
                                                                        key={
                                                                            contact.id
                                                                        }
                                                                        className={`contact-link ${
                                                                            ind ===
                                                                            1
                                                                                ? "active"
                                                                                : ""
                                                                        }`}
                                                                        onClick={() => {
                                                                            handleSelectUser(
                                                                                contact
                                                                            );
                                                                            handleHideContact();
                                                                        }}
                                                                    >
                                                                        <div
                                                                            className={`contact-item ${
                                                                                contact.status ===
                                                                                "unread"
                                                                                    ? "unread"
                                                                                    : ""
                                                                            }`}
                                                                        >
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
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
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
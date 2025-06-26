import { useContext, useRef, useState } from "react";

import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import { Link } from "react-router-dom";

import userOne from "@/assets/images/user/user-1.png";
import Button from "@/components/common/button/Button";
import { ThemeContext } from "@/context";

import { Dropdown, DropdownButton } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LuSearch, LuUserPlus, LuX } from "react-icons/lu";
import { keyToValue, valueToKey } from "../../../../../../utils/helper";
import type { OpenModalFn, ThemeContextType } from "../../../../../../utils/types";
import "./chat-contact.scss";

interface ChatContactsProps {
    contactAction: {
        handleHideContact: () => void;
        showContact: boolean;
        openModal: OpenModalFn;
    };
    type: string;
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

const tabMenus = ["all", "read", "unread"];

const devises = {
    devise_one: ["sim_one", "sim_two"],
    devise_two: ["sim_one", "sim_two"],
    devise_three: [],
    devise_four: ["sim_one", "sim_two"],
};

const ChatContacts: React.FC<ChatContactsProps> = ({ contactAction, type }) => {
    const { handleHideContact, showContact, openModal } = contactAction;

    const { t } = useTranslation();

    const [showSearch, setShowSearch] = useState<boolean>(true);

    const [selectedSim, setSelectedSim] = useState(null);

    const handleSelectSim = (gateway, sim) => {
        setSelectedSim(`${gateway}: ${sim}`);
    };
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const { themeSettings } = useContext(ThemeContext) as ThemeContextType;


    // const handleSelectSim = (event: React.MouseEvent<HTMLElement>) => {
    //     setSim(event.target.innerText);
    //     if (dropdownRef?.current) {
    //         dropdownRef?.current?.click();
    //     }
    //     event?.stopPropagation();
    // };

    return (
        <div
            className="col-auto chat-contacts"
            style={{
                transform: showContact ? "translateX(0)" : "",
            }}
        >
            <Tab.Container id="contact-tab" defaultActiveKey={tabMenus[0]}>
                <div className="chat-header contact-header gap-2">
                    <Nav variant="pills" className="contact-tab">
                        {tabMenus.map((menu) => (
                            <Nav.Item>
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

                            {/* <Dropdown className="icon-dropdown">
                                <Dropdown.Toggle
                                    id="dropdown-5"
                                    className="icon-btn dark-soft btn-sm btn-ghost circle fs-18 p-0"
                                >
                                    <BsThreeDotsVertical />
                                </Dropdown.Toggle>

                                <Dropdown.Menu
                                    align={`${
                                        themeSettings.dir === "ltr" ? "end" : ""
                                    }`}
                                >
                                    <div className="dropdown-content">
                                        <Dropdown.Item>New Group</Dropdown.Item>
                                        <Dropdown.Item>Archived</Dropdown.Item>
                                        <Dropdown.Item>
                                            Starred message
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            Select chats
                                        </Dropdown.Item>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown> */}
                        </div>
                    </div>
                </div>

                <div className="contact-tab-content scroll scroll-3">
                    <div className="px-3 py-2">
                        {type === "sms" && (
                            <div className="d-flex align-items-center justify-content-between gap-3 mb-2">
                                <h6 className="fs-14">Choose Device</h6>

                                {/* <DeviceSetup /> */}

                                {/* <DropdownButton
                                    id="gateway-dropdown"
                                    title={sim || "Choose Device"}
                                    aria-label="Choose Device"
                                    className="gateway-dropdown"
                                    ref={dropdownRef}
                                    autoClose="outside"
                                >
                                    <div className="dropdown-content">
                                        {Object.entries(devises).map(
                                            ([key, value], ind) => (
                                                <Dropdown.Item
                                                    as={"button"}
                                                    key={`${key}-${ind}`}
                                                    onClick={handleSelectSim}
                                                    className="p-0 w-100"
                                                >
                                                    <DropdownButton
                                                        id="sim-dropdown"
                                                        title={keyToValue(key)}
                                                        className="gateway-dropdown w-100"
                                                    >
                                                        {value.map((sim) => (
                                                            <Dropdown.Item
                                                                as="button"
                                                                key={`${key}-${sim}`}
                                                            >
                                                                {sim}
                                                            </Dropdown.Item>
                                                        ))}
                                                    </DropdownButton>
                                                </Dropdown.Item>
                                            )
                                        )}
                                    </div>
                                </DropdownButton> */}

                                <DropdownButton
                                    id="gateway-dropdown"
                                    title={selectedSim || "Choose Device"}
                                    aria-label="Choose Device"
                                    className="gateway-dropdown"
                                    ref={dropdownRef}
                                    autoClose="outside"
                                    variant="primary"
                                >
                                    {Object.entries(devises).map(
                                        ([gateway, sims], index) => (
                                            <Dropdown.Item
                                                as="div"
                                                key={`${gateway}-${index}`}
                                                className="p-0 w-100 nested-dropdown"
                                            >
                                                <DropdownButton
                                                    id={`sim-dropdown-${gateway}`}
                                                    title={keyToValue(gateway)}
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
                                </DropdownButton>
                            </div>
                        )}

                        <div>
                            <div className="contact-search">
                                <div className="px-2 flex-shrink-0">
                                    <LuSearch className="fs-18" />
                                </div>
                                <input
                                    type="text"
                                    className="flex-grow-1"
                                    placeholder="Search contacts..."
                                    // value={searchQuery}
                                    // onChange={(e) =>
                                    //     setSearchQuery(
                                    //         e.target.value
                                    //     )
                                    // }
                                />

                                <Button
                                    iconBtn={true}
                                    icon={LuX}
                                    className="fs-16 text-danger"
                                    // onClick={handleClearSearch}
                                />
                            </div>
                        </div>
                    </div>

                    <Tab.Content>
                        {tabMenus.map((menu) => (
                            <Tab.Pane eventKey={menu} transition={true}>
                                <div className="contact-list">
                                    {Array.from({ length: 7 }).map((_, ind) => (
                                        <Link
                                            to="#"
                                            key={ind}
                                            className={`contact-link ${
                                                ind === 1 ? "active" : ""
                                            }`}
                                            onClick={handleHideContact}
                                        >
                                            <div className="contact-item">
                                                <div className="contact-info">
                                                    <div className="contact-avatar">
                                                        <img
                                                            src={userOne}
                                                            alt=""
                                                        />
                                                        <span className="online-status">
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
                                                            Jane Doe
                                                        </h6>
                                                        <p className="mt-1 line-clamp-1">
                                                            Hi, i want make
                                                            enquiries
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="text-end flex-shrink-0">
                                                    <span className="i-badge pill info-soft fs-10">
                                                        SMS
                                                    </span>
                                                    <p className="fs-12 mt-1">
                                                        12.55 am
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </Tab.Pane>
                        ))}
                    </Tab.Content>
                </div>
            </Tab.Container>
        </div>
    );
};

export default ChatContacts;

import { useContext, useRef, useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import { LuMessageSquarePlus } from "react-icons/lu";
import { Link } from "react-router-dom";

import userOne from "@/assets/images/user/user-1.png";
import Button from "@/components/common/button/Button";
import { ThemeContext } from "@/context";
import { BsThreeDotsVertical } from "react-icons/bs";

import type { ThemeContextType } from "../../../../../../utils/types";
import "./chat-contact.scss";

interface ChatContactsProps {
    contactAction: {
        handleHideContact: () => void;
        showContact: boolean;
    };
}

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

const ChatContacts: React.FC<ChatContactsProps> = ({ contactAction }) => {

    const { handleHideContact, showContact } = contactAction;
    const [showSearch, setShowSearch] = useState<boolean>(true);
    const [sim, setSim] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const { themeSettings } = useContext(ThemeContext) as ThemeContextType;

    const handleSelectSim = (event: React.MouseEvent<HTMLElement>) => {
        setSim(event.target.innerText);
        if (dropdownRef?.current) {
            dropdownRef?.current?.click(); // Force close the dropdown
        }
        event?.stopPropagation();
    };

    return (
        <div
            className="col-auto chat-contacts"
            style={{
                transform: showContact ? "translateX(0)" : "",
            }}
        >
            <Tab.Container id="contact-tab" defaultActiveKey="1">
                <div className="chat-header contact-header gap-2">
                    <Nav variant="pills" className="contact-tab">
                        <Nav.Item>
                            <Nav.Link as={Button} eventKey="1">
                                All
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link as={Button} eventKey="2">
                                Read
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link as={Button} eventKey="3">
                                Unread
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <div className="flex-shrink-0">
                        <div className="d-flex align-items-center gap-1">
                            <Button
                                iconBtn={true}
                                tooltipText="New Chat"
                                icon={LuMessageSquarePlus}
                                className="dark-soft btn-sm btn-ghost circle fs-20 p-0"
                            ></Button>

                            <Dropdown className="icon-dropdown">
                                <Dropdown.Toggle
                                    id="dropdown-5"
                                    className="icon-btn dark-soft btn-sm btn-ghost circle fs-20 p-0"
                                >
                                    <BsThreeDotsVertical />
                                </Dropdown.Toggle>

                                <Dropdown.Menu
                                    align={`${themeSettings.dir === "ltr" ? "end" : ""
                                        }`}
                                >
                                    <ul className="dropdown-content">
                                        <li className="d-xxl-none">
                                            <Dropdown.Item>
                                                New Group
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                Archived
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                Starred message
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                Select chats
                                            </Dropdown.Item>
                                        </li>
                                    </ul>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>

                <div className="contact-tab-content scroll scroll-3">
                    <div className="d-flex align-items-center justify-content-between gap-3 mx-3 my-2">
                        <h6>Choose Gateway</h6>
                        <DropdownButton
                            id="gateway-dropdown"
                            title={sim || "Choose SIM"}
                            aria-label="Choose SIM"
                            className="gateway-dropdown"
                            ref={dropdownRef}
                        >
                            <div className="dropdown-content">
                                {Array.from({ length: 3 }).map((_, ind) => (
                                    <Dropdown.Item
                                        key={ind}
                                        eventKey={ind}
                                        onClick={handleSelectSim}
                                    >
                                        {`SIM ${ind}`}
                                    </Dropdown.Item>
                                ))}
                            </div>
                        </DropdownButton>
                    </div>

                    <Tab.Content>
                        <Tab.Pane eventKey="1" transition={true}>
                            <div className="contact-list">
                                {Array.from({ length: 7 }).map((_, ind) => (
                                    <Link
                                        to="#"
                                        key={ind}
                                        className={`contact-link ${ind === 1 ? "active" : ""
                                            }`}
                                        onClick={handleHideContact}
                                    >
                                        <div className="contact-item">
                                            <div className="contact-info">
                                                <div className="contact-avatar">
                                                    <img src={userOne} alt="" />
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

                        <Tab.Pane eventKey="2" transition={true}>
                            <div className="contact-list">
                                {Array.from({ length: 6 }).map((_, ind) => (
                                    <Link
                                        to="#"
                                        key={ind}
                                        className={`contact-link ${ind === 3 ? "active" : ""
                                            }`}
                                        onClick={handleHideContact}
                                    >
                                        <div className="contact-item">
                                            <div className="contact-info">
                                                <div className="contact-avatar">
                                                    <img src={userOne} alt="" />
                                                    <span className="online-status text-success">
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
                                                <span className="i-badge pill success-soft fs-10">
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

                        <Tab.Pane eventKey="3" transition={true}>
                            <div className="contact-list">
                                {Array.from({ length: 10 }).map((_, ind) => (
                                    <Link
                                        to="#"
                                        key={ind}
                                        className={`contact-link ${ind === 0 ? "active" : ""
                                            }`}
                                        onClick={handleHideContact}
                                    >
                                        <div className="contact-item">
                                            <div className="contact-info">
                                                <div className="contact-avatar">
                                                    <img src={userOne} alt="" />
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
                                                <span className="i-badge pill dark-soft fs-10">
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
                    </Tab.Content>
                </div>
            </Tab.Container>
        </div>
    );
};

export default ChatContacts;

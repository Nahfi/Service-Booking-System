import { useContext, useRef, useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import { LuArrowLeft, LuChevronDown, LuMessageSquarePlus } from "react-icons/lu";
import { Link } from "react-router-dom";

import userOne from "@/assets/images/user/user-1.png";
import Button from "@/components/common/button/Button";
import { ThemeContext } from "@/context";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./chat-contact.scss";

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

const ChatContacts = ({ contactAction }) => {
    const { handleHideContact, showContact } = contactAction;
    const [showSearch, setShowSearch] = useState(true);
    const [sim, setSim] = useState(null);
    const dropdownRef = useRef(null);

    const { themeSettings } = useContext(ThemeContext);

    const handleSelectSim = (event) => {
        setSim(event.target.innerText);
        if (dropdownRef.current) {
            dropdownRef.current.click();
        }
        event.stopPropagation();
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
                    {/* <Nav variant="pills" className="contact-tab">
                        <Nav.Item>
                            <Nav.Link eventKey="1">All</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link eventKey="2">Read</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link eventKey="3">Unread</Nav.Link>
                        </Nav.Item>
                    </Nav> */}

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
                                    align={`${
                                        themeSettings.dir === "ltr" ? "end" : ""
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

                <div className="whatsapp-tab">
                    <Tab.Container
                        id="whatsapp-contact-tab-container"
                        defaultActiveKey="all"
                    >
                        <div className="whatsapp-contact-tab-container">
                            <div className="px-3 py-2">
                                <div className="contact-search">
                                    <div className="px-2 flex-shrink-0">
                                        <Button
                                            iconBtn={true}
                                            icon={LuArrowLeft}
                                            className="fs-22 text-success"
                                        />
                                    </div>
                                    <input
                                        type="search"
                                        className="flex-grow-1"
                                        placeholder="Search"
                                    />
                                </div>

                                <div className="mt-2">
                                    <Nav
                                        variant="pills"
                                        className="whatsapp-contact-tab"
                                    >
                                        <Nav.Item>
                                            <Nav.Link
                                                as={Button}
                                                eventKey="all"
                                            >
                                                All
                                            </Nav.Link>
                                        </Nav.Item>

                                        <Nav.Item>
                                            <Nav.Link
                                                as={Button}
                                                eventKey="unread"
                                            >
                                                Unread
                                            </Nav.Link>
                                        </Nav.Item>

                                        <Nav.Item>
                                            <Nav.Link
                                                as={Button}
                                                eventKey="favorite"
                                            >
                                                Favorite
                                            </Nav.Link>
                                        </Nav.Item>

                                        <Nav.Item>
                                            <Nav.Link
                                                as={Button}
                                                eventKey="groups"
                                            >
                                                Groups
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                            </div>

                            <div className="contact-wrapper scroll scroll-3">
                                <Tab.Content>
                                    <Tab.Pane eventKey="all" transition={true}>
                                        <div className="contact-list">
                                            {Array.from({ length: 7 }).map(
                                                (_, ind) => (
                                                    <Link
                                                        to="#"
                                                        key={ind}
                                                        className={`contact-link ${
                                                            ind === 1
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
                                                                        Hi, i
                                                                        want
                                                                        make
                                                                        enquiries
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="text-end flex-shrink-0">
                                                                <div className="d-flex align-items-end flex-column">
                                                                    <p className="fs-12 mb-1">
                                                                        12.55 am
                                                                    </p>
                                                                    <Dropdown className="icon-dropdown contact-item-dropdown">
                                                                        <Dropdown.Toggle
                                                                            id="contact-dropdown"
                                                                            className="icon-btn fs-20 bg-transparent p-0"
                                                                        >
                                                                            <LuChevronDown className="text-muted" />
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu
                                                                            align={`${
                                                                                themeSettings.dir ===
                                                                                "ltr"
                                                                                    ? "end"
                                                                                    : ""
                                                                            }`}
                                                                        >
                                                                            <ul className="dropdown-content">
                                                                                <li className="d-xxl-none">
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
                                                                                </li>
                                                                            </ul>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    </Tab.Pane>

                                    <Tab.Pane
                                        eventKey="unread"
                                        transition={true}
                                    >
                                        <div className="contact-list">
                                            {Array.from({ length: 6 }).map(
                                                (_, ind) => (
                                                    <Link
                                                        to="#"
                                                        key={ind}
                                                        className={`contact-link ${
                                                            ind === 3
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
                                                                        Hi, i
                                                                        want
                                                                        make
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
                                                )
                                            )}
                                        </div>
                                    </Tab.Pane>

                                    <Tab.Pane
                                        eventKey="favorite"
                                        transition={true}
                                    >
                                        <div className="contact-list">
                                            {Array.from({ length: 10 }).map(
                                                (_, ind) => (
                                                    <Link
                                                        to="#"
                                                        key={ind}
                                                        className={`contact-link ${
                                                            ind === 0
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
                                                                        Hi, i
                                                                        want
                                                                        make
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
                                                )
                                            )}
                                        </div>
                                    </Tab.Pane>

                                    <Tab.Pane
                                        eventKey="groups"
                                        transition={true}
                                    >
                                        <div className="contact-list">
                                            {Array.from({ length: 10 }).map(
                                                (_, ind) => (
                                                    <Link
                                                        to="#"
                                                        key={ind}
                                                        className={`contact-link ${
                                                            ind === 0
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
                                                                        Hi, i
                                                                        want
                                                                        make
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
                                                )
                                            )}
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </div>
                        </div>
                    </Tab.Container>
                </div>
            </Tab.Container>
        </div>
    );
};

export default ChatContacts;

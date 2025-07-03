import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {
    BsArrowLeft,
    BsBan,
    BsThreeDotsVertical,
    BsTrash3,
    BsVolumeMute,
} from "react-icons/bs";
import { LuUser } from "react-icons/lu";
import { useTheme } from "../../../../../../context";
import "./chat-body.scss";
import ChatComposer from "./ChatComposer";
import Message from "./Message";

import whatsappBackground from "@/assets/images/bg/whatsapp-bg.webp";
import Button from "@/components/common/button/Button";
import type { ThemeContextType } from "../../../../../../utils/types";

const ChatBody = ({ chatActions }) => {
    const { handleShowContact, handleShowProfile, modal } = chatActions;
    const { themeSettings } = useTheme() as ThemeContextType;
    const [template, setTemplate] = useState(null);


    return (
        <div className="col chat-body fade-in">
            <div className="chat-body-bg">
                <img src={whatsappBackground} className="whatsapp-bg-image" />
            </div>

            <div className="chat-header chat-body-header">
                <div className="d-flex align-items-center gap-2">
                    <Button
                        className="dark-soft btn-md bg--transparent circle fs-20 d-md-none flex-shrink-0"
                        onClick={handleShowContact}
                    >
                        <BsArrowLeft />
                    </Button>

                    <h6 role="button" onClick={handleShowProfile}>
                        Jane Doe
                    </h6>
                </div>

                <div className="flex-shrink-0">
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
                                    <Dropdown.Item onClick={handleShowProfile}>
                                        <LuUser />
                                        Profile
                                    </Dropdown.Item>
                                </li>

                                <li>
                                    <Dropdown.Item>
                                        <BsVolumeMute />
                                        Mute
                                    </Dropdown.Item>
                                </li>

                                <li>
                                    <Dropdown.Item>
                                        <BsBan />
                                        Blocked
                                    </Dropdown.Item>
                                </li>

                                <li>
                                    <Dropdown.Item>
                                        <BsTrash3 />
                                        Delete Chat
                                    </Dropdown.Item>
                                </li>
                            </ul>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <div className="chat-box scroll scroll-4">
                <div>
                    <div className="date-divider">
                        <span>Today</span>
                    </div>

                    <ul className="chatting">
                        <Message className="incoming" />
                        <Message className="outgoing" />
                        <Message className="incoming" />
                        <Message className="outgoing" />
                        <Message className="incoming" />
                        <Message className="outgoing" />
                    </ul>

                    <div className="date-divider">
                        <span>16 Feb, 2024</span>
                    </div>

                    <ul className="chatting">
                        <Message className="incoming" />
                        <Message className="outgoing" />
                        <Message className="incoming" />
                        <Message className="outgoing" />
                    </ul>
                </div>
            </div>

            <ChatComposer />
        </div>
    );
};

export default ChatBody;

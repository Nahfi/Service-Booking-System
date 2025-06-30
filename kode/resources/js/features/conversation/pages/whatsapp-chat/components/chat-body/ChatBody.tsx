import { useContext, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {
    BsArrowLeft,
    BsBan,
    BsThreeDotsVertical,
    BsTrash3,
    BsVolumeMute,
} from "react-icons/bs";
import { LuUser } from "react-icons/lu";
import { ThemeContext } from "../../../../../../context";
import "./chat-body.scss";
import ChatComposer from "./ChatComposer";
import Message from "./Message";

import whatsappBackground from "@/assets/images/bg/whatsapp-bg.webp";
import Button from "@/components/common/button/Button";
import type { ThemeContextType } from "../../../../../../utils/types";

const ChatBody = ({ chatActions }) => {
    const { handleShowContact, handleShowProfile, openModal } = chatActions;
    const { themeSettings } = useContext(ThemeContext) as ThemeContextType;
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
                {!template === null ? (
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
                ) : (
                    <div className="h-100 d-flex flex-column justify-content-center align-items-center">
                        <div className="row g-0">
                            <div className="col-xxl-7 col-lg-8 mx-auto">
                                <div className="mb-0 p-3 bg--light rounded-3 border-1">
                                    <div className="">
                                        <h6 className="mb-2 fs-14">24-Hour Messaging Limit</h6>
                                        <p className="bg--danger-light text--danger rounded-2 p-2 fs-13">
                                            WhatsApp restricts message sending
                                            to within 24 hours of a user's last
                                            reply. To continue the conversation
                                            after this window, you must use an
                                            approved message template.
                                        </p>
                                    </div>
                                    <hr />
                                    <Button
                                        className="btn--primary btn--md rounded-3"
                                        onClick={() =>
                                            openModal(
                                                "CHOOSE_TEMPLATE",
                                                "Choose Template",
                                                ""
                                            )
                                        }
                                    >
                                        Choose template
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <ChatComposer template={template} />
        </div>
    );
};

export default ChatBody;

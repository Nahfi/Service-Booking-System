import { useMediaQuery } from "react-responsive";

import type React from "react";
import {
    BsChatDots,
    BsInbox,
    BsWhatsapp
} from "react-icons/bs";
import {
    LuChartArea,
    LuContact,
    LuLayoutTemplate,
    LuMessageSquare,
    LuMessageSquareDot,
    LuMessagesSquare
} from "react-icons/lu";
import { NavLink } from "react-router-dom";

interface MenuItem {
    icon: React.ReactNode;
    to: string;
    label: string;
    recent: number | null;
    allCount?: string;
}

const menuList: MenuItem[] = [
    {
        icon: <BsInbox />,
        to: "/conversation/inbox",
        label: "Your Inbox",
        recent: 5,
        allCount: "50k",
    },
    {
        icon: <BsChatDots />,
        to: "/conversation/sms",
        label: "SMS",
        recent: null,
        allCount: "50k",
    },
    {
        icon: <BsWhatsapp />,
        to: "/conversation/whatsapp",
        label: "Whatsapp",
        recent: 5,
        allCount: "50k",
    },

    {
        icon: <LuContact />,
        to: "/conversation/contact",
        label: "Contact",
        recent: null,
    },
    {
        icon: <LuLayoutTemplate />,
        to: "/conversation/templates",
        label: "Templates",
        recent: null,
    },
    {
        icon: <LuChartArea />,
        to: "/conversation/report",
        label: "Reports",
        recent: null,
    },
];

const ConversationSidebar: React.FC = () => {
    const isLgUp = useMediaQuery({
        query: "(min-width: 992px)",
    });

    return (
        <div className="col-auto conversation-sidebar">
            <div className="conversation-sidebar-body">
                {isLgUp && (
                    <div className="sidebar-header">
                        <h6>Conversations</h6>

                        <div className="d-flex align-items-center gap-2">
                            <LuMessageSquareDot className="fs-20" />
                        </div>
                    </div>
                )}

                <div className="chat-menus-wrapper scroll scroll-3 scroll-hover">
                    <nav className="chat-menu">
                        {menuList.map((menu, ind) => (
                            <NavLink
                                to={menu?.to}
                                key={ind}
                                className="chat-menu-link"
                                viewTransition
                            >
                                <span className="chat-menu-icon">
                                    {menu?.icon}
                                </span>
                                <h6>
                                    {menu?.label}
                                    {menu?.recent !== null && (
                                        <span className="i-badge pill danger-solid fs-10 px-lg-2 px-1 menu-badge">
                                            {menu?.recent}
                                        </span>
                                    )}
                                </h6>
                                <span className="count-value">
                                    {menu?.allCount}
                                </span>
                            </NavLink>
                        ))}
                    </nav>

                    {isLgUp && (
                        <div className="channel">
                            <div className="channel-title">
                                <h5>Channels </h5>
                                <span>
                                    <LuMessagesSquare className="fs-20"/>
                                </span>
                            </div>

                            <nav className="chat-menu">
                                <NavLink
                                    to={`channel/sms`}
                                    className="chat-menu-link"
                                    viewTransition
                                >
                                    <span className="chat-menu-icon">
                                        <LuMessageSquare />
                                    </span>
                                    <h6>
                                        SMS
                                    </h6>
                                </NavLink>

                                <NavLink
                                    to={`channel/whatsapp`}
                                        className="chat-menu-link"
                                        viewTransition
                                    >
                                        <span className="chat-menu-icon">
                                          <BsWhatsapp />
                                        </span>
                                        <h6>
                                            Whatsapp
                                        </h6>
                                </NavLink>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConversationSidebar;

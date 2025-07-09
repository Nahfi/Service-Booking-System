import React, { Suspense } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { LuBell, LuLanguages, LuSettings } from "react-icons/lu";
import { useMediaQuery } from "react-responsive";
import { NavLink, Outlet } from "react-router-dom";
import BaseLayout from "../../components/layouts/BaseLayout";

import "./setting.scss";


interface SettingsMenuItem {
    label: string;
    icon: React.ReactNode;
    path: string;
}

const settingsMenu: SettingsMenuItem[] = [
    {
        label: "General",
        icon: <LuSettings />,
        path: "/setting/general",
    },
    {
        label: "Whatsapp setup",
        icon: <FaWhatsapp />,
        path: "/setting/whatsapp",
    },
    {
        label: "Gateways configurations",
        icon: <LuSettings />,
        path: "/setting/gateways",
    },
    {
        label: "Language",
        icon: <LuLanguages />,
        path: "/setting/language",
    },
    {
        label: "Notification Templates",
        icon: <LuBell />,
        path: "/setting/notification-templates",
    },
];

const Settings: React.FC = () => {
    const isLgUp = useMediaQuery({
        query: "(min-width: 992px)",
    });

    return (
        <BaseLayout className="p-0">
                <div className="row g-0 setting-wrapper">
                    <div className="col-auto setting-sidebar">
                        <div className="setting-sidebar-body">
                            {isLgUp && (
                                <div className="setting-menu-header">
                                    <h6>Settings</h6>
                                    <span className="setting-menu-close">
                                        <LuSettings className="fs-20" />
                                    </span>
                                </div>
                            )}
                            <div className="setting-menu-wrapper scroll scroll-3 scroll-hover">
                                <nav className="setting-menu">
                                    {settingsMenu.map((item, index) => (
                                        <NavLink
                                            key={index}
                                            className="setting-menu-item"
                                            to={item.path}
                                            viewTransition
                                        >
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </NavLink>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>

                    <div className="col setting-content-wrapper">
                        <Suspense fallback={"Loading..."}>
                            <Outlet />
                        </Suspense>
                    </div>
                </div>
        </BaseLayout>
    );
};

export default Settings;

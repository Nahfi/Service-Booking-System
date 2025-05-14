import { LuBell, LuLock, LuSettings } from "react-icons/lu";
import { NavLink, Outlet } from "react-router-dom";
import BaseLayout from "../../components/layouts/BaseLayout";

import { Suspense } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import "./setting.scss";

const settingsMenu = [
    {
        label: "General",
        icon: <LuSettings />,
        path: "/setting/general",
    },
    {
        label: "Whatsapp",
        icon: <FaWhatsapp />,
        path: "/setting/whatsapp",
    },
    {
        label: "Gateway",
        icon: <LuSettings />,
        path: "/setting/gateway",
    },
    {
        label: "Notification",
        icon: <LuBell />,
        path: "/setting/notification",
    },
    {
        label: "Security",
        icon: <LuLock />,
        path: "/setting/security",
    },
];

const Settings = () => {
    const isLgUp = useMediaQuery({
        query: "(min-width: 992px)",
    });

    return (
        <BaseLayout className="p-0">
            <>
                {/* <PageHeader
                    title={"Settings"}
                    shortTitle={"Manage your roles"}
                /> */}

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
            </>
        </BaseLayout>
    );
};

export default Settings;

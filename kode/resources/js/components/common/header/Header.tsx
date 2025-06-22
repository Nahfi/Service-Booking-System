import LogoDark from "@/assets/images/logo/logo-dark.svg";
import LogoLight from "@/assets/images/logo/logo-light.svg";
import headerLogo from "@/assets/images/logo/logo.png";
import React, { useContext, useMemo, useState } from "react";
import { BsMoon, BsSunFill } from "react-icons/bs";
import {
    LuMenu,
    LuX
} from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../../../context";

import { useTranslation } from "react-i18next";
import { valueToKey } from "../../../utils/helper";
import type { ThemeContextType } from "../../../utils/types";

import "./Header.scss";
import LanguageSwitch from "./LanguageSwitch";
import ProfileDropdown from "./ProfileDropdown";

interface MenuItem {
    label: string;
    path: string;
}

const Header: React.FC = () => {
    const { themeSettings, toggleTheme, toggleDirection } = useContext(ThemeContext) as ThemeContextType;
    
    const {t} = useTranslation();
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

    const handleToggleMenu = () => {
        setMenuOpen((prev: boolean) => !prev);
    };

    const headerMenu: MenuItem[] = useMemo(() => {
        return [
            {
                label: "Dashboard",
                path: "/",
            },
            {
                label: "Manage user",
                path: "/users",
            },
            {
                label: "Conversation",
                path: "/conversation/inbox",
            },
            {
                label: "Campaign",
                path: "/campaign",
            },
            {
                label: "Calendar",
                path: "/calendar",
            },
            {
                label: "Report",
                path: "/report",
            },
            {
                label: "Manage role",
                path: "/roles",
            },
            {
                label: "Settings",
                path: "/setting/general",
            },
        ];
    }, []); 

    return (
        <header className="header-area style-1">
            <div className="container-fluid container-wrapper">
                <div className="w-100 d-flex justify-content-between align-items-center">
                    <div className="header-left">
                        <button
                            className="header-action flex-shrink-0 d-xl-none d-block"
                            onClick={handleToggleMenu}
                        >
                            <LuMenu />
                        </button>

                        <div className="header-logo">
                            <Link to="/">
                                {themeSettings.theme === "dark" ? (
                                    <img src={LogoLight} alt="header-logo" />
                                ) : (
                                    <img src={LogoDark} alt="header-logo" />
                                )}
                            </Link>
                        </div>
                    </div>

                    <div
                        className={`main-nav ${isMenuOpen ? "show-menu" : ""}`}
                    >
                        <div className="mobile-logo-area d-xl-none d-flex justify-content-between align-items-center">
                            <div className="mobile-logo-wrap">
                                <Link to="/">
                                    <img src={headerLogo} alt="header-logo" />
                                </Link>
                            </div>
                            <button
                                className="menu-close-btn fs-22"
                                onClick={handleToggleMenu}
                            >
                                <LuX />
                            </button>
                        </div>

                        <ul className="menu-list">
                            {headerMenu?.map((menu) => (
                                <li className="menu-item" key={menu?.label}>
                                    <NavLink to={menu?.path} viewTransition>
                                        {t(
                                            valueToKey(menu?.label),
                                            menu?.label
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="nav-right">
                        <button className="header-action" onClick={toggleTheme}>
                            {themeSettings.theme === "light" ? (
                                <BsMoon />
                            ) : (
                                <BsSunFill />
                            )}
                        </button>

                        {/* <button
                            className="header-action"
                            onClick={toggleDirection}
                        >
                            <BsViewList />
                        </button> */}

                        <LanguageSwitch />

                        <ProfileDropdown />
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header;

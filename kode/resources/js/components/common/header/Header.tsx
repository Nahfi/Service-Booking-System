import LogoDark from "@/assets/images/logo/logo-dark.svg";
import LogoLight from "@/assets/images/logo/logo-light.svg";
import headerLogo from "@/assets/images/logo/logo.png";
import React, { useContext, useMemo, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { BsMoon, BsSunFill } from "react-icons/bs";
import {
    LuLogOut,
    LuMenu,
    LuSettings,
    LuUser,
    LuX
} from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../../../context";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store/store";
import { valueToKey } from "../../../utils/helper";
import type { ThemeContextType } from "../../../utils/types";
import "./header.scss";
import LanguageSwitch from "./Languageswitch";

interface MenuItem {
    label: string;
    path: string;
}

const Header: React.FC = () => {
    const { themeSettings, toggleTheme, toggleDirection } = useContext(ThemeContext) as ThemeContextType;

    const {t} = useTranslation();

    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.user);

    const handleToggleMenu = () => {
        setMenuOpen((prev: boolean) => !prev);
    };

    const headerMenu = useMemo(() => {
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
    },[]) 

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
                                    <NavLink to={menu?.path}>
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

                        <Dropdown>
                            <Dropdown.Toggle className="transparent-dropdown">
                                <div className="user-toggle d-flex justify-content-start align-items-center gap-lg-3 gap-2 position-relative">
                                    <div className="image">
                                        <img
                                            src={user?.img_url}
                                            alt="profile-image"
                                        />
                                    </div>
                                    <span
                                        className={`position-absolute top-0 end-0 translate-middle badge border border-light rounded-circle p-1 ${
                                            user?.is_online
                                                ? "bg-success"
                                                : "bg-secondary"
                                        }`}
                                    >
                                        <span className="visually-hidden"></span>
                                    </span>
                                </div>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <ul className="dropdown--profile">
                                    <li className="p-3 pt-1">
                                        <div className="content lh-1">
                                            <h6 className="mb-1">
                                                {user?.name}
                                            </h6>
                                            <span>{user?.email}</span>
                                        </div>
                                    </li>

                                    <li>
                                        <Link
                                            to="/profile"
                                            className="text-dark d-flex align-items-center gap-3 w-100 p-3"
                                        >
                                            <span>
                                                <LuUser className="fs-18" />
                                            </span>
                                            <p>
                                                {t("my_account", "My Account")}
                                            </p>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            to="/setting/general"
                                            className="text-dark d-flex align-items-center gap-3 w-100 p-3"
                                        >
                                            <span>
                                                <LuSettings className="fs-18" />
                                            </span>
                                            <p>{t("settings", "Settings")}</p>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            to={`/login`}
                                            className="text-dark d-flex align-items-center gap-3 w-100 p-3"
                                        >
                                            <span>
                                                <LuLogOut className="fs-18" />
                                            </span>
                                            <span>
                                                {t("sign_out", "Sign out")}
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header;

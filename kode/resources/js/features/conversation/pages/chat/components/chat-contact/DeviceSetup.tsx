import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { LuChevronDown, LuChevronRight, LuSmartphone } from "react-icons/lu";
import { keyToValue } from "../../../../../../utils/helper";

const devices: Record<string, string[]> = {
    devise_one: ["sim_one", "sim_two"],
    devise_two: ["sim_one", "sim_two"],
    devise_three: [],
    devise_four: ["sim_one", "sim_two"],
};

const DeviceSetup: React.FC = () => {
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [selectedDevice, setSelectedDevice] = useState<string | JSX.Element>(
        "Select Device"
    );
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleDeviceSelect = (device: string, sim?: string) => {
        if (sim) {
            setSelectedDevice(
                <div className="d-flex align-items-start flex-column">
                    <p className="font-semibold">
                        {`${keyToValue(device)} - ${keyToValue(sim)}`}
                    </p>
                </div>
            );
        } else {
            setSelectedDevice(keyToValue(device));
        }
        setIsDropdownOpen(false);
        setOpenSubmenu(null);
    };

    const handleSubmenuEnter = (device: string) => {
        if (submenuTimeoutRef.current) {
            clearTimeout(submenuTimeoutRef.current);
        }
        setOpenSubmenu(device);
    };

    const handleSubmenuLeave = () => {
        submenuTimeoutRef.current = setTimeout(() => {
            setOpenSubmenu(null);
        }, 150);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
                setOpenSubmenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            if (submenuTimeoutRef.current) {
                clearTimeout(submenuTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div
            className="device-dropdown-wrapper flex-shrink-0"
            ref={dropdownRef}
        >
            <Dropdown
                show={isDropdownOpen}
                onToggle={(isOpen) => {
                    setIsDropdownOpen(isOpen);
                    if (!isOpen) {
                        setOpenSubmenu(null);
                    }
                }}
            >
                <Dropdown.Toggle
                    variant="outline-primary"
                    id="device-dropdown-toggle"
                    className="device-dropdown-toggle"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsDropdownOpen(!isDropdownOpen);
                    }}
                >

                        <div className="d-flex align-items-center gap-2 lh-1">
                            <LuSmartphone className="fs-18"/>
                            {selectedDevice}
                        </div>
                        <LuChevronDown className="fs-16 text-muted" />
                </Dropdown.Toggle>

                <Dropdown.Menu
                    className="main-dropdown"
                    onClick={(e) => e.stopPropagation()}
                >
                    {Object.entries(devices).map(([device, sims]) =>
                        sims.length === 0 ? (
                            <Dropdown.Item
                                key={device}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleDeviceSelect(device);
                                }}
                            >
                                {keyToValue(device)}
                            </Dropdown.Item>
                        ) : (
                            <div
                                key={device}
                                className="dropdown-submenu-wrapper"
                                onMouseEnter={() => handleSubmenuEnter(device)}
                                onMouseLeave={handleSubmenuLeave}
                            >
                                <div
                                    className="dropdown-submenu-toggle dropdown-item"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    {keyToValue(device)}
                                    <span className="float-end">
                                        <LuChevronRight />
                                    </span>
                                </div>

                                {openSubmenu === device && (
                                    <div
                                        className="submenu"
                                        onMouseEnter={() => {
                                            if (submenuTimeoutRef.current) {
                                                clearTimeout(
                                                    submenuTimeoutRef.current
                                                );
                                            }
                                        }}
                                        onMouseLeave={handleSubmenuLeave}
                                    >
                                        {sims.map((sim) => (
                                            <Dropdown.Item
                                                key={sim}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleDeviceSelect(
                                                        device,
                                                        sim
                                                    );
                                                }}
                                            >
                                                {keyToValue(sim)}
                                            </Dropdown.Item>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default DeviceSetup;




function DropdownItem({ label, children, isSubmenu }) {
    return (
        <div className={`dropdown-submenu ${isSubmenu ? "" : "px-4 py-2"}`}>
            <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
            >
                {label}
                {children && (
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        ></path>
                    </svg>
                )}
            </a>
            {children && <div className="dropdown-menu">{children}</div>}
        </div>
    );
}

const DeviceSetup=() => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Close menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            const menu = document.querySelector(".dropdown-menu");
            const button = document.querySelector(".menu-button");
            if (
                menu &&
                button &&
                !menu.contains(event.target) &&
                !button.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="devise-setup">
            <div className="relative inline-block text-left">
                <button
                    className="menu-button text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 flex items-center"
                    onClick={toggleMenu}
                >
                    Device
                    <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>
                </button>
                <div
                    className={`dropdown-menu absolute ${
                        isOpen ? "block" : "hidden"
                    } mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
                >
                    <div className="py-1">
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Home
                        </a>
                        <DropdownItem label="Products" isSubmenu>
                            <DropdownItem label="Electronics" />
                            <DropdownItem label="Phones" isSubmenu>
                                <DropdownItem label="Smartphones" />
                                <DropdownItem label="Accessories" />
                            </DropdownItem>
                            <DropdownItem label="Computers" />
                        </DropdownItem>
                        <DropdownItem label="Services" isSubmenu>
                            <DropdownItem label="Consulting" />
                            <DropdownItem label="Support" />
                        </DropdownItem>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}


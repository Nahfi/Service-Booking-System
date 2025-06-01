


import { createContext } from "react";
import type { ModalContextType } from "../utils/types";

// Define types for theme context
interface ThemeSettings {
    theme: "light" | "dark";
    dir: "ltr" | "rtl";
}

interface ThemeContextType {
    themeSettings: ThemeSettings;
    toggleTheme: () => void;
    toggleDirection: () => void;
}

// Provide default values or use `undefined` and handle via Context Provider
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export { ModalContext, ThemeContext };

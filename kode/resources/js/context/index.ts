
import { createContext, useContext } from "react";
import type { ModalContextType, ThemeContextType } from "../utils/types";


// Provide default values or use `undefined` and handle via Context Provider

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}

export { ModalContext, ThemeContext };

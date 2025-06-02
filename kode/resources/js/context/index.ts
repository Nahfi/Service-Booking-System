
import { createContext } from "react";
import type { ModalContextType, ThemeContextType } from "../utils/types";



// Provide default values or use `undefined` and handle via Context Provider
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export { ModalContext, ThemeContext };

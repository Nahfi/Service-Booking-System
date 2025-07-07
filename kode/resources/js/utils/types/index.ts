
// DOM Events
import type {
    ChangeEvent,
    FocusEvent,
    FormEvent,
    KeyboardEvent,
    MouseEvent,
} from "react";

// DOM Event Types
export type FormSubmitEvent = FormEvent<HTMLFormElement>;
export type ButtonClickEvent = MouseEvent<HTMLButtonElement>;
export type InputChangeEvent = ChangeEvent<HTMLInputElement>;
export type InputFocusEvent = FocusEvent<HTMLInputElement>;
export type InputKeyboardEvent = KeyboardEvent<HTMLInputElement>;
export type DivClickEvent = MouseEvent<HTMLDivElement>;

// Modal
export type ModalType = "CREATE" | "EDIT" | "DELETE" | (string & {});

export type ModalSize = "sm" | "md" | "lg" | "xl" | (string & {});

export interface OpenModalFn {
    (type: ModalType, title?: string, size?: ModalSize, data?: any): void;
}

export interface ModalConfigType {
    modalUid: string;
    type?: ModalType;
    title?: string;
    size?: ModalSize;
    data?: any;
}


export interface ModalContextType {
    showModal: boolean;
    modalConfig: ModalConfigType;
    openModal: (
        modalUid: string,
        type: ModalType,
        title: string,
        size: ModalSize,
        data?: any
    ) => void;
    closeModal: () => void;
}


// Theme context type 

export interface ThemeContextType {
    themeSettings: {
        theme: "light" | "dark";
    };
    toggleTheme: () => void;
    toggleDirection: () => void;
}


// API  Response

export interface ApiActionResponse {
    success: boolean;
    code: number;
    message: string;
}

export interface PaginationMetaType {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    prev_page: number | null;
    next_page: number | null;
    path: string;
    query: string[];
}

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


// User Type define
export interface Address {
    country: string;
    city: string;
    full_address: string;
    postal_code: string;
}

export interface RootUserType {
    id: number;
    uid: string;
    fcm_token: string;
    name: string;
    img_url: string;
    phone: string;
    email: string;
    meta_data: any | null; 
    address: Address[];
    visible_password: string;
    status: string; 
    google2fa_secret: string | null;
    recovery_codes: string[] | null; 
    two_factor_enabled: boolean;
    two_factor_confirmed_at: string | null; 
    last_login_time: string; 
    is_online: boolean;
    show_online_status: boolean;
    created_at: string; 
    deleted_at: string | null; 
}

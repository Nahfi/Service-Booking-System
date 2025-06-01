
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

export interface ModalConfig {
    type?: ModalType;
    title?: string;
    size?: ModalSize;
    data?: any;
}

export interface ModalContextType {
    showModal: boolean;
    modalConfig: ModalConfig;
    openModal: (
        type: ModalType,
        title: string,
        size: ModalSize,
        data?: any
    ) => void;
    closeModal: () => void;
}

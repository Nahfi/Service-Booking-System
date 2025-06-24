// Role type with full structure
export interface RoleType {
    id: number;
    name: string;
    permissions: {
        settings: string[];
    };
    status: string;
    created_at: string;
}

// Simplified role type for modal or list references
export type SimpleRoleType = {
    id: number;
    name: string;
};

// User type mapped to the full API response
export type UserType = {
    id: number;
    uid: string;
    fcm_token: string | null;
    name: string;
    img_url: string;
    phone?: string | null;
    email: string;
    meta_data: any; // Change to specific type if known
    address?: {
        country?: string;
        city?: string;
        full_address?: string;
        postal_code?: string;
    } | null;
    visible_password: string;
    status: "active" | "inactive";
    google2fa_secret: string | null;
    recovery_codes: string | null;
    two_factor_enabled: boolean;
    two_factor_confirmed_at: string | null;
    last_login_time: string | null;
    is_online: boolean;
    show_online_status: boolean;
    created_at: string;
    deleted_at: string | null;
    role: RoleType;
};

// Modal configuration type
export type ModalConfigType = {
    type: "CREATE" | "EDIT" | "DELETE";
    title?: string;
    size?: string;
    data?: UserType;
};

export type SaveUserPayload = {
    id?: number;
    name: string;
    email: string;
    phone?: string;
    password?: string;
    password_confirmation?: string;
    role_id: number;
    address?: {
        country?: string;
        city?: string;
        full_address?: string;
        postal_code?: string;
    };
};

export type ApiResponseType<T = any> = {
    success: boolean;
    message?: string;
    code: number;
    data?: T;
};

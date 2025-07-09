
export interface Language {
    id: number;
    status: string;
    is_default: boolean;
    direction: string;
    name: string;
    code: string;
    created_at: string;
}

// Interface for the API response
export interface LanguageApiResponse {
    success: boolean;
    code: number;
    message: string;
    data: Language[];
}
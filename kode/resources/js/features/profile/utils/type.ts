import type { RootUserType } from "../../../utils/types";


export interface TwoFactorApiResponse {
    success: boolean;
    code: number;
    message: string;
    data: RootUserType;
}


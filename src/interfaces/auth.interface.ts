import {ROLES} from '../constants/roles';

export interface PayloadToken {
    uid: string;
    role: ROLES | string;
}

export interface AuthBody {
    user: string;
    password: string;
}

export interface AuthTokenResult {
    role: string;
    uid: string;
    iat: number;
    exp: number;
}

export interface IUseToken {
    role: string;
    uid: string;
    isExpired: boolean;
}
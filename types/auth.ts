import type { LocationQueryValue } from 'vue-router';
import type { TUserData } from '../stores/types/user';
import type { IFetchErrorData } from './fetch';

export interface IAuthData {
    email: string,
    password: string,
    submitPassword: string,
    updateToken: LocationQueryValue | LocationQueryValue[],
};

export type TAuthFields = Omit<IAuthData, 'updateToken'>;
export type TLoginData = Pick<IAuthData, 'email' | 'password'>;
export type TRestoreData = Pick<IAuthData, 'email'>;
export type TRestoreConfirmData = Pick<IAuthData, 'password'>;

export type TAuthFunction = (payload: IAuthData) => Promise<TUserData | IFetchErrorData<TAuthFields>>;
export type TAuthFunctionVoid = (payload: IAuthData) => Promise<void | IFetchErrorData<TAuthFields>>;

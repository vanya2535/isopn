import type { SearchParameters } from 'ofetch';
import type { TUserData } from '../stores/types/user';

export type TRequestPayloadBody = Record<string, any>;

export interface IRequestPayload {
    query?: SearchParameters,
    body?: TRequestPayloadBody,
};

export interface TRequestResponse<T> extends TUserData {
    count?: number,
    result: T,
};

export enum ValidationErrorKeysEnum {
    MSG = 'msg',
    PATH = 'path',
};

export interface TValidationError<T> {
    path: keyof T,
    msg: 'string',
};

export interface IFetchErrorData<T> {
    message?: string,
    errors?: TValidationError<T>[],
};

export interface IFetchError<T> {
    message: string,
    data: IFetchErrorData<T>,
};

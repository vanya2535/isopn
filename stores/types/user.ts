export enum UserDataKeysEnum {
    EMAIL = 'email',
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken',
};

export enum UserTokensPairKeysEnum {
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken',
};

export type TUserData = Record<UserDataKeysEnum, string>;
export type TUserTokensPair = Record<UserTokensPairKeysEnum, string>;

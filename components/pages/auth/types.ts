export enum AuthFormModesEnum {
    LOGIN = 'login',
    REGISTER = 'register',
    RESTORE = 'restore',
    RESTORE_CONFIRM = 'restoreConfirm',
}

export interface IAuthFormProps {
    mode: AuthFormModesEnum,
    hideModeButtons?: boolean,
}

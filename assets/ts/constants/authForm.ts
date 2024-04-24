import { useUserStore } from '~/stores/useUserStore';
import type { IAuthData, TAuthFields, TAuthFunction } from '~/types/auth';
import { AuthFormModesEnum } from '~/components/pages/auth/types';
import type { IAuthFormModeButton } from '~/types/constants';

export const formTitles: Record<AuthFormModesEnum, string> = {
    [AuthFormModesEnum.LOGIN]: 'Войти',
    [AuthFormModesEnum.REGISTER]: 'Зарегистрироваться',
    [AuthFormModesEnum.RESTORE]: 'Восстановить пароль',
    [AuthFormModesEnum.RESTORE_CONFIRM]: 'Изменить пароль',
};

export const formModeButtons: IAuthFormModeButton[] = [
    {
        title: 'Войти',
        mode: AuthFormModesEnum.LOGIN,
    },
    {
        title: 'Зарегистрироваться',
        mode: AuthFormModesEnum.REGISTER,
    },
    {
        title: 'Восстановить пароль',
        mode: AuthFormModesEnum.RESTORE,
    },
];

export const formModeClasses: Record<AuthFormModesEnum, string> = {
    [AuthFormModesEnum.LOGIN]: '_login',
    [AuthFormModesEnum.REGISTER]: '_register',
    [AuthFormModesEnum.RESTORE]: '_restore',
    [AuthFormModesEnum.RESTORE_CONFIRM]: '_restoreConfirm',
};

export const formModeActions: Record<AuthFormModesEnum, TAuthFunction> = {
    [AuthFormModesEnum.LOGIN]: async ({ email, password }: IAuthData) => {
        const userStore = useUserStore();
        return userStore.login({ email, password });
    },

    [AuthFormModesEnum.REGISTER]: async ({ email, password }: IAuthData) => {
        const userStore = useUserStore();
        return userStore.register({ email, password });
    },

    [AuthFormModesEnum.RESTORE]: async ({ email }: IAuthData) => {
        const userStore = useUserStore();
        return userStore.restore({ email });
    },

    [AuthFormModesEnum.RESTORE_CONFIRM]: async ({ password, updateToken }: IAuthData) => {
        const userStore = useUserStore();
        return userStore.restoreConfirm(updateToken, { password });
    },
};

export const requiredModeFormFields: Record<AuthFormModesEnum, (keyof TAuthFields)[]> = {
    [AuthFormModesEnum.LOGIN]: ['email', 'password'],
    [AuthFormModesEnum.REGISTER]: ['email', 'password', 'submitPassword'],
    [AuthFormModesEnum.RESTORE]: ['email'],
    [AuthFormModesEnum.RESTORE_CONFIRM]: ['password', 'submitPassword'],
};

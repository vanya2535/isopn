import { defineStore } from 'pinia';
import type { LocationQueryValue } from 'vue-router';
import type { TAuthFields, TLoginData, TRestoreConfirmData, TRestoreData } from '~/types/auth';
import type { TUserData, TUserTokensPair } from '~/stores/types/user';
import type { IFetchError, IFetchErrorData } from '~/types/fetch';
import { NotificationTypesEnum } from '~/stores/types/notification';

export const useUserStore = defineStore('user', () => {
    const { $apiFetcher } = useNuxtApp();
    const router = useRouter();
    const notificationStore = useNotificationStore();

    const accessTokenCookie = useCookie('accessToken', {
        maxAge: 172800,
    });
    const refreshTokenCookie = useCookie('refreshToken', {
        maxAge: 172800,
    });

    const email = ref<string>('');
    const accessToken = ref<string>(accessTokenCookie.value || '');
    const refreshToken = ref<string>(refreshTokenCookie.value || '');

    watch(accessToken, (value: string) => {
        accessTokenCookie.value = value;
    });

    watch(refreshToken, (value: string) => {
        refreshTokenCookie.value = value;
    });

    async function register(body: TLoginData): Promise<void | IFetchErrorData<TAuthFields>> {
        try {
            await $apiFetcher.post('/auth/register/', { body });
            return Promise.resolve();
        } catch (e) {
            console.error('store/user/register: ', e);
            return Promise.reject((e as IFetchError<TAuthFields>).data);
        }
    }

    async function confirm(updateToken: LocationQueryValue | LocationQueryValue[]): Promise<TUserData | IFetchErrorData<TAuthFields>> {
        try {
            const res = <TUserData> await $apiFetcher.get('/auth/confirm/', { updateToken });

            email.value = res.email;
            notificationStore.pushMessage('Адрес электронной почты подтвержден', NotificationTypesEnum.SUCCESS);

            return Promise.resolve(res);
        } catch (e) {
            console.error('store/user/confirm: ', e);
            return Promise.reject((e as IFetchError<TAuthFields>).data);
        }
    }

    async function login(body: TLoginData): Promise<TUserData | IFetchErrorData<TAuthFields>> {
        try {
            const res = <TUserData> await $apiFetcher.post('/auth/login/', { body });

            email.value = res.email;
            notificationStore.pushMessage('Выполнен вход в учетную запись', NotificationTypesEnum.SUCCESS);

            return Promise.resolve(res);
        } catch (e) {
            console.error('store/user/login: ', e);
            return Promise.reject((e as IFetchError<TAuthFields>).data);
        }
    }

    function logout() {
        email.value = '';
        accessToken.value = '';
        refreshToken.value = '';

        const realtyStore = useRealtyStore();
        realtyStore.clear();

        router.push('/auth');
    }

    async function restore(body: TRestoreData): Promise<void | IFetchErrorData<TAuthFields>> {
        try {
            await $apiFetcher.post('/auth/restore/', { body });
            return Promise.resolve();
        } catch (e) {
            console.error('store/user/restore: ', e);
            return Promise.reject((e as IFetchError<TAuthFields>).data);
        }
    }

    async function restoreConfirm(updateToken: LocationQueryValue | LocationQueryValue[], body: TRestoreConfirmData): Promise<TUserData | IFetchErrorData<TAuthFields>> {
        try {
            const res = <TUserData> await $apiFetcher.post('/auth/restore-confirm/', {
                body,
                query: { updateToken },
            });

            email.value = res.email;
            notificationStore.pushMessage('Учетная запись восстановлена', NotificationTypesEnum.SUCCESS);

            return Promise.resolve(res);
        } catch (e) {
            console.error('store/user/restoreConfirm: ', e);
            return Promise.reject((e as IFetchError<TAuthFields>).data);
        }
    }

    async function check(): Promise<TUserData | IFetchErrorData<TAuthFields>> {
        try {
            const res = <TUserData> await $apiFetcher.get('/auth/check/');

            email.value = res.email;
            return Promise.resolve(res);
        } catch (e) {
            console.error('store/user/check: ', e);
            return Promise.reject((e as IFetchError<TAuthFields>).data);
        }
    }

    function setTokens(payload: TUserTokensPair) {
        accessToken.value = payload.accessToken;
        refreshToken.value = payload.refreshToken;
    }

    return {
        email,
        accessToken,
        refreshToken,

        register,
        confirm,
        login,
        logout,
        restore,
        restoreConfirm,
        check,
        setTokens,
    };
});

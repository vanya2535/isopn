import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { $fetch, type $Fetch, type SearchParameters } from 'ofetch';
import type { IRequestPayload } from '~/types/fetch';
import { useUserStore } from '~/stores/useUserStore';
import { useNotificationStore } from '~/stores/useNotificationStore';
import type { TUserTokensPair } from '~/types/user';
import { NotificationTypesEnum } from '~/types/notification';

let silentRoutes = ['/auth/check/'];

class ApiFetcher {
    private readonly _fetch: $Fetch;

    constructor(fetcher: $Fetch) {
        this._fetch = fetcher;
    }

    async get<T>(endpoint: string, query?: SearchParameters): Promise<T> {
        return this._fetch<T>(endpoint, {
            method: 'GET',
            query,
        });
    }

    async post<T>(endpoint: string, payload?: IRequestPayload): Promise<T> {
        return this._fetch<T>(endpoint, {
            method: 'POST',
            ...payload,
        });
    }
}

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    silentRoutes = silentRoutes.map(route => config.public.BACKEND_URL + route);

    const fetcher = $fetch.create({
        baseURL: config.public.BACKEND_URL,
        credentials: 'include',

        onResponse: async ({ response }) => {
            if (response._data.accessToken && response._data.refreshToken) {
                const userStore = useUserStore();

                const tokens: TUserTokensPair = {
                    accessToken: response._data.accessToken,
                    refreshToken: response._data.refreshToken,
                };

                userStore.setTokens(tokens);
            }
        },

        onResponseError: async ({ response }) => {
            if (response._data.message && !silentRoutes.includes(response.url)) {
                const notificationStore = useNotificationStore();
                notificationStore.pushMessage(response._data.message, NotificationTypesEnum.ERROR);
            }

            if (response.status === 403) {
                const userStore = useUserStore();
                userStore.logout();
            }
        },
    });

    return {
        provide: {
            apiFetcher: new ApiFetcher(fetcher),
        },
    };
});

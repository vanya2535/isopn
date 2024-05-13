import type { Pinia } from 'pinia';

import { defineNuxtPlugin } from '#app';
import { useUserStore } from '~/stores/useUserStore';

export default defineNuxtPlugin(async nuxtApp => {
    const userStore = useUserStore(<Pinia>nuxtApp.$pinia);

    if (process.server) {
        const cookies = await useFetch('/api/cookies');
        const accessToken = cookies.data.value?.accessToken || '';
        const refreshToken = cookies.data.value?.refreshToken || '';

        userStore.setTokens({ accessToken, refreshToken });
    }

    if (process.client) {
        try {
            await userStore.check();
        } catch (e) {
            console.error('plugins/serverInit: ', e);
            userStore.logout();
        }
    }
});

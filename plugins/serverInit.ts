import { defineNuxtPlugin } from '#app';
import type { Pinia } from 'pinia';
import { useUserStore } from '~/stores/useUserStore';

export default defineNuxtPlugin(async nuxtApp => {
    if (process.client) {
        try {
            const userStore = useUserStore(<Pinia>nuxtApp.$pinia);
            await userStore.check();
        } catch (e) {
            console.error('plugins/serverInit: ', e);
        }
    }
});

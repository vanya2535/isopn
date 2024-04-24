import { useUserStore } from '~/stores/useUserStore';

export default defineNuxtRouteMiddleware(to => {
    const userStore = useUserStore();

    if (!to.path.includes('/auth') && (!userStore.accessToken || !userStore.refreshToken)) {
        return navigateTo('/auth');
    } else if (to.path.includes('/auth') && userStore.accessToken && userStore.refreshToken) {
        return navigateTo('/');
    }
});

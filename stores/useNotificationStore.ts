import { defineStore } from 'pinia';

import type { INotification, NotificationTypesEnum } from '~/stores/types/notification';

export const useNotificationStore = defineStore('notifications', () => {
    const notifications = ref<INotification[]>([]);

    let nextId = 1;
    function pushMessage(message: string, type: NotificationTypesEnum) {
        const currentId = nextId++;
        notifications.value.push({ id: currentId, message, type });

        setTimeout(() => {
            notifications.value = notifications.value.filter(({ id }) => id !== currentId);
        }, 5000);
    }

    return {
        notifications,
        pushMessage,
    };
});

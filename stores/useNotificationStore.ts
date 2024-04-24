import { defineStore } from 'pinia';
import type { INotification, NotificationTypesEnum } from '~/types/notification';

export const useNotificationStore = defineStore('notifications', () => {
    const notifications = ref<INotification[]>([]);
    let nextId = (0);

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

<script lang="ts" setup>
const notificationStore = useNotificationStore();
</script>

<template>
    <transition-group
        name="slide-left"
        tag="div"
        :class="$style.NotificationList"
    >
        <div
            v-for="notification in notificationStore.notifications"
            :key="notification.id"
            :class="[$style.notification, [$style[`_${notification.type}`]]]"
        >
            {{ notification.message }}
        </div>
    </transition-group>
</template>

<style lang="scss" module>
.NotificationList {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background-color: transparent;
}

.notification {
    border-radius: .4rem;
    padding: 1rem 1.4rem;
    font-size: 1.2rem;
    line-height: 1.4rem;
    color: $base0;

    &._error {
        background-color: $red;
    }

    &._success {
        background-color: $green;
    }

    &:not(:last-child) {
        margin-bottom: .4rem;
    }
}
</style>

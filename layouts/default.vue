<template>
    <div :class="$style.DefaultLayout">
        <LayoutNotificationList :class="$style.notifications" />
        <slot />
    </div>
</template>

<style lang="scss" module>
.DefaultLayout {
    position: relative;
    min-height: 100vh;
    background-color: $base0;
}

.notifications {
    position: fixed;
    right: 4rem;
    top: 2rem;
    z-index: 1;
}
</style>

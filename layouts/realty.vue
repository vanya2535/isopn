<template>
    <div :class="$style.DefaultLayout">
        <LayoutRealtyHeader :class="$style.header" />
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

.header {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 8;
    width: 100%;
}

.notifications {
    position: fixed;
    right: 4rem;
    top: 2rem;
    z-index: 9;
}
</style>

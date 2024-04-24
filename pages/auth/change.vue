<script lang="ts" setup>
import { AuthFormModesEnum } from '~/components/pages/auth/types';

const mode = ref<AuthFormModesEnum>(AuthFormModesEnum.RESTORE_CONFIRM);
</script>

<template>
    <div :class="[$style.AuthPage, 'page']">
        <PagesAuthForm
            :class="$style.form"
            :mode="mode"
            hide-mode-buttons
        />
    </div>
</template>

<style lang="scss" module>
.AuthPage {
    display: flex;
    align-items: center;
    justify-content: center;

    @include respond-to(mobile) {
        padding: 1.6rem;
    }
}

.form {
    width: 100%;
    max-width: 50rem;
}
</style>

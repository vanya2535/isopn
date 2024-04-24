<script lang="ts" setup>
import { withDefaults } from 'vue';
import { ButtonTypesEnum } from './types';

interface IButtonProps {
    type?: ButtonTypesEnum,
    loading?: boolean,
    withoutBg?: boolean
}

const props = withDefaults(defineProps<IButtonProps>(), {
    type: ButtonTypesEnum.BUTTON,
    loading: false,
    withoutBg: false,
});
</script>


<template>
    <button
        :class="[$style.VButton, {
            [$style._withoutBg]: props.withoutBg,
            loading: props.loading,
        }]"
        :type="props.type"
        @click="$emit('click')"
    >
        <slot />
    </button>
</template>

<style lang="scss" module>
.VButton {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 1.4rem 0;
    width: 100%;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.4rem;
    color: white;
    background-color: $base400;
    transition: all .3s ease;

    &._withoutBg {
        border-radius: 0;
        padding: 0;
        width: auto;
        font-weight: 500;
        font-size: 1.1rem;
        color: $base400;
        background-color: transparent;
        transition: color .3s ease;

        &:hover {
            @include respond-to(desktop) {
            border-radius: 0;
                color: $base100;
                background-color: transparent;
            }
        }

        &:active {
            @include respond-to(desktop) {
                border-radius: 0;
                color: $base50;
                background-color: transparent;
            }
        }
    }

    &:hover {
        @include respond-to(desktop) {
            border-radius: .4rem;
            background-color: $base300;
        }
    }

    &:active {
        @include respond-to(desktop) {
            border-radius: .8rem;
            background-color: $base200;
        }
    }
}
</style>

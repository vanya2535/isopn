<script lang="ts" setup>
import { ButtonTypesEnum } from './types';

interface IButtonProps {
    type?: ButtonTypesEnum,
    icon?: string,
    loading?: boolean,
    disabled?: boolean,
    primary?: boolean,
    outlined?: boolean,
    squared?: boolean,
};

const props = withDefaults(defineProps<IButtonProps>(), {
    type: ButtonTypesEnum.BUTTON,
    icon: '',
    loading: false,
    disabled: false,
    primary: false,
    outlined: false,
    squared: false,
});
</script>


<template>
    <button
        :class="[$style.VButton, {
            [$style._primary]: props.primary,
            [$style._outlined]: props.outlined,
            [$style._squared]: props.squared,
            loading: props.loading,
        }]"
        :type="props.type"
        :disabled="loading || disabled"
        tabindex="1"
    >
        <SvgIcon
            v-if="props.icon"
            :class="$style.icon"
            :name="props.icon"
        />

        <slot v-if="!squared" />
    </button>
</template>

<style lang="scss" module>
.VButton {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 0;
    padding: 0;
    width: auto;
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 1.4rem;
    color: $base400;
    background-color: transparent;
    transition: all .3s ease;

    &._outlined,
    &._primary {
        padding: 1.4rem 2rem;
        font-size: 1.2rem;
        color: $base0;
        background-color: $base400;

        .icon {
            color: $base0;
        }

        &:hover,
        &:focus {
            @include respond-to(desktop) {
                border-radius: .4rem;
                color: $base0;
                background-color: $base300;

                .icon {
                    color: $base0;
                }
            }
        }

        &:active {
            @include respond-to(desktop) {
                border-radius: .8rem;
                color: $base0;
                background-color: $base200;

                .icon {
                    color: $base0;
                }
            }
        }
    }

    &._outlined {
        border: .1rem solid $base50;
        color: $base400;
        background-color: transparent;

        .icon {
            color: $base400;
        }

        &:hover,
        &:focus {
            @include respond-to(desktop) {
                border-color: transparent;
            }
        }

        &:active {
            @include respond-to(desktop) {
                border-color: transparent;
            }
        }
    }

    &._squared {
        padding: 0;
        width: 4.4rem;
        height: 4.4rem;

        .icon {
            margin-right: 0;
        }
    }

    &:hover,
    &:focus {
        @include respond-to(desktop) {
            border-radius: 0;
            color: $base100;
            background-color: transparent;

            .icon {
                color: $base100;
            }
        }
    }

    &:active {
        @include respond-to(desktop) {
            border-radius: 0;
            color: $base50;
            background-color: transparent;

            .icon {
                color: $base50;
            }
        }
    }

    &:disabled {
        pointer-events: none;

        &:not(:global(.loading)) {
            opacity: $disabled-opacity;
        }
    }

    .icon {
        margin-right: .6rem;
        width: 2rem;
        height: 2rem;
        color: $base400;
        background: transparent;
        transition: color .3s ease;
    }
}
</style>

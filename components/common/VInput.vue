<script lang="ts" setup>
import { withDefaults } from 'vue';
import { InputTypesEnum } from './types';

interface IInputProps {
    id: string,
    label?: string,
    error?: string,
    autocomplete?: string,
    type?: InputTypesEnum,
}

const modelValue = defineModel<string>();
const props = withDefaults(defineProps<IInputProps>(), {
    label: '',
    error: '',
    autocomplete: 'off',
    type: InputTypesEnum.TEXT,
});

const focused = ref<boolean>(false);
const passwordVisible = ref<boolean>(false);

const inputType = computed<InputTypesEnum>(() => passwordVisible.value || props.type === InputTypesEnum.TEXT ? InputTypesEnum.TEXT : InputTypesEnum.PASSWORD);
const showTypeChangeButton = computed<boolean>(() => props.type === InputTypesEnum.PASSWORD);
</script>

<template>
    <div
        :class="[$style.VInput, {
            [$style._focused]: focused,
            [$style._errored]: props.error,
        }]"
    >
        <label
            v-if="props.label"
            :class="$style.label"
            :for="props.id"
        >
            {{ props.label }}
        </label>

        <input
            :id="props.id"
            v-model="modelValue"
            :name="props.id"
            :class="[$style.input, {[$style._withButton]: showTypeChangeButton}]"
            :type="inputType"
            :autocomplete="props.autocomplete"
            tabindex="1"
            @focus="focused = true"
            @blur="focused = false"
        />

        <button
            v-if="showTypeChangeButton"
            :class="[$style.button, {[$style._show]: passwordVisible}]"
            type="button"
            @click="passwordVisible = !passwordVisible"
        >
            <svg-icon
                :class="$style.icon"
                name="eye"
            />
        </button>

        <p :class="$style.error">
            {{ props.error }}
        </p>
    </div>
</template>

<style lang="scss" module>
.VInput {
    position: relative;
    padding: .7rem 0;

    &._focused {
        .label {
            color: $base200;
        }

        .input {
            border-color: $base100;
        }
    }

    &._errored {
        .label {
            color: $red;
        }

        .input {
            border-color: $red;
        }

        .error {
            opacity: 1;
        }
    }

    &:not(._errored):hover {
        @include respond-to(desktop) {
            .label {
                color: $base200;
            }

            .input {
                border-color: $base100;
            }
        }
    }

    &:not(._errored):active {
        @include respond-to(desktop) {
            .label {
                color: $base300;
            }

            .input {
                border-color: $base200;
            }
        }
    }
}

.label {
    top: 0;
    color: $base100;
}

.input {
    border: .1rem solid $base50;
    border-radius: .6rem;
    padding: 1.2rem 1.4rem;
    width: 100%;
    height: 100%;
    font-size: 1.6rem;
    line-height: 1.8rem;
    color: $base200;
    transition: all .3s ease;
    user-select: none;

    &._withButton {
        padding-right: 4rem;
    }
}

.button {
    position: absolute;
    right: 1rem;
    top: 50%;
    z-index: 1;
    width: 2.4rem;
    height: 2.4rem;
    transform: translateY(-50%);

    &:before {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        width: 100%;
        height: 1px;
        background-color: $base100;
        opacity: 1;
        transform: rotate(45deg);
        transition: color .3s ease, opacity .1s ease;
    }

    &._show:before {
        opacity: 0;
    }

    &:hover {
        @include respond-to(desktop) {
            .icon {
                color: $base200;
            }

            &:before {
                background-color: $base100;
            }
        }
    }

    &:active {
        @include respond-to(desktop) {
            .icon {
                color: $base300;
            }

            &:before {
                background-color: $base300;
            }
        }
    }
}

.icon {
    color: $base100;
    transition: color .3s ease;
}

.error {
    bottom: 0;
    color: $red;
    opacity: 0;
}

.label,
.error {
    position: absolute;
    left: 1rem;
    z-index: 1;
    padding: 0 .4rem;
    font-size: 1.2rem;
    line-height: 1.4rem;
    transition: all .3s ease;
    pointer-events: none;
}
</style>

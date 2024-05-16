<script lang="ts" setup>
import { InputTypesEnum } from './types';
import type { HTMLInputEvent } from '~/types/html';

import { splitThousands } from '~/assets/ts/utils/numberUtils';

interface IInputProps {
    id: string,
    label?: string,
    error?: string,
    autocomplete?: string,
    type?: InputTypesEnum,
    float?: boolean,
    sm?: boolean,
    withSubmitButton?: boolean,
};

interface IInputEmits {
    (e: 'submit', value: string | number | undefined): void,
};

const props = withDefaults(defineProps<IInputProps>(), {
    label: '',
    error: '',
    autocomplete: 'off',
    type: InputTypesEnum.TEXT,
    float: false,
    sm: false,
    withSubmitButton: false,
});

const emit = defineEmits<IInputEmits>();

const modelValue = defineModel<string | number>();
const inputValue = ref<string>('');

watch(modelValue, value => {
    inputValue.value = props.type !== InputTypesEnum.NUMBER
        ? String(value || '')
        : value
            ? splitThousands(Number(value))
            : '';
}, {
    immediate: true,
});

const focused = ref<boolean>(false);
const passwordVisible = ref<boolean>(false);

const inputType = computed<InputTypesEnum>(() => props.type !== InputTypesEnum.PASSWORD
    ? InputTypesEnum.TEXT
    : passwordVisible.value
        ? InputTypesEnum.TEXT
        : InputTypesEnum.PASSWORD);

const inputMode = computed<string>(() => props.type === InputTypesEnum.NUMBER ? 'numeric' : 'text');

const showTypeChangeButton = computed<boolean>(() => props.type === InputTypesEnum.PASSWORD);

function onInputInput(event: HTMLInputEvent) {
    if (props.type !== InputTypesEnum.NUMBER) {
        modelValue.value = event.target.value;
        inputValue.value = event.target.value;
    } else {
        const clearValue = event.target.value.replace(/\s/g, '').replace(',', '.');
        modelValue.value = Number(clearValue);

        if (clearValue) {
            const newValue = splitThousands(Number(clearValue));
            inputValue.value = newValue;

            if (clearValue.endsWith('.')) {
                inputValue.value += '.';
            }

            const diff = (newValue.match(/\s/g)?.length || 0) - (event.target.value.match(/\s/g)?.length || 0);
            const caretPosition = (event.target.selectionStart || 0) + diff;

            nextTick(() => {
                event.target.selectionStart = caretPosition;
                event.target.selectionEnd = caretPosition;
            });
        } else {
            inputValue.value = '';
        }
    }
}

function onInputKeydown(event: KeyboardEvent) {
    if (props.type !== InputTypesEnum.NUMBER && !props.withSubmitButton) {
        return;
    } else if (props.withSubmitButton) {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSubmitButtonClick();
        }

        return;
    }

    const allowedKeys = ['Tab', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
    const dotAllowed = ['.', ','].includes(event.key) && props.float && !inputValue.value?.includes('.') && Boolean(inputValue.value);

    const keyNotValid = !/\d/.test(event.key) && !allowedKeys.includes(event.key) && !event.ctrlKey && !dotAllowed;
    const valueMax = /\d/.test(event.key) && Number((inputValue.value + event.key).replace(/\s/g, '')) >= Number.MAX_SAFE_INTEGER;

    // @ts-expect-error no selectionStart in event.target
    // —————————— No selectionStart? ——————————
    // ⠀⣞⢽⢪⢣⢣⢣⢫⡺⡵⣝⡮⣗⢷⢽⢽⢽⣮⡷⡽⣜⣜⢮⢺⣜⢷⢽⢝⡽⣝
    // ⠸⡸⠜⠕⠕⠁⢁⢇⢏⢽⢺⣪⡳⡝⣎⣏⢯⢞⡿⣟⣷⣳⢯⡷⣽⢽⢯⣳⣫⠇
    // ⠀⠀⢀⢀⢄⢬⢪⡪⡎⣆⡈⠚⠜⠕⠇⠗⠝⢕⢯⢫⣞⣯⣿⣻⡽⣏⢗⣗⠏⠀
    // ⠀⠪⡪⡪⣪⢪⢺⢸⢢⢓⢆⢤⢀⠀⠀⠀⠀⠈⢊⢞⡾⣿⡯⣏⢮⠷⠁⠀⠀
    // ⠀⠀⠀⠈⠊⠆⡃⠕⢕⢇⢇⢇⢇⢇⢏⢎⢎⢆⢄⠀⢑⣽⣿⢝⠲⠉⠀⠀⠀⠀
    // ⠀⠀⠀⠀⠀⡿⠂⠠⠀⡇⢇⠕⢈⣀⠀⠁⠡⠣⡣⡫⣂⣿⠯⢪⠰⠂⠀⠀⠀⠀
    // ⠀⠀⠀⠀⡦⡙⡂⢀⢤⢣⠣⡈⣾⡃⠠⠄⠀⡄⢱⣌⣶⢏⢊⠂⠀⠀⠀⠀⠀⠀
    // ⠀⠀⠀⠀⢝⡲⣜⡮⡏⢎⢌⢂⠙⠢⠐⢀⢘⢵⣽⣿⡿⠁⠁⠀⠀⠀⠀⠀⠀⠀
    // ⠀⠀⠀⠀⠨⣺⡺⡕⡕⡱⡑⡆⡕⡅⡕⡜⡼⢽⡻⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    // ⠀⠀⠀⠀⣼⣳⣫⣾⣵⣗⡵⡱⡡⢣⢑⢕⢜⢕⡝⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    // ⠀⠀⠀⣴⣿⣾⣿⣿⣿⡿⡽⡑⢌⠪⡢⡣⣣⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    // ⠀⠀⠀⡟⡾⣿⢿⢿⢵⣽⣾⣼⣘⢸⢸⣞⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    // ⠀⠀⠀⠀⠁⠇⠡⠩⡫⢿⣝⡻⡮⣒⢽⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    // ————————————————————————————————————————
    const valueFloatMax = /\d/.test(event.key) && inputValue.value.split('.')[1]?.length === 2 && event.target.selectionStart > inputValue.value.indexOf('.');

    if (keyNotValid || valueMax || valueFloatMax) {
        event.preventDefault();
    }
}

function onSubmitButtonClick() {
    if (modelValue.value) {
        emit('submit', modelValue.value);

        modelValue.value = '';
        inputValue.value = '';
    }
}
</script>

<template>
    <div
        :class="[$style.VInput, {
            [$style._focused]: focused,
            [$style._errored]: props.error,
            [$style._sm]: sm,
        }]"
    >
        <label
            v-if="props.label"
            :class="$style.label"
            :for="id"
        >
            {{ props.label }}
        </label>

        <input
            :id="id"
            v-model="inputValue"
            :class="[$style.input, {[$style._withButton]: showTypeChangeButton || withSubmitButton}]"
            :name="id"
            :type="inputType"
            :inputmode="inputMode"
            :autocomplete="props.autocomplete"
            tabindex="1"
            @focus="focused = true"
            @blur="focused = false"
            @input="onInputInput"
            @keydown="onInputKeydown"
        />

        <button
            v-if="showTypeChangeButton"
            :class="[$style.button, {[$style._show]: passwordVisible}]"
            type="button"
            tabindex="1"
            @click="passwordVisible = !passwordVisible"
        >
            <svg-icon
                :class="$style.icon"
                name="eye"
            />
        </button>

        <button
            v-else-if="withSubmitButton"
            :class="[$style.button, $style._submit]"
            :disabled="!modelValue"
            type="button"
            tabindex="1"
            @click="onSubmitButtonClick"
        >
            <svg-icon
                :class="$style.icon"
                name="plus"
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

    &._sm {
        .input {
            padding: 1rem 1.4rem;
            font-size: 1.4rem;
            line-height: 1.6rem;

            &._withButton {
                padding-right: 4rem;
            }
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

    &._withButton {
        padding-right: 4rem;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        appearance: none;
        margin: 0;
    }

    &[type="number"] {
        appearance: textfield;
    }
}

.button {
    position: absolute;
    right: 1rem;
    top: 50%;
    z-index: 1;
    overflow: hidden;
    width: 2.4rem;
    height: 2.4rem;
    transform: translateY(-50%);

    &._submit {
        border: .1rem solid $base50;
        transition: all .3s ease;

        &:before {
            display: none;
        }

        &:hover,
        &:focus {
            @include respond-to(desktop) {
                border-color: transparent;
                border-radius: .4rem;
                background-color: $base300;

                .icon {
                    color: $base0;
                }
            }
        }

        &:active {
            @include respond-to(desktop) {
                border-color: transparent;
                border-radius: .8rem;
                background-color: $base200;

                .icon {
                    color: $base0;
                }
            }
        }
    }

    &:before {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        width: 100%;
        height: .2rem;
        background-color: $base100;
        opacity: 1;
        transform: rotate(45deg);
        transition: color .3s ease, opacity .1s ease;
    }

    &._show:before {
        opacity: 0;
    }

    &:hover,
    &:focus {
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

    &:disabled {
        opacity: $disabled-opacity;
        pointer-events: none;
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
    overflow: hidden;
    padding: 0 .4rem;
    max-width: calc(100% - .8rem);
    font-size: 1.2rem;
    line-height: 1.4rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: all .3s ease;
    pointer-events: none;
    user-select: none;
}
</style>

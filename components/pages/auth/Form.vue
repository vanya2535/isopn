<script lang="ts" setup>
import type { IAuthFormProps } from './types';
import { InputTypesEnum, ButtonTypesEnum } from '~/components/ui/types';

const props = withDefaults(defineProps<IAuthFormProps>(), {
    hideModeButtons: false,
});

const {
    title,
    formClass,
    modeButtons,
    emailInputVisible,
    passwordInputVisible,
    submitPasswordInputVisible,
} = useAuthForm(props);

const {
    formData,
    formDataErrors,
    dataLoading,
    messageSended,
    submitButtonDisabled,

    onFormSubmit,
    resetError,
} = useAuthFormData(props);
</script>


<template>
    <form
        :class="[$style.Form, $style[formClass]]"
        @submit.prevent="onFormSubmit"
    >
        <div :class="$style.left">
            <h1 :class="$style.name">
                isopn
            </h1>
        </div>

        <div :class="$style.right">
            <template v-if="!messageSended">
                <h2 :class="[$style.title, 'form-title']">
                    {{ title }}
                </h2>

                <div>
                    <UiVInput
                        v-if="emailInputVisible"
                        id="email"
                        v-model="formData.email"
                        :class="$style.input"
                        :error="formDataErrors.email"
                        label="Адрес электронной почты"
                        autocomplete="email"
                        @input="resetError('email')"
                    />

                    <UiVInput
                        v-if="passwordInputVisible"
                        id="password"
                        v-model="formData.password"
                        :class="$style.input"
                        :type="InputTypesEnum.PASSWORD"
                        :error="formDataErrors.password"
                        label="Пароль"
                        autocomplete="password"
                        @input="resetError('password')"
                    />

                    <UiVInput
                        v-if="submitPasswordInputVisible"
                        id="submitPassword"
                        v-model="formData.submitPassword"
                        :class="$style.input"
                        :type="InputTypesEnum.PASSWORD"
                        :error="formDataErrors.submitPassword"
                        label="Подтвердите пароль"
                        @input="resetError('submitPassword')"
                    />
                </div>

                <UiVButton
                    :class="$style.submit"
                    :type="ButtonTypesEnum.SUBMIT"
                    :loading="dataLoading"
                    :disabled="submitButtonDisabled"
                    primary
                >
                    Подтвердить
                </UiVButton>

                <div
                    v-if="!props.hideModeButtons"
                    :class="$style.buttons"
                >
                    <UiVButton
                        v-for="button in modeButtons"
                        :key="button.mode"
                        :class="$style.button"
                        @click="$emit('change:mode', button.mode)"
                    >
                        {{ button.title }}
                    </UiVButton>
                </div>
            </template>

            <div
                v-else
                :class="$style.send"
            >
                <h2 :class="$style.message">
                    Отправили письмо вам на почту
                </h2>

                <p :class="$style.description">
                    Следуйте инструкциям для дальнешего использования ISOPN
                </p>
            </div>
        </div>
    </form>
</template>

<style lang="scss" module>
.Form {
    display: grid;
    grid-template-columns: 1fr 4fr;
    transition: height .3s ease;

    &._login,
    &._restoreConfirm {
        @include respond-to(desktop) {
            height: 28rem;
        }

        @include respond-to(mobile) {
            height: 34rem;
        }
    }

    &._register {
        @include respond-to(desktop) {
            height: 34rem;
        }

        @include respond-to(mobile) {
            height: 40rem;
        }
    }

    &._restore {
        @include respond-to(desktop) {
            height: 22rem;
        }

        @include respond-to(mobile) {
            height: 28rem;
        }
    }

    @include respond-to(mobile) {
        grid-template-columns: 1fr;
        grid-template-rows: 6rem 1fr;
    }
}

.left {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: .6rem 0 0 .6rem;
    background-color: $base400;
    cursor: default;
    user-select: none;

    @include respond-to(mobile) {
        border-radius: .6rem .6rem 0 0;
    }
}

.name {
    font-weight: 700;
    font-size: 2.4rem;
    letter-spacing: .8rem;
    text-orientation: upright;
    writing-mode: vertical-rl;
    color: $base0;
    transition: font-size .3s ease;

    @include respond-to(mobile) {
        text-orientation: mixed;
        writing-mode: horizontal-tb;
    }
}

.right {
    display: flex;
    flex-direction: column;
    border: .1rem solid $base50;
    border-radius: 0 .6rem .6rem 0;
    padding: 2rem;

    @include respond-to(mobile) {
        border-radius: 0 0 .6rem .6rem;
    }
}

.input {
    transition: margin-bottom .3s ease;

    &:not(:last-child) {
        margin-bottom: .8rem;
    }
}

.submit {
    margin-top: auto;
}

.buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
}

.button:not(:last-child) {
    position: relative;
    overflow: visible;
    margin-right: 1.2rem;

    &:after {
        content: "/";
        position: absolute;
        right: -0.6rem;
        transform: translateX(50%);
    }
}

.send {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
}

.message {
    margin-bottom: .6rem;
    font-size: 1.8rem;
    line-height: 2rem;
}

.description {
    font-size: 1.2rem;
    line-height: 1.4rem;
}
</style>

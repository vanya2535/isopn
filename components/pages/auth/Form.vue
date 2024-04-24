<script lang="ts" setup>
import { AuthFormModesEnum } from './types';
import type { IAuthData, TAuthFields } from '~/types/auth';
import type { IAuthFormModeButton } from '~/types/constants';
import { InputTypesEnum, ButtonTypesEnum } from '~/components/common/types';
import { formTitles, formModeButtons, formModeClasses, formModeActions, requiredModeFormFields } from '~/assets/ts/constants/authForm';
import type { IFetchErrorData } from '~/types/fetch';

interface IAuthFormProps {
    mode: AuthFormModesEnum
    hideModeButtons?: boolean
}

type TAuthDataValidationErrors = Record<keyof TAuthFields, string>

const props = withDefaults(defineProps<IAuthFormProps>(), {
    hideModeButtons: false,
});

const route = useRoute();
const router = useRouter();

const formData = ref<IAuthData>({
    email: '',
    password: '',
    submitPassword: '',
    updateToken: route.query.token || '',
});

const formDataErrors = ref<TAuthDataValidationErrors>({
    email: '',
    password: '',
    submitPassword: '',
});

const title = computed<string>(() => formTitles[props.mode]);
const formClass = computed<string>(() => formModeClasses[props.mode]);
const modeButtons = computed<IAuthFormModeButton[]>(() => formModeButtons.filter(({ mode }) => mode !== props.mode));

const dataLoading = ref<boolean>(false);
const messageSended = ref<boolean>(false);

const isEmailInputVisible = computed<boolean>(() => [AuthFormModesEnum.LOGIN, AuthFormModesEnum.REGISTER, AuthFormModesEnum.RESTORE].includes(props.mode));
const isPasswordInputVisible = computed<boolean>(() => [AuthFormModesEnum.LOGIN, AuthFormModesEnum.REGISTER, AuthFormModesEnum.RESTORE_CONFIRM].includes(props.mode));
const isSubmitPasswordInputVisible = computed<boolean>(() => [AuthFormModesEnum.REGISTER, AuthFormModesEnum.RESTORE_CONFIRM].includes(props.mode));

async function onFormSubmit() {
    let requiredFilled = true;

    requiredModeFormFields[props.mode].forEach((field: keyof TAuthFields) => {
        if (!formData.value[field]) {
            requiredFilled = false;
            formDataErrors.value[field] = 'Поле обязательно для заполнения';
        }
    });

    if (requiredModeFormFields[props.mode].includes('submitPassword') && formData.value.password !== formData.value.submitPassword) {
        formDataErrors.value.submitPassword = 'Пароли не совпадают';
        return;
    }

    if (!requiredFilled) {
        return;
    }

    try {
        dataLoading.value = true;
        await formModeActions[props.mode](formData.value);

        if ([AuthFormModesEnum.LOGIN, AuthFormModesEnum.RESTORE_CONFIRM].includes(props.mode)) {
            router.push('/');
        } else {
            messageSended.value = true;
        }
    } catch (e) {
        const res = e as IFetchErrorData<TAuthFields>;

        if (res.errors) {
            res.errors.forEach(({ path, msg }) => {
                formDataErrors.value[path] = msg;
            });
        }
    } finally {
        dataLoading.value = false;
    }
}

function resetError(path: keyof TAuthFields) {
    formDataErrors.value[path] = '';
}
</script>


<template>
    <form
        :class="[$style.Form, $style[formClass]]"
        autocomplete="off"
        @submit.prevent="onFormSubmit"
    >
        <div :class="$style.left">
            <h1 :class="$style.name">
                isopn
            </h1>
        </div>

        <div :class="$style.right">
            <template v-if="!messageSended">
                <h2 :class="$style.title">
                    {{ title }}
                </h2>

                <div>
                    <CommonVInput
                        v-if="isEmailInputVisible"
                        id="email"
                        v-model="formData.email"
                        :class="$style.input"
                        :type="InputTypesEnum.TEXT"
                        :error="formDataErrors.email"
                        label="Адрес электронной почты"
                        autocomplete="email"
                        @input="resetError('email')"
                    />

                    <CommonVInput
                        v-if="isPasswordInputVisible"
                        id="password"
                        v-model="formData.password"
                        :class="$style.input"
                        :type="InputTypesEnum.PASSWORD"
                        :error="formDataErrors.password"
                        label="Пароль"
                        autocomplete="password"
                        @input="resetError('password')"
                    />

                    <CommonVInput
                        v-if="isSubmitPasswordInputVisible"
                        id="submitPassword"
                        v-model="formData.submitPassword"
                        :class="$style.input"
                        :type="InputTypesEnum.PASSWORD"
                        :error="formDataErrors.submitPassword"
                        label="Подтвердите пароль"
                        autocomplete="off"
                        @input="resetError('submitPassword')"
                    />
                </div>

                <CommonVButton
                    :class="$style.submit"
                    :type="ButtonTypesEnum.SUBMIT"
                    :loading="dataLoading"
                >
                    Подтвердить
                </CommonVButton>

                <div
                    v-if="!hideModeButtons"
                    :class="$style.buttons"
                >
                    <CommonVButton
                        v-for="button in modeButtons"
                        :key="button.mode"
                        :class="$style.button"
                        without-bg
                        @click="$emit('change:mode', button.mode)"
                    >
                        {{ button.title }}
                    </CommonVButton>
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

.title {
    margin-bottom: 1rem;
    color: $base400;
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

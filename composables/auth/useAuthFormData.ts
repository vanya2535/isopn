import { AuthFormModesEnum, type IAuthFormProps } from '~/components/pages/auth/types';
import type { IFetchErrorData } from '~/types/fetch';
import type { IAuthData, TAuthFields } from '~/types/auth';

import { formModeActions, requiredModeFormFields } from '~/assets/ts/constants/authForm';
import { requiredErrorText } from '~/assets/ts/constants/common';

export const useAuthFormData = (props: IAuthFormProps) => {
    const route = useRoute();
    const router = useRouter();

    const formData = ref<IAuthData>({
        email: '',
        password: '',
        submitPassword: '',
        updateToken: route.query.token || '',
    });

    const formDataErrors = ref<Record<keyof TAuthFields, string>>({
        email: '',
        password: '',
        submitPassword: '',
    });

    const dataLoading = ref<boolean>(false);
    const messageSended = ref<boolean>(false);

    const submitButtonDisabled = computed<boolean>(() => Object.values(formDataErrors.value).some(Boolean));

    async function onFormSubmit() {
        let requiredFilled = true;

        requiredModeFormFields[props.mode].forEach((field: keyof TAuthFields) => {
            if (!formData.value[field]) {
                requiredFilled = false;
                formDataErrors.value[field] = requiredErrorText;
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
                await router.push('/');
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

    return {
        formData,
        formDataErrors,
        dataLoading,
        messageSended,
        submitButtonDisabled,

        onFormSubmit,
        resetError,
    };
};

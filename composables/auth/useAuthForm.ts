import { AuthFormModesEnum, type IAuthFormProps } from '~/components/pages/auth/types';
import type { IAuthFormModeButton } from '~/types/constants';
import { formTitles, formModeButtons, formModeClasses } from '~/assets/ts/constants/authForm';

export const useAuthForm = (props: IAuthFormProps) => {
    const title = computed<string>(() => formTitles[props.mode]);
    const formClass = computed<string>(() => formModeClasses[props.mode]);
    const modeButtons = computed<IAuthFormModeButton[]>(() => formModeButtons.filter((button: IAuthFormModeButton) => button.mode !== props.mode));

    const emailInputVisible = computed<boolean>(() => [AuthFormModesEnum.LOGIN, AuthFormModesEnum.REGISTER, AuthFormModesEnum.RESTORE].includes(props.mode));
    const passwordInputVisible = computed<boolean>(() => [AuthFormModesEnum.LOGIN, AuthFormModesEnum.REGISTER, AuthFormModesEnum.RESTORE_CONFIRM].includes(props.mode));
    const submitPasswordInputVisible = computed<boolean>(() => [AuthFormModesEnum.REGISTER, AuthFormModesEnum.RESTORE_CONFIRM].includes(props.mode));

    return {
        title,
        formClass,
        modeButtons,
        emailInputVisible,
        passwordInputVisible,
        submitPasswordInputVisible,
    };
};

import type { IRealtyFormProps } from '~/components/pages/realty/types';

import { formTitles } from '~/assets/ts/constants/realtyForm';

export const useRealtyForm = (props: IRealtyFormProps) => {
    const title = computed(() => formTitles[props.mode]);

    return {
        title,
    };
};

import { RealtyFormModesEnum } from '~/components/pages/realty/types';
import type { TRealtyFunction, TRealtyFunctionPayload } from '~/stores/types/realty';

export const formTitles: Record<RealtyFormModesEnum, string> = {
    [RealtyFormModesEnum.CREATE]: 'Создание записи',
    [RealtyFormModesEnum.UPDATE]: 'Обновление записи',
};

export const formModeActions: Record<RealtyFormModesEnum, TRealtyFunction> = {
    [RealtyFormModesEnum.CREATE]: async ({ input }: TRealtyFunctionPayload) => {
        const realtyStore = useRealtyStore();
        return realtyStore.create(input);
    },

    [RealtyFormModesEnum.UPDATE]: async ({ id, input }: TRealtyFunctionPayload) => {
        const realtyStore = useRealtyStore();
        return realtyStore.update(id as string, input);
    },
};

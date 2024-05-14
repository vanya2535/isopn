import type { IRealty } from '~/stores/types/realty';

// Form
export enum RealtyFormModesEnum {
    CREATE = 'create',
    UPDATE = 'update',
};

export interface IRealtyFormProps {
    mode: RealtyFormModesEnum,
    realty?: IRealty | null,
};

export interface IRealtyFormEmits {
    (e: 'complete'): void,
};

// Chart
export enum ChartDataTypesEnum {
    PRICE = 'price',
    ROOMS = 'rooms',
};

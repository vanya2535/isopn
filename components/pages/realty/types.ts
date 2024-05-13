import type { IRealty } from '~/stores/types/realty';

export enum RealtyFormModesEnum {
    CREATE = 'create',
    UPDATE = 'update',
}

export interface IRealtyFormProps {
    mode: RealtyFormModesEnum,
    realty?: IRealty | null,
}

export interface IRealtyFormEmits {
    (e: 'complete'): void,
}

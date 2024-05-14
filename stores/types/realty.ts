import type { LngLat } from '@yandex/ymaps3-types';
import type { IFetchErrorData } from '../../types/fetch';

export type IRealtyRoom = {
    id: number,
    name: string,
    area: number,
    living: boolean,
};

export type IRealtyAdvantage = {
    id: number,
    name: string,
};

export interface IRealty {
    _id: string,
    images: string[],
    price: number,
    rooms?: IRealtyRoom[],
    link?: string,
    floor?: number,
    location?: string,
    coords: LngLat,
    advantages?: IRealtyAdvantage[],
    disadvantages?: IRealtyAdvantage[],
};

export interface IRealtyInput extends Omit<IRealty, '_id' | 'images'> {
    addImages: File[],
    removeImages: string[],
    price: number,
    floor: number,
};

export enum RealtyRoomRequiredFieldsEnum {
    NAME = 'name',
    AREA = 'area',
};

export type TRealtyRoomError = Record<RealtyRoomRequiredFieldsEnum, string>;

export interface TRealtyInputErrors {
    price: string,
    rooms: Record<number, TRealtyRoomError>,
};

export type TRealtyFunctionPayload = {
    id?: string,
    input: IRealtyInput,
};

export type TRealtyFunction = (payload: TRealtyFunctionPayload) => Promise<IRealty | IFetchErrorData<void>>;

export type TRealtyStat = Record<number, number>;

export interface IRealtyStats {
    price: TRealtyStat,
    rooms: TRealtyStat,
    allPrice: TRealtyStat,
    allRooms: TRealtyStat,
};

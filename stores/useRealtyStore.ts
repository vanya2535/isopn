import { defineStore } from 'pinia';

import type { IFetchErrorData, IFetchError, TRequestResponse } from '~/types/fetch';
import type { IRealty, IRealtyInput, IRealtyStats } from '~/stores/types/realty';

import { objectToFormData } from '~/assets/ts/utils/objectUtils';

export const useRealtyStore = defineStore('realty', () => {
    const { $apiFetcher } = useNuxtApp();

    const realties = ref<IRealty[]>([]);
    const stats = ref<IRealtyStats | null>(null);

    const limit = 20;
    const offset = ref<number>(0);
    const count = ref<number>(0);

    async function create(body: IRealtyInput): Promise<IRealty | IFetchErrorData<void>> {
        try {
            const formData = objectToFormData(body);
            const res = <TRequestResponse<IRealty>> await $apiFetcher.post('/realty/create/', { body: formData });

            realties.value.push(res.result);

            count.value++;
            getStats();
            return Promise.resolve(res.result);
        } catch (e) {
            console.error('store/realty/create: ', e);
            return Promise.reject((e as IFetchError<void>).data);
        }
    }

    async function get(): Promise<IRealty[] | IFetchErrorData<void>> {
        try {
            const res = <TRequestResponse<IRealty[]>> await $apiFetcher.get('/realty/', {
                offset: offset.value,
                limit,
            });

            count.value = res.count || 0;
            offset.value += res.result.length;
            realties.value.push(...res.result);

            return Promise.resolve(res.result);
        } catch (e) {
            console.error('store/realty/get: ', e);
            return Promise.reject((e as IFetchError<void>).data);
        }
    }

    async function update(id: string, body: IRealtyInput): Promise<IRealty | IFetchErrorData<void>> {
        try {
            const formData = objectToFormData(body);
            const res = <TRequestResponse<IRealty>> await $apiFetcher.patch(`/realty/update/${id}/`, { body: formData });

            const realtyIndex = realties.value.findIndex((realty: IRealty) => realty._id === id);
            realties.value[realtyIndex] = res.result;

            getStats();
            return Promise.resolve(res.result);
        } catch (e) {
            console.error('store/realty/update: ', e);
            return Promise.reject((e as IFetchError<void>).data);
        }
    }

    async function remove(id: string): Promise<void | IFetchErrorData<void>> {
        try {
            // const res = <TRequestResponse<void>> await $apiFetcher.delete(`/realty/delete/${id}/`);

            const realtyIndex = realties.value.findIndex((realty: IRealty) => realty._id === id);
            realties.value.splice(realtyIndex, 1);

            count.value--;
            getStats();
            // return Promise.resolve(res.result);
        } catch (e) {
            console.error('store/realty/remove: ', e);
            return Promise.reject((e as IFetchError<void>).data);
        }
    }

    function clear() {
        realties.value.splice(0);
        offset.value = 0;
        count.value = 0;
    }

    async function getStats(): Promise<IRealtyStats | IFetchErrorData<void>> {
        try {
            const res = <TRequestResponse<IRealtyStats>> await $apiFetcher.get('/realty/stats/');

            stats.value = res.result;

            return Promise.resolve(res.result);
        } catch (e) {
            console.error('store/realty/getStats: ', e);
            return Promise.reject((e as IFetchError<void>).data);
        }
    }

    return {
        realties,
        stats,
        limit,
        count,

        create,
        get,
        update,
        remove,
        clear,
        getStats,
    };
});

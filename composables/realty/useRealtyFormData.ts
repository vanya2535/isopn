import type { IRealtyInput, TRealtyInputErrors, IRealtyRoom, TRealtyRoomError } from '~/stores/types/realty';
import type { IMapGeoData } from '~/types/map';
import type { IRealtyFormEmits, IRealtyFormProps } from '~/components/pages/realty/types';

import { requiredErrorText } from '~/assets/ts/constants/common';
import { formModeActions } from '~/assets/ts/constants/realtyForm';
import { baseCoords } from '~/assets/ts/constants/map';

export const useRealtyFormData = (props: IRealtyFormProps, emit: IRealtyFormEmits) => {
    const formData = ref<IRealtyInput>({
        addImages: [],
        removeImages: [],
        price: props.realty?.price || 0,
        rooms: props.realty?.rooms || [],
        link: props.realty?.link || '',
        floor: props.realty?.floor || 0,
        location: props.realty?.location || '',
        coords: props.realty?.coords || baseCoords,
        advantages: props.realty?.advantages || [],
        disadvantages: props.realty?.disadvantages || [],
    });

    const formDataErrors = ref<TRealtyInputErrors>({
        price: '',
        rooms: {},
    });

    const dataLoading = ref<boolean>(false);

    const submitButtonDisabled = computed<boolean>(() => Boolean(formDataErrors.value.price) || Object
        .values(formDataErrors.value.rooms)
        .some((error: TRealtyRoomError) => Object.values(error).some(Boolean)));

    const realtyLoadedImages = computed(() => (props.realty?.images || []).filter(image => !formData.value.removeImages.includes(image)));

    function onRemoveImage(index: number) {
        formData.value.removeImages.push(realtyLoadedImages.value[index]);
    }

    let roomId = 1;
    function onAddRoomButtonClick() {
        formData.value.rooms?.push({
            id: roomId++,
            name: '',
            area: 0,
            living: false,
        });
    }

    function onRemoveRoomButtonClick(index: number) {
        if (formData.value.rooms) {
            const id = formData.value.rooms[index]?.id;
            if (id) {
                delete formDataErrors.value.rooms[id];
            }

            formData.value.rooms.splice(index, 1);
        }
    }

    function resetRoomError(id: number, key: keyof TRealtyRoomError) {
        if (formDataErrors.value.rooms[id]?.[key]) {
            formDataErrors.value.rooms[id][key] = '';
        }
    }


    function onMapInput(geoData: IMapGeoData) {
        formData.value.location = geoData.location;
        formData.value.coords = geoData.coords;
    }

    async function onFormSubmit() {
        let requiredFilled = true;

        if (!formData.value.price) {
            formDataErrors.value.price = requiredErrorText;
            requiredFilled = false;
        }

        formData.value.rooms?.forEach((room: IRealtyRoom) => {
            if (!room.name) {
                formDataErrors.value.rooms[room.id] = formDataErrors.value.rooms[room.id] || {};
                formDataErrors.value.rooms[room.id].name = requiredErrorText;
                requiredFilled = false;
            }
            if (!room.area) {
                formDataErrors.value.rooms[room.id] = formDataErrors.value.rooms[room.id] || {};
                formDataErrors.value.rooms[room.id].area = requiredErrorText;
                requiredFilled = false;
            }
        });

        if (!requiredFilled) {
            return;
        }

        try {
            dataLoading.value = true;
            await formModeActions[props.mode]({ id: props.realty?._id, input: formData.value });
        } catch (e) {} finally {
            dataLoading.value = false;
            emit('complete');
        }
    }

    return {
        formData,
        formDataErrors,
        dataLoading,
        submitButtonDisabled,
        realtyLoadedImages,

        onRemoveImage,
        onAddRoomButtonClick,
        onRemoveRoomButtonClick,
        resetRoomError,
        onMapInput,
        onFormSubmit,
    };
};

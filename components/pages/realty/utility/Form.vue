<script lang="ts" setup>
import type { IRealtyFormProps, IRealtyFormEmits } from '../types';
import { ButtonTypesEnum, InputTypesEnum } from '~/components/ui/types';

import { getRealtyTitle } from '~/assets/ts/utils/realtyUtils';

const props = defineProps<IRealtyFormProps>();
const emit = defineEmits<IRealtyFormEmits>();

const { title } = useRealtyForm(props);

const {
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
} = useRealtyFormData(props, emit);

const realtyTitle = computed<string>(() => getRealtyTitle(formData.value.rooms));
</script>

<template>
    <form
        :class="$style.Form"
        @submit.prevent="onFormSubmit"
    >
        <h2 :class="[$style.title, 'form-title']">
            {{ title }}
            <transition name="slide-top-bottom">
                <span
                    v-if="realtyTitle"
                    :key="realtyTitle"
                    :class="$style.realtyTitle"
                >
                    «{{ realtyTitle }}»
                </span>
            </transition>
        </h2>

        <UiVInputImage
            id="images"
            :class="$style.file"
            :loaded-images="realtyLoadedImages"
            @input="formData.addImages = $event"
            @remove="onRemoveImage"
        />

        <div :class="$style.topInputs">
            <UiVInput
                id="price"
                v-model="formData.price"
                :type="InputTypesEnum.NUMBER"
                :error="formDataErrors.price"
                label="Стоимость, ₽"
                float
                @input="formDataErrors.price = ''"
            />

            <UiVInput
                id="floor"
                v-model="formData.floor"
                :type="InputTypesEnum.NUMBER"
                :max-value="1000"
                label="Этаж"
            />
        </div>

        <transition-group
            :class="$style.rooms"
            tag="div"
            name="slide-bottom"
        >
            <div
                v-for="(room, index) in formData.rooms"
                :key="room.id"
                :class="$style.roomInput"
            >
                <UiVInput
                    :id="`roomName_${index}`"
                    v-model="formData.rooms[index].name"
                    :error="formDataErrors.rooms[room.id]?.name"
                    :maxlength="25"
                    label="Название"
                    @input="resetRoomError(room.id, 'name')"
                />

                <UiVInput
                    :id="`roomArea_${room.id}`"
                    v-model="formData.rooms[index].area"
                    :type="InputTypesEnum.NUMBER"
                    :error="formDataErrors.rooms[room.id]?.area"
                    :max-value="1000"
                    label="Площадь, м²"
                    float
                    @input="resetRoomError(room.id, 'area')"
                />

                <UiVSwitch
                    :id="`roomLiving_${room.id}`"
                    v-model="formData.rooms[index].living"
                    label="Жилое"
                />

                <UiVButton
                    icon="trash"
                    outlined
                    squared
                    @click="onRemoveRoomButtonClick(index)"
                />
            </div>
        </transition-group>

        <UiVButton
            :disabled="formData.rooms.length >= 10"
            :class="$style.button"
            outlined
            icon="plus"
            @click="onAddRoomButtonClick"
        >
            Добавить помещение
        </UiVButton>

        <PagesRealtyAdvantagesInput
            id="advantages"
            v-model="formData.advantages"
            label="Преимущества"
            error-label="преимуществ"
            :class="$style.tags"
        />

        <PagesRealtyAdvantagesInput
            id="disadvantages"
            v-model="formData.disadvantages"
            label="Недостатки"
            error-label="недостатков"
            :class="$style.tags"
        />

        <CommonMap
            :class="$style.map"
            :realty="formData"
            draggable
            @input="onMapInput"
        />

        <UiVInput
            id="link"
            v-model="formData.link"
            label="Ссылка на источник"
        />

        <UiVButton
            :class="$style.submit"
            :type="ButtonTypesEnum.SUBMIT"
            :loading="dataLoading"
            :disabled="submitButtonDisabled"
            primary
        >
            Подтвердить
        </UiVButton>
    </form>
</template>

<style lang="scss" module>
.Form {
    overflow: hidden;
}

.title {
    position: relative;
    display: inline-block;
    min-width: 14.4rem;
    max-width: 16.4rem;
}

.realtyTitle {
    position: absolute;
    left: calc(100% + 0.4rem);
    top: 0;
    white-space: nowrap;
}

.file {
    margin-bottom: .8rem;
}

.topInputs {
    display: grid;
    column-gap: 1rem;
    grid-template-columns: 3fr 1fr;
    margin-bottom: 1.4rem;
}

.roomInput {
    display: grid;
    column-gap: 1rem;
    align-items: center;
    grid-template-columns: 2fr 1fr auto auto;
    margin-bottom: .4rem;
}

.button {
    margin: 0 0 1.4rem auto;
}

.tags {
    margin-bottom: 1.4rem;
}

.map {
    margin-bottom: 1rem;
}

.submit {
    margin-top: 1rem;
    width: 100%;
}
</style>

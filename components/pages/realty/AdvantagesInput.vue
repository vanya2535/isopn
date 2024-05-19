<script lang="ts" setup>
import { NotificationTypesEnum } from '~/stores/types/notification';
import type { IRealtyAdvantage } from '~/stores/types/realty';

interface IRealtyAdvantagesInputProps {
    id: string,
    label: string,
    errorLabel: string,
};

const props = defineProps<IRealtyAdvantagesInputProps>();

const modelValue = defineModel<IRealtyAdvantage[]>();

const notificationStore = useNotificationStore();

let tagId = 1;
function onTagSubmit(name: string) {
    if (modelValue.value && modelValue.value.length < 6) {
        modelValue.value.push({
            id: tagId++,
            name,
        });
    } else {
        notificationStore.pushMessage(`Можно ввести не более 6 ${props.errorLabel}`, NotificationTypesEnum.ERROR);
    }
}

function onTagClick(index: number) {
    modelValue.value?.splice(index, 1);
}
</script>

<template>
    <div :class="$style.AdvantagesInput">
        <UiVInput
            :id="props.id"
            :class="$style.input"
            :label="props.label"
            :maxlength="15"
            sm
            with-submit-button
            @submit="onTagSubmit"
        />

        <PagesRealtyAdvantageTag
            v-for="(tag, index) in modelValue"
            :key="tag.id"
            :advantage="tag"
            clickable
            @click="onTagClick(index)"
        />
    </div>
</template>

<style lang="scss" module>
.AdvantagesInput {
    display: flex;
    gap: .6rem;
    flex-wrap: wrap;
    align-items: center;
}

.input {
    width: 18rem;
}
</style>

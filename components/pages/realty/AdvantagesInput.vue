<script lang="ts" setup>
import type { IRealtyAdvantage } from '~/stores/types/realty';

interface IRealtyAdvantagesInputProps {
    id: string,
    label: string,
};

const props = defineProps<IRealtyAdvantagesInputProps>();

const modelValue = defineModel<IRealtyAdvantage[]>();

let tagId = 1;
function onTagSubmit(name: string) {
    modelValue.value?.push({
        id: tagId++,
        name,
    });
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
            sm
            with-submit-button
            @submit="onTagSubmit"
        />

        <PagesRealtyUtilityTag
            v-for="(tag, index) in modelValue"
            :key="tag.id"
            @click="onTagClick(index)"
        >
            {{ tag.name }}
        </PagesRealtyUtilityTag>
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

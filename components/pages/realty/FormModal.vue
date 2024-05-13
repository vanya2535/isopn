<script lang="ts" setup>
import { type IRealtyFormProps } from './types';

const props = defineProps<IRealtyFormProps>();
</script>

<template>
    <UiVModal
        :class="$style.FormModal"
        @close="$emit('close')"
    >
        <template #default="{onClose}">
            <PagesRealtyUtilityForm
                :mode="props.mode"
                :realty="props.realty"
                @complete="onClose"
            />
        </template>
    </UiVModal>
</template>

<style lang="scss" module>
.FormModal {
    //
}
</style>

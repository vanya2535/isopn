<script lang="ts" setup>
import { ChartDataTypesEnum } from './types';
import { ModalPositionsEnum } from '~/components/ui/types';
import type { IRealtyStats } from '~/stores/types/realty';

interface IRealtyChartModalProps {
    stats: IRealtyStats,
};

const props = defineProps<IRealtyChartModalProps>();
</script>

<template>
    <UiVModal
        :class="$style.ChartModal"
        :position="ModalPositionsEnum.RIGHT"
        @close="$emit('close')"
    >
        <h2 :class="$style.title">
            Ваши предпочтения
        </h2>

        <PagesRealtyUtilityChart
            :class="$style.section"
            label="Ценовой диапазон"
            :stat="props.stats.price"
            :type="ChartDataTypesEnum.PRICE"
        />

        <PagesRealtyUtilityChart
            :class="$style.section"
            label="Комнатность"
            :stat="props.stats.rooms"
            :type="ChartDataTypesEnum.ROOMS"
        />

        <h2 :class="$style.title">
            Предпочтения пользователей
        </h2>

        <PagesRealtyUtilityChart
            :class="$style.section"
            label="Ценовой диапазон"
            :stat="props.stats.allPrice"
            :type="ChartDataTypesEnum.PRICE"
        />

        <PagesRealtyUtilityChart
            :class="$style.section"
            label="Комнатность"
            :stat="props.stats.allRooms"
            :type="ChartDataTypesEnum.ROOMS"
        />
    </UiVModal>
</template>

<style lang="scss" module>
.ChartModal {
    //
}

.title {
    margin-bottom: 2rem;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 1.8rem;
    color: $base400;
}

.section {
    margin-bottom: 4rem;
}
</style>

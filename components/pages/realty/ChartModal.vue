<script lang="ts" setup>
import type { ChartItem } from 'chart.js/auto';

import Chart from 'chart.js/auto';
import { splitThousands } from '~/assets/ts/utils/numberUtils';
import { ModalPositionsEnum } from '~/components/ui/types';
import type { IRealtyStats } from '~/stores/types/realty';


interface IRealtyChartModalProps {
    stats: IRealtyStats,
}

const props = defineProps<IRealtyChartModalProps>();

const priceChartRef = ref<ChartItem | null>(null);
const roomsChartRef = ref<ChartItem | null>(null);

onMounted(() => {
    new Chart(priceChartRef.value as ChartItem, {
        type: 'pie',
        data: {
            labels: Object.keys(props.stats.price).map(segment => `около ${splitThousands(Number(segment))} млн. ₽`),

            datasets: [{
                data: Object.values(props.stats.price),
            }],
        },
    });

    new Chart(roomsChartRef.value as ChartItem, {
        type: 'pie',
        data: {
            labels: Object.keys(props.stats.rooms).map(count => Number(count)
                ? `${splitThousands(Number(count))}-комнатные`
                : 'Комнаты не указаны'),

            datasets: [{
                data: Object.values(props.stats.rooms),
            }],
        },
    });
});
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

        <div :class="$style.section">
            <h3 :class="$style.sectionTitle">
                Ценовой диапазон:
            </h3>

            <canvas
                ref="priceChartRef"
                :class="$style.chart"
            />
        </div>

        <div :class="$style.section">
            <h3 :class="$style.sectionTitle">
                Комнатность:
            </h3>

            <canvas
                ref="roomsChartRef"
                :class="$style.chart"
            />
        </div>
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
}

.section {
    margin-bottom: 4rem;
}

.sectionTitle {
    margin-bottom: 1rem;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.6rem;
}

.chart {
    margin: 0 auto;
}
</style>

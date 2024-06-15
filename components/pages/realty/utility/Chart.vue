<script lang="ts" setup>
import Chart from 'chart.js/auto';

import type { ChartItem } from 'chart.js/auto';
import { ChartDataTypesEnum } from '../types';
import type { TRealtyStat } from '~/stores/types/realty';

import { splitThousands } from '~/assets/ts/utils/numberUtils';

interface IChartProps {
    label: string,
    stat: TRealtyStat,
    type: ChartDataTypesEnum,
}

const props = defineProps<IChartProps>();

const dataMapCallbacks = {
    [ChartDataTypesEnum.PRICE]: (segment: string) => `около ${splitThousands(Number(segment))} млн. ₽`,
    [ChartDataTypesEnum.ROOMS]: (count: string) => Number(count) ? `${splitThousands(Number(count))}-комнатные` : 'Комнатность не указана',
};

const chartRef = ref<ChartItem | null>(null);

const chartVisible = computed<boolean>(() => Boolean(Object.values(props.stat).length));

let chartInstance: Chart<'pie', number[], string> | null = null;
onMounted(() => {
    if (chartRef.value) {
        chartInstance = new Chart(chartRef.value, {
            type: 'pie',
            data: {
                labels: Object.keys(props.stat).map(dataMapCallbacks[props.type]),
                datasets: [{
                    data: Object.values(props.stat),
                }],
            },
        });
    }
});

onBeforeUnmount(() => {
    if (chartInstance) {
        chartInstance.destroy();
    }
});
</script>

<template>
    <div :class="$style.Chart">
        <h3 :class="$style.title">
            {{ label }}:
        </h3>

        <canvas
            v-if="chartVisible"
            ref="chartRef"
            :class="$style.chart"
        />

        <p
            v-else
            :class="$style.empty"
        >
            Недостаточно данных
        </p>
    </div>
</template>

<style lang="scss" module>
.Chart {
    //
}

.title {
    margin-bottom: 1rem;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.6rem;
    color: $base300;
}

.empty {
    font-size: 1.4rem;
    line-height: 1.6rem;
    color: $base200;
}

.chart {
    margin: 0 auto;
}
</style>

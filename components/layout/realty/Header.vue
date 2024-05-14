<script lang="ts" setup>
import { RealtyFormModesEnum } from '~/components/pages/realty/types';

const userStore = useUserStore();
const realtyStore = useRealtyStore();

const formModalOpened = ref<boolean>(false);
const chartModalOpened = ref<boolean>(false);

onMounted(() => {
    realtyStore.getStats();
});
</script>

<template>
    <header :class="$style.Header">
        <div :class="[$style.content, 'container']">
            <div :class="$style.part">
                <UiVButton
                    icon="plus"
                    outlined
                    squared
                    @click="formModalOpened = true"
                />
            </div>

            <div :class="$style.info">
                <h2 :class="$style.title">
                    ISOPN
                </h2>

                <p :class="$style.description">
                    Информационная система организации подбора недвижимости
                </p>
            </div>

            <div :class="$style.part">
                <UiVButton
                    icon="chart"
                    outlined
                    squared
                    @click="chartModalOpened = true"
                />

                <UiVButton
                    icon="logout"
                    outlined
                    squared
                    @click="userStore.logout"
                />
            </div>
        </div>

        <transition name="fade">
            <PagesRealtyFormModal
                v-if="formModalOpened"
                :mode="RealtyFormModesEnum.CREATE"
                @close="formModalOpened = false"
            />
        </transition>

        <transition name="fade">
            <PagesRealtyChartModal
                v-if="chartModalOpened"
                :stats="realtyStore.stats"
                @close="chartModalOpened = false"
            />
        </transition>
    </header>
</template>

<style lang="scss" module>
.Header {
    border-bottom: .1rem solid $base400;
    padding: 1rem 0;
    height: $header-height;
    background-color: $base0;
}

.content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.part {
    display: flex;
    column-gap: 1rem;
    align-items: center;
    width: 9.8rem;
}

.info {
    text-align: center;
}

.title {
    font-weight: 700;
    font-size: 2.6rem;
    line-height: 1;
    color: $base400;
}

.description {
    font-size: 1.6;
    line-height: 1;
    color: $base300;

    @include respond-to(mobile) {
        display: none;
    }
}
</style>

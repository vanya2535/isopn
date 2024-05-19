<script lang="ts" setup>
import type { SwiperOptions } from 'swiper/types/swiper-options';
import type { IRealty } from '~/stores/types/realty';

interface IRealtyCompareSectionProps {
    title: string,
    realties: IRealty[],
    sliderOptions: SwiperOptions,
};

const props = defineProps<IRealtyCompareSectionProps>();

const { sliderRef, initSlider } = useSlider(props.sliderOptions);

onMounted(() => {
    initSlider();
});
</script>

<template>
    <section :class="[$style.CompareSection, 'container']">
        <h2 :class="$style.title">
            {{ props.title }}
        </h2>

        <div
            ref="sliderRef"
            :class="$style.slider"
        >
            <div :class="[$style.row, 'swiper-wrapper']">
                <div
                    v-for="realty in props.realties"
                    :key="realty._id"
                    :class="[$style.column, 'swiper-slide']"
                >
                    <slot :realty="realty" />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" module>
.CompareSection {
    overflow: hidden;
}

.title {
    margin-bottom: 2rem;
    border-bottom: .1rem solid $base400;
    padding-bottom: .4rem;
    width: 100%;
    font-size: 2rem;
    line-height: 2.2rem;
}

.row {
    display: flex;
    align-items: center;
    padding-bottom: .2rem;
}

.column {
    padding: 1rem;
    width: 40rem;
    min-width: 40rem;
    text-align: center;

    @include respond-to(mobile) {
        width: 100%;
    }
}
</style>

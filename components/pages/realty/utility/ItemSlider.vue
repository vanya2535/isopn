<script lang="ts" setup>
import Swiper from 'swiper';
import { EffectFade } from 'swiper/modules';
import 'swiper/scss/effect-fade';

import { getLoadedImageSrc } from '~/assets/ts/utils/fileUtils';

interface IIremSliderProps {
    images?: string[],
};

const props = withDefaults(defineProps<IIremSliderProps>(), {
    images: () => [],
});

const currentSlideIndex = ref<number>(0);
const { slider, sliderRef, initSlider } = useSlider({
    modules: [EffectFade],
    effect: 'fade',
    slidesPerView: 1,

    breakpoints: {
        1024: {
            allowTouchMove: false,
        },
    },

    on: {
        slideChange: (swiper: Swiper) => {
            currentSlideIndex.value = swiper.activeIndex;
        },
    },
});

watch(() => props.images, () => {
    nextTick(() => {
        slider.value?.update();
    });
}, {
    deep: true,
});

function onHoverMouseOver(index: number) {
    slider.value.slideTo(index);
}

onMounted(() => {
    if (props.images.length) {
        initSlider();
    }
});
</script>

<template>
    <div
        v-if="props.images.length"
        ref="sliderRef"
        :class="$style.ItemSlider"
    >
        <div class="swiper-wrapper">
            <img
                v-for="(slide, index) in props.images"
                :key="index"
                :class="[$style.image, 'swiper-slide']"
                :src="getLoadedImageSrc(slide)"
            >

            <div
                :class="$style.hovers"
                @mouseleave="onHoverMouseOver(0)"
            >
                <div
                    v-for="(_, index) in props.images"
                    :key="index"
                    :class="$style.hover"
                    @mouseover="onHoverMouseOver(index)"
                />
            </div>

            <div :class="$style.visualHovers">
                <div
                    v-for="(_, index) in props.images"
                    :key="index"
                    :class="[$style.visualHover, {[$style._current]: index === currentSlideIndex}]"
                />
            </div>
        </div>
    </div>

    <div
        v-else
        :class="[$style.ItemSlider, $style._empty]"
    >
        <SvgIcon
            :class="$style.icon"
            name="layout"
        />
    </div>
</template>

<style lang="scss" module>
.ItemSlider {
    position: relative;
    overflow: hidden;
    margin-bottom: 2rem;
    border: .1rem solid $base400;
    border-radius: .8rem;
    height: 18rem;

    &._empty {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 3rem;
        color: $base0;
        background-color: $base300;
        pointer-events: none;
        user-select: none;
    }

    @include respond-to(mobile) {
        height: 24rem;
    }
}

.hovers {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    display: flex;
    width: 100%;
    height: 100%;
    opacity: 0;

    @include respond-to(mobile) {
        display: none;
    }
}

.visualHovers {
    position: absolute;
    bottom: 0;
    z-index: 2;
    display: flex;
    column-gap: .4rem;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
    width: 100%;
    height: 3rem;
    background: linear-gradient(0deg, rgba($color: $base400, $alpha: 60%) 0%, rgba($color: $base400, $alpha: 0%) 100%);
}

.visualHover {
    border-radius: .1rem;
    width: 1rem;
    height: .2rem;
    background-color: $base0;
    opacity: .2;
    transition: opacity .3s ease;

    &._current {
        opacity: 1;
    }
}

.hover {
    width: 100%;
    height: 100%;
}

.icon {
    width: 6rem;
    height: 6rem;
    color: $base0;
}
</style>

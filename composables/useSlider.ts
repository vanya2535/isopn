import type { SwiperOptions } from 'swiper/types/swiper-options';

import Swiper from 'swiper';

import 'swiper/css';

export const useSlider = (options: SwiperOptions = {}) => {
    const sliderRef = ref<HTMLElement | null>(null);
    const slider = ref<Swiper | null>(null);

    function initSlider() {
        if (sliderRef.value) {
            slider.value = new Swiper(sliderRef.value, options);
        }
    }

    return {
        slider,
        sliderRef,

        initSlider,
    };
};

<script lang="ts" setup>
import { ModalPositionsEnum } from '../ui/types';

import { getLoadedImageSrc } from '~/assets/ts/utils/fileUtils';

interface IGalleryModalProps {
    images: string[],
};

const props = defineProps<IGalleryModalProps>();

const sliderMove = ref<boolean>(false);
const { sliderRef, initSlider } = useSlider({
    slidesPerView: 'auto',

    on: {
        touchMove: () => {
            sliderMove.value = true;
        },

        touchEnd: () => {
            sliderMove.value = false;
        },
    },
});

onMounted(() => {
    initSlider();
});
</script>

<template>
    <UiVModal
        :class="$style.GalleryModal"
        :position="ModalPositionsEnum.CENTER"
        @close="$emit('close')"
    >
        <div
            v-if="props.images.length"
            ref="sliderRef"
            :class="[$style.slider, {[$style._move]: sliderMove}]"
        >
            <div class="swiper-wrapper">
                <img
                    v-for="(slide, index) in props.images"
                    :key="index"
                    :class="[$style.image, 'swiper-slide']"
                    :src="getLoadedImageSrc(slide)"
                >
            </div>
        </div>
    </UiVModal>
</template>

<style lang="scss" module>
.GalleryModal {
    //
}

.slider {
    overflow: hidden;
    cursor: grab;

    &._move {
        cursor: grabbing;
    }
}

.slider,
.image {
    border-radius: .8rem;
    width: 100%;
    height: 100%;

    @include respond-to(mobile) {
        height: 40rem;
    }
}
</style>

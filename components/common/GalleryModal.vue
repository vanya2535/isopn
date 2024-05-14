<script lang="ts" setup>
import { ModalPositionsEnum } from '../ui/types';

import { getLoadedImageSrc } from '~/assets/ts/utils/fileUtils';

interface IGalleryModalProps {
    images: string[],
};

const props = defineProps<IGalleryModalProps>();

const { sliderRef, initSlider } = useSlider({});

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
            :class="$style.slider"
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
    border-radius: .8rem;
}

.slider,
.image {
    width: 100%;
    height: 100%;

    @include respond-to(mobile) {
        max-height: 40rem;
    }
}
</style>

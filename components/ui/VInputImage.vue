<script lang="ts" setup>
import type { ISlide } from './types';
import type { ReadedImage } from '~/types/utils';

import { readImage, getLoadedImageSrc } from '~/assets/ts/utils/fileUtils';

interface IInputImageProps {
    id: string,
    loadedImages: string[],
};

interface IInputImageEmits {
    (e: 'input', value: File[]): void,
    (e: 'remove', index: number): void,
}

const props = defineProps<IInputImageProps>();
const emit = defineEmits<IInputImageEmits>();

const sliderMove = ref<boolean>(false);
const { slider, sliderRef, initSlider } = useSlider({
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

const files = ref<Record<number, File>>({});
const images = ref<Record<number, ReadedImage>>({});

const filesArray = computed<Array<File>>(() => Object.values(files.value));
const loadedSlides = computed<ISlide[]>(() => props.loadedImages.map((image: string, index: number) => ({ id: `loaded_${index}`, src: getLoadedImageSrc(image) })));
const slides = computed<ISlide[]>(() => Object.entries(images.value).map((entry: [string, ReadedImage]) => ({ id: entry[0], src: entry[1] })));


let slideId = 1;
function onFileInput(input: File[]) {
    input.forEach(async file => {
        const currenId = slideId++;

        files.value[currenId] = file;
        images.value[currenId] = await readImage(file);
    });

    emit('input', filesArray.value);
}

function onRemoveFile(index: number) {
    delete files.value[index];
    delete images.value[index];

    emit('input', filesArray.value);
}

watch(loadedSlides, () => {
    if (slider.value) {
        slider.value.updateSlides();
    } else {
        initSlider();
    }
}, {
    immediate: true,
});

watch(slides, () => {
    if (slider.value) {
        slider.value.updateSlides();
    } else {
        initSlider();
    }
});
</script>

<template>
    <div :class="$style.VInputImage">
        <UiVInputFile
            :id="props.id"
            :class="$style.input"
            :count="filesArray.length + loadedSlides.length"
            :max-count="10"
            accept="image/jpeg, image/png, image/webp"
            multiple
            @input="onFileInput"
        />

        <transition name="fade">
            <div
                v-if="loadedSlides.length || slides.length"
                ref="sliderRef"
                :class="$style.filesWrapper"
            >
                <div :class="[$style.files, 'swiper-wrapper', {[$style._move]: sliderMove}]">
                    <UiUtilityInputImageSlide
                        v-for="(slide, index) in loadedSlides"
                        :key="slide.id"
                        :slide="slide"
                        :class="$style.slide"
                        @remove="$emit('remove', index)"
                    />

                    <UiUtilityInputImageSlide
                        v-for="slide in slides"
                        :key="slide.id"
                        :slide="slide"
                        :class="$style.slide"
                        @remove="onRemoveFile"
                    />
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="scss" module>
.VInputImage {
    //
}

.input {
    height: 10rem;
}

.filesWrapper {
    overflow: hidden;
    margin-top: .6rem;
    border: .1rem solid $base50;
    border-radius: .6rem;
    padding: .8rem;
    height: auto;
}

.files {
    display: flex;
    cursor: grab;

    &._move {
        cursor: grabbing;
    }
}

.slide:not(:last-child) {
    margin-right: .8rem;
}
</style>

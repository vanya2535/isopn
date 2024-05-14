<script lang="ts" setup>
import type { ISlide } from '~/components/ui/types';

interface IInputImageSlideProps {
    slide: ISlide,
};

const props = defineProps<IInputImageSlideProps>();
</script>

<template>
    <div :class="[$style.InputImageSlide, 'swiper-slide']">
        <img
            v-if="props.slide.src"
            :src="props.slide.src"
            :class="$style.image"
        />

        <button
            :class="$style.button"
            type="button"
            @click="$emit('remove', props.slide.id)"
        >
            <SvgIcon
                :class="$style.icon"
                name="close"
            />
        </button>
    </div>
</template>

<style lang="scss" module>
.InputImageSlide:global(.swiper-slide) {
    position: relative;
    overflow: hidden;
    border-radius: .6rem;
    width: 10rem;
    height: 6rem;
}

.button {
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 0 .6rem 0 .6rem;
    padding: .2rem;
    width: 2rem;
    height: 2rem;
    box-shadow: -.1rem .1rem .2rem $base100;
    background-color: $base0;
    transition: box-shadow .3s ease;

    &:hover {
        @include respond-to(desktop) {
            box-shadow: -.1rem .1rem .2rem $base0;

            .icon {
                color: $base200;
            }
        }
    }

    &:active {
        @include respond-to(desktop) {
            box-shadow: -.1rem .1rem .2rem $base0;

            .icon {
                color: $base100;
            }
        }
    }
}

.icon {
    width: 1.4rem;
    height: 1.4rem;
    color: $base300;
    transition: color .3s ease;
}
</style>

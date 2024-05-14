<script lang="ts" setup>
import type { IRealty, IRealtyInput } from '~/stores/types/realty';
import type { IMapGeoData } from '~/types/map';

interface ICommonMapProps {
    realty: IRealty | IRealtyInput,
};

interface ICommonMapEmits {
    (e: 'input', geoData: IMapGeoData): void,
};

const props = defineProps<ICommonMapProps>();
const emit = defineEmits<ICommonMapEmits>();

const { mapRef, mapReady, geoData } = useMap(true, props.realty.coords);

watch(geoData, value => {
    emit('input', value);
}, {
    deep: true,
});
</script>

<template>
    <div :class="$style.Map">
        <transition name="fade">
            <h3
                v-if="mapReady"
                :class="$style.label"
            >
                Местоположение
            </h3>
        </transition>

        <p :class="$style.value">
            {{ realty.location }}
        </p>

        <transition name="fade">
            <div
                v-show="mapReady"
                ref="mapRef"
                :class="$style.map"
            >
            </div>
        </transition>

        <transition name="fade">
            <div
                v-show="!mapReady"
                :class="$style.loader"
            >
                <h3 class="loading">
                    ISOPN
                </h3>
            </div>
        </transition>
    </div>
</template>

<style lang="scss" module>
.Map {
    position: relative;
    display: flex;
    flex-direction: column;
    border: .1rem solid $base50;
    border-radius: .6rem;
    width: 100%;
    height: 30rem;
}

.label {
    position: absolute;
    left: 1rem;
    top: -.7rem;
    z-index: 1;
    padding: 0 .4rem;
    font-size: 1.2rem;
    line-height: 1.4rem;
    color: $base100;
    transition: all .3s ease;
    pointer-events: none;
    user-select: none;
}

.value {
    display: flex;
    align-items: center;
    border-radius: .6rem;
    padding: 1.2rem 1.4rem;
    min-height: 6rem;
    font-size: 1.6rem;
    line-height: 1.8rem;
}

.map {
    overflow: hidden;
    border-radius: .6rem;
    width: 100%;
    height: 100%;

    :global(.ymaps3x0--map-copyrights) {
        display: none;
    }

    :global(.map-icon) {
        position: absolute;
        bottom: 100%;
        width: 4rem;
        height: 4rem;
        color: $base300;
        transform: translateX(-50%);
        transition: color .3s ease;

        &:global(._draggable) {
            &:hover {
                @include respond-to(desktop) {
                    color: $base200;
                    cursor: grab;
                }
            }

            &:active {
                @include respond-to(desktop) {
                    color: $base100;
                    cursor: grabbing;
                }
            }
        }
    }
}

.loader {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: .6rem;
    width: 100%;
    height: 100%;
    font-size: 4.4rem;
    line-height: 4.4rem;
}
</style>

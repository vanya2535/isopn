<script lang="ts" setup>
import { RealtyFormModesEnum } from '~/components/pages/realty/types';
import type { IRealty } from '~/stores/types/realty';

import { cloneDeep } from '~/assets/ts/utils/objectUtils';
import { splitThousands, plural } from '~/assets/ts/utils/numberUtils';

definePageMeta({
    layout: 'realty',
});

const config = useRuntimeConfig();
useHead({
    title: 'ISOPN / Объекты недвижимости',
    script: [{
        src: `https://api-maps.yandex.ru/v3/?apikey=${config.public.YMAPS_KEY}&lang=ru_RU`,
    }],
});

const realtyStore = useRealtyStore();

const loaded = ref<boolean>(false);
const dataLoading = ref<boolean>(false);
const realtyToUpdate = ref<IRealty | null>(null);
const formModalOpened = ref<boolean>(false);
const galleryImages = ref<string[]>([]);
const galleryModalOpened = ref<boolean>(false);

useAsyncData(async () => {
    if (process.client) {
        await realtyStore.get();
        loaded.value = true;
    }
});

const loadMoreAvailable = computed<boolean>(() => realtyStore.realties.length < realtyStore.count);
const moreCount = computed<number>(() => realtyStore.count - realtyStore.realties.length);

function getItemZIndex(index: number) {
    return realtyStore.realties.length - index;
}

function onRealtyUpdate(realty: IRealty) {
    realtyToUpdate.value = cloneDeep(realty);
    formModalOpened.value = true;
}

async function onMoreButtonClick() {
    try {
        dataLoading.value = true;
        await realtyStore.get();
    } catch (e) {} finally {
        dataLoading.value = false;
    }
}

function onItemGalleryOpen(images: string[]) {
    galleryImages.value = images;
    galleryModalOpened.value = true;
}
</script>

<template>
    <main :class="[$style.RealtyPage, 'page']">
        <div :class="$style.pie" />

        <section :class="[$style.realties, 'container']">
            <transition-group name="slide-top-bottom">
                <PagesRealtyItem
                    v-for="(realty, index) in realtyStore.realties"
                    :key="realty._id"
                    :realty="realty"
                    :style="`z-index: ${getItemZIndex(index)}`"
                    @gallery="onItemGalleryOpen"
                    @update="onRealtyUpdate"
                    @remove="realtyStore.remove($event)"
                />
            </transition-group>
        </section>

        <transition name="fade">
            <UiVButton
                v-if="loadMoreAvailable"
                :class="$style.button"
                :loading="dataLoading"
                primary
                @click="onMoreButtonClick"
            >
                Показать еще {{ splitThousands(realtyStore.limit) }} из {{ splitThousands(moreCount) }} квартир{{ plural(moreCount, ['ы', '', '']) }}
            </UiVButton>
        </transition>

        <section
            v-if="!realtyStore.realties.length && loaded"
            class="container"
        >
            <p :class="$style.empty">
                У вас еще нет записей, но вы можете добавить их, нажав на кнопку в меню
            </p>
        </section>

        <transition name="fade">
            <PagesRealtyFormModal
                v-if="formModalOpened"
                :mode="RealtyFormModesEnum.UPDATE"
                :realty="realtyToUpdate"
                @close="formModalOpened = false"
            />
        </transition>

        <transition name="fade">
            <CommonGalleryModal
                v-if="galleryModalOpened"
                :images="galleryImages"
                @close="galleryModalOpened = false"
            />
        </transition>
    </main>
</template>

<style lang="scss" module>
.RealtyPage {
    padding-top: calc($header-height + 2rem);
    padding-bottom: 4rem;
}

.realties {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(4, calc(25% - 1.5rem));
    gap: 4rem 2rem;

    @include respond-to(mobile) {
        grid-template-columns: 100%;
    }
}

.button {
    margin: 8rem auto 0;
}

.empty {
    font-size: 2rem;
    line-height: 1;
}
</style>

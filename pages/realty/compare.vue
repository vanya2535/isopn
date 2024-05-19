<script lang="ts" setup>
import { Navigation } from 'swiper/modules';

import type { SwiperOptions } from 'swiper/types/swiper-options';
import type { IRealty } from '~/stores/types/realty';
import type { TVueComponentRef } from '~/types/implement';

import { splitThousands } from '~/assets/ts/utils/numberUtils';
import { getRealtyTitle } from '~/assets/ts/utils/realtyUtils';

definePageMeta({
    layout: 'realty',
});

const router = useRouter();
const config = useRuntimeConfig();

useHead({
    title: 'ISOPN / Сравнение объектов недвижимости',
    script: [{
        src: `https://api-maps.yandex.ru/v3/?apikey=${config.public.YMAPS_KEY}&lang=ru_RU`,
    }],
});

const realtyStore = useRealtyStore();

const realties = ref<IRealty[]>(Object.values(realtyStore.compareMap));

const prevButtonRef = ref<TVueComponentRef>(null);
const nextButtonRef = ref<TVueComponentRef>(null);
const sliderOptions = ref<SwiperOptions | null>(null);

function getRealtyRooms(realty: IRealty): string[] {
    return realty.rooms?.map(({ name, area }) => `${name} - ${splitThousands(area)} м²`) || [];
}

onMounted(() => {
    sliderOptions.value = {
        modules: [Navigation],

        slidesPerView: 1,
        allowTouchMove: false,

        navigation: {
            prevEl: prevButtonRef.value?.$el,
            nextEl: nextButtonRef.value?.$el,
        },

        breakpoints: {
            1024: {
                slidesPerView: 3,
            },
        },
    };
});
</script>

<template>
    <div :class="[$style.ComparePage, 'page']">
        <template v-if="realties.length">
            <div :class="$style.buttons">
                <UiVButton
                    ref="prevButtonRef"
                    icon="chevron-left"
                    squared
                    primary
                />

                <UiVButton
                    ref="nextButtonRef"
                    icon="chevron-right"
                    squared
                    primary
                />
            </div>

            <template v-if="sliderOptions">
                <PagesRealtyCompareSection
                    :class="$style.section"
                    :realties="realties"
                    :slider-options="sliderOptions"
                    title="Изображения"
                >
                    <template #default="{realty}">
                        <PagesRealtyUtilityItemSlider :images="realty.images" />
                    </template>
                </PagesRealtyCompareSection>

                <PagesRealtyCompareSection
                    :class="$style.section"
                    :realties="realties"
                    :slider-options="sliderOptions"
                    title="Комнатность, метраж"
                >
                    <template #default="{realty}">
                        <template v-if="realty.rooms?.length">
                            <a
                                v-if="realty.link"
                                :href="realty.link"
                                target="_blank"
                                :class="[$style.value, $style._link]"
                            >
                                {{ getRealtyTitle(realty.rooms) }}
                            </a>

                            <h3
                                v-else
                                :class="$style.value"
                            >
                                {{ getRealtyTitle(realty.rooms) }}
                            </h3>
                        </template>

                        <p
                            v-else
                            :class="[$style.value, $style._empty]"
                        >
                            Недостаточно данных
                        </p>
                    </template>
                </PagesRealtyCompareSection>

                <PagesRealtyCompareSection
                    :class="$style.section"
                    :realties="realties"
                    :slider-options="sliderOptions"
                    title="Стоимость"
                >
                    <template #default="{realty}">
                        <p :class="$style.value">
                            {{ splitThousands(realty.price) }} ₽
                        </p>
                    </template>
                </PagesRealtyCompareSection>

                <PagesRealtyCompareSection
                    :class="$style.section"
                    :realties="realties"
                    :slider-options="sliderOptions"
                    title="Этаж"
                >
                    <template #default="{realty}">
                        <p
                            v-if="realty.floor"
                            :class="$style.value"
                        >
                            {{ splitThousands(realty.floor) }}
                        </p>

                        <p
                            v-else
                            :class="[$style.value, $style._empty]"
                        >
                            Не указан
                        </p>
                    </template>
                </PagesRealtyCompareSection>

                <PagesRealtyCompareSection
                    :class="$style.section"
                    :realties="realties"
                    :slider-options="sliderOptions"
                    title="Помещения"
                >
                    <template #default="{realty}">
                        <template v-if="realty.rooms?.length">
                            <p
                                v-for="room in getRealtyRooms(realty)"
                                :key="`room_${realty.id}_${room.id}`"
                                :class="$style.value"
                            >
                                {{ room }}
                            </p>
                        </template>

                        <p
                            v-else
                            :class="[$style.value, $style._empty]"
                        >
                            Не указаны
                        </p>
                    </template>
                </PagesRealtyCompareSection>

                <PagesRealtyCompareSection
                    :class="$style.section"
                    :realties="realties"
                    :slider-options="sliderOptions"
                    title="Преимущества"
                >
                    <template #default="{realty}">
                        <div
                            v-if="realty.advantages.length"
                            :class="$style.advantages"
                        >
                            <PagesRealtyAdvantageTag
                                v-for="advantage in realty.advantages"
                                :key="`advantage_${realty.id}_${advantage.id}`"
                                :advantage="advantage"
                            />
                        </div>

                        <p
                            v-else
                            :class="[$style.value, $style._empty]"
                        >
                            Не указаны
                        </p>
                    </template>
                </PagesRealtyCompareSection>

                <PagesRealtyCompareSection
                    :class="$style.section"
                    :realties="realties"
                    :slider-options="sliderOptions"
                    title="Недостатки"
                >
                    <template #default="{realty}">
                        <div
                            v-if="realty.disadvantages.length"
                            :class="$style.advantages"
                        >
                            <PagesRealtyAdvantageTag
                                v-for="disadvantage in realty.disadvantages"
                                :key="`disadvantage_${realty.id}_${disadvantage.id}`"
                                :advantage="disadvantage"
                            />
                        </div>
                        <p
                            v-else
                            :class="[$style.value, $style._empty]"
                        >
                            Не указаны
                        </p>
                    </template>
                </PagesRealtyCompareSection>

                <PagesRealtyCompareSection
                    :class="$style.section"
                    :realties="realties"
                    :slider-options="sliderOptions"
                    title="Местоположение"
                >
                    <template #default="{realty}">
                        <CommonMap
                            v-if="realty.location"
                            :realty="realty"
                            no-label
                        />

                        <p
                            v-else
                            :class="[$style.value, $style._empty]"
                        >
                            Не указано
                        </p>
                    </template>
                </PagesRealtyCompareSection>
            </template>
        </template>

        <template v-else>
            <section :class="[$style.empty, 'container']">
                <h2 :class="$style.emptyTitle">
                    Недостаточно объектов для сравнения
                </h2>

                <UiVButton
                    primary
                    @click="router.push('/realty')"
                >
                    Выбрать объект
                </UiVButton>
            </section>
        </template>
    </div>
</template>

<style lang="scss" module>
.ComparePage {
    display: flex;
    flex-direction: column;
    padding-top: calc($header-height + 2rem);
    padding-bottom: 6rem;

    @include respond-to(mobile) {
        padding-bottom: 6.4rem;
    }
}

.buttons {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 140rem;
    background: transparent;
    transform: translate(-50%, 50%);

    @include respond-to(mobile) {
        top: unset;
        bottom: 0;
        padding: 1rem 2rem;
        transform: translateX(-50%);
    }
}

.section {
    z-index: 1;
    margin-top: 1rem;

    &:not(:last-child) {
        margin-bottom: 1rem;
    }
}

.value {
    font-size: 1.8rem;
    line-height: 2rem;
    color: $base400;

    &._link {
        text-decoration: underline;
        transition: color .3s ease;

        &:hover {
            @include respond-to(desktop) {
                color: $base200;
            }
        }

        &:active {
            @include respond-to(desktop) {
                color: $base100;
            }
        }
    }

    &._empty {
        opacity: $disabled-opacity;
    }

    &:not(:last-child) {
        margin-bottom: 1rem;
    }
}

.advantages {
    display: flex;
    gap: .8rem;
    flex-wrap: wrap;
    justify-content: center;
}

.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
}

.emptyTitle {
    margin-bottom: 2rem;
    font-size: 2rem;
    line-height: 2.2rem;
    color: $base400;
}
</style>

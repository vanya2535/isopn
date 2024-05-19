<script lang="ts" setup>
import { RealtyFormModesEnum } from '~/components/pages/realty/types';
import { NotificationTypesEnum } from '~/stores/types/notification';

import { splitThousands } from '~/assets/ts/utils/numberUtils';

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();
const notificationStore = useNotificationStore();
const realtyStore = useRealtyStore();

const formModalOpened = ref<boolean>(false);
const chartModalOpened = ref<boolean>(false);

const actionsVisible = computed<boolean>(() => route.name === 'realty');
const compareCount = computed<number>(() => Object.values(realtyStore.compareMap).length);

function onCompareButtonClick() {
    if (!compareCount.value) {
        notificationStore.pushMessage('Выберите объекты недвижимости для сравнения', NotificationTypesEnum.ERROR);
    } else {
        router.push('/realty/compare');
    }
}

onMounted(() => {
    realtyStore.getStats();
});
</script>

<template>
    <header :class="$style.Header">
        <div :class="[$style.content, 'container']">
            <div :class="$style.part">
                <transition name="fade">
                    <UiVButton
                        v-if="actionsVisible"
                        icon="plus"
                        outlined
                        squared
                        @click="formModalOpened = true"
                    />
                </transition>

                <transition name="fade">
                    <UiVButton
                        v-if="actionsVisible"
                        :class="$style.button"
                        icon="compare"
                        outlined
                        squared
                        @click="onCompareButtonClick"
                    >
                        <transition name="fade">
                            <span
                                v-if="compareCount"
                                :class="$style.count"
                            >
                                {{ splitThousands(compareCount) }}
                            </span>
                        </transition>
                    </UiVButton>
                </transition>
            </div>

            <nuxt-link
                to="/realty"
                :class="$style.info"
            >
                <span :class="$style.title">
                    ISOPN
                </span>

                <span :class="$style.description">
                    Информационная система организации подбора недвижимости
                </span>
            </nuxt-link>

            <div :class="$style.part">
                <transition name="fade">
                    <UiVButton
                        v-if="actionsVisible"
                        icon="chart"
                        outlined
                        squared
                        @click="chartModalOpened = true"
                    />
                </transition>

                <UiVButton
                    icon="logout"
                    outlined
                    squared
                    @click="userStore.logout"
                />
            </div>
        </div>

        <transition name="fade">
            <PagesRealtyFormModal
                v-if="formModalOpened"
                :mode="RealtyFormModesEnum.CREATE"
                @close="formModalOpened = false"
            />
        </transition>

        <transition name="fade">
            <PagesRealtyChartModal
                v-if="chartModalOpened"
                :stats="realtyStore.stats"
                @close="chartModalOpened = false"
            />
        </transition>
    </header>
</template>

<style lang="scss" module>
.Header {
    border-bottom: .1rem solid $base400;
    padding: 1rem 0;
    height: $header-height;
    background-color: $base0;
}

.content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.part {
    display: flex;
    column-gap: 1rem;
    align-items: center;
    width: 9.8rem;

    &:last-child {
        justify-content: flex-end;
    }
}

.button {
    overflow: visible;
}

.count {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: .4rem;
    padding: .2rem;
    height: 2rem;
    min-width: 2rem;
    max-width: 100%;
    font-size: 1.2rem;
    line-height: 1;
    white-space: nowrap;
    color: $base0;
    background-color: $base400;
    transform: translate(30%, -30%);
}

.info {
    display: flex;
    flex-direction: column;
    text-align: center;

    &:hover .title {
        @include respond-to(desktop) {
            color: $base200;
        }
    }

    &:active .title {
        @include respond-to(desktop) {
            color: $base100;
        }
    }
}

.title {
    font-weight: 700;
    font-size: 2.6rem;
    line-height: 1;
    color: $base400;
    transition: color .3s ease;
}

.description {
    font-size: 1.6;
    line-height: 1;
    color: $base300;

    @include respond-to(mobile) {
        display: none;
    }
}
</style>

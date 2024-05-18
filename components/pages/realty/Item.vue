<script lang="ts" setup>
import type { IRealty } from '~/stores/types/realty';

import { splitThousands } from '~/assets/ts/utils/numberUtils';
import { getRealtyTitle } from '~/assets/ts/utils/realtyUtils';

interface IRealtyItemProps {
    realty: IRealty,
};

const props = defineProps<IRealtyItemProps>();

const contentVisible = ref<boolean>(false);

const itemRef = ref<HTMLElement | null>(null);
useClickOutside(itemRef, () => {
    contentVisible.value = false;
});

const realtyTitle = computed<string>(() => getRealtyTitle(props.realty.rooms));
const realtyRooms = computed<string[]>(() => props.realty.rooms?.map(({ name, area }) => `${name} - ${splitThousands(area)} м²`) || []);
const realtyAdvantages = computed<string>(() => props.realty.advantages?.map(({ name }) => name).join(', ') || '');
const realtyDisadvantages = computed<string>(() => props.realty.disadvantages?.map(({ name }) => name).join(', ') || '');
</script>

<template>
    <article
        ref="itemRef"
        :class="[$style.Item, {[$style._visible]: contentVisible}]"
    >
        <div :class="$style.visible">
            <div :class="$style.actions">
                <button
                    :class="[$style.button, {[$style._hidden]: !props.realty.images?.length}]"
                    type="button"
                    tabindex="1"
                    @click="$emit('gallery', props.realty.images)"
                >
                    <SvgIcon
                        :class="$style.icon"
                        name="resize"
                    />
                </button>

                <div :class="$style.actionsPart">
                    <button
                        :class="$style.button"
                        type="button"
                        tabindex="1"
                        @click="$emit('update', props.realty)"
                    >
                        <SvgIcon
                            :class="$style.icon"
                            name="edit"
                        />
                    </button>

                    <button
                        :class="$style.button"
                        type="button"
                        tabindex="1"
                        @click="$emit('remove', props.realty._id)"
                    >
                        <SvgIcon
                            :class="$style.icon"
                            name="trash"
                        />
                    </button>
                </div>
            </div>

            <PagesRealtyUtilityItemSlider
                :class="$style.slider"
                :images="props.realty.images"
                @click="$emit('gallery', props.realty.images)"
            />

            <div :class="$style.content">
                <h3 :class="$style.title">
                    {{ realtyTitle }}
                </h3>

                <p :class="$style.price">
                    {{ splitThousands(props.realty.price) }} ₽
                </p>

                <a
                    v-if="props.realty.link"
                    :class="$style.link"
                    :href="props.realty.link"
                    target="_blank"
                >
                    Ссылка на источник
                </a>
            </div>
        </div>

        <div
            v-if="props.realty.floor || realtyRooms.length || realtyAdvantages || props.realty.location"
            :class="$style.hidden"
        >
            <div :class="$style.hiddenContent">
                <PagesRealtyUtilityItemSection
                    v-if="props.realty.floor"
                    :class="$style.section"
                    title="Этаж"
                    :value="splitThousands(props.realty.floor)"
                    row
                />

                <PagesRealtyUtilityItemSection
                    v-if="realtyRooms.length"
                    :class="$style.section"
                    title="Помещения"
                    :value="realtyRooms"
                />

                <PagesRealtyUtilityItemSection
                    v-if="realtyAdvantages"
                    :class="$style.section"
                    title="Преимущества"
                    :value="realtyAdvantages"
                />

                <PagesRealtyUtilityItemSection
                    v-if="realtyDisadvantages"
                    :class="$style.section"
                    title="Недостатки"
                    :value="realtyDisadvantages"
                />

                <PagesRealtyUtilityItemSection
                    v-if="props.realty.location"
                    :class="$style.section"
                    title="Местоположение"
                    :value="props.realty.location"
                />
            </div>

            <button
                :class="$style.bottomButton"
                @click="contentVisible = !contentVisible"
            >
                <SvgIcon
                    :class="$style.bottomIcon"
                    name="chevron-down"
                />
            </button>
        </div>
    </article>
</template>

<style lang="scss" module>
.Item {
    position: relative;

    &._visible .hidden {
        @include respond-to(mobile) {
            transform: translateY(calc(100% - 1rem));

            .bottomIcon {
                transform: rotate(-180deg);
            }
        }
    }

    .hidden:hover {
        @include respond-to(desktop) {
            transform: translateY(calc(100% - 1rem));

            .bottomIcon {
                transform: rotate(-180deg);
            }
        }
    }
}

.visible {
    position: relative;
    z-index: 2;
    border: .1rem solid $base400;
    border-radius: .8rem;
    padding: 1rem;
    height: 100%;
}

.actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.actionsPart {
    display: flex;
    column-gap: .6rem;
    align-items: center;
}

.button {
    width: 2rem;
    height: 2rem;

    &._hidden {
        visibility: hidden;
    }

    &:hover .icon,
    &:focus .icon {
        @include respond-to(desktop) {
            color: $base100;
        }
    }

    &:active .icon {
        @include respond-to(desktop) {
            color: $base50;
        }
    }
}

.icon {
    color: $base400;
    transition: color .3s ease;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    row-gap: .6rem;
}

.title {
    height: 1.8rem;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 1.8rem;
    color: $base400;
}

.price {
    height: 1.6rem;
    font-size: 1.4rem;
    line-height: 1.6rem;
    color: $base300;
}

.link {
    margin-top: auto;
    height: 1.4rem;
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 1.4rem;
    text-decoration: underline;
    color: $base400;
    transition: color .3s ease;

    &:hover,
    &:focus {
        @include respond-to(desktop) {
            text-decoration: underline;
            color: $base200;
        }
    }

    &:active {
        @include respond-to(desktop) {
            text-decoration: underline;
            color: $base100;
        }
    }
}

.hidden {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: .1rem solid $base400;
    border-top: 0;
    border-radius: 0 0 .6rem .6rem;
    padding: 1.6rem 1rem 3.6rem;
    width: 100%;
    max-height: 100%;
    transform: translateY(2.5rem);
    transition: transform 0.3s ease;
}

.hiddenContent {
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
}

.section:not(:first-child) {
    margin-top: 1rem;
}

.bottomButton {
    position: absolute;
    left: -.1rem;
    bottom: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: .2rem;
    width: calc(100% + .2rem);
    height: 3rem;
    background-color: $base400;
    cursor: default;
}

.bottomIcon {
    width: 2rem;
    height: 2rem;
    color: $base0;
    transition: transform .3s ease;
}
</style>

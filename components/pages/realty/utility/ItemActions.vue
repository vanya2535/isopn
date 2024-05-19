<script lang="ts" setup>
import type { IRealty } from '~/stores/types/realty';

interface IItemActionsProps {
    realty: IRealty,
    compared: boolean,
};

const props = defineProps<IItemActionsProps>();
</script>

<template>
    <div :class="$style.ItemActions">
        <div :class="$style.part">
            <button
                v-if="props.realty.images?.length"
                :class="$style.button"
                type="button"
                tabindex="1"
                @click="$emit('gallery', props.realty.images)"
            >
                <SvgIcon
                    :class="$style.icon"
                    name="resize"
                />
            </button>

            <button
                :class="[$style.button, {[$style._active]: props.compared}]"
                type="button"
                tabindex="1"
                @click="$emit('compare', props.realty)"
            >
                <SvgIcon
                    :class="$style.icon"
                    name="compare"
                />
            </button>
        </div>

        <div :class="$style.part">
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
</template>

<style lang="scss" module>
.ItemActions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.part {
    display: flex;
    column-gap: .6rem;
    align-items: center;
}

.button {
    overflow: hidden;
    border-radius: .4rem;
    padding: .2rem;
    width: 2.4rem;
    height: 2.4rem;
    background-color: transparent;
    transition: background-color .3s ease;

    &._active {
        background-color: $base400;

        .icon,
        &:hover .icon,
        &:focus .icon,
        &:active .icon {
            color: $base0;
        }
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
    transition: all .3s ease;
}
</style>

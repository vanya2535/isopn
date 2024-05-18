<script lang="ts" setup>
interface IItemSectionProps {
    title: string,
    value: string | string[],
    row?: boolean,
};

const props = withDefaults(defineProps<IItemSectionProps>(), {
    row: false,
});

const multiple = computed<boolean>(() => Array.isArray(props.value));
</script>

<template>
    <div :class="[$style.ItemSection, {[$style._row]: props.row}]">
        <h6 :class="$style.title">
            {{ props.title }}:
        </h6>

        <p
            v-if="!multiple"
            :class="$style.value"
        >
            {{ props.value }}
        </p>

        <template v-else>
            <p
                v-for="(item, index) in props.value"
                :key="index"
                :class="$style.value"
            >
                {{ item }}
            </p>
        </template>
    </div>
</template>

<style lang="scss" module>
.ItemSection {
    &._row {
        display: flex;
        align-items: center;

        .title {
            margin-right: .4rem;
            margin-bottom: 0;
        }
    }
}

.title {
    margin-bottom: .4rem;
    font-size: 1.4rem;
    line-height: 1.6rem;
}

.value {
    font-size: 1.2rem;
    line-height: 1.4rem;

    &:not(:last-child) {
        margin-bottom: .2rem;
    }
}
</style>

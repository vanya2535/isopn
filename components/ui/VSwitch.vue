<script lang="ts" setup>
interface ISwitchProps {
    id: string,
    label?: string,
};

const props = withDefaults(defineProps<ISwitchProps>(), {
    label: '',
});

const modelValue = defineModel<boolean>();

const focus = ref<boolean>(false);
</script>

<template>
    <div
        :class="$style.VSwitch"
        @keypress.enter.prevent="modelValue = !modelValue"
    >
        <label
            v-if="props.label"
            :for="props.id"
            :class="$style.label"
        >
            {{ props.label }}
        </label>

        <div
            :class="[$style.inputWrapper, {
                [$style._active]: modelValue,
                [$style._focus]: focus
            }]"
        >
            <input
                :id="props.id"
                v-model="modelValue"
                :class="$style.input"
                :name="props.id"
                type="checkbox"
                tabindex="1"
                @focus="focus = true"
                @blur="focus = false"
            />

            <div :class="$style.circle"/>
        </div>
    </div>
</template>

<style lang="scss" module>
.VSwitch {
    //
}

.label {
    font-size: 1.2rem;
    line-height: 1.4rem;
    color: $base100;
}

.inputWrapper {
    position: relative;
    border: .1rem solid $base50;
    border-radius: 2rem;
    width: 4rem;
    height: 2rem;
    transition: all .3s ease;

    &._active {
        border-radius: .4rem;

        .circle {
            left: calc(100% - 1.8rem);
            border-color: $base300;
            border-radius: .4rem;
            background-color: $base300;
        }
    }

    &:hover,
    &._focus {
        @include respond-to(desktop) {
            border-color: $base100;

            &:not(._active) .circle {
                border-color: $base100;
            }
        }
    }

    &:active {
        @include respond-to(desktop) {
            border-color: $base200;

            &:not(._active) .circle {
                border-color: $base200;
            }
        }
    }
}

.input {
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}

.circle {
    position: absolute;
    left: .2rem;
    top: 50%;
    border: .1rem solid $base50;
    border-radius: 50%;
    width: 1.6rem;
    height: 1.6rem;
    background-color: $base0;
    transform: translateY(-50%);
    transition: all .3s ease;
    pointer-events: none;
}
</style>

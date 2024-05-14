<script lang="ts" setup>
import { ModalPositionsEnum } from './types';

interface IModalProps {
    position?: ModalPositionsEnum,
};

interface IModalEmits {
    (e: 'close'): void,
};

const props = withDefaults(defineProps<IModalProps>(), {
    position: ModalPositionsEnum.LEFT,
});

const emit = defineEmits<IModalEmits>();

const contentRef = ref<HTMLElement | null>(null);
const opened = ref<boolean>(false);
const touchPosition = ref<number | null>(null);
const disableTransition = ref<boolean>(false);

const contentStyle = computed<Record<string, string | null>>(() => ({
    bottom: touchPosition.value ? touchPosition.value + 'px' : null,
    transition: disableTransition.value ? 'none' : null,
}));

function onClose() {
    opened.value = false;

    setTimeout(() => {
        emit('close');
    }, 300);
}

function onBarTouchmove(event: TouchEvent) {
    disableTransition.value = true;

    const contentHeight = contentRef.value?.clientHeight || 0;
    const offset = document.documentElement.clientHeight - event.touches[0].clientY - contentHeight;

    if (offset < 0) {
        touchPosition.value = offset;
    }
}

function onBarTouchend() {
    disableTransition.value = false;

    nextTick(() => {
        if ((touchPosition.value || 0) < -50) {
            touchPosition.value = -(contentRef.value?.clientHeight || 0);

            setTimeout(() => {
                emit('close');
            }, 300);
        } else {
            touchPosition.value = null;
        }
    });
}

onMounted(() => {
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        opened.value = true;
    }, 100);
});

onBeforeUnmount(() => {
    document.body.style.overflow = 'auto';
});
</script>

<template>
    <div
        :class="$style.VModal"
        @click="onClose"
    >
        <div
            ref="contentRef"
            :class="[$style.content, $style[`_${props.position}`], {[$style._opened]: opened}]"
            :style="contentStyle"
            @click.stop
        >
            <div
                :class="$style.bar"
                @touchmove="onBarTouchmove"
                @touchend="onBarTouchend"
            />

            <div :class="$style.inner">
                <slot :on-close="onClose" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
.VModal {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: rgba($color: $base400, $alpha: 60%);
}

.content {
    position: absolute;
    bottom: 0;
    z-index: 1;
    overflow: hidden;
    padding: 2rem;
    width: 100%;
    height: 100%;
    max-width: 50rem;
    background-color: $base0;
    transition: all .3s ease;

    &._left {
        left: 0;
        border-radius: 0 .8rem .8rem 0;
        transform: translateX(-100%);

        &._opened {
            transform: none;
        }

        @include respond-to(mobile) {
            border-radius: .8rem .8rem 0 0;
            transform: translateY(100%);
        }
    }

    &._right {
        right: 0;
        border-radius: .8rem 0 0 .8rem;
        transform: translateX(100%);

        &._opened {
            transform: none;
        }

        @include respond-to(mobile) {
            border-radius: .8rem .8rem 0 0;
            transform: translateY(100%);
        }
    }

    &._center {
        left: 50%;
        bottom: 50%;
        border-radius: .8rem;
        width: 90%;
        height: 70%;
        max-width: 90%;
        transform: translate(-50%, -100%);

        .inner {
            @include respond-to(desktop) {
                padding-bottom: 0;
            }
        }

        &._opened {
            transform: translate(-50%, 50%);

            @include respond-to(mobile) {
                transform: none;
            }
        }

        @include respond-to(mobile) {
            left: 0;
            bottom: 0;
            border-radius: .8rem .8rem 0 0;
            width: 100%;
            height: auto;
            max-width: 100%;
            transform: translateY(100%);
        }
    }

    @include respond-to(mobile) {
        border-radius: 0;
        padding: 3rem 2rem 0;
        width: 100%;
        height: calc(100% - 10rem);;
        max-width: 100%;
    }
}

.inner {
    overflow: auto;
    padding-bottom: 2rem;
    width: 100%;
    height: 100%;
}

.bar {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    display: none;
    width: 100%;
    height: 2rem;

    &:before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 1;
        border-radius: 1rem;
        width: 4rem;
        height: .6rem;
        background-color: $base50;
        opacity: .6;
        transform: translate(-50%, -50%);
    }

    @include respond-to(mobile) {
        display: block;
    }
}
</style>

<template>
    <button
        :class="$style.Tag"
        type="button"
    >
        <slot />
    </button>
</template>

<style lang="scss" module>
.Tag {
    position: relative;
    overflow: hidden;
    overflow-wrap: break-word;
    border: .1rem solid $base50;
    padding: 1rem 1rem 1rem 3.2rem;
    min-height: 3.7rem;
    font-size: 1.2rem;
    line-height: 1.4rem;
    transition: all .3s ease;

    &:before {
        content: '';
        position: absolute;
        left: 1rem;
        top: 50%;
        z-index: 1;
        border-radius: 50%;
        width: 1rem;
        height: 1rem;
        background-color: $base300;
        transform: translateY(-50%);
        transition: background-color .3s ease;
    }

    &:hover {
        @include respond-to(desktop) {
            border-color: transparent;
            border-radius: .4rem;
            color: $base0;
            background-color: $base300;

            &:before {
                background-color: $base0;
            }
        }
    }

    &:active {
        @include respond-to(desktop) {
            border-color: transparent;
            border-radius: .8rem;
            color: $base0;
            background-color: $base200;

            &:before {
                background-color: $base0;
            }
        }
    }
}
</style>

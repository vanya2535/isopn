<script lang="ts" setup>
const error = useError();
</script>


<template>
    <main :class="[$style.Error, 'page']">
        <nuxt-link to="/" :class="$style.title">
            ISOPN
        </nuxt-link>

        <h1 :class="$style.subtitle">
            {{ error.statusCode }}
        </h1>
    </main>
</template>

<style lang="scss" module>
.Error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.title {
    font-size: 20rem;
    color: $base400;
    transition: color .3s ease;

    &:hover {
        @include respond-to(desktop) {
            color: $base300;
        }
    }

    &:active {
        @include respond-to(desktop) {
            color: $base200;
        }
    }

    @include respond-to(mobile) {
        font-size: 12rem;
    }
}

.subtitle {
    font-size: 16rem;
    color: $base300;

    @include respond-to(mobile) {
        font-size: 10rem;
    }

    @include respond-to(mobile) {
        font-size: 10rem;
    }
}
</style>

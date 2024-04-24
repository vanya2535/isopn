<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
    try {
        await userStore.confirm(route.query.token);
        router.push('/');
    } catch (e) {
        router.push('/auth');
    }
});
</script>

<template>
    <div :class="[$style.AuthConfirmPage, 'page']">
        <h1 :class="[$style.title, 'loading']">
            ISOPN
        </h1>
    </div>
</template>

<style lang="scss" module>
.AuthConfirmPage {
    display: flex;
    align-items: center;
    justify-content: center;
}

.title {
    font-size: 20rem;
    cursor: default;
    user-select: none;

    &:global(.loading:before) {
        left: -50%;
        width: 1rem;
    }

    @include respond-to(mobile) {
        font-size: 10rem;
    }
}
</style>

export const useClickOutside = (element: Ref<HTMLElement | null>, callback: () => void) => {
    const listener = (event: Event) => {
        if (!element.value) {
            return;
        }

        if (event.target !== element.value && !event.composedPath().includes(element.value)) {
            callback();
        }
    };

    onMounted(() => {
        window.addEventListener('click', listener);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('click', listener);
    });
};

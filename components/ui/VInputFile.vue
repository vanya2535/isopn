<script lang="ts" setup>
import type { HTMLInputEvent } from '~/types/html';
import { NotificationTypesEnum } from '~/stores/types/notification';

import { getFilesFromList } from '~/assets/ts/utils/fileUtils';
import { plural } from '~/assets/ts/utils/numberUtils';

interface IInputFileProps {
    id: string,
    accept?: string,
    multiple?: boolean,
    disabled?: boolean,
    count?: number,
    maxCount?: number,
};

interface IInputFileEmits {
    (e: 'input', value: File[]): void,
};

const props = withDefaults(defineProps<IInputFileProps>(), {
    accept: '*',
    multiple: false,
    disabled: false,
    count: 0,
    maxCount: 0,
});

const emit = defineEmits<IInputFileEmits>();

const notificationStore = useNotificationStore();

const dragover = ref<boolean>(false);

const labelAccept = computed<string>(() => props.accept.replace(/([a-zA-Z0-9]+)\//g, '.'));
const labelMaxCount = computed<string>(() => props.maxCount ? `не более ${props.maxCount} файл${plural(props.maxCount, ['а', 'ов', 'ов'])}` : '');
const inputDisabled = computed<boolean>(() => props.count && props.maxCount && props.count === props.maxCount || props.disabled);

function emitInput(files: FileList) {
    const input = getFilesFromList(files, props.accept);

    if (input.length) {
        if (props.maxCount && input.length + props.count > props.maxCount) {
            notificationStore.pushMessage(`Количество файлов не должно превышать ${props.maxCount}`, NotificationTypesEnum.ERROR);
        } else {
            emit('input', input);
        }
    } else {
        notificationStore.pushMessage('Некоторые из файлов имеют некорректный формат', NotificationTypesEnum.ERROR);
    }
}

function onButtonDrop(event: DragEvent) {
    dragover.value = false;

    if (event.dataTransfer?.files) {
        emitInput(event.dataTransfer.files);
    }
};

function onButtonClick() {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = props.multiple;
    input.accept = props.accept;
    input.onchange = event => onInputChange(event as HTMLInputEvent);
    input.click();
};

function onInputChange(event: HTMLInputEvent) {
    if (event.target?.files) {
        emitInput(event.target.files);
    }
};
</script>

<template>
    <button
        :class="[$style.VInputFile, {[$style._dragover]: dragover}]"
        :disabled="inputDisabled"
        type="button"
        tabindex="1"
        @dragover.prevent="dragover = true"
        @dragleave="dragover = false"
        @drop.prevent="onButtonDrop"
        @click="onButtonClick"
    >
        <label
            :class="$style.label"
            :for="id"
        >
            Перетащите файлы или загрузите их по клику<br />

            <span :class="$style.accept">
                {{ labelAccept }} {{ labelMaxCount }}
            </span>
        </label>

    </button>
</template>

<style lang="scss" module>
.VInputFile {
    border: .1rem dashed $base50;
    border-radius: .6rem;
    padding: 0 3rem;
    width: 100%;
    height: 100%;
    transition: border-color .3s ease;
    cursor: pointer;

    &:hover,
    &:focus,
    &._dragover {
        @include respond-to(desktop) {
            border-color: $base100;

            .label {
               color: $base200;
            }
        }
    }

    &:active {
        @include respond-to(desktop) {
            border-color: $base200;

            .label {
                color: $base300;
            }
        }
    }

    &:disabled {
        opacity: $disabled-opacity;
        pointer-events: none;
    }
}

.label {
    font-size: 1.2rem;
    line-height: 1.4rem;
    color: $base100;
    transition: color .3s ease;
    pointer-events: none;
}

.accept {
    font-size: 1rem;
    line-height: 1.2rem;
    color: $base50;
}

.input {
    display: none;
}
</style>

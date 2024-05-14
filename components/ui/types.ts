import type { ReadedImage } from '~/types/utils';

// VInput
export enum InputTypesEnum {
    TEXT = 'text',
    PASSWORD = 'password',
    NUMBER = 'number',
};

// VButton
export enum ButtonTypesEnum {
    BUTTON = 'button',
    SUBMIT = 'submit'
};

// VInputImage
export interface ISlide {
    id: string,
    src: ReadedImage,
};

// VModal
export enum ModalPositionsEnum {
    LEFT = 'left',
    RIGHT = 'right',
    CENTER = 'center',
};

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget,
    selectionStart: number,
};

export type TVueComponentRef = { $el: HTMLElement, } | null;

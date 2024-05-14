export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget,
    selectionStart: number,
};

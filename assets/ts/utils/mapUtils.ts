export function getPinLayout(draggable: boolean) {
    const draggableClass = draggable ? '_draggable' : '';
    return `<svg class="map-icon ${draggableClass}" xmlns="http://www.w3.org/2000/svg" width="800" height="800" fill="none" viewBox="0 0 24 24"><path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.182 10.182C20.182 16.546 12 22 12 22s-8.182-5.454-8.182-11.818a8.182 8.182 0 0 1 16.364 0Z"/><path fill="#fafafa" stroke="#fafafa" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12.91a2.727 2.727 0 1 0 0-5.456 2.727 2.727 0 0 0 0 5.455Z"/></svg>`;
}

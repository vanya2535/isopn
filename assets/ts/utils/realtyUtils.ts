import { splitThousands } from './numberUtils';

import type { IRealtyRoom } from '~/stores/types/realty';

export function getRealtyTitle(rooms: IRealtyRoom[] | undefined) {
    if (!rooms) {
        return '';
    }

    const count = rooms.filter((room: IRealtyRoom) => room.living).length;
    const area = rooms.reduce((acc: number, room: IRealtyRoom) => acc + room.area, 0);

    const roomsPart = count ? `${count}-комнатная` : '';
    const areaPart = area ? `${splitThousands(Number(area.toFixed(2)))} м²` : '';
    const divider = roomsPart && areaPart ? ', ' : '';

    return `${roomsPart}${divider}${areaPart}`;
}

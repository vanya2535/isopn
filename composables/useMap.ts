import type { LngLat, SearchResponse, YMap } from '@yandex/ymaps3-types';
import type { IMapGeoData } from '~/types/map';

import { customization } from '~/assets/ts/constants/mapCustomization';
import { baseCoords } from '~/assets/ts/constants/map';
import { getPinLayout } from '~/assets/ts/utils/mapUtils';

export const useMap = (draggable = false, pinCoords = baseCoords) => {
    const mapRef = ref<HTMLElement | null>(null);
    const mapReady = ref<boolean>(false);

    const geoData = ref<IMapGeoData>({
        location: '',
        coords: pinCoords,
    });

    async function getLocation(coords: LngLat) {
        const locations = <SearchResponse> await ymaps3.search({
            text: coords.join(','),
        });

        const description = locations[0].properties.description ? `${locations[0].properties.description}, ` : '';
        geoData.value.location = `${description}${locations[0].properties.name}`;
        geoData.value.coords = coords;
    }

    onMounted(async () => {
        await ymaps3.ready;

        const {
            YMap,
            YMapDefaultSchemeLayer,
            YMapDefaultFeaturesLayer,
            YMapMarker,
            YMapListener,
        } = ymaps3;

        const map: YMap = new YMap(<HTMLElement>mapRef.value, {
            location: {
                center: pinCoords,
                zoom: 12,
            },
        });

        await map.addChild(new YMapDefaultSchemeLayer({
            customization,
        }));

        const content = document.createElement('div');
        content.innerHTML = getPinLayout(draggable);
        map.addChild(new YMapDefaultFeaturesLayer({ zIndex: 1800 }));

        const marker = new YMapMarker({
            coordinates: pinCoords,
            mapFollowsOnDrag: true,
            draggable,

            onDragEnd: coords => {
                getLocation(coords);
            },
        }, content);
        map.addChild(marker);

        const mapListener = new YMapListener({
            onClick: (_, { coordinates }) => {
                if (draggable) {
                    marker.update({ coordinates });
                    getLocation(coordinates);
                }
            },
        });
        map.addChild(mapListener);

        setTimeout(() => {
            mapReady.value = true;
        }, 1000);
    });

    return {
        mapRef,
        mapReady,
        geoData,
    };
};

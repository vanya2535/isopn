import type { ReadedImage } from '~/types/utils';

export async function readImage(file: File): Promise<ReadedImage> {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}

export function getFilesFromList(files: FileList, accept: string = '*'): File[] {
    const result: File[] = [];

    for (let index = 0; index < files.length; index++) {
        const file: File = files[index];

        if (accept !== '*' && !accept.includes(file.type)) {
            continue;
        }

        result.push(file);
    }

    return result;
}

export function getLoadedImageSrc(image: string) {
    const config = useRuntimeConfig();
    return `${config.public.BACKEND_URL}${image}`;
}

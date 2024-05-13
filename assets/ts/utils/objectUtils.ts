export function objectToFormData(data: any, formData = new FormData(), parentKey?: string): FormData {
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];
            const newKey = parentKey ? `${parentKey}[${key}]` : key;

            if (value instanceof File) {
                formData.append(newKey, value);
            } else if (Array.isArray(value)) {
                value.forEach((val, index) => {
                    const arrayKey = `${newKey}[${index}]`;

                    if (typeof val === 'object' && !(val instanceof File) && val !== null) {
                        objectToFormData(val, formData, arrayKey);
                    } else if (val) {
                        formData.append(arrayKey, val);
                    }
                });
            } else if (typeof value === 'object' && value) {
                objectToFormData(value, formData, newKey);
            } else if (value) {
                formData.append(newKey, value);
            }
        }
    }
    return formData;
}

export function cloneDeep<T>(value: T): T {
    if (value === null || typeof value !== 'object' || value instanceof Function) {
        return value;
    }

    if (Array.isArray(value)) {
        return value.map(item => cloneDeep(item)) as T;
    }

    if (typeof value === 'object') {
        const clonedObj: Record<string, any> = {};

        for (const key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
                clonedObj[key] = cloneDeep((value as Record<string, any>)[key]);
            }
        }

        return clonedObj as T;
    }

    return value;
}

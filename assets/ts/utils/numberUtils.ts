export function plural(number: number, postfixes: string[]) {
    const cases = [2, 0, 1, 1, 1, 2];
    return postfixes[number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]];
}

export function splitThousands(number: number) {
    const stringNumber: string = number.toString();

    if (stringNumber.includes('.')) {
        const parts = stringNumber.split('.');

        parts[0] = parts[0]
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return parts.join('.');
    } else {
        return stringNumber
            .replace(/\D/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}

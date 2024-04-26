import { defineEventHandler, H3Event, parseCookies } from 'h3';

export default defineEventHandler((event: H3Event): Record<string, string> => {
    const cookies = parseCookies(event);
    return cookies;
});

export default defineNuxtConfig({
    devtools: {
        enabled: true,
    },

    runtimeConfig: {
        public: {
            BACKEND_URL: process.env.BACKEND_URL,
            YMAPS_KEY: process.env.YMAPS_KEY,
        },
    },

    imports: {
        dirs: [
            'composables/**',
        ],
    },

    modules: [
        '@nuxtjs/eslint-module',
        '@nuxtjs/stylelint-module',
        '@nuxtjs/google-fonts',
        '@nuxtjs/svg-sprite',
        '@pinia/nuxt',
    ],

    css: [
        '~/assets/scss/normalize.scss',
    ],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "~/assets/scss/import.scss";',
                },
            },
        },
    },

    googleFonts: {
        families: {
            Comfortaa: [400, 500, 700],
        },
    },
});

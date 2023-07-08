export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-fonts',
        'nuxt-icon'
    ],
    googleFonts: {
        families: {
            "Noto Sans JP": [100, 300, 400, 500, 700, 900],
            "Open Sans": [100, 300, 400, 500, 700, 900],
        },
        display: "swap",
        prefetch: true,
        preconnect: true,
        preload: true,
        download: false,
        useStylesheet: true,
    },
    app: {
        baseURL: "/janbari/"
    }
})

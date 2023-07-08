export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-fonts',
        'nuxt-icon',
        '@vite-pwa/nuxt'
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
        head: {
            link: [
                { rel: "manifest", href: "https://sailnov.github.io/janbari/manifest.webmanifest" },
                { rel: "icon", type: "image/jpg", href: "https://sailnov.github.io/janbari/fabicon.jpg" },
                { rel: "apple-touch-icon", href: "https://sailnov.github.io/janbari/fabicon.jpg" },
                { rel: "mask-icon", href: "https://sailnov.github.io/janbari/fabicon.jpg", color: "#ffffff" },
                { rel: "shortcut icon", href: "https://sailnov.github.io/janbari/fabicon.jpg" },
            ],
            title: "JANBARI",
            meta: [
                { charset: "utf-8" },
                { name: "viewport", content: "width=device-width, initial-scale=1" },
                { name: "theme-color", content: "#ffffff" },
                { hid: "description", name: "description", content: "じゃんじゃんバリバリ～↗ ﾃｰﾃﾃｯﾃｰﾃﾃﾃﾃｰ" },
                { hid: "og:site_name", property: "og:site_name", content: "JANBARI" },
                { hid: "og:type", property: "og:type", content: "website" },
                { hid: "og:url", property: "og:url", content: "https://sailnov.github.io/janbari/" },
                { hid: "og:title", property: "og:title", content: "JANBARI" },
                { hid: "og:description", property: "og:description", content: "じゃんじゃんバリバリ～↗ ﾃｰﾃﾃｯﾃｰﾃﾃﾃﾃｰ" },
                { hid: "og:image", property: "og:image", content: "https://sailnov.github.io/janbari/fabicon.jpg" },
            ],
        },
        baseURL: "/janbari/"
    },
    pwa: {
        registerType: "autoUpdate",
        includeAssets: ["https://sailnov.github.io/janbari/fabicon.jpg"],
        client: {
            installPrompt: true,
        },
        manifest: {
            name: 'JANBARI',
            description: "じゃんじゃんバリバリ～↗ ﾃｰﾃﾃｯﾃｰﾃﾃﾃﾃｰ",
            theme_color: "#ffffff",
            lang: "ja",
            short_name: "JANBARI",
            start_url: "/janbari/",
            display: "standalone",
            background_color: "#ffffff",
            icons: [
                {
                    src: "fabicon.jpg",
                    sizes: "36x36",
                    type: "image/jpeg"
                },
                {
                    src: "fabicon.jpg",
                    sizes: "48x48",
                    type: "image/jpeg"
                },
                {
                    src: "fabicon.jpg",
                    sizes: "72x72",
                    type: "image/jpeg"
                },
                {
                    src: "fabicon.jpg",
                    sizes: "96x96",
                    type: "image/jpeg"
                },
                {
                    src: "fabicon.jpg",
                    sizes: "128x128",
                    type: "image/jpeg"
                },
                {
                    src: "fabicon.jpg",
                    sizes: "144x144",
                    type: "image/jpeg"
                },
                {
                    src: "fabicon.jpg",
                    sizes: "152x152",
                    type: "image/jpeg"
                },
                {
                    src: "fabicon.jpg",
                    sizes: "192x192",
                    type: "image/jpeg"
                },
                {
                    src: "fabicon.jpg",
                    sizes: "256x256",
                    type: "image/jpeg"
                },
                {
                    src: "fabicon.jpg",
                    sizes: "384x384",
                    type: "image/jpeg"
                },
                {
                    src: "fabicon.jpg",
                    sizes: "512x512",
                    type: "image/jpeg"
                }
            ]
        },
        workbox: {
            navigateFallback: null
        },
        devOptions: {
            enabled: true,
            type: "module"
        },
    }
})

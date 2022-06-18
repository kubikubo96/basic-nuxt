/*!
 =========================================================
 * Nuxt Black Dashboard - v1.0.0
 =========================================================
 */
export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: 'Nuxt Black Dashboard',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800' },
            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css' }
        ],
        bodyAttrs: {
            class: '' // Add `white-content` class here to enable "white" mode.
        }
    },
    router: {
        middleware: ['auth'],
        linkExactActiveClass: 'active',
    },
    /*
    ** Customize the progress-bar color
    */
    loading: '~/components/LoadingBar.vue',

    loadingIndicator: {
        name: 'circle',
        color: '#3B8070',
        background: 'white'
    },

    /*
     ** Global CSS
     */
    css: [
        'assets/css/demo.css',
        'assets/css/nucleo-icons.css',
        'assets/sass/black-dashboard.scss',
        'assets/css/todo.css',
        'assets/css/vusax-dark.css',
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        `~/plugins/vuesax.js`,
        `~/plugins/dashboard-plugin.js`,
        `~/plugins/axios.js`,
        `~/plugins/api-service.js`,
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/pwa',
        'nuxt-i18n',
        '@nuxtjs/axios',
        '@nuxt/http',
        '@nuxtjs/dotenv',
        '@nuxtjs/auth-next'
    ],

    axios: {
        // proxy: true,
        baseURL: process.env.BASE_URL || 'http://api.laravel.local'
    },

    http: {
        // proxyHeaders: false
    },

    i18n: {
        locales: [
            {
                code: 'en',
                file: 'en.js'
            }
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'en',
    },

    auth: {
        plugins: ['~/plugins/auth.js'],
        strategies: {
            'local': {
                provider: 'laravel/jwt',
                url: process.env.BASE_URL,
                endpoints: {
                    login: { url: '/api/auth/login', method: 'post' },
                    refresh: { url: '/api/auth/refresh', method: 'post' },
                    user: { url: '/api/auth/me', method: 'get' },
                    logout: { url: '/api/auth/logout', method: 'post' },
                },
                token: {
                    property: 'access_token',
                    type: 'Bearer',
                    maxAge: 60 * 60
                },
                refreshToken: {
                    property: 'refresh_token',
                    maxAge: 20160 * 60
                },
            },
        },
        redirect: {
            home: '/',
            login: '/login',
            logout: '/login'
        },
        watchLoggedIn: true
    },

    /*
    ** Build configuration
    */
    build: {
        transpile: [/^element-ui/],
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        },
        babel: {
            plugins: [
                [
                    'component',
                    {
                        'libraryName': 'element-ui',
                        'styleLibraryName': 'theme-chalk'
                    }
                ]
            ]
        }
    }
}

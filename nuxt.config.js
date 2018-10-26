const pkg = require('./package')
const plugins = ['@/plugins/element-ui', '@/plugins/axios']
if (process.env.NODE_WEB !== 'web') {
  plugins.push('@/plugins/electron')
}
module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  // loading: { color: 'blue' }
  loading: false,

  /*
  ** Global CSS
  */
  css: ['element-ui/lib/theme-chalk/index.css', '~assets/styles/common.css'],

  router: {
    mode: 'hash', // https://molunerfinn.com/electron-vue-2/#%E8%AF%B7%E4%BD%BF%E7%94%A8Hash%E6%A8%A1%E5%BC%8F
    middleware: ['authenticated']
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins,

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    progress: true,
    proxy: true,
    credentials: true,
    debug: false
  },

  /*
  ** Axios module configuration
  */
  proxy: {
    '/poster/': 'http://zc-03.dev.bxd365.com',
    '/app/': 'http://zc-03.dev.bxd365.com'
  },

  build: {
    /*
    ** You can extend webpack config here
    */
    postcss: false, // https://github.com/nuxt/nuxt.js/issues/4143
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isClient && process.env.NODE_WEB !== 'web') {
        config.target = 'electron-renderer'
      }
    }
  },

  /*
  ** Build configuration
  */
  dev: process.env.NODE_ENV === 'development'
}

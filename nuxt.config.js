require('dotenv').config();
export default {
  // mode: 'ssr',
  mode: 'universal',
  /*
  ** Headers of the page
  */
  env: {
    BASE_URL: process.env.BASE_URL || "",
    API_URL: process.env.API_URL || "",
    HOST: process.env.HOST || "",
    NODE_ENV: process.env.NODE_ENV || "",
    NPM_CONFIG_PRODUCTION: process.env.NPM_CONFIG_PRODUCTION || "",
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: 'https://avatars1.githubusercontent.com/u/46582385?v=4'},
      {rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.12.1/css/all.css'}
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/styles.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // 'nuxt-moment',
    '~/plugins/vue-moment',
    // { src: '~/plugins/feather-icon.js', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    'bootstrap-vue/nuxt',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    [
      'nuxt-fontawesome', {
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['fab']
        }
      ]
    }
    ]
    //OR like this
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: process.env.API_URL + '/login/token/',
            method: 'post',
            propertyName: 'token'
          },
          refresh: {
            url: process.env.API_URL + '/login/token/refresh/',
            method: 'post',
            propertyName: 'token'
          },
          user: {
            url: process.env.API_URL + '/user/profile/',
            method: 'get',
            propertyName: 'user'
          },
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
    redirect: {
      login: '/account/login',
      logout: '/account/login',
      callback: '/account/login',
      home: '/'
    }

  }
}

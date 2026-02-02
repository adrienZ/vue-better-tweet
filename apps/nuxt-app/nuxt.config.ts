// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  experimental: {
    // needed for SSR
    componentIslands: true,
  },

  build: {
    transpile: ['vue-better-tweet'],
  },

  image: {
    domains: ['pbs.twimg.com', 'abs.twimg.com']
  },

  devServer: {
    port: 3001,
  },

  content: {
    experimental: { sqliteConnector: 'native' },
  },

  modules: ['@nuxt/image', '@nuxt/content'],
})
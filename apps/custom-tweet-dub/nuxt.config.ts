import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image' ,"@nuxt/eslint", "@nuxt/content"],
  css: ['~/assets/css/base.css',],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    inlineRouteRules: true,
  },
  image: {
    domains: ['pbs.twimg.com', 'abs.twimg.com']
  },
  content: {
    experimental: { sqliteConnector: 'native' },
  },
  build: {
    transpile: ['vue-better-tweet'],
  },
})

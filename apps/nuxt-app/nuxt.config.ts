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
})

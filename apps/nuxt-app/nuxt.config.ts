// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  build: {
    // needed for css
    transpile: ['vue-better-tweet'],
  },
  experimental: {
    // needed for SSR
    componentIslands: true,
  },
})

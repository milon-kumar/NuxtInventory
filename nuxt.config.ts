// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: false
  },
  modules: ['@nuxt/ui'],
  runtimeConfig: {
    public: {
      baseUrl: (process.env.BASE_URL) || 'http://localhost:8000',
      frontendUrl: (process.env.FRONTEND_URL) || 'http://localhost:3000',
      apiUrl: (process.env.API_URL) || 'http://localhost:8000/api',
    },
  },
})
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: [
    'bootstrap/dist/css/bootstrap.min.css', 
    '~/assets/css/global.css'
  ],
  modules: [ '@nuxt/icon', '@nuxt/ui', '@pinia/nuxt' ],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: 'http://127.0.0.1:8000/api',
    },
  }
});
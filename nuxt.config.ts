export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: [
    'bootstrap/dist/css/bootstrap.min.css', 
    '~/assets/css/global.css'
  ],
  modules: [ '@nuxt/icon', '@nuxt/ui' ],
  devtools: { enabled: true }
});
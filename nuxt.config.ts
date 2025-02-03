// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@primevue/nuxt-module', '@nuxtjs/tailwindcss', '@formkit/nuxt'],
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura,
      },
    },
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css',
        },
      ],
    },
  },
  formkit: {
    autoImport: true,
  },
  compatibilityDate: '2024-11-01',
  devtools: {enabled: true},
})

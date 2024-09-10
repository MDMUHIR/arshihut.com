// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    // needed
    // "@nuxtjs/axios",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "vue3-carousel-nuxt",
  ],

  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
 
  imports: {
    dirs: ["./stores"],
  },

  vite: {
    server: {
      hmr: {
        overlay: true,
      },
    },

  },

  compatibilityDate: "2024-08-29",
});

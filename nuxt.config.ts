// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "DIGITAL NEST",
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },
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
        overlay: false,
      },
    },
  },

  compatibilityDate: "2024-08-29",
});

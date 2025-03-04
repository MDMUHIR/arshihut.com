// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Arshi Hut",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Arshi Hut - Your one-stop shop for fency products and accessories",
        },
        {
          name: "keywords",
          content:
            "fency products, hand craft, pottery, e-commerce, online shopping",
        },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: "Arshi Hut" },
        {
          property: "og:description",
          content:
            "Arshi Hut - Your one-stop shop for fency products and accessories",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Arshi Hut" },
        {
          name: "twitter:description",
          content:
            "Arshi Hut - Your one-stop shop for fency products and accessories",
        },
      ],
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

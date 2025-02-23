// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "DIGITAL NEST",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Digital Nest - Your one-stop shop for digital products and electronics",
        },
        {
          name: "keywords",
          content: "digital products, electronics, e-commerce, online shopping",
        },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: "DIGITAL NEST" },
        {
          property: "og:description",
          content:
            "Digital Nest - Your one-stop shop for digital products and electronics",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "DIGITAL NEST" },
        {
          name: "twitter:description",
          content:
            "Digital Nest - Your one-stop shop for digital products and electronics",
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

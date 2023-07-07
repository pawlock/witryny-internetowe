export default defineNuxtConfig({
  // router: {
  //   extendRoutes (routes, resolve) {
  //     routes.push({
  //       name: 'custom',
  //       path: '*',
  //       component: resolve(__dirname, 'pages/hello.vue')
  //     })
  //   }
  // },
  meta: {
    title: "Pokédex",
    link: [
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
      },
      {
        rel: "icon",
        href: "/pokeball.png",
      },
    ],
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js",
      },
      {
        src: "/parallax.js",
      },
    ],
  },

  buildModules: ["@nuxtjs/tailwindcss"],

  imports: {
    dirs: ["store"],
  },

  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],

  typescript: {
    shim: false,
    strict: true,
  },

  tailwindcss: {
    viewer: false,
  },
});



export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss','nuxt-icon','@nuxt/image-edge','@nuxtjs/color-mode'],
  buildModules: [

  ],

  tailwindcss: {
    cssPath: "~~/assets/main.css",
  },
  // server config variable

  // register nitro plugin

  /// transpile  afew packages
  build: {},
});
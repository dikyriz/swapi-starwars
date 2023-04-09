import { setup } from "@nuxtjs/composition-api";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "test-case",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&family=Poppins:wght@100;400;500;600;700;800;900&display=swap",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  setup() {
    setup();
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "nuxt-windicss",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/apollo", "@nuxtjs/composition-api/module", "@nuxt/http"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint:
          "https://swapi-graphql.netlify.app/.netlify/functions/index",
        httpLinkOptions: {
          headers: {},
          fetchOptions: {
            mode: "cors", //Cors Needed for external Cross origins, need to allow headers from server
          },
          credentials: "omit", //must be omit to support application/json content type
        },
      },
    },
  },

  windicss: {
    scan: {
      dirs: ["./"],
      exclude: [
        "node_modules",
        "dist",
        ".git",
        ".github",
        ".nuxt",
        // testing files & folders
        "coverage",
        "**/__snapshots__",
        "*.test.js",
      ],
    },
    preflight: {
      alias: {
        // add nuxt aliases
        "nuxt-link": "a",
        // @nuxt/image module
        "nuxt-img": "img",
      },
    },
  },
  generate: {
    fallback: true,
  },
};

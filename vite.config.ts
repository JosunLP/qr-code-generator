import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Keine speziellen Compiler-Optionen erforderlich
        },
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "img/icons/*", "robots.txt"],
      manifest: {
        name: "QRify",
        short_name: "QRify",
        description: "QR Code Generator",
        theme_color: "#ffffff",
        icons: [
          {
            src: "img/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "img/icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Verwende den vollständigen vue-i18n Build mit Message-Compiler
      "vue-i18n": "vue-i18n/dist/vue-i18n.esm-bundler.js",
    },
  },
  define: {
    // Aktiviere den Message-Compiler für vue-i18n im Production-Build
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_JIT_COMPILATION__: true,
    __INTLIFY_DROP_MESSAGE_COMPILER__: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Falls globale Variablen benötigt werden, hier importieren
        // additionalData: `@import "@/styles/variables.scss";`
      },
    },
  },
});

import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    Icons({
      compiler: "vue3",
      autoInstall: true,
    }),

    Components({
      resolvers: [
        IconsResolver({
          prefix: "i",
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

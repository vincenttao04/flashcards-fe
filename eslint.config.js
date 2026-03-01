import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      js,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...js.configs.recommended.rules,

      // Import sorting
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Vue & external packages
            ["^vue", "^@?\\w"],

            // Alias imports
            ["^@/"],

            // Relative imports
            ["^\\."],

            // Side effects
            ["^\\u0000"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },

  pluginVue.configs["flat/essential"],
]);

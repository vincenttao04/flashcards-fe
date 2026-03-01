/**
 * Application Entry Point
 * ------------------------
 * Bootstraps the Vue 3 application.
 *
 * Responsibilities:
 * - Mounts root App component.
 * - Registers Vue Router.
 * - Imports global styles and icon library.
 */
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

createApp(App).use(router).mount("#app");

<!--
  App Root Component
  ------------------
  Application shell wrapping routed page views.

  Responsibilities:
  - Provides global layout structure.
  - Renders current route via <RouterView>.
  - Displays developer attribution footer.
-->
<script setup>
import { RouterView } from "vue-router";

import Attribution from "./components/global/DeveloperAttribution.vue";
</script>

<template>
  <div class="app-container">
    <div class="page-content">
      <RouterView />
    </div>
    <Attribution />
  </div>
</template>

<style>
html,
body {
  margin: 0;
  min-height: 100%;
}

#app {
  min-height: 100vh;
}

:root {
  font-family: "Inter", sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

button,
input,
textarea {
  font-family: inherit;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding: 1.6rem 2rem;
}

.page-content {
  flex: 1;
}
</style>

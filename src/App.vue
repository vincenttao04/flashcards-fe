<!-- /**
 * App Root Component
 * Main application component that serves as the application shell
 * 
 * @component
 * @uses RouterView
 */ -->
<script setup>
import { RouterView } from "vue-router";

import Attribution from "./components/global/DeveloperAttribution.vue";
</script>

<template>
  <div class="app-container">
    <main class="page-content">
      <RouterView />
    </main>
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

p {
  margin: 0;
}
</style>

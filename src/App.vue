<!-- /**
 * App Root Component
 * Main application component that serves as the application shell
 * 
 * @component
 * @uses RouterView
 */ -->
<script setup>
import { RouterView } from "vue-router";
import Attribution from "./components/global/Attribution.vue";
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
body,
#app {
  height: 100%;
  margin: 0;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding: 2rem;
}

.page-content {
  flex: 1;
}

p {
  margin: 0;
}
</style>

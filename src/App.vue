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
  <RouterView />
  <Attribution />
</template>

<style>
:root {
  font-family: "Inter", sans-serif;
}

p {
  margin: 0;
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

#app {
  height: 100vh;
  background-color: #f5f5f5;
  overflow-y: auto;
  padding: 2rem;
}
</style>

<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style>
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

#app {
  height: 100vh;
  background-color: #f5f5f5;
  overflow-y: auto;
}
</style>

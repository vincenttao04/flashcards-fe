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

button {
  font-family: inherit;
}

#app {
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
}
</style>

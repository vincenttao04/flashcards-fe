<script setup>
import { defineProps } from "vue";
defineProps({
  message: {
    type: String,
    required: true,
  },
  link: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="error-container">
    <h3>{{ message }}</h3>
    <router-link v-if="link" to="/" class="back-link"
      >Return to Home
    </router-link>
  </div>
</template>

<style>
.error-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  height: 100vh;
  gap: 1rem;
}
</style>

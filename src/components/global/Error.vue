<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
  link: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ["page", "component"].includes(value),
  },
});
</script>

<template>
  <div v-if="type === 'page'" class="error-page-container">
    <h3>{{ message }}</h3>
    <router-link v-if="link" to="/" class="back-link"
      >Return to Home
    </router-link>
  </div>

  <div v-else class="error-component-container">
    <em>{{ message }}</em>
  </div>
</template>

<style>
.error-page-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  height: 100vh;
  gap: 1rem;
}

.error-component-container {
  color: #dc3545;
}
</style>

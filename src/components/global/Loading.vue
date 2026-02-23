<script setup>
defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ["page", "component"].includes(value),
  },
});
</script>

<template>
  <div v-if="type === 'page'" class="loading-page-container">
    <div class="spinner-border" role="status"></div>
    <h3>Loading...</h3>
  </div>

  <div v-else>
    <div class="spinner-border" role="status"></div>
  </div>
</template>

<style>
.loading-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 1rem;
}

h3 {
  margin: 0;
}
</style>

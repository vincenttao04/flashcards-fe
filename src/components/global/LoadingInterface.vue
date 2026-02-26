<script setup>
import { onBeforeUnmount,onMounted, ref } from "vue";

defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ["page", "component"].includes(value),
  },
});

const show = ref(false);
let timer = null;

onMounted(() => {
  timer = setTimeout(() => {
    show.value = true;
  }, 300);
});

onBeforeUnmount(() => {
  clearTimeout(timer);
});
</script>

<template>
  <div v-if="show">
    <div v-if="type === 'page'" class="loading-page-container">
      <div class="spinner-border" role="status"></div>
      <h3>Loading...</h3>
    </div>

    <div v-else>
      <div class="spinner-border" role="status"></div>
    </div>
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

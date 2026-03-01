<!--
  Loading Component
  -----------------
  Displays a loading spinner with optional full-page layout.

  Props:
  - type ("page" | "component")
      Determines whether loading occupies full viewport
      or renders inline within a component.

  Behaviour:
  - Introduces a 300ms delay before showing spinner
    to prevent flicker during fast requests.
  - Clears timeout on unmount to avoid memory leaks.

  Accessibility:
  - Uses role="status" with aria-live="polite"
    to announce loading state.
  - Uses aria-busy for full-page loading.
  - Spinner icon is decorative (aria-hidden).
-->
<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

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
  // Delay prevents flicker for fast requests
  timer = setTimeout(() => {
    show.value = true;
  }, 300);
});

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <div v-if="show">
    <!-- Full Page Loading -->
    <main
      v-if="type === 'page'"
      class="loading-page-container"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div class="spinner-border" aria-hidden="true"></div>
      <h3>Loading...</h3>
    </main>

    <!-- Inline Loading -->
    <div v-else role="status" aria-live="polite">
      <div class="spinner-border" aria-hidden="true"></div>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<style scoped>
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

/* Screen-reader-only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

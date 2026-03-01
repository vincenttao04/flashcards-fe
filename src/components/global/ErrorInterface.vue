<!--
  ErrorInterface
  Purpose: Error UI for full-page and inline component errors.
  Props:
  - message (String)
  - link (Boolean)
  - type ("page" | "component")
-->

<script setup>
import { useRoute, useRouter } from "vue-router";

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

const router = useRouter();
const route = useRoute();

function goHome() {
  if (route.path === "/") {
    // Force refresh only if already on home
    window.location.reload();
  } else {
    router.push({ name: "home" });
  }
}
</script>

<template>
  <!-- Full Page Error -->
  <main v-if="type === 'page'" class="error-page-container" role="alert">
    <h3>{{ message }}</h3>

    <button v-if="link" type="button" class="back-link" @click="goHome">
      Home
    </button>
  </main>

  <!-- Inline Error -->
  <div v-else class="error-component-container" role="alert">
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

.back-link {
  background: none;
  border: none;
  color: #228be6;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
  padding: 0;
}
</style>

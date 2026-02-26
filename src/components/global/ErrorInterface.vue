<script setup>
import { useRoute,useRouter } from "vue-router";

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

function goHome(e) {
  e.preventDefault();

  if (route.path === "/") {
    window.location.reload();
  } else {
    router.push({ name: "home" });
  }
}
</script>

<template>
  <div v-if="type === 'page'" class="error-page-container">
    <h3>{{ message }}</h3>
    <a v-if="link === true" href="/" class="back-link" @click="goHome">
      Home
    </a>
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

<template>
  <header :class="['page-header', alignment]">
    <router-link v-if="showBackLink" to="/" class="back-link">
      <i class="bi bi-arrow-left"></i>
      <span>Back to Sets</span>
    </router-link>
    <h1>{{ title }}</h1>
    <h3 v-if="subtitle">{{ subtitle }}</h3>
  </header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
  showBackLink: {
    type: Boolean,
    default: false,
  },
  alignment: {
    type: String,
    default: "left",
    validator: (value) => ["left", "center", "right"].includes(value),
  },
});
</script>

<style scoped>
.page-header {
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 100%;
}

.page-header.center {
  text-align: center;
}

.page-header.left {
  text-align: left;
}

.page-header.right {
  text-align: right;
}

.back-link {
  display: inline-flex;
  gap: 0.5rem; /* gap between the icon and text */
  margin-bottom: 1rem;
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.back-link:hover {
  color: #333;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: #495057;
}

@media (max-width: 640px) {
  .page-header {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>

<!--
  PageHeader
  Purpose: Reusable header with title/subtitle and optional back navigation.
  Props:
  - title (String)
  - subtitle (String | null)
  - showBackLink (Boolean)
  - backTo (String | Object)
  - alignment ("left" | "center" | "right")
-->

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
  backTo: {
    type: [String, Object],
    default: "/",
  },
  alignment: {
    type: String,
    default: "left",
    validator: (value) => ["left", "center", "right"].includes(value),
  },
});
</script>

<template>
  <header :class="['page-header', alignment]">
    <router-link v-if="showBackLink" :to="backTo" class="back-link">
      <i class="bi bi-arrow-left" aria-hidden="true"></i>
      <span>Back</span>
    </router-link>

    <h1>{{ title }}</h1>

    <p v-if="subtitle" class="subtitle">
      {{ subtitle }}
    </p>
  </header>
</template>

<style scoped>
.page-header {
  margin-bottom: 2rem;
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
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #666;
  text-decoration: none;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #333;
}

.back-link i {
  margin-top: 0.07rem;
}

h1 {
  color: #2c3e50;
  font-weight: 600;
  line-height: 1.2;
}

.subtitle {
  font-size: 1.1rem;
  font-weight: 500;
  color: #495057;
  margin-top: 1rem;
}

@media (max-width: 640px) {
  .page-header {
    gap: 1rem;
  }
}
</style>

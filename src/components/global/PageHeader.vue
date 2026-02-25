<!-- /**
 * PageHeader Component
 * A reusable header component that displays a title, optional subtitle, and back navigation
 * 
 * @component
 * @props {String} title - The main header text
 * @props {String} subtitle - Optional secondary text below the title
 * @props {Boolean} showBackLink - Whether to show the "Back" navigation link
 * @props {String} alignment - Text alignment ('left', 'center', or 'right')
 */ -->
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
      <i class="bi bi-arrow-left"></i>
      <span>Back</span>
    </router-link>
    <h1>{{ title }}</h1>
    <h3 v-if="subtitle">{{ subtitle }}</h3>
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
  gap: 0.5rem; /* Gap between the icon and text */
  margin-bottom: 1.5rem;
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.back-link:hover {
  color: #333;
}

h1 {
  color: #2c3e50;
  font-weight: 600;
  line-height: 0.8;
}

h3 {
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

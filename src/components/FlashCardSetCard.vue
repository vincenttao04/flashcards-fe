<template>
  <router-link
    :to="{ name: 'flashcards', params: { setId: set.id } }"
    class="flash-card-set"
  >
    <div class="set-content">
      <h3>{{ set.title }}</h3>
      <p>{{ set.description }}</p>
      <div class="set-meta">
        <span>{{ set.cards.length }} cards</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  set: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.flash-card-set {
  display: block;
  padding: 1.5rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
}

.flash-card-set:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

h3 {
  margin: 0 0 0.5rem;
  color: #2c3e50;
}

p {
  margin: 0 0 1rem;
  color: #666;
}

.set-meta {
  font-size: 0.9rem;
  color: #666;
}
</style>

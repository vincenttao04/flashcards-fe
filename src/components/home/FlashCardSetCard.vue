<template>
  <router-link
    :to="{ name: 'flashcards', params: { setId: set.id } }"
    class="card-set"
  >
    <div class="set-header">
      <h2 class="set-title">{{ set.title }}</h2>
      <span class="card-count">{{ set.cards.length }} cards</span>
    </div>

    <p class="set-description">{{ set.description }}</p>

    <div class="set-footer">
      <span class="created-date">Created: {{ formatDate(set.createdAt) }}</span>
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

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
</script>

<style scoped>
.card-set {
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
}

.card-set:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
}

.set-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.set-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.card-count {
  background-color: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  width: fit-content;
  text-align: center;
  white-space: nowrap;
}

.set-description {
  color: #6c757d;
  margin-bottom: 1.25rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.set-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.created-date {
  color: #6c757d;
  font-size: 0.85rem;
}

@media (max-width: 480px) {
  .set-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>

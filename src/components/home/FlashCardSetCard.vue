<template>
  <router-link
    :to="{ name: 'flashcards', params: { setId: set.id } }"
    class="card-set"
  >
    <div class="set-header">
      <h2 class="set-title">{{ set.title }}</h2>
      <span class="card-count"
        >{{ set.cards.length }}
        {{ set.cards.length === 1 ? "card" : "cards" }}</span
      >
    </div>

    <p class="set-description">{{ set.description }}</p>

    <div class="set-footer">
      <span class="created-date">Created: {{ formatDate(set.createdAt) }}</span>
      <!-- TODO: Implement delete functionality -->
      <button
        class="delete-button"
        @click.prevent="$emit('delete', set.id, set.title)"
      >
        <i class="bi bi-trash"></i>
      </button>
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

defineEmits(["delete"]);

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
  gap: 0.75rem;
}

.set-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  min-height: 1.25rem;
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
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  min-height: 3rem;
}

.set-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.created-date {
  color: #6c757d;
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.delete-button {
  background-color: #ffffff;
  color: #dc3545;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.2s;
}

.delete-button:hover {
  color: #bb2d3b;
}

@media (max-width: 480px) {
  .set-footer {
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>

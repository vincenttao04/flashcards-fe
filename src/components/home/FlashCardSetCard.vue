<!-- /**
 * CardSet Component
 * Displays a flashcard set preview with title, description, and metadata
 * 
 * @component
 * @props {Object} set - Flashcard set data containing id, title, description, cards, and createdAt
 * @emits {edit} - Emits when edit button is clicked (payload: setId, setTitle)
 * @emits {delete} - Emits when delete button is clicked (payload: setId, setTitle)
 */ -->
<script setup>
const props = defineProps({
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

<template>
  <div class="card-set">
    <!-- Main clickable area -->
    <router-link
      :to="{ name: 'flashcard', params: { setId: props.set.id } }"
      class="card-set-link"
    >
      <div class="set-header">
        <h2 class="set-title">{{ set.title }}</h2>
        <span class="card-count"
          >{{ set.cards.length }}<i class="bi bi-card-text"></i>
        </span>
      </div>

      <p class="set-description">{{ set.description }}</p>

      <div class="set-footer">
        <span class="created-date"
          >Created: {{ formatDate(set.createdAt) }}</span
        >
      </div>
    </router-link>

    <!-- Action buttons -->
    <!-- TODO: Implement delete functionality -->
    <div class="action-buttons">
      <router-link
        :to="{ name: 'edit', params: { setId: props.set.id } }"
        class="edit-button"
      >
        <i class="bi bi-pen"></i>
      </router-link>
      <button class="delete-button" @click="$emit('delete', set.id, set.title)">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.card-set {
  position: relative;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.card-set:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
}

.card-set-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
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
  display: flex;
  align-items: center;
  background-color: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 400;
  white-space: nowrap;
  gap: 0.25rem;
}

.card-count i {
  margin-top: 0.015rem;
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
  min-height: 2.85rem;
  /* -webkit-line-clamp: 3;
  line-clamp: 3;
  min-height: 4.4rem; */
}

.set-footer {
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px solid #e9ecef;
}

.created-date {
  color: #6c757d;
  font-size: 0.85rem;
}

.action-buttons {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  gap: 0.6rem;
  z-index: 1;
}

.edit-button,
.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.edit-button {
  color: #666;
  font-size: 1.14rem;
}

.edit-button:hover {
  color: #000;
}

.edit-button:focus-visible {
  outline: 2px solid #666;
  outline-offset: 2px;
  border-radius: 4px;
}

.delete-button {
  color: #dc3545;
  font-size: 1.2rem;
}

.delete-button:hover {
  color: #bb2d3b;
}

.delete-button:focus-visible {
  outline: 2px solid #dc3545;
  outline-offset: 2px;
  border-radius: 4px;
}

@media (max-width: 480px) {
  .set-footer {
    padding-bottom: 2rem;
  }
}
</style>

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
  deck: {
    type: Object,
    required: true,
  },
  deleting: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["delete"]);

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
}
</script>

<template>
  <div class="chip-container">
    <!-- Main Clickable Area -->
    <router-link
      :to="{ name: 'deck', params: { deckId: props.deck.id } }"
      class="chip-link"
    >
      <div class="chip-header">
        <h2 class="chip-title">{{ deck.title }}</h2>
        <span class="card-count"
          >{{ deck.cards.length }}<i class="bi bi-card-text"></i>
        </span>
      </div>

      <p class="chip-description">{{ deck.description }}</p>

      <div class="chip-footer">
        <p class="created-date">
          <span class="created-label">Created:</span>
          {{ formatDate(deck.createdAt) }}
        </p>
        <!-- Action Buttons -->
        <div class="chip-actions">
          <router-link
            :to="{ name: 'edit', params: { deckId: props.deck.id } }"
            class="edit-btn"
          >
            <i class="bi bi-pen"></i>
          </router-link>
          <button
            class="delete-btn"
            :disabled="deleting"
            @click="$emit('delete', deck.id, deck.title)"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.chip-container {
  position: relative;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.chip-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
}

.chip-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
}

.chip-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 0.75rem;
}

.chip-title {
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
  gap: 0.3rem;
}

.card-count i {
  margin-top: 0.015rem;
}

.chip-description {
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

.chip-footer {
  display: flex;
  justify-content: space-between;
  align-items: last baseline;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px solid #e9ecef;
}

.created-date {
  color: #6c757d;
  font-size: 0.85rem;
  margin-bottom: 0;
}

.chip-actions {
  display: flex;
  gap: 0.6rem;
}

.edit-btn,
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.edit-btn {
  color: #666;
  font-size: 1.14rem;
}

.edit-btn:hover {
  color: #000;
}

.edit-btn:focus-visible {
  outline: 2px solid #666;
  outline-offset: 2px;
  border-radius: 4px;
}

.delete-btn {
  color: #dc3545;
  font-size: 1.2rem;
}

.delete-btn:hover {
  color: #bb2d3b;
}

.delete-btn:focus-visible {
  outline: 2px solid #dc3545;
  outline-offset: 2px;
  border-radius: 4px;
}

@media (max-width: 360px) {
  .created-label {
    display: none;
  }
}
</style>

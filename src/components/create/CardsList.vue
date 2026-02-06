<!-- /**
 * CardsList Component
 * Manages a list of flashcards with add/remove functionality
 * 
 * @component
 * @props {Array} cards - Array of flashcard objects
 * @emits {add} - Emits when adding a new card
 * @emits {remove} - Emits when removing a card (payload: index)
 * @emits {update:cards} - Emits when updating cards (payload: newCardsArray)
 */ -->
<template>
  <div class="cards-list">
    <h2>Cards</h2>
    <div v-for="(card, index) in cards" :key="index" class="card-form">
      <div class="card-header">
        <h3>Card {{ index + 1 }}</h3>
        <button
          type="button"
          class="remove-btn"
          :aria-label="`Remove card ${index + 1}`"
          @click="$emit('remove', index)"
          :disabled="cards.length <= 1"
        >
          Remove
        </button>
      </div>

      <CardForm :card="card" :index="index" @update="updateCard" />
    </div>

    <button
      type="button"
      class="add-card-btn"
      aria-label="Add Another Card"
      @click="$emit('add')"
    >
      <i class="bi bi-plus-lg"></i>
      Add Another Card
    </button>
  </div>
</template>

<script setup>
import CardForm from "./CardForm.vue";

const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["add", "remove", "update:cards"]);

// Function to update a specific card in the list
function updateCard(index, updatedCard) {
  const newCards = [...props.cards];
  newCards[index] = updatedCard;
  emit("update:cards", newCards);
}
</script>

<style scoped>
.cards-list {
  margin-top: 2rem;
}

h2 {
  color: #2c3e50;
  margin: 1.5rem 0 1rem;
  font-weight: 500;
  font-size: 1.25rem;
}

.card-form {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: #495057;
}

.remove-btn {
  background-color: #f8d7da;
  color: #842029;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.remove-btn:hover:not(:disabled) {
  background-color: #f5c2c7;
}

.remove-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.add-card-btn {
  background-color: #e9ecef;
  border: 1px dashed #adb5bd;
  color: #495057;
  padding: 0.75rem;
  width: 100%;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  place-content: center;
  gap: 0.35rem;
}

.add-card-btn:hover {
  background-color: #dee2e6;
}
</style>

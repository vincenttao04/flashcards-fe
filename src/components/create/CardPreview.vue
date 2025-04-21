<!-- /**
 * CardPreview Component
 * Displays a preview of flashcards with navigation controls
 * 
 * @component
 * @props {Array} cards - Array of flashcard objects to preview
 * @props {Number} previewIndex - Current card index being displayed
 * @emits {update:index} - Emits when navigation changes the current card
 *                         Payload: (newIndex)
 */ -->
<template>
  <div class="preview-section">
    <h2>Preview</h2>
    <div class="preview-card">
      <FlashCard
        :card="cards[previewIndex]"
        :is-flipped="isFlipped"
        @flip="isFlipped = !isFlipped"
      />

      <CardNavigator
        :current-index="previewIndex"
        :total="cards.length"
        @prev="prevCard"
        @next="nextCard"
        class="preview-navigator"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FlashCard from "../flashcard/FlashCard.vue";
import CardNavigator from "../flashcard/CardNavigator.vue";

const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
  previewIndex: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:index"]);
const isFlipped = ref(false);

// Function to display the next card
function nextCard() {
  if (props.previewIndex < props.cards.length - 1) {
    emit("update:index", props.previewIndex + 1);
    isFlipped.value = false;
  }
}

// Function to display the previous card
function prevCard() {
  if (props.previewIndex > 0) {
    emit("update:index", props.previewIndex - 1);
    isFlipped.value = false;
  }
}
</script>

<style scoped>
.preview-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

.preview-card {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 2rem;
}

.preview-navigator {
  margin-top: 1rem;
}
</style>

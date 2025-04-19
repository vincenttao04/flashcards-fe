<template>
  <div class="preview-section">
    <h2>Preview</h2>
    <div class="preview-card">
      <FlashCard
        :card="cards[previewIndex]"
        :is-flipped="isFlipped"
        @flip="isFlipped = !isFlipped"
      />

      <div class="preview-controls">
        <button
          class="control-btn"
          @click="prevCard"
          :disabled="previewIndex === 0"
        >
          <span class="icon">←</span> Previous
        </button>

        <div class="progress">{{ previewIndex + 1 }} / {{ cards.length }}</div>

        <button
          class="control-btn"
          @click="nextCard"
          :disabled="previewIndex === cards.length - 1"
        >
          Next <span class="icon">→</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FlashCard from "../flashcard/FlashCard.vue";

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

function nextCard() {
  if (props.previewIndex < props.cards.length - 1) {
    emit("update:index", props.previewIndex + 1);
    isFlipped.value = false;
  }
}

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

.preview-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
}

.control-btn {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  color: #495057;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

.control-btn:hover:not(:disabled) {
  background-color: #e9ecef;
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.progress {
  font-size: 0.9rem;
  color: #6c757d;
}

.icon {
  margin: 0 0.25rem;
}
</style>

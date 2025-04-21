<!-- /**
 * CardNavigator Component
 * Navigation controls for moving between flashcards with progress indicator
 * 
 * @component
 * @props {Number} currentIndex - Current card position (zero-based)
 * @props {Number} total - Total number of cards
 * @emits {prev} - Emits when previous button is clicked
 * @emits {next} - Emits when next button is clicked
 */ -->
<template>
  <div class="controls" aria-label="Flashcard Navigation Controls">
    <button
      class="control-btn"
      @click="$emit('prev')"
      :disabled="currentIndex === 0"
      aria-label="Previous Card"
    >
      <i class="bi bi-chevron-left"></i>
      Previous
    </button>

    <div class="progress">{{ currentIndex + 1 }} / {{ total }}</div>

    <button
      class="control-btn"
      @click="$emit('next')"
      :disabled="currentIndex === total - 1"
      aria-label="Next Card"
    >
      Next
      <i class="bi bi-chevron-right"></i>
    </button>
  </div>
</template>

<script setup>
defineProps({
  currentIndex: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

defineEmits(["prev", "next"]);
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;
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
  gap: 0.5rem; /* gap between the icon and text */
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
</style>

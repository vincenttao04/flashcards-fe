<!--
  CardNavigator
  Purpose: Previous/next controls and progress display for deck navigation.
  Props:
  - currentIndex (Number)
  - total (Number)
  Emits:
  - prev
  - next
-->

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

<template>
  <nav class="controls" aria-label="Flashcard navigation">
    <button
      type="button"
      class="control-btn"
      @click="$emit('prev')"
      :disabled="currentIndex === 0"
    >
      <i class="bi bi-chevron-left" aria-hidden="true"></i>
      <span class="control-text">Previous</span>
    </button>

    <div
      class="progress-index"
      aria-live="polite"
      :aria-label="`Card ${currentIndex + 1} of ${total}`"
    >
      {{ currentIndex + 1 }} / {{ total }}
    </div>

    <button
      type="button"
      class="control-btn"
      @click="$emit('next')"
      :disabled="currentIndex === total - 1"
    >
      <span class="control-text">Next</span>
      <i class="bi bi-chevron-right" aria-hidden="true"></i>
    </button>
  </nav>
</template>

<style scoped>
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 2rem;
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
  gap: 0.5rem;
  transition: background-color 0.2s ease;
}

.control-btn:hover:not(:disabled) {
  background-color: #e9ecef;
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.progress-index {
  font-size: 0.9rem;
  color: #495057;
  width: 100%;
  text-align: center;
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 480px) {
  .controls {
    gap: 1rem;
  }

  .control-text {
    display: none;
  }
}

@media (max-width: 360px) {
  .controls {
    gap: 0.5rem;
  }
}
</style>

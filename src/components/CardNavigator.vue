// This component is used to navigate through a list of cards. // It provides
buttons to go to the previous and next cards, and displays the current card
index out of the total number of cards.
<template>
  <div class="controls">
    <button
      class="control-btn"
      @click="$emit('prev')"
      :disabled="currentIndex === 0"
    >
      <span class="icon">←</span> Previous
    </button>

    <div class="progress">{{ currentIndex + 1 }} / {{ total }}</div>

    <button
      class="control-btn"
      @click="$emit('next')"
      :disabled="currentIndex === total - 1"
    >
      Next <span class="icon">→</span>
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
  transition: all 0.2s;
}

.control-btn:hover:not(:disabled) {
  background-color: #e9ecef;
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon {
  margin: 0 0.25rem;
}

.progress {
  font-size: 0.9rem;
  color: #6c757d;
}
</style>

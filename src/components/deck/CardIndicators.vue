<!--
  CardIndicators
  Purpose: Pagination dots for selecting a card within a deck.
  Props:
  - currentIndex (Number)
  - total (Number)
  Emits:
  - select(index)
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

defineEmits(["select"]);
</script>

<template>
  <nav class="card-indicators" aria-label="Flashcard navigation">
    <button
      v-for="index in total"
      :key="index - 1"
      type="button"
      class="indicator"
      :class="{ active: index - 1 === currentIndex }"
      @click="$emit('select', index - 1)"
      :aria-label="`Go to card ${index} of ${total}`"
      :aria-current="index - 1 === currentIndex ? 'true' : undefined"
    ></button>
  </nav>
</template>

<style scoped>
.card-indicators {
  display: flex;
  gap: 8px;
  margin-top: 1.5rem;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #dee2e6;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border: none;
  padding: 0;
}

.indicator.active {
  background-color: #495057;
}

.indicator:focus-visible {
  outline: 2px solid #228be6;
  outline-offset: 2px;
}
</style>

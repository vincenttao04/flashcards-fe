<!-- /**
 * CardIndicators Component
 * Displays interactive pagination dots for navigating through flashcards
 * 
 * @component
 * @props {Number} currentIndex - The index of the currently active card
 * @props {Number} total - Total number of cards
 * @emits {select} - Emits when an indicator is clicked (payload: selectedIndex)
 */ -->
<template>
  <div class="card-indicators" aria-label="Flashcard Indicators">
    <span
      v-for="index in total"
      :key="index - 1"
      class="indicator"
      :class="{ active: index - 1 === currentIndex }"
      @click="$emit('select', index - 1)"
      :aria-selected="index - 1 === currentIndex"
      :aria-label="`Card ${index} of ${total}`"
    ></span>
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

defineEmits(["select"]);
</script>

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
  transition: background-color 0.2s;
}

.indicator.active {
  background-color: #495057;
}
</style>

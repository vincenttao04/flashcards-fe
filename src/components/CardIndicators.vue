// This component is used to display a series of indicators (dots) for a card
slider.
<template>
  <div class="card-indicators">
    <span
      v-for="index in total"
      :key="index - 1"
      class="indicator"
      :class="{ active: index - 1 === currentIndex }"
      @click="$emit('select', index - 1)"
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

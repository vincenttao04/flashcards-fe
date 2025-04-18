// This component represents a flashcard that can be flipped to show the answer.
<template>
  <div class="card-container">
    <div class="card" :class="{ flipped: isFlipped }" @click="flipCard">
      <div class="card-face card-front">
        <p>{{ card.question }}</p>
      </div>
      <div class="card-face card-back">
        <p>{{ card.answer }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const isFlipped = ref(false);

function flipCard() {
  isFlipped.value = !isFlipped.value;
}

defineExpose({ isFlipped });
</script>

<style scoped>
.card-container {
  width: 100%;
  height: 300px;
  perspective: 1000px;
  margin-bottom: 2rem;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  cursor: pointer;
}

.card.flipped {
  transform: rotateY(-180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background-color: white;
  text-align: center;
}

.card-front {
  font-size: 1.5rem;
  font-weight: 500;
}

.card-back {
  transform: rotateY(180deg);
  font-size: 1.25rem;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .card-container {
    height: 250px;
  }

  .card-front {
    font-size: 1.25rem;
  }

  .card-back {
    font-size: 1rem;
  }
}
</style>

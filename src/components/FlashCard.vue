<template>
  <div class="flash-card-app">
    <h1>Flash Cards</h1>

    <div class="card-container">
      <div class="card" :class="{ flipped: isFlipped }" @click="flipCard">
        <div class="card-face card-front">
          <p>{{ currentCard.question }}</p>
        </div>
        <div class="card-face card-back">
          <p>{{ currentCard.answer }}</p>
        </div>
      </div>
    </div>

    <div class="controls">
      <button
        class="control-btn"
        @click="prevCard"
        :disabled="currentIndex === 0"
      >
        <span class="icon">←</span> Previous
      </button>

      <div class="progress">{{ currentIndex + 1 }} / {{ cards.length }}</div>

      <button
        class="control-btn"
        @click="nextCard"
        :disabled="currentIndex === cards.length - 1"
      >
        Next <span class="icon">→</span>
      </button>
    </div>

    <div class="card-indicators">
      <span
        v-for="(card, index) in cards"
        :key="index"
        class="indicator"
        :class="{ active: index === currentIndex }"
        @click="goToCard(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Sample flash cards data
const cards = ref([
  {
    question: "What is Vue.js?",
    answer:
      "Vue.js is a progressive JavaScript framework for building user interfaces.",
  },
  {
    question: "What is a component in Vue?",
    answer:
      "A component is a reusable Vue instance with a name that encapsulates HTML, CSS, and JavaScript.",
  },
  {
    question: "What is the Vue instance?",
    answer:
      "The Vue instance is the root of a Vue application that controls the entire app.",
  },
  {
    question: "What is v-bind used for?",
    answer:
      "v-bind is used to bind an attribute to a dynamic value from your data.",
  },
  {
    question: "What is v-model?",
    answer:
      "v-model is used for two-way data binding on form inputs and components.",
  },
]);

const currentIndex = ref(0);
const isFlipped = ref(false);

const currentCard = computed(() => {
  return cards.value[currentIndex.value];
});

function flipCard() {
  isFlipped.value = !isFlipped.value;
}

function nextCard() {
  if (currentIndex.value < cards.value.length - 1) {
    currentIndex.value++;
    isFlipped.value = false;
  }
}

function prevCard() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    isFlipped.value = false;
  }
}

function goToCard(index) {
  currentIndex.value = index;
  isFlipped.value = false;
}
</script>

<style scoped>
.flash-card-app {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-weight: 600;
}

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
  transform: rotateY(180deg);
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

@media (max-width: 640px) {
  .flash-card-app {
    padding: 1rem;
  }

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

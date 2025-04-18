<template>
  <div class="flash-card-app">
    <h1>Flash Cards</h1>

    <FlashCard ref="flashCardRef" :card="currentCard" />

    <CardNavigator
      :current-index="currentIndex"
      :total="cards.length"
      @prev="prevCard"
      @next="nextCard"
    />

    <CardIndicators
      :current-index="currentIndex"
      :total="cards.length"
      @select="goToCard"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import FlashCard from "../components/FlashCard.vue";
import CardNavigator from "../components/CardNavigator.vue";
import CardIndicators from "../components/CardIndicators.vue";

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
const flashCardRef = ref(null);

const currentCard = computed(() => cards.value[currentIndex.value]);

function nextCard() {
  if (currentIndex.value < cards.value.length - 1) {
    currentIndex.value++;
    flashCardRef.value.isFlipped = false;
  }
}

function prevCard() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    flashCardRef.value.isFlipped = false;
  }
}

function goToCard(index) {
  currentIndex.value = index;
  flashCardRef.value.isFlipped = false;
}
</script>

<style scoped>
.flash-card-app {
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

@media (max-width: 640px) {
  .flash-card-app {
    padding: 1rem;
  }
}
</style>

// This is a Vue 3 component for a Flash Card application. It includes a flash
card component, navigation buttons, and indicators for the cards.
<template>
  <div class="flash-card-app">
    <header class="app-header">
      <router-link to="/" class="back-link">← Back to Sets</router-link>
      <h1>{{ cardSet.title }}</h1>
    </header>

    <FlashCard :card="currentCard" :is-flipped="isFlipped" @flip="handleFlip" />

    <CardNavigator
      :current-index="currentIndex"
      :total="cardSet.cards.length"
      @prev="prevCard"
      @next="nextCard"
    />

    <CardIndicators
      :current-index="currentIndex"
      :total="cardSet.cards.length"
      @select="goToCard"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getFlashCardSet } from "../data/FlashCardSets";
import FlashCard from "../components/FlashCard.vue";
import CardNavigator from "../components/CardNavigator.vue";
import CardIndicators from "../components/CardIndicators.vue";

const route = useRoute();
const cardSet = ref(null);
const currentIndex = ref(0);
const isFlipped = ref(false);

onMounted(() => {
  cardSet.value = getFlashCardSet(route.params.setId);
});

const currentCard = computed(() => cardSet.value?.cards[currentIndex.value]);

function handleFlip() {
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
.app-header {
  width: 100%;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  color: #666;
  text-decoration: none;
}

.back-link:hover {
  color: #333;
}

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

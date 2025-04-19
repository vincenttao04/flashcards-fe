// This is a Vue 3 component for a Flash Card application. It includes a flash
card component, navigation buttons, and indicators for the cards.
<template>
  <div class="flash-card-app" v-if="cardSet">
    <header class="app-header">
      <router-link to="/" class="back-link">← Back to Sets</router-link>
      <h1>{{ cardSet.title }}</h1>
    </header>

    <FlashCard
      v-if="currentCard"
      :card="currentCard"
      :is-flipped="isFlipped"
      @flip="handleFlip"
    />

    <CardNavigator
      v-if="cardSet.cards.length"
      :current-index="currentIndex"
      :total="cardSet.cards.length"
      @prev="prevCard"
      @next="nextCard"
    />

    <CardIndicators
      v-if="cardSet.cards.length"
      :current-index="currentIndex"
      :total="cardSet.cards.length"
      @select="goToCard"
    />
  </div>
  <div v-else class="error-state">
    <h2>Flash Card Set Not Found</h2>
    <router-link to="/" class="back-link">Return to Home</router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getFlashCardSet } from "../data/FlashCardSets";
import FlashCard from "../components/FlashCard.vue";
import CardNavigator from "../components/CardNavigator.vue";
import CardIndicators from "../components/CardIndicators.vue";

const route = useRoute();
const router = useRouter();
const cardSet = ref(null);
const currentIndex = ref(0);
const isFlipped = ref(false);

// Watch for route changes
watch(
  () => route.params.setId,
  (newSetId) => {
    loadCardSet(newSetId);
  }
);

// Load card set data
function loadCardSet(setId) {
  const set = getFlashCardSet(setId);
  if (set) {
    cardSet.value = set;
    currentIndex.value = 0;
    isFlipped.value = false;
  } else {
    // Handle non-existent set
    router.push("/");
  }
}

// Initialize on component mount
onMounted(() => {
  loadCardSet(route.params.setId);
});

const currentCard = computed(() => cardSet.value?.cards?.[currentIndex.value]);

function handleFlip() {
  isFlipped.value = !isFlipped.value;
}

function nextCard() {
  if (cardSet.value && currentIndex.value < cardSet.value.cards.length - 1) {
    currentIndex.value++;
    isFlipped.value = false;
  }
}

function prevCard() {
  if (cardSet.value && currentIndex.value > 0) {
    currentIndex.value--;
    isFlipped.value = false;
  }
}

function goToCard(index) {
  if (cardSet.value && index >= 0 && index < cardSet.value.cards.length) {
    currentIndex.value = index;
    isFlipped.value = false;
  }
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

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-weight: 600;
}

.error-state {
  text-align: center;
  padding: 2rem;
}

.error-state h2 {
  margin-bottom: 1rem;
  color: #666;
}

@media (max-width: 640px) {
  .flash-card-app {
    padding: 1rem;
  }
}
</style>

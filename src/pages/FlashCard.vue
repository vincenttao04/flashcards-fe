<!-- /**
 * FlashCardPage Component
 * Main page for displaying and interacting with flashcard sets
 * 
 * @component
 * @uses PageHeader
 * @uses FlashCard
 * @uses CardNavigator
 * @uses CardIndicators (currently commented out)
 */ -->
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import PageHeader from "../components/global/PageHeader.vue";
import FlashCard from "../components/flashcard/CardInterface.vue";
import CardNavigator from "../components/flashcard/CardNavigator.vue";
// import CardIndicators from "../components/flashcard/CardIndicators.vue"; // Uncomment if you want to implement card indicators

import { getDeck } from "../api";

const { setId } = defineProps({
  setId: String,
});

const router = useRouter();
const deck = ref(null);
const currentIndex = ref(0);
const isFlipped = ref(false);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    deck.value = await getDeck(Number(setId));
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
});

const currentCard = computed(() => deck.value?.cards?.[currentIndex.value]);

function handleFlip() {
  isFlipped.value = !isFlipped.value;
}

function nextCard() {
  if (deck.value && currentIndex.value < deck.value.cards.length - 1) {
    currentIndex.value++;
    isFlipped.value = false;
  }
}

function prevCard() {
  if (deck.value && currentIndex.value > 0) {
    currentIndex.value--;
    isFlipped.value = false;
  }
}

// Uncomment if you want to implement card indicators
// function goToCard(index) {
//   if (deck.value && index >= 0 && index < deck.value.cards.length) {
//     currentIndex.value = index;
//     isFlipped.value = false;
//   }
// }
</script>

<template>
  <div class="flash-card-app" v-if="deck">
    <div class="header-container">
      <PageHeader
        :title="deck.title"
        :showBackLink="true"
        :backTo="{ name: 'home' }"
        alignment="left"
      />

      <!-- TODO: Implement edit icon to trigger edit functionality (and button wrapper?) -->
      <router-link :to="{ name: 'edit', params: { setId } }" class="edit-icon">
        <i class="bi bi-pen"></i>
      </router-link>
    </div>

    <FlashCard
      :key="currentIndex"
      class="flash-card"
      v-if="currentCard"
      :card="currentCard"
      :is-flipped="isFlipped"
      @flip="handleFlip"
    />

    <CardNavigator
      v-if="deck.cards.length"
      :current-index="currentIndex"
      :total="deck.cards.length"
      @prev="prevCard"
      @next="nextCard"
    />

    <!-- Not current used, but can be uncommented for card indicators -->
    <!-- <CardIndicators
      v-if="deck.cards.length"
      :current-index="currentIndex"
      :total="deck.cards.length"
      @select="goToCard"
    /> -->
  </div>
  <div v-else class="error-state">
    <h2>Flash Card Set Not Found</h2>
    <router-link to="/" class="back-link">Return to Home</router-link>
  </div>
</template>

<style scoped>
.flash-card-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.edit-icon {
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;
  margin-bottom: 2.5rem; /* Align with the bottom of the header */
}

.edit-icon:hover {
  color: #000000;
}

.flash-card {
  margin-top: 1rem;
  margin-bottom: 3rem;
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

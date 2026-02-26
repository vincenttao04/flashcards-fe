<!-- /**
 * DeckView Page
 * Main page for displaying and interacting with a specific deck of cards
 * 
 * @component
 * @uses PageHeader
 * @uses CardInterface
 * @uses CardNavigator
 * @uses CardIndicators (currently commented out)
 */ -->
<script setup>
import { ref, computed, onMounted } from "vue";
import PageHeader from "@/components/global/PageHeader.vue";
import CardInterface from "@/components/deck/CardInterface.vue";
import CardNavigator from "@/components/deck/CardNavigator.vue";
// import CardIndicators from "@/components/deck/CardIndicators.vue"; // Uncomment if you want to implement card indicators

import { deckApi } from "@/api/deckApi";
import Error from "@/components/global/Error.vue";
import Loading from "@/components/global/Loading.vue";
import { useAsyncState } from "@/composables/useAsyncState";

// State for page loading
const { loading, error, run } = useAsyncState();

const { deckId } = defineProps({
  deckId: String,
});

const deck = ref(null);
const currentIndex = ref(0);
const isFlipped = ref(false);

onMounted(() => {
  run(async () => {
    if (Number.isNaN(Number(deckId))) {
      error.value = "Invalid deck id";
      return;
    }

    const data = await deckApi.get(Number(deckId));

    if (!data) {
      error.value = "Flashcards not found";
      return;
    }

    deck.value = data;
  });
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
  <div class="flash-card-app" v-if="!loading && !error && deck">
    <div class="header-container">
      <PageHeader
        :title="deck.title"
        :showBackLink="true"
        :backTo="{ name: 'home' }"
        alignment="left"
      />

      <router-link :to="{ name: 'edit', params: { deckId } }" class="edit-icon">
        <i class="bi bi-pen"></i>
      </router-link>
    </div>

    <CardInterface
      :key="currentIndex"
      class="flash-card"
      v-if="currentCard"
      :card="currentCard"
      :is-flipped="isFlipped"
      @flip="handleFlip"
    />

    <CardNavigator
      v-if="deck.cards?.length"
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

  <!-- Loading State-->
  <Loading v-else-if="loading" type="page"></Loading>
  <!-- Error State-->
  <Error
    v-else-if="error"
    :message="'Flashcard deck not found'"
    :link="true"
    type="page"
  ></Error>
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

@media (max-width: 640px) {
  .flash-card-app {
    padding: 1rem;
  }
}
</style>

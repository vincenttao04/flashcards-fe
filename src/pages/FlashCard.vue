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
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getFlashCardSet } from "../data/flashCardSets.js";
import PageHeader from "../components/global/PageHeader.vue";
import FlashCard from "../components/flashcard/FlashCard.vue";
import CardNavigator from "../components/flashcard/CardNavigator.vue";
// import CardIndicators from "../components/flashcard/CardIndicators.vue"; // Uncomment if you want to implement card indicators

const { setId } = defineProps({
  setId: String,
});

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
  },
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
    // router.push("/");
    cardSet.value = null;
  }
}

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

// Uncomment if you want to implement card indicators
// function goToCard(index) {
//   if (cardSet.value && index >= 0 && index < cardSet.value.cards.length) {
//     currentIndex.value = index;
//     isFlipped.value = false;
//   }
// }

// Function to handle edit action (currently a mock alert)
function handleEdit() {
  alert(
    `[MOCK] Edit flash card set: ${cardSet.value.title}\n\nTo edit a flash card set, please amend the code in src/data/flashCardSets.js`,
  );
}
</script>

<template>
  <div class="flash-card-app" v-if="cardSet">
    <div class="header-container">
      <PageHeader
        :title="cardSet.title"
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
      v-if="cardSet.cards.length"
      :current-index="currentIndex"
      :total="cardSet.cards.length"
      @prev="prevCard"
      @next="nextCard"
    />

    <!-- Not current used, but can be uncommented for card indicators -->
    <!-- <CardIndicators
      v-if="cardSet.cards.length"
      :current-index="currentIndex"
      :total="cardSet.cards.length"
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

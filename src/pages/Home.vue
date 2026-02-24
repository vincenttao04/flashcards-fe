<!-- /**
 * HomePage Component
 * Main landing page displaying all flashcard sets with search and creation functionality
 * 
 * @component
 * @uses PageHeader
 * @uses SearchBar
 * @uses FlashCardChip
 */ -->
<script setup>
import { ref, computed, onMounted } from "vue";
import PageHeader from "../components/global/PageHeader.vue";
import SearchBar from "../components/home/SearchBar.vue";
import FlashCardChip from "../components/home/FlashCardChip.vue";
import Error from "../components/global/Error.vue";
import Loading from "../components/global/Loading.vue";

import { getDecks, deleteDeck } from "../api";

const searchQuery = ref("");
const decks = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  error.value = null;

  try {
    decks.value = await getDecks();
  } catch (err) {
    alert(err);
    error.value = err.message || "Failed to load flashcards";
  } finally {
    loading.value = false;
  }
});

// Computed property to filter flashcard sets based on the search query
const filteredFlashCards = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return decks.value;

  return decks.value.filter((set) => {
    const titleMatch = set.title.toLowerCase().includes(query);
    const descriptionMatch = set.description.toLowerCase().includes(query);
    const cardsMatch = set.cards.some((card) => {
      const questionMatch = card.question.toLowerCase().includes(query);
      const answerMatch = card.answer.toLowerCase().includes(query);
      return questionMatch || answerMatch;
    });

    return titleMatch || descriptionMatch || cardsMatch;
  });
});

const noSearchResults = computed(() => {
  return (
    !loading.value &&
    !error.value &&
    searchQuery.value.trim() !== "" &&
    filteredFlashCards.value.length === 0
  );
});

// Function to handle the deletion of a flash card set, currently a mock function that shows an alert.
async function handleDelete(setId, setTitle) {
  if (!confirm(`Delete "${setTitle}"? This cannot be undone.`)) {
    return;
  }

  try {
    await deleteDeck(setId);
    decks.value = decks.value.filter((deck) => deck.id !== setId);
  } catch (err) {
    alert(err.message);
    error.value = err.message || "Failed to delete flashcards";
  }
}
</script>

<template>
  <div class="home-page">
    <!-- Loading State-->
    <Loading v-if="loading" type="page" />
    <!-- Error State-->
    <Error v-else-if="error" :message="error" :link="true" type="page" />

    <!-- Main Content -->
    <template v-else>
      <PageHeader
        title="Flashcard Library"
        subtitle="Explore and create your personal collection of flashcards"
        alignment="center"
      />

      <div class="actions-container">
        <router-link to="/create" class="create-button">
          <i class="bi bi-plus-lg" aria-hidden="true"></i>
          <span>Create Flashcards</span>
        </router-link>

        <div class="search-wrapper">
          <SearchBar v-model="searchQuery" />
        </div>
      </div>

      <p v-if="noSearchResults" class="text-muted">
        <em>No search results for: {{ searchQuery }}</em>
      </p>

      <div v-else class="flash-card-sets">
        <FlashCardChip
          v-for="set in filteredFlashCards"
          :key="set.id"
          :set="set"
          @delete="handleDelete"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
}

.actions-container {
  display: flex;
  flex-wrap: wrap;
  height: 48px;
  align-items: stretch;
  gap: 2rem;
  margin-top: 3rem;
  margin-bottom: 2.5rem;
}

.create-button {
  background-color: #228be6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100%;
  width: 200px;
  min-width: 160px;
  flex-shrink: 0;
  gap: 0.5rem; /* Gap between the icon and text */
}

.create-button:hover {
  background-color: #1c7ed6;
}

.button-text {
  margin-right: 0.25rem;
}

.search-wrapper {
  margin-left: auto;
  max-width: 500px;
  min-width: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex: 1;
}

.flash-card-sets {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .home-page {
    padding: 1rem;
  }

  .actions-container {
    height: auto;
  }

  .create-button {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }

  .search-wrapper {
    margin-left: 0;
    max-width: 100%;
    width: 100%;
  }
}
</style>

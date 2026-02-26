<!-- /**
 * Home Page
 * Main page displaying all decks with search and creation functionality
 * 
 * @component
 * @uses PageHeader
 * @uses SearchBar
 * @uses DeckChip
 */ -->
<script setup>
import { computed, onMounted, ref } from "vue";

import { deckApi } from "@/api/deckApi";
import ErrorInterface from "@/components/global/ErrorInterface.vue";
import LoadingInterface from "@/components/global/LoadingInterface.vue";
import PageHeader from "@/components/global/PageHeader.vue";
import DeckChip from "@/components/home/DeckChip.vue";
import SearchBar from "@/components/home/SearchBar.vue";
import { useAsyncState } from "@/composables/useAsyncState";

// State for page loading
const { loading, error, run } = useAsyncState();
// State for deleting
const {
  loading: deleting,
  error: deleteError,
  run: runDelete,
} = useAsyncState();

const searchQuery = ref("");
const decks = ref([]);

onMounted(() => {
  run(async () => {
    const data = await deckApi.getAll();

    if (!data) {
      throw new Error("Failed to load flashcards");
    }

    decks.value = data;
  });
});

async function handleDelete(deckId, deckTitle) {
  if (!confirm(`Delete "${deckTitle}"? This cannot be undone.`)) {
    return;
  }

  try {
    await runDelete(async () => {
      await deckApi.delete(deckId);
      decks.value = decks.value.filter((deck) => deck.id !== deckId);
    });
  } catch {
    alert(deleteError.value || "Failed to delete flashcards");
  }
}

// Filter decks based on search query matching title, description, or any card's question/answer
const filteredDecks = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return decks.value;

  return decks.value.filter((deck) => {
    const titleMatch = deck.title.toLowerCase().includes(query);
    const descriptionMatch = deck.description.toLowerCase().includes(query);

    const cards = deck.cards ?? [];
    const cardsMatch = cards.some((card) => {
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
    filteredDecks.value.length === 0
  );
});
</script>

<template>
  <div class="home-page-container">
    <!-- Loading State-->
    <LoadingInterface v-if="loading" type="page" />
    <!-- Error State-->
    <ErrorInterface
      v-else-if="error"
      :message="error"
      :link="true"
      type="page"
    />

    <!-- Main Content -->
    <template v-else>
      <PageHeader
        title="Flashcard Library"
        subtitle="Explore and create your personal collection of flashcards"
        alignment="center"
      />

      <div class="actions-container">
        <router-link to="/create" class="create-btn">
          <i class="bi bi-plus-lg" aria-hidden="true"></i>
          <span>Create Flashcards</span>
        </router-link>

        <div class="search-bar">
          <SearchBar v-model="searchQuery" />
        </div>
      </div>

      <p v-if="noSearchResults" class="text-muted">
        <em>No search results for: {{ searchQuery }}</em>
      </p>

      <div v-else class="decks-container">
        <DeckChip
          v-for="deck in filteredDecks"
          :key="deck.id"
          :deck="deck"
          :deleting="deleting"
          @delete="handleDelete"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.home-page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2.5rem;
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

.create-btn {
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

.create-btn:hover {
  background-color: #1c7ed6;
}

.search-bar {
  margin-left: auto;
  max-width: 500px;
  min-width: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex: 1;
}

.decks-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .home-page-container {
    padding: 1rem;
  }

  .actions-container {
    height: auto;
  }

  .create-btn {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }

  .search-bar {
    margin-left: 0;
    max-width: 100%;
    width: 100%;
  }
}
</style>

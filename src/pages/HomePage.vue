<template>
  <div class="home-page">
    <PageHeader
      title="Flash Card Library"
      subtitle="Explore and create your personal collection of flash cards"
      alignment="center"
    />

    <div class="actions-container">
      <router-link to="/create" class="create-button">
        <i class="bi bi-plus-lg"></i>
        <span class="button-text">Create New Set</span>
      </router-link>
      <div class="search-wrapper">
        <SearchBar v-model="searchQuery" />
      </div>
    </div>

    <div class="flash-card-sets">
      <FlashCardSetCard
        v-for="set in filteredFlashCardSets"
        :key="set.id"
        :set="set"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PageHeader from "../components/common/PageHeader.vue";
import SearchBar from "../components/home/SearchBar.vue";
import FlashCardSetCard from "../components/home/FlashCardSetCard.vue";
import { flashCardSets } from "../data/flashCardSets.js";

const searchQuery = ref("");

const filteredFlashCardSets = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  if (!query) return flashCardSets;

  return flashCardSets.filter((set) => {
    const titleMatch = set.title.toLowerCase().includes(query);
    const descriptionMatch = set.description.toLowerCase().includes(query);
    const cardsMatch = set.cards.some(
      (card) =>
        card.question.toLowerCase().includes(query) ||
        card.answer.toLowerCase().includes(query)
    );

    return titleMatch || descriptionMatch || cardsMatch;
  });
});

function handleDelete(setId, setTitle) {
  alert(`[MOCK] ${setTitle} has been successfully deleted`);
}
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
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
  gap: 0.5rem; /* gap between the icon and text */
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

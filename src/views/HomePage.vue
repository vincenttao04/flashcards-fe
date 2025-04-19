<template>
  <div class="home-page">
    <div class="header">
      <h1>Flash Card Sets</h1>
      <router-link to="/create" class="create-button">
        + Create New Set
      </router-link>
    </div>

    <div class="flash-card-sets">
      <FlashCardSetCard v-for="set in flashCardSets" :key="set.id" :set="set" />
    </div>
  </div>
</template>

<script setup>
import FlashCardSetCard from "../components/FlashCardSetCard.vue";
import { flashCardSets } from "../data/flashCardSets.js";
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.create-button {
  background-color: #228be6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
  display: inline-flex;
  align-items: center;
}

.create-button:hover {
  background-color: #1c7ed6;
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

  .header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .create-button {
    width: 100%;
    justify-content: center;
  }
}
</style>

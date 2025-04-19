<template>
  <div class="home-page">
    <h1>Flash Card Sets</h1>
    <div class="flash-card-sets">
      <FlashCardSetCard v-for="set in flashCardSets" :key="set.id" :set="set" />
    </div>
  </div>
</template>

<script setup>
import FlashCardSetCard from "../components/FlashCardSetCard.vue";
import { flashCardSets } from "../data/FlashCardSets";
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
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
}
</style>

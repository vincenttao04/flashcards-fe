<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import PageHeader from "../components/global/PageHeader.vue";
import HeaderInput from "../components/create-edit/HeaderInput.vue";
import CardsList from "../components/create-edit/CardList.vue";
import PreviewSection from "../components/create-edit/CardPreview.vue";
import FormActions from "../components/create-edit/FormActions.vue";

import { getDeck, updateDeck } from "../api";

import Error from "../components/global/Error.vue";
import Loading from "../components/global/Loading.vue";

const { deckId } = defineProps({
  deckId: String,
});

const router = useRouter();
const title = ref("");
const description = ref("");
const cards = ref([{ question: "", answer: "" }]);
const previewIndex = ref(0);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;

    const deck = await getDeck(Number(deckId));
    if (!deck) {
      error.value = "Flashcards not found";
      return;
    }

    title.value = deck.title;
    description.value = deck.description;
    cards.value = deck.cards.map((card) => ({
      question: card.question,
      answer: card.answer,
    }));
  } catch (err) {
    alert(err.message);
    error.value = err.message || "Failed to load flashcards";
  } finally {
    loading.value = false;
  }
});

const isFormValid = computed(() => {
  return (
    title.value.trim() !== "" &&
    description.value.trim() !== "" &&
    cards.value.every(
      (card) => card.question.trim() !== "" && card.answer.trim() !== "",
    )
  );
});

// Function to check if there is any content in the cards
const hasContent = computed(() => {
  return cards.value.some(
    (card) => card.question.trim() !== "" || card.answer.trim() !== "",
  );
});

// Function to add a new card to the list
function addCard() {
  cards.value.push({ question: "", answer: "" });
}

// Function to remove a card from the list
function removeCard(index) {
  if (cards.value.length > 1) {
    cards.value.splice(index, 1);
    if (previewIndex.value >= cards.value.length) {
      previewIndex.value = cards.value.length - 1;
    }
  }
}

// Function to update the cards list when a card is modified
function updateCards(newCards) {
  cards.value = newCards;
}

// Function to save deck, checks if the form fields are valid and displays a mock alert
async function saveDeck() {
  if (!isFormValid.value) return;

  try {
    await updateDeck(
      Number(deckId),
      title.value,
      description.value,
      cards.value,
    );
    router.push({
      name: "deck",
      params: { deckId },
    });
  } catch (err) {
    alert(err.message);
  }
}
</script>

<template>
  <div class="edit-page-container">
    <PageHeader
      title="Edit Flashcards"
      :showBackLink="true"
      :backTo="{ name: 'deck', params: { deckId } }"
      alignment="left"
    />

    <!-- Loading State -->
    <Loading v-if="loading" type="component" />
    <!-- Error State -->
    <Error v-else-if="error" :message="error" :link="false" type="component" />

    <div class="form-container" v-else>
      <HeaderInput
        :title="title"
        :description="description"
        @update:title="title = $event"
        @update:description="description = $event"
      />

      <CardsList
        :cards="cards"
        @add="addCard"
        @remove="removeCard"
        @update:cards="updateCards"
      />

      <PreviewSection
        v-if="cards.length > 0 && hasContent"
        :cards="cards"
        :preview-index="previewIndex"
        @update:index="previewIndex = $event"
      />

      <FormActions
        :is-valid="isFormValid"
        :backTo="{ name: 'deck', params: { deckId } }"
        @save="saveDeck"
      />
    </div>
  </div>
</template>

<style scoped>
.edit-page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
}

.form-container {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
}

@media (max-width: 640px) {
  .edit-page-container {
    padding: 1rem;
  }

  .form-container {
    padding: 1.5rem;
  }
}
</style>

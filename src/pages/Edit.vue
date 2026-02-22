<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import PageHeader from "../components/global/PageHeader.vue";
import HeaderInput from "../components/create-edit/HeaderInput.vue";
import CardsList from "../components/create-edit/CardList.vue";
import PreviewSection from "../components/create-edit/CardPreview.vue";
import FormActions from "../components/create-edit/FormActions.vue";

import { getDeck, updateDeck } from "../api";

const { setId } = defineProps({
  setId: String,
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

    const deck = await getDeck(Number(setId));
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

// Function to save the flashcard set, checks if the form fields are valid and displays a mock alert
async function saveFlashCards() {
  if (!isFormValid.value) return;

  try {
    await updateDeck(
      Number(setId),
      title.value,
      description.value,
      cards.value,
    );
    router.push({
      name: "flashcard",
      params: { setId },
    });
  } catch (err) {
    alert(err.message);
  }
}
</script>

<template>
  <div class="edit-flash-cards">
    <PageHeader
      title="Edit Flash cards"
      :showBackLink="true"
      :backTo="{ name: 'flashcard', params: { setId } }"
      alignment="left"
    />

    <!-- Loading State -->
    <div v-if="loading" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <!-- Error State -->
    <p v-else-if="error" class="text-muted">
      <em>{{ error }} </em>
    </p>

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
        :backTo="{ name: 'flashcard', params: { setId } }"
        @save="saveFlashCards"
      />
    </div>
  </div>
</template>

<style scoped>
.edit-flash-cards {
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
  .edit-flash-cards {
    padding: 1rem;
  }

  .form-container {
    padding: 1.5rem;
  }
}
</style>

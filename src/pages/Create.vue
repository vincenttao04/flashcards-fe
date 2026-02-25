<!-- /**
 * Create Page
 * Page for creating new decks with preview functionality
 * 
 * @component
 * @uses PageHeader
 * @uses HeaderInput
 * @uses CardList
 * @uses CardPreview
 * @uses FormActions
 */ -->
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import PageHeader from "../components/global/PageHeader.vue";
import HeaderInput from "../components/create-edit/HeaderInput.vue";
import CardList from "../components/create-edit/CardList.vue";
import CardPreview from "../components/create-edit/CardPreview.vue";
import FormActions from "../components/create-edit/FormActions.vue";

import { createDeck } from "../api";

const router = useRouter();
const setTitle = ref("");
const setDescription = ref("");
const cards = ref([{ question: "", answer: "" }]);
const previewIndex = ref(0);
const isSaving = ref(false);
const saveError = ref(null);

const isFormValid = computed(() => {
  return (
    setTitle.value.trim() !== "" &&
    setDescription.value.trim() !== "" &&
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

async function saveDeck() {
  if (!isFormValid.value || isSaving.value) return;

  isSaving.value = true;
  saveError.value = null;

  try {
    await createDeck(
      setTitle.value.trim(),
      setDescription.value.trim(),
      cards.value.map((card) => ({
        question: card.question.trim(),
        answer: card.answer.trim(),
      })),
    );
    resetForm();
    router.push({ name: "home" });
  } catch (err) {
    alert(err.message);
    saveError.value = err?.message || "Failed to save flashcards";
  } finally {
    isSaving.value = false;
  }
}

// Function to reset the form fields after saving
function resetForm() {
  setTitle.value = "";
  setDescription.value = "";
  cards.value = [{ question: "", answer: "" }];
  previewIndex.value = 0;
}
</script>

<template>
  <div class="create-page-container">
    <PageHeader
      title="Create Flash Cards"
      :showBackLink="true"
      :backTo="{ name: 'home' }"
      alignment="left"
    />

    <div class="form-container">
      <HeaderInput
        :title="setTitle"
        :description="setDescription"
        @update:title="setTitle = $event"
        @update:description="setDescription = $event"
      />

      <CardList
        :cards="cards"
        @add="addCard"
        @remove="removeCard"
        @update:cards="updateCards"
      />

      <CardPreview
        v-if="cards.length > 0 && hasContent"
        :cards="cards"
        :preview-index="previewIndex"
        @update:index="previewIndex = $event"
      />

      <FormActions
        :isValid="isFormValid"
        :backTo="{ name: 'home' }"
        :is-saving="isSaving"
        :save-error="saveError"
        @save="saveDeck"
      />
    </div>
  </div>
</template>

<style scoped>
.create-page-container {
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
  .create-page-container {
    padding: 1rem;
  }

  .form-container {
    padding: 1.5rem;
  }
}
</style>

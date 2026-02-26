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
import { ref } from "vue";
import { useRouter } from "vue-router";
import PageHeader from "../components/global/PageHeader.vue";
import HeaderInput from "../components/create-edit/HeaderInput.vue";
import CardList from "../components/create-edit/CardList.vue";
import CardPreview from "../components/create-edit/CardPreview.vue";
import FormActions from "../components/create-edit/FormActions.vue";

import { deckApi } from "../api/deckApi.ts";

import { useDeckForm } from "../composables/useDeckForm";

const {
  title,
  description,
  cards,
  previewIndex,
  isFormValid,
  hasContent,
  addCard,
  removeCard,
  updateCards,
} = useDeckForm();

const router = useRouter();

const isSaving = ref(false);
const saveError = ref(null);

async function saveDeck() {
  if (!isFormValid.value || isSaving.value) return;

  isSaving.value = true;
  saveError.value = null;

  try {
    await deckApi.create({
      title: title.value.trim(),
      description: description.value.trim(),
      cards: cards.value.map((card) => ({
        question: card.question.trim(),
        answer: card.answer.trim(),
      })),
    });
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
  title.value = "";
  description.value = "";
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
        :title="title"
        :description="description"
        @update:title="title = $event"
        @update:description="description = $event"
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

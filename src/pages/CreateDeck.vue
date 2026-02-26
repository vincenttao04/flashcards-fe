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
import { useRouter } from "vue-router";

import { deckApi } from "@/api/deckApi";
import CardList from "@/components/create-edit/CardList.vue";
import CardPreview from "@/components/create-edit/CardPreview.vue";
import FormActions from "@/components/create-edit/FormActions.vue";
import HeaderInput from "@/components/create-edit/HeaderInput.vue";
import PageHeader from "@/components/global/PageHeader.vue";
import { useAsyncState } from "@/composables/useAsyncState";
import { useDeckForm } from "@/composables/useDeckForm";

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
  resetForm,
} = useDeckForm();

const router = useRouter();

// State for saving
const { loading: saving, error: saveError, run: runSave } = useAsyncState();

async function saveDeck() {
  if (!isFormValid.value) return;

  await runSave(async () => {
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
  });
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

    <HeaderInput
      :title="title"
      :description="description"
      @update:title="title = $event"
      @update:description="description = $event"
    />

    <div class="card-container">
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
        :is-valid="isFormValid"
        :backTo="{ name: 'home' }"
        :is-saving="saving"
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

.card-container {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
}

@media (max-width: 640px) {
  .create-page-container {
    padding: 1rem;
  }

  .card-container {
    padding: 1.5rem;
  }
}
</style>

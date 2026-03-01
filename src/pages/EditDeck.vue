<!--
  EditDeck
  Purpose: Page for editing an existing deck (loads deck by route param).
  Props:
  - deckId (String)
-->

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import { deckApi } from "@/api/deckApi";
import CardList from "@/components/create-edit/CardList.vue";
import CardPreview from "@/components/create-edit/CardPreview.vue";
import FormActions from "@/components/create-edit/FormActions.vue";
import HeaderInput from "@/components/create-edit/HeaderInput.vue";
import ErrorInterface from "@/components/global/ErrorInterface.vue";
import LoadingInterface from "@/components/global/LoadingInterface.vue";
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
} = useDeckForm();

const { deckId } = defineProps({
  deckId: String,
});

const router = useRouter();

// State for page loading
const { loading, error, run } = useAsyncState();
// State for saving
const { loading: isSaving, error: saveError, run: runSave } = useAsyncState();

onMounted(() => {
  run(async () => {
    if (Number.isNaN(Number(deckId))) {
      error.value = "Invalid deck id";
      return;
    }

    const deck = await deckApi.get(Number(deckId));

    if (!deck) {
      error.value = "Flashcards not found";
      return;
    }

    title.value = deck.title;
    description.value = deck.description;
    cards.value = deck.cards.map(({ question, answer }) => ({
      question,
      answer,
    }));
  });
});

async function saveDeck() {
  if (!isFormValid.value) return;

  await runSave(async () => {
    if (Number.isNaN(Number(deckId))) {
      error.value = "Invalid deck id";
      return;
    }

    await deckApi.update(Number(deckId), {
      title: title.value.trim(),
      description: description.value.trim(),
      cards: cards.value.map((card) => ({
        question: card.question.trim(),
        answer: card.answer.trim(),
      })),
    });

    router.push({
      name: "deck",
      params: { deckId },
    });
  });
}
</script>

<template>
  <main class="edit-page-container">
    <PageHeader
      title="Edit Flashcards"
      :showBackLink="true"
      :backTo="{ name: 'deck', params: { deckId } }"
      alignment="left"
    />

    <!-- Loading State -->
    <LoadingInterface v-if="loading" type="component" />
    <!-- Error State -->
    <ErrorInterface
      v-else-if="error"
      :message="error"
      :link="false"
      type="component"
    />

    <div v-else>
      <HeaderInput
        :title="title"
        :description="description"
        @update:title="title = $event"
        @update:description="description = $event"
      />

      <section class="card-container">
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
          :backTo="{ name: 'deck', params: { deckId } }"
          :is-saving="isSaving"
          :save-error="saveError"
          @save="saveDeck"
        />
      </section>
    </div>
  </main>
</template>

<style scoped>
.edit-page-container {
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
  .edit-page-container {
    padding: 1rem;
  }

  .card-container {
    padding: 1.5rem;
  }
}
</style>

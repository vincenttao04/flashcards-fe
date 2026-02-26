<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import PageHeader from "@/components/global/PageHeader.vue";
import HeaderInput from "@/components/create-edit/HeaderInput.vue";
import CardList from "@/components/create-edit/CardList.vue";
import CardPreview from "@/components/create-edit/CardPreview.vue";
import FormActions from "@/components/create-edit/FormActions.vue";

import { deckApi } from "@/api/deckApi";
import Error from "@/components/global/Error.vue";
import Loading from "@/components/global/Loading.vue";

import { useDeckForm } from "@/composables/useDeckForm";

import { useAsyncState } from "@/composables/useAsyncState";

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

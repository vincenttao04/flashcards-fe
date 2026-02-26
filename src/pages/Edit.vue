<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import PageHeader from "../components/global/PageHeader.vue";
import HeaderInput from "../components/create-edit/HeaderInput.vue";
import CardList from "../components/create-edit/CardList.vue";
import CardPreview from "../components/create-edit/CardPreview.vue";
import FormActions from "../components/create-edit/FormActions.vue";

import { deckApi } from "../api/deckApi";
import Error from "../components/global/Error.vue";
import Loading from "../components/global/Loading.vue";

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

const { deckId } = defineProps({
  deckId: String,
});

const router = useRouter();
const loading = ref(true);
const error = ref(null);
const isSaving = ref(false);
const saveError = ref("");

onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;

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
  } catch (err) {
    alert(err.message);
    error.value = err.message || "Failed to load flashcards";
  } finally {
    loading.value = false;
  }
});

async function saveDeck() {
  if (!isFormValid.value) return;

  isSaving.value = true;
  saveError.value = "";

  try {
    await deckApi.update(Number(deckId), {
      title: title.value,
      description: description.value,
      cards: cards.value,
    });
    router.push({
      name: "deck",
      params: { deckId },
    });
  } catch (err) {
    alert(err.message);
    saveError.value = err.message || "Failed to save flashcards";
  } finally {
    isSaving.value = false;
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

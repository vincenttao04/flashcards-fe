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

onMounted(async () => {
  try {
    const deck = await getDeck(Number(setId));

    title.value = deck.title;
    description.value = deck.description;
  } catch (error) {
    alert(error.message);
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

// Function to save the flash card set, checks if the form fields are valid and displays a mock alert
async function saveFlashCards() {
  if (!isFormValid.value) return;

  try {
    await updateDeck(Number(setId), title.value, description.value);
    resetForm();
    router.push({
      name: "flashcard",
      params: { setId },
    });
  } catch (error) {
    alert(error.message);
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
  <div class="edit-flash-cards">
    <PageHeader
      title="Edit Flash Cards"
      :showBackLink="true"
      :backTo="{ name: 'flashcard', params: { setId } }"
      alignment="left"
    />

    <div class="form-container">
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

<template>
  <div class="create-flash-cards">
    <PageHeader
      title="Create Flash Cards"
      :showBackLink="true"
      alignment="left"
    />

    <div class="form-container">
      <SetTitleInput v-model="setTitle" />

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

      <FormActions :is-valid="isFormValid" @save="saveFlashCards" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PageHeader from "../components/common/PageHeader.vue";
import SetTitleInput from "../components/create/SetTitleInput.vue";
import CardsList from "../components/create/CardsList.vue";
import PreviewSection from "../components/create/PreviewSection.vue";
import FormActions from "../components/create/FormActions.vue";

const setTitle = ref("");
const cards = ref([{ question: "", answer: "" }]);
const previewIndex = ref(0);

const isFormValid = computed(() => {
  return (
    setTitle.value.trim() !== "" &&
    cards.value.every(
      (card) => card.question.trim() !== "" && card.answer.trim() !== ""
    )
  );
});

const hasContent = computed(() => {
  return cards.value.some(
    (card) => card.question.trim() !== "" || card.answer.trim() !== ""
  );
});

function addCard() {
  cards.value.push({ question: "", answer: "" });
}

function removeCard(index) {
  if (cards.value.length > 1) {
    cards.value.splice(index, 1);
    if (previewIndex.value >= cards.value.length) {
      previewIndex.value = cards.value.length - 1;
    }
  }
}

function updateCards(newCards) {
  cards.value = newCards;
}

function saveFlashCards() {
  if (isFormValid.value) {
    // TODO: Implement save functionality
    console.log("Saving:", { title: setTitle.value, cards: cards.value });
    resetForm();
  }
}

function resetForm() {
  setTitle.value = "";
  cards.value = [{ question: "", answer: "" }];
  previewIndex.value = 0;
}
</script>

<style scoped>
.create-flash-cards {
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
  .create-flash-cards {
    padding: 1rem;
  }

  .form-container {
    padding: 1.5rem;
  }
}
</style>

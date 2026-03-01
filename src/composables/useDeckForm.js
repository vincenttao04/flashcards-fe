/**
 * useDeckForm
 * Purpose: Composable that manages deck form state, validation, and preview index.
 */

import { computed, ref } from "vue";

export function useDeckForm(initialData) {
  const title = ref(initialData?.title ?? "");
  const description = ref(initialData?.description ?? "");
  const cards = ref(initialData?.cards ?? [{ question: "", answer: "" }]);
  const previewIndex = ref(0);

  const isFormValid = computed(() => {
    return (
      title.value.trim() !== "" &&
      description.value.trim() !== "" &&
      cards.value.every(
        (card) => card.question.trim() !== "" && card.answer.trim() !== "",
      )
    );
  });

  const hasContent = computed(() => {
    return cards.value.some(
      (card) => card.question.trim() !== "" || card.answer.trim() !== "",
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

  function resetForm() {
    title.value = "";
    description.value = "";
    cards.value = [{ question: "", answer: "" }];
    previewIndex.value = 0;
  }

  return {
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
  };
}

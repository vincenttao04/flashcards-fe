import { ref, computed } from "vue";

type Card = {
  question: string;
  answer: string;
};

type DeckFormInput = {
  title: string;
  description: string;
  cards: Card[];
};

export function useDeckForm(initialData?: Partial<DeckFormInput>) {
  const title = ref(initialData?.title ?? "");
  const description = ref(initialData?.description ?? "");
  const cards = ref<Card[]>(
    initialData?.cards ?? [{ question: "", answer: "" }],
  );
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

  function removeCard(index: number) {
    if (cards.value.length > 1) {
      cards.value.splice(index, 1);
      if (previewIndex.value >= cards.value.length) {
        previewIndex.value = cards.value.length - 1;
      }
    }
  }

  function updateCards(newCards: Card[]) {
    cards.value = newCards;
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
  };
}

<!--
  CardPreview Component
  ---------------------
  Displays a preview of a deck's cards with navigation controls.

  Props:
  - cards (Array)
  - previewIndex (Number)

  Emits:
  - update:index(newIndex)
-->
<script setup>
import { ref } from "vue";

import CardInterface from "@/components/deck/CardInterface.vue";
import CardNavigator from "@/components/deck/CardNavigator.vue";

const props = defineProps({
  cards: {
    type: Array,
    required: true,
  },
  previewIndex: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:index"]);
const isFlipped = ref(false);

/**
 * Move to next card
 */
function nextCard() {
  if (props.previewIndex < props.cards.length - 1) {
    emit("update:index", props.previewIndex + 1);
    isFlipped.value = false;
  }
}

/**
 * Move to previous card
 */
function prevCard() {
  if (props.previewIndex > 0) {
    emit("update:index", props.previewIndex - 1);
    isFlipped.value = false;
  }
}
</script>

<template>
  <section class="preview-container" aria-labelledby="preview-heading">
    <h2 id="preview-heading">Preview</h2>

    <div class="preview-card">
      <CardInterface
        :card="cards[previewIndex]"
        :is-flipped="isFlipped"
        @flip="isFlipped = !isFlipped"
      />

      <CardNavigator
        :current-index="previewIndex"
        :total="cards.length"
        @prev="prevCard"
        @next="nextCard"
        class="preview-navigator"
      />
    </div>
  </section>
</template>

<style scoped>
.preview-container {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

.preview-card {
  width: 100%;
  max-width: 500px;
  margin: 2rem auto 0;
}

.preview-navigator {
  margin-top: 1rem;
}
</style>

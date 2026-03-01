<!--
  CardInterface
  Purpose: Clickable flashcard UI with flip animation (question ↔ answer).
  Props:
  - card (Object)
  - isFlipped (Boolean)
  Emits:
  - flip
-->

<script setup>
defineProps({
  card: {
    type: Object,
    required: true,
  },
  isFlipped: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["flip"]);
</script>

<template>
  <div class="card-container">
    <button
      type="button"
      class="card"
      :class="{ flipped: isFlipped }"
      @click="$emit('flip')"
      :aria-pressed="isFlipped"
      aria-label="Flip flashcard"
    >
      <!-- Front -->
      <div class="card-face card-front" :aria-hidden="isFlipped">
        <h3 class="label">Question</h3>
        <div class="content">
          <p>{{ card.question }}</p>
        </div>
      </div>

      <!-- Back -->
      <div class="card-face card-back" :aria-hidden="!isFlipped">
        <h3 class="label">Answer</h3>
        <div class="content">
          <p>{{ card.answer }}</p>
        </div>
      </div>
    </button>
  </div>
</template>

<style scoped>
.card-container {
  width: 100%;
  height: 300px;
  perspective: 1000px;
  margin-bottom: 2rem;
}

/* ========================
   Card Wrapper
======================== */

.card {
  /* Reset */
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  color: inherit;
  text-align: inherit;

  /* Layout */
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  cursor: pointer;

  /* 3D */
  transform-style: preserve-3d;
  transition: transform 0.8s;
}

.card:focus-visible {
  outline: 2px solid #101010;
  border-radius: 12px;
}

.card.flipped {
  transform: rotateY(-180deg);
}

/* ========================
   Card Faces
======================== */

.card-face {
  position: absolute;
  inset: 0;
  padding: 2rem;

  display: flex;
  flex-direction: column;

  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);

  pointer-events: none;
}

/* Visible face interaction control */
.card-front {
  pointer-events: auto;
}

.card.flipped .card-front {
  pointer-events: none;
}

.card.flipped .card-back {
  pointer-events: auto;
}

.card-back {
  transform: rotateY(180deg);
}

/* ========================
   Content
======================== */

.content {
  flex: 1;
  overflow-y: auto;
  text-align: center;

  display: grid;
  place-items: center;

  scrollbar-width: none;
}

.content::-webkit-scrollbar {
  width: 0;
}

.content p {
  margin: 0;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
}

/* ========================
   Typography
======================== */

h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: #495057;
}

.label {
  flex-shrink: 0;
  text-align: left;
  padding-bottom: 1rem;
}

.card-front .content p {
  font-size: 1.5rem;
  font-weight: 500;
}

.card-back .content p {
  font-size: 1.2rem;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .card-container {
    height: 250px;
  }

  .card-front .content p {
    font-size: 1.1rem;
  }

  .card-back .content p {
    font-size: 0.88rem;
  }

  .content {
    scrollbar-width: thin;
  }

  .content::-webkit-scrollbar {
    display: block;
    width: 6px;
  }
}
</style>

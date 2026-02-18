<!-- /**
 * FlashCard Component
 * Interactive flashcard with flip animation showing question and answer
 * 
 * @component
 * @props {Object} card - Flashcard data containing question and answer
 * @props {Boolean} isFlipped - Controls card flip state
 * @emits {flip} - Emits when card is clicked to flip
 */ -->
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
    <button class="card" :class="{ flipped: isFlipped }" @click="$emit('flip')">
      <div class="card-face card-front">
        <h3 class="label">Question</h3>
        <div class="content">
          <p>{{ card.question }}</p>
        </div>
      </div>
      <div class="card-face card-back">
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

.card {
  /* Reset button styles */
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  color: inherit;
  text-align: inherit;

  /* Card styles */
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  cursor: pointer;
  display: block;
}

.card:focus-visible {
  outline: 2px solid #101010;
  border-radius: 12px;
}

.card.flipped {
  transform: rotateY(-180deg);
}

.card-face {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background-color: white;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
}

.content p {
  margin: 0;
}

.card-front .content p {
  font-size: 1.5rem;
  font-weight: 500;
}

.card-back {
  transform: rotateY(180deg);
}

.card-back .content p {
  font-size: 1.25rem;
  line-height: 1.6;
}

h3 {
  font-size: 1.1rem;
  font-weight: 500;
  color: #495057;
  margin: 0;
}

.label {
  flex-shrink: 0;
  text-align: left;
}

@media (max-width: 640px) {
  .card-container {
    height: 250px;
  }

  .card-front .content p {
    font-size: 1.25rem;
  }

  .card-back .content p {
    font-size: 1rem;
  }
}
</style>

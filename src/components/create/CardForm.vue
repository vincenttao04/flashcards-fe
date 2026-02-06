<!-- /**
 * CardForm Component
 * A form component for creating flashcard questions and answers
 * 
 * @component
 * @props {Object} card - The flashcard object containing question and answer
 * @props {Number} index - The index of the card in the set
 * @emits {update} - Emits when either question or answer is modified
 *                   Payload: (index, updatedCard)
 */ -->
<template>
  <div>
    <div class="form-group">
      <label :for="`question-${index}`">Question</label>
      <textarea
        :id="`question-${index}`"
        :aria-label="`Question ${index + 1}`"
        :value="card.question"
        @input="updateField('question', $event.target.value)"
        placeholder="What is the capital of Australia?"
        class="form-input"
        rows="2"
      ></textarea>
    </div>

    <div class="form-group">
      <label :for="`answer-${index}`">Answer</label>
      <textarea
        :id="`answer-${index}`"
        :aria-label="`Answer ${index + 1}`"
        :value="card.answer"
        @input="updateField('answer', $event.target.value)"
        placeholder="Canberra"
        class="form-input"
        rows="3"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update"]);

function updateField(field, value) {
  emit("update", props.index, {
    ...props.card,
    [field]: value,
  });
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
  resize: vertical;
}

.form-input::placeholder {
  font-style: italic;
}

.form-input:focus {
  outline: none;
  border-color: #adb5bd;
}
</style>

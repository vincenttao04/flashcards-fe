<!--
  CardInput Component
  -------------------
  Form component for creating and editing deck content.

  Props:
  - card (Object): Contains question and answer fields
  - index (Number): Position of the card in the list

  Emits:
  - update(index, updatedCard)
    Triggered when question or answer changes
-->
<script setup>
import { useAutoResizeTextArea } from "@/composables/useAutoResizeTextArea";

const { handleInput } = useAutoResizeTextArea(4);

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

/**
 * Handles textarea updates
 * @param {'question'|'answer'} field
 * @param {Event} event
 */
function updateField(field, value) {
  emit("update", props.index, {
    ...props.card,
    [field]: value,
  });

  handleInput(event);
}
</script>

<template>
  <div class="form-wrapper">
    <div>
      <label :for="`question-${index}`">Question</label>
      <textarea
        :id="`question-${index}`"
        :value="card.question"
        @input="
          updateField('question', $event.target.value);
          handleInput($event);
        "
        placeholder="What is the capital of Australia?"
        class="form-input"
        rows="1"
      ></textarea>
    </div>

    <div>
      <label :for="`answer-${index}`">Answer</label>
      <textarea
        :id="`answer-${index}`"
        :value="card.answer"
        @input="
          updateField('answer', $event.target.value);
          handleInput($event);
        "
        placeholder="Canberra"
        class="form-input"
        rows="2"
      ></textarea>
    </div>
  </div>
</template>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
  resize: vertical;
  overflow-y: auto;
  scrollbar-width: none;
}

.form-input::-webkit-scrollbar {
  display: none;
}

.form-input::placeholder {
  font-style: italic;
}

.form-input:focus {
  outline: none;
  border-color: #adb5bd;
}

@media (max-width: 640px) {
  .form-input::placeholder {
    opacity: 0;
  }

  .form-input {
    resize: none;
    scrollbar-width: thin;
  }

  .form-input::-webkit-scrollbar {
    display: block;
    width: 6px;
  }
}
</style>

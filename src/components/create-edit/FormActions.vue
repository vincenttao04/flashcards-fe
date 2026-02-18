<!-- /**
 * FormActions Component
 * Provides Save and Cancel actions for the flashcard form
 * 
 * @component
 * @props {Boolean} isValid - Determines if the save action is enabled
 * @emits {save} - Emits when save button is clicked
 */ -->
<script setup>
defineProps({
  isValid: {
    type: Boolean,
    required: true,
  },
  backTo: {
    type: [String, Object],
    default: "/",
  },
});

defineEmits(["save"]);
</script>

<template>
  <div class="form-actions" aria-label="Form Actions">
    <router-link :to="backTo" class="cancel-btn"> Cancel </router-link>
    <button
      type="button"
      class="save-btn"
      @click="$emit('save')"
      :disabled="!isValid"
    >
      Save Flash Cards
    </button>
  </div>
</template>

<style scoped>
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

.cancel-btn {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  color: #495057;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.2s;
  text-decoration: none;
}

.cancel-btn:hover {
  background-color: #e9ecef;
}

.save-btn {
  background-color: #228be6;
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.2s;
}

.save-btn:hover:not(:disabled) {
  background-color: #1c7ed6;
}

.save-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .form-actions {
    flex-direction: column;
    gap: 0.75rem;
  }

  .cancel-btn,
  .save-btn {
    width: 100%;
  }
}
</style>

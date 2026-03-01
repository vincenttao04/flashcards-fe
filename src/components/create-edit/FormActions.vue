<!--
  FormActions Component
  ---------------------
  Provides Save and Cancel actions for deck create/edit pages.

  Props:
  - isValid (Boolean)
  - backTo (String | Object)
  - isSaving (Boolean)
  - saveError (String)

  Emits:
  - save
-->
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
  isSaving: {
    type: Boolean,
    default: false,
  },
  saveError: {
    type: String,
    default: "",
  },
});

defineEmits(["save"]);
</script>

<template>
  <section class="actions-container">
    <div class="btn-group">
      <router-link :to="backTo" class="cancel-btn"> Cancel </router-link>

      <button
        type="button"
        class="save-btn"
        @click="$emit('save')"
        :disabled="!isValid || isSaving"
        :aria-busy="isSaving"
      >
        <div v-if="isSaving">
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        </div>

        <div v-else>Save <span class="save-text">Flashcards</span></div>
      </button>
    </div>

    <p v-if="!isValid" class="helper-text text-muted" role="alert">
      <em>All fields required</em>
    </p>
    <p v-else-if="saveError" class="helper-text" role="alert">
      <em>{{ saveError }}</em>
    </p>
  </section>
</template>

<style scoped>
.actions-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

.btn-group {
  display: flex;
  gap: 1rem;
  text-align: center;
  align-items: center;
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
  transition: background-color 0.2s ease;
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
  transition: background-color 0.2s ease;
}

.save-btn:hover:not(:disabled) {
  background-color: #1c7ed6;
}

.save-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.helper-text {
  margin: 0;
  color: #dc3545;
}

@media (max-width: 640px) {
  .actions-container {
    gap: 0.75rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
  }

  .cancel-btn,
  .save-btn {
    width: 100%;
  }

  .save-text {
    display: none;
  }
}

@media (max-width: 360px) {
  .btn-group {
    flex-direction: column;
    width: 100%;
  }
}
</style>

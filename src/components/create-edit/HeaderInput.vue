<!--
  HeaderInput
  Purpose: Deck title + description inputs.
  Props:
  - title (String)
  - description (String)
  Emits:
  - update:title(newTitle)
  - update:description(newDescription)
-->

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

defineEmits(["update:title", "update:description"]);
</script>

<template>
  <section class="form-container" aria-labelledby="deck-details-heading">
    <div class="title">
      <label for="set-title">Title</label>
      <input
        type="text"
        id="set-title"
        :value="title"
        @input="$emit('update:title', $event.target.value)"
        placeholder="Capital Cities of the World"
        class="form-input"
        required
        aria-required="true"
      />
    </div>

    <div class="description">
      <label for="set-description">Description</label>
      <input
        type="text"
        id="set-description"
        :value="description"
        @input="$emit('update:description', $event.target.value)"
        placeholder="Test your knowledge of countries and their capital cities from around the world"
        class="form-input"
        required
        aria-required="true"
      />
    </div>
  </section>
</template>

<style scoped>
.form-container {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  margin-bottom: 2rem;
}

/* Visually hidden utility (accessible) */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

input::placeholder {
  font-style: italic;
}

.title {
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
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #adb5bd;
}

@media (max-width: 640px) {
  .form-container {
    padding: 1.5rem;
  }

  .form-input::placeholder {
    opacity: 0;
  }
}
</style>

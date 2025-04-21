<!-- /**
 * SetHeaderInput Component
 * Input form for flashcard set title and description
 * 
 * @component
 * @props {String} title - The title of the flashcard set
 * @props {String} description - The description of the flashcard set
 * @emits {update:title} - Emits when title is modified (payload: newTitle)
 * @emits {update:description} - Emits when description is modified (payload: newDescription)
 */ -->
<template>
  <div class="form-group">
    <div class="title">
      <label for="set-title">Set Title</label>
      <input
        type="text"
        id="set-title"
        :value="title"
        @input="$emit('update:title', $event.target.value)"
        placeholder="e.g. World Capitals Quiz"
        class="form-input"
      />
    </div>
    <div class="description">
      <label for="set-description">Set Description</label>
      <input
        type="text"
        id="set-description"
        :value="description"
        @input="$emit('update:description', $event.target.value)"
        placeholder="e.g. Test your knowledge of countries and their capitals from around the world"
        class="form-input"
      />
    </div>
  </div>
</template>

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

<style scoped>
.form-group {
  margin-bottom: 2rem;
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
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #adb5bd;
}
</style>

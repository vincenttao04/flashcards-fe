<!-- /**
 * HeaderInput Component
 * Input for deck title and description
 * 
 * @component
 * @props {String} title - The title of the deck
 * @props {String} description - The description of the deck
 * @emits {update:title} - Emits when title is modified (payload: newTitle)
 * @emits {update:description} - Emits when description is modified (payload: newDescription)
 */ -->
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
  <div class="form-container">
    <div class="title">
      <label for="set-title">Title</label>
      <input
        type="text"
        id="set-title"
        :value="title"
        @input="$emit('update:title', $event.target.value)"
        placeholder="Capital Cities of the World"
        class="form-input"
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
      />
    </div>
  </div>
</template>

<style scoped>
.form-container {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
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

@media (max-width: 640px) {
  .form-container {
    padding: 1.5rem;
  }

  .form-input::placeholder {
    opacity: 0;
  }
}
</style>

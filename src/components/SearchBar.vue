<template>
  <div class="search-container">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Search flash cards..."
      class="search-input"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
.search-container {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  background-color: white;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #228be6;
  box-shadow: 0 0 0 3px rgba(34, 139, 230, 0.1);
}

.search-input::placeholder {
  color: #adb5bd;
}

@media (max-width: 640px) {
  .search-input {
    padding: 0.75rem;
  }
}
</style>

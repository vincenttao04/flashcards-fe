<!--
  SearchBar
  Purpose: Search input with v-model and a clear button.
  Props:
  - modelValue (String)
  Emits:
  - update:modelValue(value)
-->

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

function clearSearch() {
  if (props.modelValue) {
    emit("update:modelValue", "");
  }
}
</script>

<template>
  <div class="search-container">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Search..."
      class="search-input"
      aria-label="Search"
    />

    <!-- Search Icon -->
    <i
      v-if="!modelValue"
      class="bi bi-search search-icon"
      aria-hidden="true"
    ></i>

    <!-- Clear Button -->
    <i
      v-else
      type="button"
      class="bi bi-x-lg clear-btn"
      @click="clearSearch"
      aria-label="Clear search"
      aria-hidden="true"
    ></i>
  </div>
</template>

<style scoped>
.search-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  height: 100%;
  padding: 0 2.5rem 0 1rem;
  font-size: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  background-color: white;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #228be6;
  box-shadow: 0 0 0 3px rgba(34, 139, 230, 0.1);
}

.search-input::placeholder {
  color: #adb5bd;
}

.bi {
  position: absolute;
  right: 1rem;
  color: #adb5bd;
  font-size: 1rem;
}

.search-icon {
  cursor: default;
}

.clear-icon {
  cursor: pointer;
  transition: color 0.2s;
}

.clear-icon:hover {
  color: #666;
}

@media (max-width: 640px) {
  .search-input {
    padding: 0.75rem 2.5rem 0.75rem 0.75rem;
  }
}
</style>

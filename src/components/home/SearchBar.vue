<!-- /**
 * Search Component
 * A search input field with clear functionality
 * 
 * @component
 * @props {String} modelValue - v-model value for the search input
 * @emits {update:modelValue} - Emits when input value changes or is cleared
 */ -->
<template>
  <div class="search-container">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Search..."
      class="search-input"
    />
    <i
      class="bi"
      :class="[modelValue ? 'bi-x-lg clear-icon' : 'bi-search search-icon']"
      @click="handleIconClick"
    ></i>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

function handleIconClick() {
  if (props.modelValue) {
    emit("update:modelValue", "");
  }
}
</script>

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
    padding: 0.75rem;
  }
}
</style>

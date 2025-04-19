<template>
  <div class="form-group">
    <label for="set-title">Set Title</label>
    <input
      type="text"
      id="set-title"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Enter a title for your flash card set"
      class="form-input"
    />
  </div>
</template>

<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
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
}

.form-input:focus {
  outline: none;
  border-color: #adb5bd;
}
</style>

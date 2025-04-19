<template>
  <div class="form-group">
    <div class="title">
      <label for="set-title">Set Title</label>
      <input
        type="text"
        id="set-title"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="Enter a short, catchy title"
        class="form-input"
      />
    </div>
    <div class="description">
      <label for="set-description">Set Description</label>
      <input
        type="text"
        id="set-title"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="Briefly describe what this set is about"
        class="form-input"
      />
    </div>
  </div>
</template>

<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.form-group {
  margin-bottom: 2rem;
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

<template>
  <div class="mb-3">
    <label v-if="label" class="form-label">{{ label }}</label>
    <textarea v-if="type === 'textarea'" class="form-control" :placeholder="placeholder" :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" />
    <input v-else :type="type" class="form-control" :placeholder="placeholder" :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  type: { type: String, default: 'text' },
  placeholder: String
})

defineEmits(['update:modelValue'])
</script>
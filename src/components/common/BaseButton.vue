<template>
  <button :class="['btn', `btn-${variant}`, className]" @click="onClick" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
  disabled: { type: Boolean, default: false },
  className: { type: String, default: '' }
})

const emit = defineEmits(['click'])
const onClick = (e) => emit('click', e)
</script>
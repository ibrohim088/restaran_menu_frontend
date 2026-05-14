<template>
  <div class="text-center py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Yuklanmoqda...</span>
    </div>
    <p v-if="text" class="mt-2 text-muted small">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({ text: { type: String, default: '' } })
</script>

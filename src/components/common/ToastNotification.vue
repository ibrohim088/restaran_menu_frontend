<template>
  <div
    v-if="visible"
    class="toast-notification"
    :class="`toast-${type}`"
  >
    <span>{{ message }}</span>
    <button class="toast-close" @click="visible = false">×</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  message: { type: String, default: '' },
  type: { type: String, default: 'success' },
  duration: { type: Number, default: 3000 }
})

const visible = ref(false)

watch(() => props.message, (val) => {
  if (val) {
    visible.value = true
    setTimeout(() => { visible.value = false }, props.duration)
  }
})
</script>

<style scoped>
.toast-notification {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  font-size: 14px;
}
.toast-success { background: #10b981; color: white; }
.toast-error { background: #ef4444; color: white; }
.toast-warning { background: #f59e0b; color: white; }
.toast-close { background: none; border: none; color: white; font-size: 18px; cursor: pointer; padding: 0; line-height: 1; }
</style>

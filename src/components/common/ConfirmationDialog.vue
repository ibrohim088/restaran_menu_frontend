<template>
  <BaseModal :show="show" @close="cancel">
    <div class="modal-header">
      <h5 class="modal-title">Tasdiqlash</h5>
      <button type="button" class="btn-close" @click="cancel"></button>
    </div>
    <div class="modal-body">
      <p>{{ message }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" @click="cancel" class="btn btn-secondary">Bekor qilish</button>
      <button type="button" @click="confirmAction" class="btn btn-danger">{{ confirmText }}</button>
    </div>
  </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: 'Haqiqatan ham bu amalni bajarishni xohlaysizmi?'
  },
  confirmText: {
    type: String,
    default: 'Tasdiqlash'
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const confirmAction = () => {
  emit('confirm')
}

const cancel = () => {
  emit('cancel')
}
</script>
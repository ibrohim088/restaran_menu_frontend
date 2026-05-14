// src/stores/ui.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const toast = ref({
    show: false,
    message: '',
    type: 'success' // success, error, warning
  })

  const loading = ref(false)

  const showToast = (message, type = 'success', duration = 3000) => {
    toast.value = { show: true, message, type }
    setTimeout(() => {
      toast.value.show = false
    }, duration)
  }

  const startLoading = () => { loading.value = true }
  const stopLoading = () => { loading.value = false }

  return {
    toast,
    loading,
    showToast,
    startLoading,
    stopLoading
  }
})
<template>
  <div class="qr-code-display text-center">
    <h5 v-if="title" class="mb-3">{{ title }}</h5>
    <div class="qr-container d-inline-block p-3 bg-white rounded shadow-sm">
      <qrcode-vue :value="value" :size="size" level="H" />
    </div>
    <p v-if="description" class="mt-3 text-muted small">{{ description }}</p>
    <button v-if="downloadable" @click="downloadQR" class="btn btn-outline-primary btn-sm mt-3">
      📥 Yuklab olish
    </button>
  </div>
</template>

<script setup>
import QrcodeVue from 'qrcode.vue'

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 200
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  downloadable: {
    type: Boolean,
    default: false
  }
})

const downloadQR = () => {
  const canvas = document.querySelector('.qr-container canvas')
  if (canvas) {
    const link = document.createElement('a')
    link.download = 'qr-code.png'
    link.href = canvas.toDataURL()
    link.click()
  }
}
</script>

<style scoped>
.qr-code-display {
  max-width: 300px;
  margin: 0 auto;
}

.qr-container {
  border: 1px solid #dee2e6;
}
</style>
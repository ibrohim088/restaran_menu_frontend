<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>QR Kod: {{ restaurant?.name }}</h2>
      <router-link to="/admin/restaurants" class="btn btn-secondary">
        ← Orqaga
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-5">
      <LoadingSpinner />
    </div>

    <div v-else-if="restaurant" class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body text-center">
            <h5>QR Kod</h5>
            <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="QR Code" class="img-fluid mb-3" />
            <button @click="downloadQR" class="btn btn-primary" :disabled="!qrCodeUrl">
              Yuklab olish
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5>Restoran Ma'lumotlari</h5>
            <p><strong>Nomi:</strong> {{ restaurant.name }}</p>
            <p><strong>Manzil:</strong> {{ restaurant.address }}</p>
            <p><strong>Telefon:</strong> {{ restaurant.phone }}</p>
            <p><strong>Ish vaqti:</strong> {{ restaurant.workingHours }}</p>
            <p><strong>Faol:</strong> {{ restaurant.isActive ? 'Ha' : 'Yo\'q' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import apiClient from '@/api/client'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { normalizeMediaUrl } from '@/utilities/image.js'

const route = useRoute()
const restaurant = ref(null)
const rawQrCodeUrl = ref('')
const qrCodeUrl = computed(() => normalizeMediaUrl(rawQrCodeUrl.value))
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await apiClient.get(`/restaran/${route.params.id}`)
    restaurant.value = res.data.data

    // QR kod olish
    const qrRes = await apiClient.get(`/restaran/${route.params.id}/qr`)
    rawQrCodeUrl.value = qrRes.data.data.qrCodeUrl
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})

const downloadQR = () => {
  if (qrCodeUrl.value) {
    const link = document.createElement('a')
    link.href = qrCodeUrl.value
    link.download = `qr-${restaurant.value.name}.png`
    link.click()
  }
}
</script>
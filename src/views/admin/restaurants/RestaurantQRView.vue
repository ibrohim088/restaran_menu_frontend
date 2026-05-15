<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="d-flex align-items-center gap-2 mb-0">
        <QrCode size="26" /> QR Kod: {{ restaurant?.name }}
      </h2>
      <router-link to="/admin/restaurants" class="btn btn-secondary d-flex align-items-center gap-2">
        <ArrowLeft size="16" /> Orqaga
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-5"><LoadingSpinner /></div>

    <div v-else-if="restaurant" class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body text-center">
            <h5 class="d-flex align-items-center justify-content-center gap-2">
              <QrCode size="20" /> QR Kod
            </h5>
            <div v-if="qrCodeUrl" class="my-3">
              <img :src="qrCodeUrl" alt="QR Code" class="img-fluid" style="max-width:280px;" />
            </div>
            <div v-else class="py-4 text-muted">
              <QrCode size="64" class="mb-2 opacity-25" />
              <p>QR kod hali yaratilmagan</p>
            </div>
            <button @click="generateQR" class="btn btn-outline-primary me-2 d-inline-flex align-items-center gap-2"
              :disabled="generating">
              <RefreshCw size="16" :class="{ 'spin': generating }" />
              {{ generating ? 'Yaratilmoqda...' : 'QR Yaratish' }}
            </button>
            <button @click="downloadQR" class="btn btn-primary d-inline-flex align-items-center gap-2"
              :disabled="!qrCodeUrl">
              <Download size="16" /> Yuklab olish
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="d-flex align-items-center gap-2 mb-3">
              <Store size="20" /> Restoran Ma'lumotlari
            </h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex align-items-center gap-2">
                <Store size="16" class="text-muted" /> <strong>Nomi:</strong> {{ restaurant.name }}
              </li>
              <li class="list-group-item d-flex align-items-center gap-2">
                <MapPin size="16" class="text-muted" /> <strong>Manzil:</strong> {{ restaurant.address }}
              </li>
              <li class="list-group-item d-flex align-items-center gap-2">
                <Phone size="16" class="text-muted" /> <strong>Telefon:</strong> {{ restaurant.phone || '—' }}
              </li>
              <li class="list-group-item d-flex align-items-center gap-2">
                <Clock size="16" class="text-muted" /> <strong>Ish vaqti:</strong> {{ restaurant.workingHours || '—' }}
              </li>
              <li class="list-group-item d-flex align-items-center gap-2">
                <component :is="restaurant.isActive ? CheckCircle2 : XCircle" size="16"
                  :class="restaurant.isActive ? 'text-success' : 'text-danger'" />
                <strong>Holati:</strong> {{ restaurant.isActive ? 'Faol' : "Faol emas" }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { QrCode, ArrowLeft, Store, MapPin, Phone, Clock, CheckCircle2, XCircle, Download, RefreshCw } from 'lucide-vue-next'
import apiClient from '@/api/client'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { normalizeMediaUrl } from '@/utilities/image.js'

const route = useRoute()
const restaurant = ref(null)
const rawQrCodeUrl = ref('')
const qrCodeUrl = computed(() => normalizeMediaUrl(rawQrCodeUrl.value))
const loading = ref(true)
const generating = ref(false)

onMounted(async () => {
  try {
    const res = await apiClient.get(`/restaran/${route.params.id}`)
    restaurant.value = res.data.data
    const qrRes = await apiClient.get(`/restaran/${route.params.id}/qr`)
    rawQrCodeUrl.value = qrRes.data.data.qrCodeUrl || ''
  } catch (err) { console.error(err) }
  finally { loading.value = false }
})

const generateQR = async () => {
  generating.value = true
  try {
    const res = await apiClient.post(`/restaran/${route.params.id}/qr`)
    rawQrCodeUrl.value = res.data.data.qrCodeUrl
  } catch (err) { alert("QR yaratishda xatolik") }
  finally { generating.value = false }
}

const downloadQR = () => {
  if (!qrCodeUrl.value) return
  const link = document.createElement('a')
  link.href = qrCodeUrl.value
  link.download = `qr-${restaurant.value.name}.png`
  link.click()
}
</script>

<style scoped>
.spin { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>

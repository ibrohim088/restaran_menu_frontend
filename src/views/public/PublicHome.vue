<template>
  <div class="public-home">
    <PublicHeader />

    <div class="container py-4">
      <div class="d-flex align-items-center gap-3 mb-4">
        <UtensilsCrossed size="32" class="text-primary" />
        <div>
          <h1 class="mb-0">Restoranlar ro'yxati</h1>
          <p class="text-muted mb-0 small">QR kod orqali oshxona menyusiga tez va oson kirish.</p>
        </div>
      </div>

      <div v-if="loading" class="text-center py-5"><LoadingSpinner /></div>

      <div v-else-if="error" class="alert alert-danger d-flex align-items-center gap-2">
        <AlertCircle size="18" /> {{ error }}
      </div>

      <div v-else-if="restaurants.length === 0" class="alert alert-info d-flex align-items-center gap-2">
        <Info size="18" /> Hozircha hech qanday restoran mavjud emas.
      </div>

      <div v-else class="row g-4">
        <div v-for="restaurant in restaurants" :key="restaurant._id" class="col-12 col-md-6 col-lg-4">
          <RestaurantCard :restaurant="restaurant" @click="goToMenu(restaurant._id)" />
        </div>
      </div>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { UtensilsCrossed, AlertCircle, Info } from 'lucide-vue-next'
import { getPublicRestaurants } from '@/api/services/publicService'
import RestaurantCard from '@/components/public/RestaurantCard.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import PublicHeader from '@/components/layout/public/PublicHeader.vue'
import BottomNav from '@/components/layout/public/BottomNav.vue'

const router = useRouter()
const restaurants = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await getPublicRestaurants()
    restaurants.value = res.data.data || []
  } catch (err) {
    error.value = 'Restoranlarni yuklashda xatolik yuz berdi'
  } finally { loading.value = false }
})

const goToMenu = (id) => router.push(`/restaurant/${id}`)
</script>

<style scoped>
.public-home { min-height: 100vh; background: #f8fafc; padding-bottom: 100px; }
</style>

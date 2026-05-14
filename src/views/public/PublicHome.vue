<template>
  <div class="public-home">
    <PublicHeader />

    <div class="container py-4">
      <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 class="mb-1">Restoranlar ro‘yxati</h1>
          <p class="text-muted mb-0">QR kod orqali oshxona menyusiga tez va oson kirish.</p>
        </div>
      </div>

      <div v-if="loading" class="text-center py-5">
        <LoadingSpinner />
      </div>

      <div v-else-if="error" class="alert alert-danger text-center">
        {{ error }}
      </div>

      <div v-else-if="restaurants.length === 0" class="alert alert-info text-center">
        Hozircha hech qanday restoran mavjud emas.
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
    console.error(err)
  } finally {
    loading.value = false
  }
})

const goToMenu = (id) => {
  router.push(`/restaurant/${id}`)
}
</script>

<style scoped>
.public-home {
  min-height: 100vh;
  background: #f8fafc;
  padding-bottom: 100px;
}
</style>
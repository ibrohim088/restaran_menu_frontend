<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="d-flex align-items-center gap-2 mb-0">
        <Store size="26" /> Restoranlarim
      </h2>
      <router-link to="/admin/restaurants/new"
        class="btn btn-primary d-flex align-items-center gap-2">
        <Plus size="18" /> Yangi Restoran
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-5"><LoadingSpinner /></div>

    <div class="row g-4" v-else>
      <div class="col-12 col-md-6 col-lg-4" v-for="res in restaurants" :key="res._id">
        <RestaurantCard :restaurant="res" @click="editRestaurant(res._id)"
          @edit="editRestaurant" @delete="deleteRestaurant" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Store, Plus } from 'lucide-vue-next'
import apiClient from '@/api/client'
import { getRestaurants } from '@/api/services/restaurantService'
import RestaurantCard from '@/components/admin/restaurants/RestaurantCard.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const router = useRouter()
const restaurants = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await getRestaurants()
    restaurants.value = res.data.data
  } catch (err) { console.error(err) }
  finally { loading.value = false }
})

const editRestaurant = (id) => router.push(`/admin/restaurants/edit/${id}`)

const deleteRestaurant = async (id) => {
  if (!confirm("O'chirmoqchimisiz?")) return
  try {
    await apiClient.delete(`/restaran/${id}`)
    restaurants.value = restaurants.value.filter(r => r._id !== id)
  } catch (err) { alert("O'chirishda xatolik") }
}
</script>

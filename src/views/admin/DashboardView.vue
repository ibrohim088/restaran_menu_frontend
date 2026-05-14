<template>
  <div>
    <h2 class="mb-4">Dashboard</h2>

    <div class="row g-4">
      <div v-if="isSuperAdmin" class="col-md-3">
        <div class="card text-center p-4">
          <h3 class="text-info">{{ stats.admins }}</h3>
          <p class="text-muted">Adminlar</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center p-4">
          <h3 class="text-primary">{{ stats.restaurants }}</h3>
          <p class="text-muted">Restoranlar</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center p-4">
          <h3 class="text-success">{{ stats.categories }}</h3>
          <p class="text-muted">Kategoriyalar</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center p-4">
          <h3 class="text-warning">{{ stats.menuItems }}</h3>
          <p class="text-muted">Taomlar</p>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <h5>Tez havolalar</h5>
      <div class="list-group">
        <router-link v-if="isSuperAdmin" to="/admin/admins" class="list-group-item list-group-item-action">
          Adminlarni boshqarish →
        </router-link>
        <router-link to="/admin/restaurants" class="list-group-item list-group-item-action">
          Restoranlarni boshqarish →
        </router-link>
        <router-link to="/admin/categories" class="list-group-item list-group-item-action">
          Kategoriyalarni boshqarish →
        </router-link>
        <router-link to="/admin/menu-items" class="list-group-item list-group-item-action">
          Taomlarni boshqarish →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import apiClient from '@/api/client'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const isSuperAdmin = computed(() => authStore.user?.role === 'superadmin')

const stats = ref({
  admins: '-',
  restaurants: '-',
  categories: '-',
  menuItems: '-'
})

onMounted(async () => {
  try {
    if (isSuperAdmin.value) {
      const adminRes = await apiClient.get('/admins')
      stats.value.admins = Array.isArray(adminRes.data.data) ? adminRes.data.data.length : 0
    }

    const resRes = await apiClient.get('/restaran')
    stats.value.restaurants = Array.isArray(resRes.data.data) ? resRes.data.data.length : 0

    // Kategoriyalar va taomlar uchun API yo'q, shuning uchun placeholder
    stats.value.categories = '-'
    stats.value.menuItems = '-'
  } catch (err) {
    console.error(err)
    stats.value.admins = 0
    stats.value.restaurants = 0
  }
})
</script>
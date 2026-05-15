<template>
  <div>
    <h2 class="mb-4 d-flex align-items-center gap-2">
      <LayoutDashboard size="28" /> Dashboard
    </h2>

    <div class="row g-4">
      <div v-if="isSuperAdmin" class="col-md-3">
        <div class="card text-center p-4">
          <div class="d-flex justify-content-center mb-2">
            <Users size="32" class="text-info" />
          </div>
          <h3 class="text-info">{{ stats.admins }}</h3>
          <p class="text-muted mb-0">Adminlar</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center p-4">
          <div class="d-flex justify-content-center mb-2">
            <Store size="32" class="text-primary" />
          </div>
          <h3 class="text-primary">{{ stats.restaurants }}</h3>
          <p class="text-muted mb-0">Restoranlar</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center p-4">
          <div class="d-flex justify-content-center mb-2">
            <Tags size="32" class="text-success" />
          </div>
          <h3 class="text-success">{{ stats.categories }}</h3>
          <p class="text-muted mb-0">Kategoriyalar</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center p-4">
          <div class="d-flex justify-content-center mb-2">
            <UtensilsCrossed size="32" class="text-warning" />
          </div>
          <h3 class="text-warning">{{ stats.menuItems }}</h3>
          <p class="text-muted mb-0">Taomlar</p>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <h5 class="mb-3 d-flex align-items-center gap-2">
        <Zap size="20" /> Tez havolalar
      </h5>
      <div class="list-group">
        <router-link v-if="isSuperAdmin" to="/admin/admins"
          class="list-group-item list-group-item-action d-flex align-items-center gap-2">
          <Users size="18" class="text-info" /> Adminlarni boshqarish
          <ChevronRight size="16" class="ms-auto" />
        </router-link>
        <router-link to="/admin/restaurants"
          class="list-group-item list-group-item-action d-flex align-items-center gap-2">
          <Store size="18" class="text-primary" /> Restoranlarni boshqarish
          <ChevronRight size="16" class="ms-auto" />
        </router-link>
        <router-link to="/admin/categories"
          class="list-group-item list-group-item-action d-flex align-items-center gap-2">
          <Tags size="18" class="text-success" /> Kategoriyalarni boshqarish
          <ChevronRight size="16" class="ms-auto" />
        </router-link>
        <router-link to="/admin/menu-items"
          class="list-group-item list-group-item-action d-flex align-items-center gap-2">
          <UtensilsCrossed size="18" class="text-warning" /> Taomlarni boshqarish
          <ChevronRight size="16" class="ms-auto" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { LayoutDashboard, Users, Store, Tags, UtensilsCrossed, Zap, ChevronRight } from 'lucide-vue-next'
import apiClient from '@/api/client'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const isSuperAdmin = computed(() => authStore.user?.role === 'superadmin')

const stats = ref({ admins: '-', restaurants: '-', categories: '-', menuItems: '-' })

onMounted(async () => {
  try {
    if (isSuperAdmin.value) {
      const adminRes = await apiClient.get('/admins')
      stats.value.admins = Array.isArray(adminRes.data.data) ? adminRes.data.data.length : 0
    }
    const resRes = await apiClient.get('/restaran')
    stats.value.restaurants = Array.isArray(resRes.data.data) ? resRes.data.data.length : 0
    stats.value.categories = '-'
    stats.value.menuItems = '-'
  } catch (err) {
    console.error(err)
    stats.value.admins = 0
    stats.value.restaurants = 0
  }
})
</script>

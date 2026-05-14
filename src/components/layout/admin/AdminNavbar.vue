<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="#">
        🍽️ QR Menu - Admin
      </a>
      
      <div class="d-flex align-items-center gap-3">
        <span class="text-white small">{{ user?.fullName || 'Admin' }}</span>
        
        <button 
          @click="logout" 
          class="btn btn-outline-light btn-sm"
        >
          Chiqish
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const { user } = storeToRefs(authStore)

const logout = async () => {
  await authStore.logout()
  router.push('/auth-admin-login')
}
</script>
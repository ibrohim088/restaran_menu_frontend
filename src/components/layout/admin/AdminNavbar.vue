<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold d-flex align-items-center gap-2" href="#">
        <UtensilsCrossed size="22" /> QR Menu - Admin
      </a>

      <div class="d-flex align-items-center gap-3">
        <span class="text-white small d-flex align-items-center gap-1">
          <User size="16" /> {{ user?.fullName || 'Admin' }}
        </span>
        <button @click="logout" class="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
          <LogOut size="16" /> Chiqish
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { UtensilsCrossed, User, LogOut } from 'lucide-vue-next'
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

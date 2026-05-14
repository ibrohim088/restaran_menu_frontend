<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()

onMounted(() => {
  // Agar token bo'lsa user ma'lumotlarini yuklash
  if (localStorage.getItem('accessToken')) {
    authStore.getMe()
  }
})
</script>
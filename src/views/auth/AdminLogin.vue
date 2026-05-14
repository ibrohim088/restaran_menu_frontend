<template>
  <div class="login-page d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="card shadow-lg" style="max-width: 420px; width: 100%;">
      <div class="card-body p-5">
        <div class="text-center mb-4">
          <h2 class="fw-bold text-primary">🍽️ QR Menu</h2>
          <p class="text-muted">Admin Panelga Kirish</p>
        </div>

        <form @submit.prevent="handleLogin">
          <BaseInput v-model="email" label="Email" type="email" placeholder="admin@example.com" />
          <BaseInput v-model="password" label="Parol" type="password" />

          <button type="submit" class="btn btn-primary w-100 py-3 mt-3" :disabled="loading">
            {{ loading ? 'Kirilmoqda...' : 'Kirish' }}
          </button>
        </form>

        <div class="text-center mt-4">
          <small class="text-muted">Superadmin yoki Admin</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseInput from '@/components/common/BaseInput.vue'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    await authStore.login(email.value, password.value)
    await authStore.getMe()
    if (authStore.user.role === 'superadmin') {
      router.push('/admin/admins')
    } else {
      router.push('/admin/restaurants')
    }
  } catch (err) {
    alert('Login yoki parol xato!')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
}
</style>
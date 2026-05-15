<template>
  <div class="login-page d-flex align-items-center justify-content-center min-vh-100">
    <div class="card shadow-lg" style="max-width:420px;width:100%;">
      <div class="card-body p-5">
        <div class="text-center mb-4">
          <div class="d-flex justify-content-center mb-3">
            <div class="rounded-circle bg-primary d-flex align-items-center justify-content-center"
              style="width:64px;height:64px;">
              <UtensilsCrossed size="32" class="text-white" />
            </div>
          </div>
          <h2 class="fw-bold text-primary">QR Menu</h2>
          <p class="text-muted">Admin Panelga Kirish</p>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label d-flex align-items-center gap-1">
              <Mail size="15" /> Email
            </label>
            <input v-model="email" type="email" class="form-control" placeholder="admin@example.com" required />
          </div>
          <div class="mb-3">
            <label class="form-label d-flex align-items-center gap-1">
              <Lock size="15" /> Parol
            </label>
            <input v-model="password" type="password" class="form-control" placeholder="••••••••" required />
          </div>

          <button type="submit" class="btn btn-primary w-100 py-3 mt-2 d-flex align-items-center justify-content-center gap-2"
            :disabled="loading">
            <component :is="loading ? Loader2 : LogIn" size="18" :class="{ 'spin': loading }" />
            {{ loading ? 'Kirilmoqda...' : 'Kirish' }}
          </button>
        </form>

        <div class="text-center mt-4">
          <small class="text-muted d-flex align-items-center justify-content-center gap-1">
            <Shield size="14" /> Superadmin yoki Admin
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UtensilsCrossed, Mail, Lock, LogIn, Loader2, Shield } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

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
    router.push(authStore.user.role === 'superadmin' ? '/admin/admins' : '/admin/restaurants')
  } catch (err) {
    alert('Login yoki parol xato!')
  } finally { loading.value = false }
}
</script>

<style scoped>
.login-page { background: linear-gradient(135deg, #1e3a8a, #3b82f6); }
.spin { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>

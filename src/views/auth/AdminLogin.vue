<template>
  <div class="login-page d-flex align-items-center justify-content-center min-vh-100">
    <div class="card shadow-lg" style="max-width: 420px; width: 100%;">
      <div class="card-body p-5">
        <!-- Logo va Sarlavha -->
        <div class="text-center mb-4">
          <div class="d-flex justify-content-center mb-3">
            <div class="rounded-circle bg-primary d-flex align-items-center justify-content-center"
              style="width: 64px; height: 64px;">
              <UtensilsCrossed size="32" class="text-white" />
            </div>
          </div>
          <h2 class="fw-bold text-primary">QR Menu</h2>
          <p class="text-muted">Admin Panelga Kirish</p>
        </div>

        <!-- Login Form -->
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

          <button type="submit"
            class="btn btn-primary w-100 py-2 mt-2 d-flex align-items-center justify-content-center gap-2"
            :disabled="loading">
            <component :is="loading ? Loader2 : LogIn" size="18" :class="{ 'spin': loading }" />
            {{ loading ? 'Kirilmoqda...' : 'Kirish' }}
          </button>
        </form>

        <!-- Demo Credentials - Interaktiv -->
        <div class="text-center mt-2">
          <small class="text-muted mb-2 d-block">Tezkor kirish uchun tanlang:</small>

          <div class="d-flex gap-2 justify-content-center flex-wrap">
            <!-- Superadmin -->
            <div @click="fillCredentials('superadmin')" class="d-flex gap-2 demo-credential cursor-pointer">
              <small class="text-muted d-flex align-items-center justify-content-center gap-1">
                <Shield size="14" /> Superadmin:
              </small>
              <small class="text-primary fw-medium">
                superadmin@qrmenu.uz
              </small>
            </div>

            <!-- Admin -->
            <div @click="fillCredentials('admin')" class="d-flex gap-2 demo-credential cursor-pointer">
              <small class="text-muted d-flex align-items-center justify-content-center gap-1">
                <Shield size="14" /> Admin:
              </small>
              <small class="text-primary fw-medium">
                ali@qrmenu.uz
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  UtensilsCrossed,
  Mail,
  Lock,
  LogIn,
  Loader2,
  Shield
} from 'lucide-vue-next'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)

// Demo hisoblar
const credentials = {
  superadmin: {
    email: 'superadmin@qrmenu.uz',
    password: '123456'
  },
  admin: {
    email: 'ali@qrmenu.uz',
    password: '123456'
  }
}

// Tezkor to'ldirish funksiyasi
const fillCredentials = (role) => {
  const creds = credentials[role]
  email.value = creds.email
  password.value = creds.password

  // Foydalanuvchiga vizual feedback
  const inputs = document.querySelectorAll('input')
  inputs.forEach(input => {
    input.style.transition = 'all 0.3s'
    input.style.backgroundColor = '#dbeafe'
    setTimeout(() => {
      input.style.backgroundColor = ''
    }, 600)
  })
}

const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert("Email va parolni kiriting!")
    return
  }

  loading.value = true

  try {
    await authStore.login(email.value, password.value)
    await authStore.getMe()

    // Role bo'yicha redirect
    if (authStore.user?.role === 'superadmin') {
      router.push('/admin/admins')
    } else {
      router.push('/admin/restaurants')
    }
  } catch (err) {
    console.error(err)
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

.demo-credential {
  padding: 10px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f8fafc;
  transition: all 0.2s ease;
  min-width: 140px;
}

.demo-credential:hover {
  border-color: #3b82f6;
  background: #eff6ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.cursor-pointer {
  cursor: pointer;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
// src/router/guards.js
import { useAuthStore } from '@/stores/auth.js'

export const authGuard = (to, from) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return '/auth-admin-login'
  }

  if (to.meta.requiresSuperAdmin && authStore.user?.role !== 'superadmin') {
    return '/admin'
  }

  return true
}
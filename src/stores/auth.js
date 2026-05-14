import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '@/api/client'
import { getMe as getMeApi } from '@/api/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const accessToken = ref(localStorage.getItem('accessToken') || null)
  const refreshToken = ref(localStorage.getItem('refreshToken') || null)
  const isAuthenticated = ref(!!accessToken.value)

  const getMe = async () => {
    try {
      const res = await getMeApi()
      user.value = res.data.data
      isAuthenticated.value = true
    } catch (e) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      accessToken.value = null
      refreshToken.value = null
      isAuthenticated.value = false
      user.value = null
    }
  }

  const login = async (email, password) => {
    const res = await apiClient.post('/auth/login', { email, password })
    const data = res.data

    user.value = data.data.user
    accessToken.value = data.accessToken
    refreshToken.value = data.refreshToken

    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)

    isAuthenticated.value = true
    return data
  }

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout')
    } catch (e) {
      console.log(e)
    }

    user.value = null
    accessToken.value = null
    refreshToken.value = null
    isAuthenticated.value = false

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    login,
    logout,
    getMe
  }
})
